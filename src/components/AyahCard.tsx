import React, { useState } from 'react';
import {
  Play,
  Pause,
  BookOpen,
  Mic,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
} from 'lucide-react';
import { Ayah } from '../data/surahMaryam';

interface AyahCardProps {
  ayah: Ayah;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onOpenTafsir: () => void;
  onOpenLiveVoice: () => void;
  showTransliteration: boolean;
}

export const AyahCard: React.FC<AyahCardProps> = ({
  ayah,
  isPlaying,
  onPlayToggle,
  onOpenTafsir,
  onOpenLiveVoice,
  showTransliteration,
}) => {
  const [showWords, setShowWords] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    const text = `${ayah.arabic}\n${ayah.transliteration}\n"${ayah.translation}"\n— [Surah Maryam 19:${ayah.number}]`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`ayah-${ayah.number}`}
      className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
        isPlaying
          ? 'bg-slate-900/90 border-amber-500 shadow-xl shadow-amber-950/40 ring-1 ring-amber-500/50'
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/70'
      }`}
    >
      {/* Top Header: Verse Number & Action Buttons */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
        {/* Ayah Badge */}
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-cinzel font-bold text-sm border transition-colors ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                : 'bg-slate-800 text-amber-400 border-amber-500/20'
            }`}
          >
            {ayah.number}
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Surah Maryam : Ayah {ayah.number}
          </span>
          {ayah.number <= 11 && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              Zakariya's Prayer
            </span>
          )}
        </div>

        {/* Right Quick Controls */}
        <div className="flex items-center gap-1.5">
          {/* Play/Pause Button */}
          <button
            onClick={onPlayToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/20'
            }`}
            title={isPlaying ? 'Pause Ayah Recitation' : 'Play Ayah Recitation'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Playing</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Listen</span>
              </>
            )}
          </button>

          {/* Tafsir Modal Trigger */}
          <button
            onClick={onOpenTafsir}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700/60 transition-colors"
            title="Read Classical Tafsir & Reflection"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Live Voice Discuss Trigger */}
          <button
            onClick={onOpenLiveVoice}
            className="p-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 transition-colors"
            title="Discuss this Ayah live with Gemini Live Voice"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700/60 transition-colors"
            title="Copy Ayah text"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Arabic Text */}
      <div className="text-right my-5" dir="rtl">
        <p className="font-quran text-2xl sm:text-3xl text-slate-100 leading-[2.4] tracking-wide select-text">
          {ayah.arabic}
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-amber-500/40 text-amber-400 text-sm font-arabic font-bold mx-2 align-middle bg-amber-950/30">
            {ayah.number}
          </span>
        </p>
      </div>

      {/* Transliteration */}
      {showTransliteration && (
        <div className="my-3 text-xs sm:text-sm text-amber-300/80 font-sans italic tracking-wide">
          {ayah.transliteration}
        </div>
      )}

      {/* English Translation */}
      <div className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
        <p className="font-medium text-slate-200">"{ayah.translation}"</p>
        {ayah.clearQuranTranslation && ayah.clearQuranTranslation !== ayah.translation && (
          <p className="text-xs text-slate-400 mt-1 italic">
            Clear Quran: {ayah.clearQuranTranslation}
          </p>
        )}
      </div>

      {/* Spiritual Gem Preview Tag */}
      <div className="mt-4 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold text-amber-400 text-[11px] uppercase tracking-wider block">
            Spiritual Reflection
          </span>
          <p className="text-slate-300 leading-normal">{ayah.spiritualReflection}</p>
        </div>
      </div>

      {/* Word-by-Word Accordion Toggle */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <button
          onClick={() => setShowWords(!showWords)}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-amber-300 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Word-by-Word Analysis ({ayah.words.length} words)</span>
          {showWords ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-1">
          {ayah.keywords.map((kw, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50 hidden sm:inline"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Word-by-Word Interactive Grid */}
      {showWords && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 animate-in fade-in duration-200">
          {ayah.words.map((w, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 transition-colors text-center flex flex-col justify-between"
            >
              <div className="font-quran text-lg text-amber-300" dir="rtl">
                {w.word}
              </div>
              <div className="text-[11px] text-slate-400 font-mono italic my-0.5">
                {w.transliteration}
              </div>
              <div className="text-xs text-slate-200 font-medium">{w.meaning}</div>
              {w.root && (
                <div className="text-[10px] text-emerald-400/80 mt-1 font-arabic" dir="rtl">
                  الجذر: {w.root}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
