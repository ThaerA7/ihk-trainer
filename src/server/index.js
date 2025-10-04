// server/index.js
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import OpenAI from 'openai';

const {
  OPENAI_API_KEY,
  OPENAI_MODEL = 'gpt-5', // override in prod if you like
  ALLOWED_ORIGINS = '',          // comma-separated list, e.g. "https://your-site.com,http://localhost:5173"
  PORT = 5173,
  NODE_ENV = 'development'
} = process.env;

if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY. Set it in your environment, not in the repo.');
  process.exit(1);
}

const app = express();
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// --- Security middleware ---
app.use(helmet());                              // sensible security headers
app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));       // small body limit (adjust if needed)

// Strict CORS allowlist (browser-enforced)
const allowlist = new Set(
  ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
);
app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin/no-origin (mobile apps, curl) only in dev
      if (!origin) return cb(null, NODE_ENV !== 'production');
      return cb(null, allowlist.has(origin));
    },
    credentials: true
  })
);

// Basic IP rate limit to keep freeloaders + bots away
// (Use a Redis store if you scale this beyond one instance.)
const limiter = rateLimit({
  windowMs: 60_000, // 1 min
  max: 30,          // 30 requests/min per IP
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Double-submit CSRF token: only your site can get/set this cookie (SameSite=Strict).
app.get('/api/csrf', (req, res) => {
  const token = crypto.randomBytes(24).toString('base64url');
  res.cookie('csrf', token, {
    httpOnly: false,                 // must be readable by JS to echo in header
    sameSite: 'strict',              // blocks cross-site sends
    secure: NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 8       // 8h
  });
  res.status(204).end();
});

// Helper: verify CSRF header matches cookie
function requireCsrf(req, res, next) {
  const header = req.get('x-csrf-token');
  const cookie = req.cookies?.csrf;
  if (!header || !cookie || header !== cookie) {
    return res.status(403).json({ error: 'Forbidden (bad CSRF)' });
  }
  next();
}

// Optional: hard-block unexpected non-browser callers in prod
function requireAllowedOriginHeader(req, res, next) {
  if (NODE_ENV !== 'production') return next();
  const origin = req.get('origin');
  if (!origin || !allowlist.has(origin)) {
    return res.status(403).json({ error: 'Forbidden (origin)' });
  }
  next();
}

// Chat endpoint with streamed response (fetch-readable on the client)
app.post('/api/chat', requireAllowedOriginHeader, requireCsrf, async (req, res) => {
  try {
    // Minimal validation
    const msgs = (Array.isArray(req.body?.messages) ? req.body.messages : [])
      .slice(-30) // keep context sane
      .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: String(m.text || '').slice(0, 4000) }));

    if (msgs.length === 0) {
      return res.status(400).json({ error: 'messages[] required' });
    }

    // Set up chunked response
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8'); // we'll send SSE-style "data:" lines
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    // Keep-alive comment to prevent timeouts
    const keepAlive = setInterval(() => res.write(': ping\n\n'), 15000);

    // System prompt to keep your brand voice
    const system = { role: 'system', content: 'You are a concise, friendly AI Tutor.' };

    // Use Chat Completions with streaming (simple & stable)
    const stream = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      stream: true,
      temperature: 0.3,
      messages: [system, ...msgs]
    });

    for await (const chunk of stream) {
      const delta = chunk?.choices?.[0]?.delta?.content;
      if (delta) {
        // SSE frame (client will parse the `data:` lines)
        res.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }
    }

    clearInterval(keepAlive);
    res.write('event: done\ndata: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('chat error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'server_error' });
    } else {
      res.end();
    }
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
