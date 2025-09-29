import { useState } from "react";

/**
 * Minimal, dependency-free header:
 * - Left: hamburger (side menu) + "IHK Trainer"
 * - Middle: search input
 * - Right: refresh button
 */
export default function Navbar({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
  };

  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        {/* Side menu / hamburger */}
        <button
          type="button"
          aria-label="Menü öffnen"
          className="rounded-xl border p-2 hover:bg-gray-50 active:scale-[0.98]"
          // TODO: hook this to your drawer/side menu
          onClick={() => console.log("open side menu")}
        >
          {/* hamburger icon (no external lib) */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Brand */}
        <span className="select-none text-lg font-semibold tracking-tight">
          IHK Trainer
        </span>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchen…"
            className="w-full rounded-xl border px-10 py-2 outline-none ring-0 placeholder:text-gray-400 focus:border-gray-400"
            aria-label="Suche"
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            {/* search icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {/* invisible submit so Enter works */}
          <button type="submit" className="hidden" />
        </form>

        {/* Refresh */}
        <button
          type="button"
          title="Seite neu laden"
          aria-label="Seite neu laden"
          onClick={() => window.location.reload()}
          className="ml-3 rounded-xl border p-2 hover:bg-gray-50 active:scale-[0.98]"
        >
          {/* refresh icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 11a8 8 0 10-2.34 5.66M20 4v7h-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
