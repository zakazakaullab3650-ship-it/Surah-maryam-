import React from 'react';
import {
  Mic,
  Play,
  Sparkles,
  BookOpen,
  Heart,
  Volume2,
  ChevronRight,
  Sun,
  Layers,
} from 'lucide-react';
import { SURAH_MARYAM_INFO } from '../data/surahMaryam';

interface HeroIntroProps {
  onStartRecitation: () => void;
  onOpenLiveVoice: (prompt?: string) => void;
  showTransliteration: boolean;
  setShowTransliteration: (val: boolean) => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  onStartRecitation,
  onOpenLiveVoice,
  showTransliteration,
  setShowTransliteration,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 p-6 sm:p-10 mb-8 shadow-2xl islamic-pattern">
      {/* Decorative celestial background orbs */}
      <div className="absolute top-0 right-1/4 -mt-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold tracking-wider font-cinzel">
            Surah 19 • Makkiyyah
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
            98 Verses • 16th Juz
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Gemini 3.8 Live API Audio
          </span>
        </div>

        {/* Bismillah Calligraphy */}
        <div className="pt-2">
          <p className="font-quran text-3xl sm:text-4xl text-amber-300 tracking-wide font-normal" dir="rtl">
            {SURAH_MARYAM_INFO.bismillah}
          </p>
          <p className="text-xs text-slate-400 mt-2 italic font-sans">
            "{SURAH_MARYAM_INFO.bismillahMeaning}"
          </p>
        </div>

        {/* Opening Verse Highlight (Verses 1-4) */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/70 border border-amber-500/20 text-center max-w-2xl mx-auto space-y-2.5">
          <div className="font-quran text-xl sm:text-2xl text-slate-100 leading-relaxed" dir="rtl">
            كٓهيعٓصٓ ﴿١﴾ ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُۥ زَكَرِيَّآ ﴿٢﴾ إِذْ نَادَىٰ رَبَّهُۥ نِدَآءً خَفِيًّا ﴿٣﴾
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-normal font-sans">
            "Kaf-Ha-Ya-'Ayn-Sad. A reminder of your Lord's mercy to His servant Zechariah, when he called upon his Lord with a secret whisper..."
          </p>
        </div>

        {/* Hero Narrative description */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Step into the profound spiritual sanctuary of <strong className="text-amber-300">Surah Maryam</strong>.
          Experience the secret, intimate du'a of Prophet Zakariya, the divine affirmation{' '}
          <em className="text-amber-200">"Huwa 'alayya hayyin" (It is easy for Me)</em>, and converse in real-time with
          our <strong>Gemini Live voice companion</strong> to study verses, reflect on faith, and explore Quranic eloquence.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Live Voice CTA */}
          <button
            onClick={() => onOpenLiveVoice("Assalamu Alaykum. Please explain the story and lessons of Prophet Zakariya's prayer in Surah Maryam.")}
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-sm shadow-xl shadow-amber-950/50 border border-amber-400/40 transition-transform active:scale-95"
          >
            <Mic className="w-4 h-4 animate-pulse" />
            <span>Start Live Voice Conversation</span>
          </button>

          {/* Listen to Recitation */}
          <button
            onClick={onStartRecitation}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
          >
            <Play className="w-4 h-4 text-amber-400 fill-current" />
            <span>Recite Verses 1–11</span>
          </button>

          {/* Transliteration Switch */}
          <button
            onClick={() => setShowTransliteration(!showTransliteration)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-medium border transition-colors ${
              showTransliteration
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Transliteration: {showTransliteration ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
