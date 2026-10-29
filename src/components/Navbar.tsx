import React from 'react';
import { Mic, BookOpen, Volume2, Sparkles, MessageSquare, Compass, Radio } from 'lucide-react';
import { RECITERS, Reciter } from '../data/surahMaryam';

interface NavbarProps {
  activeTab: 'verses' | 'stories' | 'tafsir';
  setActiveTab: (tab: 'verses' | 'stories' | 'tafsir') => void;
  selectedReciter: Reciter;
  setSelectedReciter: (r: Reciter) => void;
  openLiveVoice: (initialPrompt?: string) => void;
  isLiveActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedReciter,
  setSelectedReciter,
  openLiveVoice,
  isLiveActive,
}) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/80 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand & Surah Label */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-600/30 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-950/40">
            <span className="font-arabic font-bold text-xl leading-none">م</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-100 tracking-wide font-cinzel">
                Surah Maryam
              </h1>
              <span className="font-arabic text-amber-400 font-semibold text-sm">سورة مريم</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-300">
                Juz 16
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Interactive Study & Gemini Live Voice Companion
            </p>
          </div>
        </div>

        {/* Center Nav tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('verses')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'verses'
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Verses & Recitation</span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'stories'
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Prophetic Themes</span>
          </button>

          <button
            onClick={() => setActiveTab('tafsir')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'tafsir'
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Tafsir Deep Dive</span>
          </button>
        </nav>

        {/* Right Actions: Reciter selector + Live Voice button */}
        <div className="flex items-center gap-2.5">
          {/* Reciter Selector */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <select
              aria-label="Select Quran Reciter"
              value={selectedReciter.id}
              onChange={(e) => {
                const found = RECITERS.find((r) => r.id === e.target.value);
                if (found) setSelectedReciter(found);
              }}
              className="bg-transparent border-none text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id} className="bg-slate-900 text-slate-200">
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Live Voice Companion Button */}
          <button
            onClick={() => openLiveVoice()}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md ${
              isLiveActive
                ? 'bg-emerald-600 text-white shadow-emerald-500/30 animate-pulse'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-900/30 border border-amber-400/30'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-200"></span>
            </span>
            <Mic className="w-4 h-4" />
            <span className="hidden sm:inline">Live Voice</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-900/60 border border-amber-300/30 tracking-wider font-mono">
              LIVE
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav bottom row */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 bg-slate-950/95 py-2 px-2 text-xs">
        <button
          onClick={() => setActiveTab('verses')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'verses' ? 'text-amber-400 font-medium' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Verses</span>
        </button>
        <button
          onClick={() => setActiveTab('stories')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'stories' ? 'text-amber-400 font-medium' : 'text-slate-400'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Stories</span>
        </button>
        <button
          onClick={() => setActiveTab('tafsir')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'tafsir' ? 'text-amber-400 font-medium' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Tafsir</span>
        </button>
        <button
          onClick={() => openLiveVoice()}
          className="flex flex-col items-center gap-1 text-emerald-400 font-medium"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          <span>Live API</span>
        </button>
      </div>
    </header>
  );
};
