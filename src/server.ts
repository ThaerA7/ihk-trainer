// server.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { randomBytes } from 'crypto';
import fetch from 'node-fetch';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ---- CSRF endpoint (readable cookie for your getCookie()) ----
app.get('/api/csrf', (req, res) => {
  const token = randomBytes(16).toString('hex');
  // NOTE: httpOnly must be FALSE so your front-end can read it via document.cookie
  res.cookie('csrf', token, {
    sameSite: 'strict',
    secure: false, // set true if serving over HTTPS
    httpOnly: false, // IMPORTANT: your code reads it from document.cookie
    maxAge: 1000 * 60 * 60 * 6, // 6h
    path: '/',
  });
  res.sendStatus(204);
});

// ---- Chat streaming endpoint -> proxies to Ollama and converts to SSE-ish frames ----
app.post('/api/chat', async (req, res) => {
  try {
    // Very basic CSRF double-submit check
    const headerToken = req.headers['x-csrf-token'];
    const cookieToken = req.cookies?.csrf;
    if (!headerToken || headerToken !== cookieToken) {
      return res.status(403).json({ error: 'Bad CSRF token' });
    }

    const incoming = req.body?.messages ?? [];
    // Map your front-end messages -> Ollama chat format
    const ollamaMessages = incoming.map((m: any) => ({
      role: m.role, // 'user' | 'assistant'
      content: m.text,
    }));

    // Prepare streaming response headers for the browser
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    // Call Ollama with stream:true
    const ollamaRes = await fetch('http://127.0.0.1:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.1:8b',
        stream: true,
        messages: ollamaMessages,
        options: {
          temperature: 0.7,
        },
      }),
    });

    if (!ollamaRes.ok || !ollamaRes.body) {
      res.status(500).end();
      return;
    }

    // Ollama streams NDJSON lines like:
    // { "message": {"role":"assistant","content":"..."}, "done": false }
    // We convert to your SSE frames:
    //   data: {"delta":"..."}\n\n
    const reader = ollamaRes.body.getReader();
    const decoder = new TextDecoder();

    let partial = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      partial += decoder.decode(value, { stream: true });
      // Split on newlines for NDJSON
      let idx: number;
      while ((idx = partial.indexOf('\n')) !== -1) {
        const line = partial.slice(0, idx).trim();
        partial = partial.slice(idx + 1);
        if (!line) continue;

        try {
          const json = JSON.parse(line);
          if (json.message?.content) {
            const chunk: string = json.message.content;
            // emit in your front-end format
            res.write(`data: ${JSON.stringify({ delta: chunk })}\n\n`);
          }
          if (json.done) {
            res.write('event: done\n\n');
            res.end();
          }
        } catch {
          // ignore broken/partial lines
        }
      }
    }
  } catch (e) {
    console.error(e);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Upstream error' });
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server on http://localhost:${PORT}`);
});
