import { NavLink, useNavigate } from 'react-router-dom';
import { useSearch } from '../store/useSearch';
import { useCallback } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const { query, setQuery } = useSearch();

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/practice');
  }, [navigate]);

  const linkBase =
    'block w-full rounded-lg px-3 py-2 text-left text-sm font-medium border transition hover:bg-white/10 active:scale-[0.99]';
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? 'border-white/30 bg-white/15' : 'border-white/15'} text-white`;

  return (
    <aside className="min-h-screen border-r border-white/10 bg-gradient-to-b from-gray-900 via-indigo-900 to-slate-900 p-4 text-white sm:p-6">
      {/* Logo centered */}
      <div className="mb-5 flex items-center justify-center">
        <img
          src="/IHK_Trainer.png"
          alt="IHK Trainer logo"
          className="h-14 w-auto sm:h-16"
        />
      </div>

      {/* Search */}
      <form onSubmit={onSubmit} className="relative mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions, topics..."
          className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 pr-9 text-sm text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Search"
          type="search"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <button type="submit" className="hidden" />
      </form>

      {/* Tabs / Links */}
      <nav className="grid gap-2">
        <NavLink to="/practice" className={linkClass}>Practice</NavLink>
        <NavLink to="/subjects" className={linkClass}>Subjects</NavLink>
        <NavLink to="/placeholder-3" className={linkClass}>Placeholder 3</NavLink>
        <NavLink to="/placeholder-4" className={linkClass}>Placeholder 4</NavLink>
        <NavLink to="/placeholder-5" className={linkClass}>Placeholder 5</NavLink>
        <NavLink to="/placeholder-6" className={linkClass}>Placeholder 6</NavLink>
      </nav>
    </aside>
  );
}