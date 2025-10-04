// components/ChatSidebar.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const SIDEBAR_GRADIENT = 'bg-zinc-950';
type Msg = { id: string; role: 'user' | 'assistant'; text: string };

// --- NEW: tiny cookie getter for CSRF double-submit ---
function getCookie(name: string) {
  const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return m ? decodeURIComponent(m.pop() as string) : '';
}

export default function ChatSidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([
    { id: 'm1', role: 'assistant', text: 'Hi! I’m your AI Tutor. How can I help?' },
  ]);
  const [loading, setLoading] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatCollapsed');
    if (saved != null) setCollapsed(saved === 'true');
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem('chatCollapsed', String(collapsed));
  }, [collapsed]);

  // --- NEW: fetch CSRF token cookie once (SameSite=Strict) ---
  useEffect(() => {
    fetch('/api/csrf', { credentials: 'include' }).catch(() => {});
  }, []);

  const toggle = useCallback(() => setCollapsed((c) => !c), []);
  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  // --- NEW: streaming helper (SSE-style frames over fetch) ---
  const streamChat = useCallback(async (allMsgs: Msg[], onDelta: (d: string) => void) => {
    const csrf = getCookie('csrf');
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrf
      },
      credentials: 'include',
      body: JSON.stringify({ messages: allMsgs })
    });

    if (!res.ok || !res.body) {
      throw new Error(`Chat failed (${res.status})`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Parse SSE frames: lines like "data: {...}\n\n"
      let idx;
      while ((idx = buffer.indexOf('\n\n')) !== -1) {
        const frame = buffer.slice(0, idx).trim();
        buffer = buffer.slice(idx + 2);

        if (frame.startsWith(':')) continue; // comment/keepalive
        if (frame.startsWith('event: done')) return; // server signals end

        if (frame.startsWith('data:')) {
          try {
            const { delta } = JSON.parse(frame.slice(5).trim());
            if (delta) onDelta(delta);
          } catch {
            // ignore parse errors for partial frames
          }
        }
      }
    }
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!canSend) return;
      const text = input.trim();
      const id = crypto.randomUUID();
      setMessages((m) => [...m, { id, role: 'user', text }]);
      setInput('');
      setLoading(true);

      // create a placeholder assistant message and stream into it
      const replyId = crypto.randomUUID();
      setMessages((m) => [...m, { id: replyId, role: 'assistant', text: '' }]);

      try {
        await streamChat(
          // send the latest messages including the new user one
          [...messages, { id, role: 'user', text }],
          (delta) => {
            setMessages((m) =>
              m.map((msg) => (msg.id === replyId ? { ...msg, text: msg.text + delta } : msg))
            );
          }
        );
      } catch (err: any) {
        setMessages((m) =>
          m.map((msg) =>
            msg.id === replyId
              ? { ...msg, text: 'Sorry—something went wrong. Please try again.' }
              : msg
          )
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [canSend, input, messages, streamChat]
  );

  const Chevron = ({ dir = 'left' as 'left' | 'right' }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, collapsed]);

  return (
    <aside
      className={[
        'relative min-h-screen text-white',
        SIDEBAR_GRADIENT,
        'border-l border-white/15',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-8' : 'w-80 sm:w-96',
      ].join(' ')}
      aria-label="Chat sidebar"
    >
      {/* Toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? 'Open chat' : 'Close chat'}
        aria-expanded={!collapsed}
        className={[
          'absolute z-10 grid place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur',
          'transition hover:bg-white/20',
          collapsed ? 'inset-y-0 my-auto left-1 h-6 w-6' : 'left-3 top-3 h-9 w-9',
        ].join(' ')}
      >
        {collapsed ? <Chevron dir="left" /> : <Chevron dir="right" />}
      </button>

      {!collapsed && (
        <div className="flex h-full flex-col p-3 sm:p-4">
          <header className="mb-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-white/10 grid place-items-center border border-white/15">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <h2 className="text-base font-semibold tracking-tight">AI Tutor</h2>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-auto rounded-xl border border-white/15 bg-white/5 p-3 space-y-3"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={[
                  'max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed',
                  m.role === 'assistant'
                    ? 'bg-white/10 border border-white/15'
                    : 'ml-auto bg-indigo-500/20 border border-indigo-300/20',
                ].join(' ')}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="mt-3">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                placeholder="Ask anything about practice, subjects, or tasks…"
                className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2 pr-10 text-sm text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={!canSend}
                className={[
                  'absolute bottom-2 right-2 rounded-lg px-3 py-1 text-sm font-medium',
                  'border border-white/20 bg-white/10 hover:bg-white/20 transition',
                  canSend ? 'opacity-100' : 'opacity-50 cursor-not-allowed',
                ].join(' ')}
              >
                {loading ? '…' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      )}
    </aside>
  );
}
