import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  Send,
  Volume2,
  Mic,
  Lightbulb,
  Check,
  Loader2,
  Radio,
} from 'lucide-react';
import { Ayah } from '../data/surahMaryam';

interface TafsirModalProps {
  ayah: Ayah | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenLiveVoice: (prompt?: string) => void;
}

export const TafsirModal: React.FC<TafsirModalProps> = ({
  ayah,
  isOpen,
  onClose,
  onOpenLiveVoice,
}) => {
  const [activeTab, setActiveTab] = useState<'classical' | 'askAi'>('classical');
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [aiAnswers, setAiAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // TTS state
  const [isPlayingTts, setIsPlayingTts] = useState<boolean>(false);
  const [ttsLoading, setTtsLoading] = useState<boolean>(false);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  if (!isOpen || !ayah) return null;

  const handleAskGemini = async (questionText?: string) => {
    const q = (questionText || customQuestion).trim();
    if (!q) return;

    setIsLoadingAi(true);
    setAiError(null);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verseNumber: ayah.number,
          prompt: `For Surah Maryam Ayah ${ayah.number} (${ayah.arabic}): ${q}`,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setAiError(data.error);
      } else {
        setAiAnswers((prev) => [...prev, { question: q, answer: data.reply }]);
        if (!questionText) setCustomQuestion('');
      }
    } catch (err: any) {
      setAiError(err?.message || 'Failed to fetch AI Tafsir.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handlePlayTts = async (textToNarrate: string) => {
    if (audioObj) {
      audioObj.pause();
      setAudioObj(null);
      setIsPlayingTts(false);
      return;
    }

    setTtsLoading(true);
    try {
      const res = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `Surah Maryam, Ayah ${ayah.number}. ${textToNarrate}`,
          voice: 'Kore',
        }),
      });

      const data = await res.json();
      if (data.audio) {
        const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
        setAudioObj(audio);
        setIsPlayingTts(true);
        audio.onended = () => {
          setIsPlayingTts(false);
          setAudioObj(null);
        };
        await audio.play();
      }
    } catch (e) {
      console.error('Failed to play TTS audio:', e);
    } finally {
      setTtsLoading(false);
    }
  };

  const sampleQuestions = [
    `What are the linguistic gems (balaghah) in Ayah ${ayah.number}?`,
    `How does the lesson in Ayah ${ayah.number} apply to anxiety and prayer today?`,
    `What did classical scholars like Ibn Kathir and As-Sa'di say about this verse?`,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-cinzel font-bold">
              {ayah.number}
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 font-cinzel text-base">
                Exegesis & Reflections : Ayah {ayah.number}
              </h3>
              <p className="text-xs text-slate-400">
                Surah Maryam • Deep Classical & Spiritual Insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenLiveVoice(`Let's reflect on Surah Maryam Ayah ${ayah.number}: ${ayah.arabic}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors"
              title="Discuss with Gemini Live Voice"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Discuss Live</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ayah display header */}
        <div className="px-5 py-3.5 bg-slate-950/40 border-b border-slate-800 text-right" dir="rtl">
          <p className="font-quran text-xl sm:text-2xl text-amber-300 leading-loose">
            {ayah.arabic}
          </p>
          <p className="font-sans text-xs text-slate-300 text-left mt-1 italic" dir="ltr">
            "{ayah.translation}"
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-5 pt-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('classical')}
            className={`flex items-center gap-2 pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'classical'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Classical Tafsir & Reflection</span>
          </button>
          <button
            onClick={() => setActiveTab('askAi')}
            className={`flex items-center gap-2 pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'askAi'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Gemini 3.8 Flash</span>
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
          {activeTab === 'classical' ? (
            <div className="space-y-5">
              {/* Audio Listen Bar */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Listen to Spoken Reflection (Gemini TTS)</span>
                </div>
                <button
                  onClick={() => handlePlayTts(ayah.tafsir + ' ' + ayah.spiritualReflection)}
                  disabled={ttsLoading}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors"
                >
                  {ttsLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : isPlayingTts ? (
                    <span>Stop Audio</span>
                  ) : (
                    <span>Narrate Reflection</span>
                  )}
                </button>
              </div>

              {/* Classical Tafsir section */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  Classical Exegesis (Tafsir Summary)
                </h4>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-200 leading-relaxed text-sm">
                  {ayah.tafsir}
                </div>
              </div>

              {/* Spiritual Reflection */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-400" />
                  Spiritual Heart Reflections & Life Lessons
                </h4>
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-100/90 leading-relaxed text-sm">
                  {ayah.spiritualReflection}
                </div>
              </div>

              {/* Key Words with Roots */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Key Arabic Terminology & Roots in this Verse
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ayah.words.map((w, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-slate-200">{w.meaning}</span>
                        <div className="text-[11px] text-slate-400 italic">{w.transliteration}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-quran text-base text-amber-300" dir="rtl">
                          {w.word}
                        </span>
                        {w.root && (
                          <div className="text-[10px] text-emerald-400/80 font-arabic" dir="rtl">
                            {w.root}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Question Input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">
                  Ask any question regarding Ayah {ayah.number}:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskGemini()}
                    placeholder="e.g. Why did Zakariya describe his bones as weakening? What does it teach us?"
                    className="flex-1 bg-slate-950 text-slate-200 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/50"
                  />
                  <button
                    onClick={() => handleAskGemini()}
                    disabled={isLoadingAi || !customQuestion.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs rounded-xl disabled:opacity-40 transition-colors"
                  >
                    {isLoadingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>Ask</span>
                  </button>
                </div>
              </div>

              {/* Sample Prompt Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400 font-medium">Suggested inquiries:</span>
                <div className="flex flex-wrap gap-1.5">
                  {sampleQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAskGemini(q)}
                      className="px-2.5 py-1 text-left text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 rounded-lg border border-slate-700/60 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error state */}
              {aiError && (
                <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-300 text-xs">
                  {aiError}
                </div>
              )}

              {/* Q&A Thread */}
              <div className="space-y-4 pt-2">
                {aiAnswers.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 animate-in fade-in"
                  >
                    <div className="font-semibold text-amber-300 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.question}</span>
                    </div>
                    <div className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
