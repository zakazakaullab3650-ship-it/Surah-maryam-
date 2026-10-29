import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  Mic,
  BookOpen,
  Volume2,
  HelpCircle,
  Lightbulb,
  Copy,
  Check,
} from 'lucide-react';

interface AiTafsirViewProps {
  onOpenLiveVoice: (prompt?: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const AiTafsirView: React.FC<AiTafsirViewProps> = ({ onOpenLiveVoice }) => {
  const [inputQuery, setInputQuery] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const curatedTopics = [
    {
      title: "Secrets of 'Huwa 'Alayya Hayyin'",
      query: "Analyze the profound theological and psychological depth of 'Huwa 'alayya hayyin' (It is easy for Me) in verse 9 of Surah Maryam.",
      category: "Theology & Hope"
    },
    {
      title: "Linguistic Miracle of Verse 4",
      query: "Explain the Arabic imagery of 'wash-ta'ala ar-ra'su shayban' (the head flared up like fire with grey hair) and 'wahana al-'azm' in verse 4.",
      category: "Balaghah (Rhetoric)"
    },
    {
      title: "Why Secret Prayer (Nida'an Khafiyya)?",
      query: "What are the spiritual and practical reasons Prophet Zakariya whispered his prayer secretly in verse 3?",
      category: "Spiritual Etiquette"
    },
    {
      title: "The Sign of 3 Nights Silence",
      query: "Why did Allah choose silence as Zakariya's sign, and how did his tongue praise Allah while being unable to speak to people?",
      category: "Divine Signs"
    },
    {
      title: "Disjointed Letters: Kaf-Ha-Ya-Ain-Sad",
      query: "What do classical tafsir scholars say about the opening mystic letters (كٓهيعٓصٓ) of Surah Maryam?",
      category: "Quranic Sciences"
    },
    {
      title: "The Three Sacred Days in Verse 15",
      query: "Explain verse 15: 'Peace be upon him the day he was born, the day he dies, and the day he is raised alive.'",
      category: "Eschatology"
    }
  ];

  const handleAsk = async (queryText?: string) => {
    const text = (queryText || inputQuery).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const history = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.content,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          conversationHistory: history,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setErrorMsg(data.error);
      } else {
        const assistantMsg: ChatMessage = {
          id: String(Date.now() + 1),
          role: 'assistant',
          content: data.reply,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to communicate with Gemini.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-100 font-cinzel flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>AI Tafsir & Theological Deep Dive</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Inquire deeply about Surah Maryam with classical references, root word analysis, and life lessons powered by Gemini 3.8 Flash.
          </p>
        </div>

        <button
          onClick={() => onOpenLiveVoice("Let's explore the theological depth and linguistic beauty of Surah Maryam together.")}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-xs font-semibold self-start sm:self-auto transition-all shadow-md"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Switch to Live Voice Mode</span>
        </button>
      </div>

      {/* Suggested Topic Cards */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          Select a prominent inquiry to research:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {curatedTopics.map((topic, i) => (
            <button
              key={i}
              onClick={() => handleAsk(topic.query)}
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-left border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400/80 block mb-1">
                  {topic.category}
                </span>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                  {topic.title}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                {topic.query}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-2 text-slate-400">
            <BookOpen className="w-8 h-8 mx-auto text-slate-600 mb-2" />
            <h4 className="font-semibold text-slate-300 text-sm">
              Ask Any Question About Surah Maryam
            </h4>
            <p className="text-xs max-w-md mx-auto text-slate-500">
              Type your query below or pick one of the curated themes above to receive detailed analysis grounded in classical scholarship.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border transition-all ${
                m.role === 'user'
                  ? 'bg-amber-950/20 border-amber-500/30 text-amber-100 ml-8 sm:ml-16'
                  : 'bg-slate-900/80 border-slate-800 text-slate-200 mr-8 sm:mr-16'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-400/90 flex items-center gap-1.5">
                  {m.role === 'user' ? (
                    <>
                      <span>Your Question</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Gemini Quranic Exegesis</span>
                    </>
                  )}
                </span>
                {m.role === 'assistant' && (
                  <button
                    onClick={() => handleCopy(m.id, m.content)}
                    className="p-1 rounded text-slate-400 hover:text-slate-200"
                    title="Copy response"
                  >
                    {copiedId === m.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                {m.content}
              </div>
            </div>
          ))
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 text-slate-400 text-xs animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span>Consulting classical tafsir and linguistic nuances with Gemini...</span>
          </div>
        )}

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Query Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk();
        }}
        className="sticky bottom-4 z-20 flex items-center gap-2 bg-slate-950/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-xl"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask a question about Surah Maryam verses, grammar, or reflections..."
          className="flex-1 bg-slate-900 text-slate-200 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/50"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-medium text-xs rounded-xl transition-all shadow-md"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span className="hidden sm:inline">Explore</span>
        </button>
      </form>
    </div>
  );
};
