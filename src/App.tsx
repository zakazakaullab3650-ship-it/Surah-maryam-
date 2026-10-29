import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroIntro } from './components/HeroIntro';
import { AyahCard } from './components/AyahCard';
import { LiveVoiceModal } from './components/LiveVoiceModal';
import { TafsirModal } from './components/TafsirModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { StoriesView } from './components/StoriesView';
import { AiTafsirView } from './components/AiTafsirView';
import {
  SURAH_MARYAM_VERSES,
  RECITERS,
  Reciter,
  Ayah,
} from './data/surahMaryam';
import { Mic, Radio, BookOpen, Volume2, Sparkles, Filter } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'verses' | 'stories' | 'tafsir'>('verses');
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  const [verseFilter, setVerseFilter] = useState<'all' | 'zakariya' | 'yahya'>('all');
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);

  // Audio Player State
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [autoPlayNext, setAutoPlayNext] = useState<boolean>(true);

  // Modal states
  const [isLiveVoiceOpen, setIsLiveVoiceOpen] = useState<boolean>(false);
  const [liveVoiceInitialPrompt, setLiveVoiceInitialPrompt] = useState<string | undefined>(undefined);
  const [liveVerseContext, setLiveVerseContext] = useState<number | undefined>(undefined);

  const [selectedTafsirAyah, setSelectedTafsirAyah] = useState<Ayah | null>(null);

  // Filtered verses
  const displayedVerses = SURAH_MARYAM_VERSES.filter((v) => {
    if (verseFilter === 'zakariya') return v.number <= 11;
    if (verseFilter === 'yahya') return v.number >= 12;
    return true;
  });

  const currentPlayingAyah = playingAyahNumber
    ? SURAH_MARYAM_VERSES.find((v) => v.number === playingAyahNumber) || null
    : null;

  // Handlers
  const handlePlayToggle = (ayahNumber: number) => {
    if (playingAyahNumber === ayahNumber) {
      setIsPlayingAudio(!isPlayingAudio);
    } else {
      setPlayingAyahNumber(ayahNumber);
      setIsPlayingAudio(true);
    }
  };

  const handleNextAyah = () => {
    if (!playingAyahNumber) return;
    const currentIdx = SURAH_MARYAM_VERSES.findIndex((v) => v.number === playingAyahNumber);
    if (currentIdx !== -1 && currentIdx < SURAH_MARYAM_VERSES.length - 1) {
      setPlayingAyahNumber(SURAH_MARYAM_VERSES[currentIdx + 1].number);
      setIsPlayingAudio(true);
    } else {
      setIsPlayingAudio(false);
    }
  };

  const handlePrevAyah = () => {
    if (!playingAyahNumber) return;
    const currentIdx = SURAH_MARYAM_VERSES.findIndex((v) => v.number === playingAyahNumber);
    if (currentIdx > 0) {
      setPlayingAyahNumber(SURAH_MARYAM_VERSES[currentIdx - 1].number);
      setIsPlayingAudio(true);
    }
  };

  const handleOpenLiveVoice = (prompt?: string, verseNum?: number) => {
    setLiveVoiceInitialPrompt(prompt);
    setLiveVerseContext(verseNum);
    setIsLiveVoiceOpen(true);
  };

  const handleStartRecitation = () => {
    setPlayingAyahNumber(1);
    setIsPlayingAudio(true);
    setActiveTab('verses');
    const el = document.getElementById('ayah-1');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectStoryRange = (rangeId: string) => {
    setActiveTab('verses');
    if (rangeId === 'zakariya') {
      setVerseFilter('zakariya');
    } else if (rangeId === 'yahya') {
      setVerseFilter('yahya');
    } else {
      setVerseFilter('all');
    }
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col font-sans pb-28">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedReciter={selectedReciter}
        setSelectedReciter={setSelectedReciter}
        openLiveVoice={handleOpenLiveVoice}
        isLiveActive={isLiveVoiceOpen}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full">
        {/* Hero Section */}
        <HeroIntro
          onStartRecitation={handleStartRecitation}
          onOpenLiveVoice={handleOpenLiveVoice}
          showTransliteration={showTransliteration}
          setShowTransliteration={setShowTransliteration}
        />

        {/* Content based on active tab */}
        {activeTab === 'verses' && (
          <div className="space-y-6">
            {/* Verses filter bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-slate-300">Sections:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setVerseFilter('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      verseFilter === 'all'
                        ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    All Verses (1–15)
                  </button>
                  <button
                    onClick={() => setVerseFilter('zakariya')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      verseFilter === 'zakariya'
                        ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Zakariya's Prayer (1–11)
                  </button>
                  <button
                    onClick={() => setVerseFilter('yahya')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      verseFilter === 'yahya'
                        ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Yahya's Virtue (12–15)
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-400">
                Reciter:{' '}
                <span className="text-amber-400 font-medium">{selectedReciter.name}</span>
              </div>
            </div>

            {/* List of Ayah Cards */}
            <div className="space-y-4">
              {displayedVerses.map((ayah) => (
                <AyahCard
                  key={ayah.number}
                  ayah={ayah}
                  isPlaying={playingAyahNumber === ayah.number && isPlayingAudio}
                  onPlayToggle={() => handlePlayToggle(ayah.number)}
                  onOpenTafsir={() => setSelectedTafsirAyah(ayah)}
                  onOpenLiveVoice={() =>
                    handleOpenLiveVoice(
                      `Let's reflect on Surah Maryam Ayah ${ayah.number}: "${ayah.arabic}" ("${ayah.translation}")`,
                      ayah.number
                    )
                  }
                  showTransliteration={showTransliteration}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <StoriesView
            onSelectStoryRange={handleSelectStoryRange}
            onOpenLiveVoice={handleOpenLiveVoice}
          />
        )}

        {activeTab === 'tafsir' && (
          <AiTafsirView onOpenLiveVoice={handleOpenLiveVoice} />
        )}
      </main>

      {/* Floating Live Voice Action Pill for quick access anytime */}
      {!isLiveVoiceOpen && (
        <button
          onClick={() => handleOpenLiveVoice()}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-600 to-emerald-600 text-white font-semibold text-xs shadow-2xl shadow-amber-900/50 hover:shadow-emerald-900/50 hover:scale-105 active:scale-95 transition-all border border-amber-400/40"
          title="Open Gemini Live Voice Companion"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-200"></span>
          </span>
          <Mic className="w-4 h-4" />
          <span>Talk Live (gemini-3.8-live)</span>
        </button>
      )}

      {/* Audio Player Bottom Bar */}
      {playingAyahNumber && (
        <AudioPlayerBar
          currentAyah={currentPlayingAyah}
          isPlaying={isPlayingAudio}
          onPlayToggle={() => setIsPlayingAudio(!isPlayingAudio)}
          onNextAyah={handleNextAyah}
          onPrevAyah={handlePrevAyah}
          reciter={selectedReciter}
          autoPlayNext={autoPlayNext}
          setAutoPlayNext={setAutoPlayNext}
          onClose={() => {
            setIsPlayingAudio(false);
            setPlayingAyahNumber(null);
          }}
        />
      )}

      {/* Live Voice Modal */}
      <LiveVoiceModal
        isOpen={isLiveVoiceOpen}
        onClose={() => setIsLiveVoiceOpen(false)}
        initialPrompt={liveVoiceInitialPrompt}
        verseContext={liveVerseContext}
      />

      {/* Classical Tafsir & Gemini Deep Dive Modal */}
      <TafsirModal
        ayah={selectedTafsirAyah}
        isOpen={!!selectedTafsirAyah}
        onClose={() => setSelectedTafsirAyah(null)}
        onOpenLiveVoice={(prompt) => {
          setSelectedTafsirAyah(null);
          handleOpenLiveVoice(prompt, selectedTafsirAyah?.number);
        }}
      />
    </div>
  );
}
