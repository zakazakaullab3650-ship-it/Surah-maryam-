import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API: Health & Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    liveModel: 'gemini-3.8-live',
    chatModel: 'gemini-3.8-flash',
    ttsModel: 'gemini-3.8-flash-lite-tts',
  });
});

// Helper for resilient Gemini API calls with retry on transient 503/UNAVAILABLE errors
async function generateWithRetry(callFn: () => Promise<any>, maxRetries = 2): Promise<any> {
  let attempts = 0;
  while (attempts <= maxRetries) {
    try {
      return await callFn();
    } catch (err: any) {
      attempts++;
      const errMsg = err?.message || '';
      const isTransient =
        errMsg.includes('503') ||
        errMsg.includes('UNAVAILABLE') ||
        errMsg.includes('high demand') ||
        errMsg.includes('rate limit');
      if (attempts > maxRetries || !isTransient) {
        throw err;
      }
      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
    }
  }
}

// API: Deep Quran Tafsir & Reflections Chat (Gemini 3.8 Flash)
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { prompt, verseNumber, conversationHistory } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in server environment.' });
    }

    const systemInstruction = `You are a reverent, insightful, and eloquent Quranic scholar and teacher specialized in Surah Maryam (Chapter 19) and classical Tafsir (Ibn Kathir, Al-Qurtubi, As-Sa'di, and contemporary linguistic reflections).
When answering:
- Provide authentic Arabic terms, transliterations, and clear English explanations.
- Highlight spiritual wisdom, linguistic nuances (balaghah), and real-life emotional comfort (e.g. patience in du'a, trust in Allah's effortless decree "Huwa 'alayya hayyin").
- Format your response with clear headings, bullet points, and elegant typography.
- If asked about Surah Maryam verses 1-11, emphasize Zakariya's secret prayer, the miraculous birth of Yahya, and the sign of 3 nights silence.`;

    let contents: any[] = [];
    if (conversationHistory && Array.isArray(conversationHistory)) {
      contents = conversationHistory.map((item: any) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }],
      }));
    }

    const currentPromptText = verseNumber
      ? `Regarding Surah Maryam Ayah ${verseNumber}:\n${prompt}`
      : prompt;

    contents.push({
      role: 'user',
      parts: [{ text: currentPromptText }],
    });

    const response = await generateWithRetry(() =>
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      })
    );

    const reply = response.text || 'Unable to generate response.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    let readableError = error.message || 'Error communicating with Gemini.';
    if (readableError.includes('503') || readableError.includes('UNAVAILABLE')) {
      readableError = 'The model is currently handling high demand. Please try asking again in a few moments.';
    }
    res.status(500).json({ error: readableError });
  }
});

// API: Audio Voice Narration / TTS (Gemini 3.8 Flash Lite TTS)
app.post('/api/gemini/tts', async (req, res) => {
  try {
    const { text, voice = 'Kore' } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.slice(0, 800),
              speechMetadata: {
                style: 'Calm, respectful, eloquent spiritual narrator',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio returned from Gemini TTS.' });
    }

    res.json({ audio: base64Audio, mimeType: 'audio/wav' });
  } catch (error: any) {
    console.error('Error in /api/gemini/tts:', error);
    res.status(500).json({ error: error.message || 'TTS generation failed.' });
  }
});

// WebSocket Server for Live API (gemini-3.8-live)
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', async (clientWs: WebSocket, request) => {
  console.log('Client connected to /live WebSocket');

  let session: any = null;
  let isClosed = false;

  // Read voice query param if provided
  let selectedVoice = 'Fenrir';
  try {
    const parsedUrl = new URL(request.url || '', `http://${request.headers.host}`);
    const v = parsedUrl.searchParams.get('voice');
    if (v && ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr', 'Aoede'].includes(v)) {
      selectedVoice = v;
    }
  } catch (e) {
    // fallback default
  }

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } },
        },
        systemInstruction: `You are a wise, warm, and reverent Quranic voice tutor and companion specialized in Surah Maryam (Chapter 19) and the story of Prophet Zakariya (verses 1-11), Yahya, Maryam, and Isa.
- Respond conversationally and warmly using speech.
- If the user asks in English, respond in English with clear Arabic quotations when referencing the Qur'an.
- If the user speaks in Arabic, respond in fluent, eloquent classical or modern standard Arabic.
- Share spiritual insights on Zakariya's quiet prayer (Nida'an Khafiyya), never despairing of answered prayer ("wa lam akun bi-du'a'ika Rabbi shaqiyya"), the divine declaration "Huwa 'alayya hayyin" (It is easy for Me), the sign of 3 nights silence, and the blessed character of Yahya.
- Keep spoken answers concise, thoughtful, and natural for a voice conversation.`,
      },
      callbacks: {
        onmessage: (message: any) => {
          if (isClosed || clientWs.readyState !== WebSocket.OPEN) return;

          // Check for incoming audio
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio) {
            clientWs.send(JSON.stringify({ type: 'audio', audio }));
          }

          // Check for text transcript parts
          const parts = message.serverContent?.modelTurn?.parts;
          if (parts) {
            for (const part of parts) {
              if (part.text) {
                clientWs.send(JSON.stringify({ type: 'text', text: part.text }));
              }
            }
          }

          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ type: 'interrupted', interrupted: true }));
          }

          if (message.serverContent?.turnComplete) {
            clientWs.send(JSON.stringify({ type: 'turnComplete' }));
          }
        },
        onclose: () => {
          if (!isClosed && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'session_closed' }));
          }
        },
        onerror: (err: any) => {
          console.error('Live API Session error:', err);
          if (!isClosed && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'error', error: err?.message || String(err) }));
          }
        },
      },
    });

    clientWs.send(JSON.stringify({ type: 'ready', message: 'Gemini Live session connected.' }));
  } catch (err: any) {
    console.error('Failed to connect to Gemini Live API:', err);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({
        type: 'error',
        error: err?.message || 'Failed to initialize Gemini Live session. Verify your GEMINI_API_KEY in Secrets.'
      }));
    }
    return;
  }

  clientWs.on('message', (rawData) => {
    try {
      const data = JSON.parse(rawData.toString());

      if (data.type === 'audio' && data.audio && session) {
        // Real-time microphone audio: 16kHz mono 16-bit PCM Base64
        session.sendRealtimeInput({
          audio: { data: data.audio, mimeType: 'audio/pcm;rate=16000' },
        });
      } else if (data.type === 'text' && data.text && session) {
        // Real-time user text query inside live session
        session.sendRealtimeInput({
          text: data.text,
        });
      }
    } catch (e) {
      console.error('Error handling WebSocket client message:', e);
    }
  });

  clientWs.on('close', () => {
    isClosed = true;
    try {
      if (session) {
        session.close();
      }
    } catch (e) {
      // ignore
    }
  });
});

// Handle upgrade for WebSocket
server.on('upgrade', (request, socket, head) => {
  const { pathname } = new URL(request.url || '', `http://${request.headers.host}`);
  if (pathname === '/live') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
});

// Mount Vite in dev or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
