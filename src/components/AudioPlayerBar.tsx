import React, { useRef, useEffect, useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  VolumeX,
  X,
  Radio,
} from 'lucide-react';
import { Ayah, Reciter } from '../data/surahMaryam';

interface AudioPlayerBarProps {
  currentAyah: Ayah | null;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  reciter: Reciter;
  autoPlayNext: boolean;
  setAutoPlayNext: (val: boolean) => void;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentAyah,
  isPlaying,
  onPlayToggle,
  onNextAyah,
  onPrevAyah,
  reciter,
  autoPlayNext,
  setAutoPlayNext,
  onClose,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isRepeatOne, setIsRepeatOne] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Construct standard EveryAyah audio URL: 019 + 3-digit Ayah
  const audioUrl = currentAyah
    ? `https://everyayah.com/data/${reciter.audioFolder}/019${String(currentAyah.number).padStart(3, '0')}.mp3`
    : '';

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.playbackRate = playbackRate;
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Playback prevented or failed:', err);
        });
      }
    }
  }, [audioUrl, reciter]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    if (isRepeatOne) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else if (autoPlayNext) {
      onNextAyah();
    } else {
      onPlayToggle();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const curIdx = speeds.indexOf(playbackRate);
    const nextRate = speeds[(curIdx + 1) % speeds.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentAyah) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-amber-500/30 shadow-2xl px-4 py-3">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        muted={isMuted}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Ayah info & Arabic snippet */}
        <div className="flex items-center gap-3 w-full md:w-1/3 justify-between md:justify-start">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-cinzel font-bold text-amber-400 shrink-0">
            {currentAyah.number}
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200">
                Surah Maryam • Ayah {currentAyah.number}
              </span>
              <span className="text-[11px] text-amber-400 font-medium">
                ({reciter.name})
              </span>
            </div>
            <p className="font-quran text-sm text-slate-300 truncate" dir="rtl">
              {currentAyah.arabic}
            </p>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Playback controls & Progress */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-1/3">
          <div className="flex items-center gap-3">
            <button
              onClick={onPrevAyah}
              className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors"
              title="Previous Ayah"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onPlayToggle}
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={onNextAyah}
              className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors"
              title="Next Ayah"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline slider */}
          <div className="flex items-center gap-2 w-full max-w-sm text-[11px] text-slate-400 font-mono">
            <span>{formatSeconds(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
            />
            <span>{formatSeconds(duration)}</span>
          </div>
        </div>

        {/* Right: Options (Speed, Repeat, Auto-advance, Volume) */}
        <div className="hidden md:flex items-center justify-end gap-2.5 w-1/3 text-xs text-slate-300">
          {/* Speed */}
          <button
            onClick={cycleSpeed}
            className="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 font-mono text-[11px] text-slate-300"
            title="Playback Speed"
          >
            {playbackRate}x
          </button>

          {/* Repeat Ayah */}
          <button
            onClick={() => setIsRepeatOne(!isRepeatOne)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isRepeatOne
                ? 'bg-amber-950/70 border-amber-500 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={isRepeatOne ? 'Repeat Ayah: ON' : 'Repeat Ayah: OFF'}
          >
            <Repeat className="w-4 h-4" />
          </button>

          {/* Auto advance */}
          <button
            onClick={() => setAutoPlayNext(!autoPlayNext)}
            className={`px-2 py-1 rounded-lg border text-[11px] transition-colors ${
              autoPlayNext
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title="Continuously play next Ayah"
          >
            Auto-Next
          </button>

          {/* Mute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 text-slate-400 hover:text-slate-200"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 ml-2"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
