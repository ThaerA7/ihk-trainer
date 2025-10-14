// Sidebar.tsx
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearch } from '../store/useSearch';
import { useSidebar } from '../store/useSidebar';

type NavItem = { label: string; to: string };
type NavSection = { id: string; label: string; children: NavItem[] };

const SECTIONS: NavSection[] = [
  {
    id: 'it',
    label: 'IT-Hardware, Energie und Grundlagen',
    children: [
      { label: 'Information und Grundbegriffe', to: '/it-grundlagen/information-und-grundbegriffe' },
      { label: 'Computer Architektur und Komponenten', to: '/it-grundlagen/computer-architektur-und-komponenten' },
      { label: 'PC-Arbeitsplatz, Anforderungen, Barrierefreiheit', to: '/it-grundlagen/pc-arbeitsplatz-anforderungen-barrierefreiheit' },
      { label: 'Zahlensysteme', to: '/it-grundlagen/zahlensysteme' },
      { label: 'Elektrische Grundgrößen', to: '/it-grundlagen/elektrische-grundgroessen' },
      { label: 'USV – Unterbrechungsfreie Stromversorgung (UPS)', to: '/it-grundlagen/usv-ups' },
      { label: 'Backup & RAID', to: '/it-grundlagen/backup-raid' },
      { label: 'Green IT – Design – Nutzung – Entsorgung', to: '/it-grundlagen/green-it' },
    ],
  },
  {
    id: 'netz',
    label: 'Netzwerke und Internettechnologien',
    children: [
      { label: 'Netzwerk-Topologien – Selbststudium, Aufgaben, Hinweisen', to: '/netzwerke/topologien' },
      { label: 'OSI-Schichten 1 und 2 (Ethernet-Frame, Switching)', to: '/netzwerke/osi-1-2' },
      { label: 'Strukturierte Verkabelung – Selbststudium, Aufgaben', to: '/netzwerke/verkabelung' },
      { label: 'OSI-Schicht 3 – Vermittlungsschicht (Routing)', to: '/netzwerke/osi-3' },
      { label: 'WAN und DSL – Selbststudium', to: '/netzwerke/wan-dsl' },
      { label: 'IPv4 – Subnetting, Konfigurationsmethoden, DHCPv4', to: '/netzwerke/ipv4' },
      { label: 'IPv6 – Subnetting, Konfiguration, DHCPv6/SLAAC', to: '/netzwerke/ipv6' },
      { label: 'OSI-Schicht 4 – TCP/UDP/QUIC, Sockets, Schichten 5–7', to: '/netzwerke/osi-4-7' },
      { label: 'VoIP – Selbststudium', to: '/netzwerke/voip' },
      { label: 'WLAN – Drahtlose Netzwerke verstehen und einrichten', to: '/netzwerke/wlan' },
      { label: 'Mobilfunk – Selbststudium', to: '/netzwerke/mobilfunk' },
      { label: 'Verschlüsselung (digitale Signatur) & VPN (IPsec)', to: '/netzwerke/verschluesselung-vpn' },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setQuery } = useSearch();
  const { collapsed, toggle, set } = useSidebar();

  // persist collapse state to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved != null) set(saved === 'true');
  }, [set]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(collapsed));
  }, [collapsed]);

  // Which sections are open (persist to localStorage)
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('sidebarOpenSections');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpenSections', JSON.stringify(open));
  }, [open]);

  // Auto-open the section that matches the current route
  useEffect(() => {
    for (const sec of SECTIONS) {
      if (sec.children.some((c) => location.pathname.startsWith(c.to))) {
        setOpen((prev) => ({ ...prev, [sec.id]: true }));
      }
    }
  }, [location.pathname]);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/practice');
  }, [navigate]);

  const linkBase =
    'block w-full rounded-lg px-3 py-2 text-left text-sm font-medium border transition hover:bg-white/10 active:scale-[0.99]';
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? 'border-white/30 bg-white/15' : 'border-white/15'} text-white`;

  const Chevron = ({ dir = 'left' as 'left' | 'right' }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'}
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );

  const Caret = ({ rotated = false }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden
      className={`transition-transform ${rotated ? 'rotate-90' : ''}`}
    >
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );

  // Build all sublinks to memoize active checking
  const allChildLinks = useMemo(
    () => SECTIONS.flatMap((s) => s.children.map((c) => c.to)),
    []
  );

  return (
    <aside
      className={[
        'relative min-h-screen text-white',
        'bg-zinc-950',
        'border-r border-white/15',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-8' : 'w-64 sm:w-72',
      ].join(' ')}
    >
      {/* Toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? 'Open sidebar' : 'Close sidebar'}
        aria-expanded={!collapsed}
        className={[
          'absolute z-10 grid place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur',
          'transition hover:bg-white/20',
          collapsed ? 'inset-y-0 my-auto right-1 h-6 w-6' : 'right-3 top-3 h-9 w-9',
        ].join(' ')}
      >
        {collapsed ? <Chevron dir="right" /> : <Chevron dir="left" />}
      </button>

      {/* Content hidden when collapsed */}
      {!collapsed && (
        <div className="p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-center">
            <img src="/IHK_Trainer.png" alt="IHK Trainer logo" className="h-14 w-auto sm:h-16" />
          </div>

          {/* Search keeps your existing behavior */}
          <form onSubmit={onSubmit} className="relative mb-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, topics..."
              className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 pr-9 text-sm text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Search" type="search"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <button type="submit" className="hidden" />
          </form>

          {/* === NAV === */}
          <nav className="grid gap-2">
            {/* Home */}
            <NavLink to="/" className={linkClass}>Home</NavLink>

            {/* Sections */}
            {SECTIONS.map((section) => {
              const isOpen = !!open[section.id];

              return (
                <div key={section.id} className="rounded-lg border border-white/15">
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-white hover:bg-white/10"
                    aria-expanded={isOpen}
                    aria-controls={`section-${section.id}`}
                    onClick={() => setOpen((prev) => ({ ...prev, [section.id]: !prev[section.id] }))}
                  >
                    <span>{section.label}</span>
                    <Caret rotated={isOpen} />
                  </button>

                  {/* Sub-items */}
                  <div
                    id={`section-${section.id}`}
                    hidden={!isOpen}
                    className="px-2 pb-2"
                  >
                    <ul className="space-y-1">
                      {section.children.map((item) => (
                        <li key={item.to}>
                          <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                              [
                                'block rounded-md px-3 py-2 text-sm',
                                'border transition hover:bg-white/10',
                                isActive || location.pathname.startsWith(item.to)
                                  ? 'bg-white/15 border-white/30 text-white'
                                  : 'border-white/15 text-white/90',
                                'pl-6', // indent "sub button"
                              ].join(' ')
                            }
                          >
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </aside>
  );
}
