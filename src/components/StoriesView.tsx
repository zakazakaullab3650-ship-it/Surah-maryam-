import React from 'react';
import { Compass, BookOpen, Mic, Sparkles, Heart, Star, ChevronRight } from 'lucide-react';
import { THEMATIC_SECTIONS } from '../data/surahMaryam';

interface StoriesViewProps {
  onSelectStoryRange: (rangeId: string) => void;
  onOpenLiveVoice: (prompt?: string) => void;
}

export const StoriesView: React.FC<StoriesViewProps> = ({
  onSelectStoryRange,
  onOpenLiveVoice,
}) => {
  const storyDetails = [
    {
      id: 'zakariya',
      title: 'Prophet Zakariya & The Secret Prayer',
      arabicTitle: 'قصة زكريا عليه السلام وبشارة يحيى',
      verses: 'Ayah 1 - 11',
      summary:
        "Zakariya was aged, with brittle bones and silver hair, and his wife was barren. Yet his faith in Allah's limitless generosity remained unshakable. In the solitude of the sanctuary at night, he whispered his intimate du'a (Nida'an Khafiyya) for a righteous heir. Allah answered with the miraculous birth of Yahya (John), assuring him 'Huwa 'alayya hayyin' — 'It is effortless for Me.' Zakariya's sign was three nights of silence while physically sound.",
      keyLessons: [
        "The power of whispered, private du'a away from human eyes",
        "Never judging your possibilities by physical or biological limitations",
        "Gratitude for past blessings: 'Never have I been in prayer to You disappointed'",
        "The discipline of sacred silence and abundant Tasbih (glorification)"
      ],
      prompt: "Tell me about the story of Prophet Zakariya in Surah Maryam verses 1 to 11 and how his secret prayer teaches us about unconditional trust in Allah."
    },
    {
      id: 'yahya',
      title: 'Prophet Yahya: Compassion & Piety',
      arabicTitle: 'صفات يحيى عليه السلام والبر بالوالدين',
      verses: 'Ayah 12 - 15',
      summary:
        "Yahya was granted divine wisdom and understanding while still a young child ('ātaynāhu al-hukma sabiyyā'). Allah endowed him with exceptional gentleness and compassion towards all creatures ('hanānan min ladunnā'), moral purity, and deep devotion to his aging parents. Allah guaranteed him eternal divine peace on the three most vulnerable transitions: his birth, his death, and the day of resurrection.",
      keyLessons: [
        "Wisdom and spiritual discernment are gifts from Allah, not merely years of age",
        "Leadership must be rooted in tenderness, empathy, and purity",
        "Exemplary filial piety: honoring aging parents with exquisite reverence",
        "Divine peace (Salam) enveloping the righteous across eternity"
      ],
      prompt: "What made Prophet Yahya so unique in Surah Maryam, especially his gentleness (Hanan) and piety?"
    },
    {
      id: 'maryam',
      title: 'Maryam (Mary) & The Miraculous Birth of Isa (Jesus)',
      arabicTitle: 'مريم العذراء وميلاد عيسى عليه السلام',
      verses: 'Ayah 16 - 36',
      summary:
        "Maryam retreated to an eastern chamber for secluded worship. Angel Jibril appeared to announce the gift of a pure son without human paternity. Overwhelmed by labor pains beneath a dried date palm, she cried in agony, but Allah comforted her with a freshwater stream beneath her feet and ripe dates. Holding newborn Isa, she returned to her questioning community. Baby Isa miraculously spoke from the cradle: 'Indeed, I am the servant of Allah; He has given me the Scripture and made me a prophet.'",
      keyLessons: [
        "The high station of Maryam in Islam as a paragon of pure chastity and devotion",
        "When at your lowest moment of grief, Allah provides ease and nourishment",
        "Isa's first words affirmed his servant-prophethood: 'Inni 'Abdullah'",
        "Divine miracles refute any limitation on God's creative command"
      ],
      prompt: "Explain the story of Maryam in Surah Maryam, from her seclusion to the miracle of baby Isa speaking in the cradle."
    },
    {
      id: 'ibrahim',
      title: 'Prophet Ibrahim: The Tender Call to his Father',
      arabicTitle: 'دعوة إبراهيم لأبيه بلطف وأدب',
      verses: 'Ayah 41 - 50',
      summary:
        "Prophet Ibrahim approached his father Azar, who carved idols of stone. With unmatched filial love and respect, he repeatedly addressed him: 'Yā abati' ('O my beloved father...'). Rather than claiming superiority, he said: 'Indeed, knowledge has come to me which did not come to you, so follow me; I will guide you to an even path.' Even when threatened with stoning, Ibrahim replied with peace: 'Peace be upon you; I will ask forgiveness for you from my Lord.'",
      keyLessons: [
        "Manners and emotional gentleness in sharing truth with family members",
        "The respectful phrase 'Ya abati' reflecting deep tenderness despite fundamental disagreement",
        "Responding to threats with serene dignity and prayers of mercy",
        "Allah compensates those who leave falsehood for His sake with righteous descendants"
      ],
      prompt: "How did Prophet Ibrahim speak to his father in Surah Maryam, and what lessons does it offer on respectful dialogue?"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-slate-100 font-cinzel flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <span>Prophetic Stories in Surah Maryam</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore the divine narratives of faith, miraculous answered prayers, and unwavering piety.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {storyDetails.map((story) => (
          <div
            key={story.id}
            className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300">
                  {story.verses}
                </span>
                <span className="font-arabic text-amber-400 text-sm font-semibold">
                  {story.arabicTitle}
                </span>
              </div>

              <h3 className="font-bold text-base sm:text-lg text-slate-100 font-cinzel">
                {story.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {story.summary}
              </p>

              <div className="pt-2 space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 block">
                  Spiritual Milestones:
                </span>
                <ul className="text-xs text-slate-400 space-y-1">
                  {story.keyLessons.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Star className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectStoryRange(story.id)}
                className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Verses</span>
                <ChevronRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => onOpenLiveVoice(story.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-all"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Discuss Live</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
