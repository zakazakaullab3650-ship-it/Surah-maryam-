import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  X,
  Volume2,
  Sparkles,
  AlertCircle,
  Radio,
  Send,
  Minimize2,
  Maximize2,
  MessageSquare,
  HelpCircle,
  Headphones,
} from 'lucide-react';
import { LiveAudioManager } from '../utils/audioLive';
import { SUGGESTED_VOICE_TOPICS } from '../data/surahMaryam';

interface LiveVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  verseContext?: number;
}

interface TranscriptTurn {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
}

export const LiveVoiceModal: React.FC<LiveVoiceModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  verseContext,
}) => {
  const [connectionStatus, setConnectionStatus] = useState<
    'disconnected' | 'connecting' | 'connected' | 'error'
  >('disconnected');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isGeminiSpeaking, setIsGeminiSpeaking] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<string>('Fenrir');
  const [transcripts, setTranscripts] = useState<TranscriptTurn[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Audio levels for animated orb / bars
  const [micLevel, setMicLevel] = useState<number>(0);
  const [outputLevel, setOutputLevel] = useState<number>(0);

  const wsRef = useRef<WebSocket | null>(null);
  const audioManagerRef = useRef<LiveAudioManager | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);
  const currentGeminiTurnRef = useRef<string>('');

  // Start connection when modal opens
  useEffect(() => {
    if (isOpen) {
      connectLiveSession();
    } else {
      cleanupLiveSession();
    }

    return () => {
      cleanupLiveSession();
    };
  }, [isOpen, selectedVoice]);

  // Scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts, currentGeminiTurnRef.current]);

  // Audio visualizer loop
  useEffect(() => {
    if (connectionStatus === 'connected') {
      const updateLevels = () => {
        if (audioManagerRef.current) {
          const micL = isMicMuted ? 0 : audioManagerRef.current.getMicLevel();
          const outL = audioManagerRef.current.getOutputLevel();
          setMicLevel(micL);
          setOutputLevel(outL);
          setIsGeminiSpeaking(outL > 0.05);
        }
        animFrameRef.current = requestAnimationFrame(updateLevels);
      };
      animFrameRef.current = requestAnimationFrame(updateLevels);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      setMicLevel(0);
      setOutputLevel(0);
      setIsGeminiSpeaking(false);
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [connectionStatus, isMicMuted]);

  // Handle initial prompt if supplied
  useEffect(() => {
    if (initialPrompt && connectionStatus === 'connected' && wsRef.current) {
      sendTextMessage(initialPrompt);
    }
  }, [connectionStatus, initialPrompt]);

  const connectLiveSession = async () => {
    cleanupLiveSession();
    setConnectionStatus('connecting');
    setErrorMessage(null);

    try {
      const audioManager = new LiveAudioManager();
      audioManagerRef.current = audioManager;

      // Determine websocket protocol & URL
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live?voice=${encodeURIComponent(selectedVoice)}`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        console.log('Connected to Live WebSocket');
      };

      ws.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'ready') {
            setConnectionStatus('connected');

            // Start microphone streaming if not muted
            try {
              await audioManager.startMicrophone((pcmBase64) => {
                if (ws.readyState === WebSocket.OPEN && !isMicMuted) {
                  ws.send(JSON.stringify({ type: 'audio', audio: pcmBase64 }));
                }
              });
            } catch (micErr: any) {
              console.warn('Microphone access denied or error:', micErr);
              setErrorMessage('Microphone access not granted. You can still type questions below.');
            }
          } else if (data.type === 'audio' && data.audio) {
            // Play 24kHz raw PCM chunk
            audioManager.playPcmChunk(data.audio);
          } else if (data.type === 'text' && data.text) {
            // Append incoming text parts to transcript
            currentGeminiTurnRef.current += data.text;
            setTranscripts((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.sender === 'gemini') {
                return [
                  ...prev.slice(0, -1),
                  { ...last, text: last.text + data.text },
                ];
              } else {
                return [
                  ...prev,
                  {
                    id: String(Date.now()),
                    sender: 'gemini',
                    text: data.text,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ];
              }
            });
          } else if (data.type === 'interrupted') {
            audioManager.interruptPlayback();
            setIsGeminiSpeaking(false);
          } else if (data.type === 'turnComplete') {
            currentGeminiTurnRef.current = '';
            setIsGeminiSpeaking(false);
          } else if (data.type === 'error') {
            setErrorMessage(data.error || 'Live API session error occurred.');
            setConnectionStatus('error');
          }
        } catch (e) {
          console.error('Error handling WS message:', e);
        }
      };

      ws.onerror = (e) => {
        console.error('WebSocket error:', e);
        setErrorMessage('Could not establish connection to Gemini Live server.');
        setConnectionStatus('error');
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
        if (connectionStatus !== 'error') {
          setConnectionStatus('disconnected');
        }
      };
    } catch (err: any) {
      console.error('Failed to init live audio/ws:', err);
      setErrorMessage(err?.message || 'Failed to initialize session.');
      setConnectionStatus('error');
    }
  };

  const cleanupLiveSession = () => {
    if (audioManagerRef.current) {
      audioManagerRef.current.destroy();
      audioManagerRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setConnectionStatus('disconnected');
    setMicLevel(0);
    setOutputLevel(0);
    setIsGeminiSpeaking(false);
  };

  const toggleMicMute = () => {
    setIsMicMuted((prev) => !prev);
  };

  const sendTextMessage = (textToSend?: string) => {
    const text = (textToSend || textInput).trim();
    if (!text || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    // Add to transcripts
    setTranscripts((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    // Send to WebSocket
    wsRef.current.send(JSON.stringify({ type: 'text', text }));
    if (!textToSend) setTextInput('');
  };

  if (!isOpen) return null;

  // Visualizer scale calculation
  const orbScale = 1 + Math.max(micLevel * 1.5, outputLevel * 1.8);
  const ringOpacity = Math.min(0.9, Math.max(0.2, micLevel * 2 + outputLevel * 2));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isMinimized
            ? 'max-w-md h-[420px]'
            : 'max-w-3xl h-[88vh] max-h-[780px]'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-100 text-sm sm:text-base font-cinzel">
                  Gemini Live Voice Companion
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  gemini-3.8-live
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Real-time vocal conversation on Surah Maryam & Prophetic reflections
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Close Live Session"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status banner */}
        <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected'
                  ? 'bg-emerald-400 animate-ping'
                  : connectionStatus === 'connecting'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-rose-400'
              }`}
            />
            <span className="text-slate-300 font-medium">
              {connectionStatus === 'connected' && (isGeminiSpeaking ? 'Gemini Speaking (24kHz Live)' : isMicMuted ? 'Mic Muted' : 'Listening to your voice...')}
              {connectionStatus === 'connecting' && 'Connecting to Gemini Live API...'}
              {connectionStatus === 'error' && 'Connection Issue'}
              {connectionStatus === 'disconnected' && 'Session Disconnected'}
            </span>
            {verseContext && (
              <span className="text-amber-400/90 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">
                Ayah {verseContext} Focus
              </span>
            )}
          </div>

          {/* Voice selector */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <Headphones className="w-3.5 h-3.5 text-amber-400" />
            <span>Voice:</span>
            <select
              aria-label="Select AI Voice"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="bg-slate-800 text-slate-200 text-xs px-2 py-0.5 rounded border border-slate-700 focus:outline-none focus:border-amber-500"
            >
              <option value="Fenrir">Fenrir (Resonant / Scholarly)</option>
              <option value="Zephyr">Zephyr (Calm / Serene)</option>
              <option value="Kore">Kore (Gentle / Clear)</option>
              <option value="Puck">Puck (Warm / Expressive)</option>
              <option value="Aoede">Aoede (Melodic)</option>
            </select>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-4 mt-3 p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={connectLiveSession}
              className="px-2.5 py-1 bg-rose-900/60 hover:bg-rose-800 rounded text-rose-100 font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Middle: Visualizer + Transcripts */}
        <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
          {/* Animated Mandala Voice Visualizer */}
          <div className="relative h-36 shrink-0 rounded-xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 flex items-center justify-center overflow-hidden">
            {/* Background subtle rings */}
            <div
              className="absolute w-44 h-44 rounded-full border border-amber-500/20 transition-all duration-150"
              style={{
                transform: `scale(${orbScale * 1.05})`,
                opacity: ringOpacity,
              }}
            />
            <div
              className="absolute w-56 h-56 rounded-full border border-emerald-500/15 transition-all duration-200"
              style={{
                transform: `scale(${orbScale * 1.15})`,
                opacity: ringOpacity * 0.7,
              }}
            />

            {/* Glowing Central Orb */}
            <div
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-150 shadow-xl ${
                isGeminiSpeaking
                  ? 'bg-gradient-to-tr from-amber-600 to-emerald-500 shadow-amber-500/50'
                  : micLevel > 0.05
                  ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-emerald-500/40'
                  : 'bg-gradient-to-tr from-slate-800 to-slate-700 shadow-slate-900'
              }`}
              style={{
                transform: `scale(${orbScale})`,
              }}
            >
              <div className="text-white text-center">
                {isGeminiSpeaking ? (
                  <Volume2 className="w-8 h-8 mx-auto animate-pulse" />
                ) : micLevel > 0.05 ? (
                  <Mic className="w-8 h-8 mx-auto animate-bounce text-emerald-100" />
                ) : (
                  <Sparkles className="w-7 h-7 mx-auto text-amber-300/80" />
                )}
              </div>
            </div>

            {/* Sound Wave Bars underneath */}
            <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 px-4 h-6">
              {[0.4, 0.7, 1.0, 0.6, 0.8, 1.2, 0.9, 0.5, 0.7, 1.1, 0.8, 0.5].map((multiplier, i) => {
                const heightVal = Math.min(
                  24,
                  Math.max(4, (isGeminiSpeaking ? outputLevel : micLevel) * 40 * multiplier)
                );
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-75 ${
                      isGeminiSpeaking
                        ? 'bg-amber-400/80'
                        : micLevel > 0.05
                        ? 'bg-emerald-400/80'
                        : 'bg-slate-700/60'
                    }`}
                    style={{ height: `${heightVal}px` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Transcript History */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 rounded-xl bg-slate-950/50 p-3 border border-slate-800/80 text-sm">
            {transcripts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500">
                <MessageSquare className="w-8 h-8 mb-2 text-slate-600" />
                <p className="font-medium text-slate-400 text-xs sm:text-sm">
                  Speak clearly into your microphone
                </p>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Ask about Prophet Zakariya's prayer, the miracle of Yahya, linguistic secrets of Surah Maryam, or practice recitation.
                </p>
              </div>
            ) : (
              transcripts.map((t) => (
                <div
                  key={t.id}
                  className={`flex flex-col ${
                    t.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
                    <span>{t.sender === 'user' ? 'You' : 'Gemini Live'}</span>
                    <span>•</span>
                    <span>{t.timestamp}</span>
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                      t.sender === 'user'
                        ? 'bg-amber-600/30 text-amber-100 border border-amber-500/30 rounded-tr-none'
                        : 'bg-slate-800/80 text-slate-200 border border-slate-700/60 rounded-tl-none font-sans'
                    }`}
                  >
                    {t.text}
                  </div>
                </div>
              ))
            )}
            <div ref={transcriptEndRef} />
          </div>

          {/* Quick Suggested Voice Topics */}
          {!isMinimized && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-amber-400" />
                Tap a reflection topic to ask aloud:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                {SUGGESTED_VOICE_TOPICS.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendTextMessage(topic.query)}
                    className="shrink-0 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-amber-300 border border-slate-700/70 hover:border-amber-500/40 transition-all text-left"
                  >
                    <span className="font-semibold block text-amber-400/90 text-[11px]">
                      {topic.title}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate max-w-[200px] block">
                      {topic.verseRef}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex flex-col gap-2">
          {/* Optional Text input for hybrid typing */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendTextMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Or type a question to speak with Gemini Live..."
              className="flex-1 bg-slate-900 text-slate-200 text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/50"
            />
            <button
              type="submit"
              disabled={!textInput.trim() || connectionStatus !== 'connected'}
              className="p-2 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 rounded-xl disabled:opacity-40 border border-amber-500/30 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Mic controls + Action Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMicMute}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isMicMuted
                    ? 'bg-rose-950/70 text-rose-300 border border-rose-500/40'
                    : 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {isMicMuted ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />}
                <span>{isMicMuted ? 'Mic Muted' : 'Mic Live'}</span>
              </button>

              {isGeminiSpeaking && (
                <button
                  onClick={() => audioManagerRef.current?.interruptPlayback()}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors"
                >
                  Interrupt Voice
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={connectLiveSession}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors"
              >
                Restart Session
              </button>
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-medium border border-rose-500/30 transition-colors"
              >
                End Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
