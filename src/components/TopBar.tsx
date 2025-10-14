// TopBar.tsx
import { Link, useLocation } from 'react-router-dom';

const SIDEBAR_GRADIENT = 'bg-zinc-950';

const ROUTE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/it-grundlagen': 'IT-Hardware, Energie und Grundlagen',
  '/netzwerke': 'Netzwerke und Internettechnologien',
  '/it-grundlagen/information-und-grundbegriffe':
    'Information und Grundbegriffe',
  '/it-grundlagen/computer-architektur-und-komponenten':
    'Computer Architektur und Komponenten',
  '/it-grundlagen/pc-arbeitsplatz-anforderungen-barrierefreiheit':
    'PC-Arbeitsplatz, Anforderungen, Barrierefreiheit',
  '/it-grundlagen/zahlensysteme': 'Zahlensysteme',
  '/it-grundlagen/elektrische-grundgroessen': 'Elektrische Grundgrößen',
  '/it-grundlagen/usv-ups': 'USV – Unterbrechungsfreie Stromversorgung (UPS)',
  '/it-grundlagen/backup-raid': 'Backup & RAID',
  '/it-grundlagen/green-it': 'Green IT – Design – Nutzung – Entsorgung',
  '/netzwerke/topologien':
    'Netzwerk-Topologien – Selbststudium, Aufgaben, Hinweisen',
  '/netzwerke/osi-1-2': 'OSI-Schichten 1 und 2 (Ethernet-Frame, Switching)',
  '/netzwerke/verkabelung':
    'Strukturierte Verkabelung – Selbststudium, Aufgaben',
  '/netzwerke/osi-3': 'OSI-Schicht 3 – Vermittlungsschicht (Routing)',
  '/netzwerke/wan-dsl': 'WAN und DSL – Selbststudium',
  '/netzwerke/ipv4': 'IPv4 – Subnetting, Konfigurationsmethoden, DHCPv4',
  '/netzwerke/ipv6': 'IPv6 – Subnetting, Konfiguration, DHCPv6/SLAAC',
  '/netzwerke/osi-4-7': 'OSI-Schicht 4 – TCP/UDP/QUIC, Sockets, Schichten 5–7',
  '/netzwerke/voip': 'VoIP – Selbststudium',
  '/netzwerke/wlan': 'WLAN – Drahtlose Netzwerke verstehen und einrichten',
  '/netzwerke/mobilfunk': 'Mobilfunk – Selbststudium',
  '/netzwerke/verschluesselung-vpn':
    'Verschlüsselung (digitale Signatur) & VPN (IPsec)',
};

function humanize(segment: string) {
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildBreadcrumb(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const paths: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    paths.push('/' + parts.slice(0, i + 1).join('/'));
  }
  const all = ['/', ...paths.filter((p) => p !== '/')];
  return all.map((p) => ({
    to: p,
    label: ROUTE_LABELS[p] ?? humanize(p.split('/').slice(-1)[0] || ''),
  }));
}

export default function TopBar() {
  const { pathname } = useLocation();
  const crumbs = buildBreadcrumb(pathname);
  const title =
    ROUTE_LABELS[pathname] ??
    (crumbs.length ? crumbs[crumbs.length - 1].label : 'Home');

  // Only show breadcrumb when there is real hierarchy (root + at least two segments)
  const showBreadcrumb = crumbs.length >= 3;

  return (
    <header
      className={`${SIDEBAR_GRADIENT} text-white border-b border-white/15`}
    >
      <div className="px-4 py-3 sm:px-8">
        {showBreadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-1">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-white/70">
              {crumbs.map((c, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                  <li key={c.to} className="flex items-center gap-1">
                    {!isLast ? (
                      <Link
                        to={c.to}
                        className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded"
                      >
                        {c.label || 'Home'}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-white/90">
                        {c.label || 'Home'}
                      </span>
                    )}
                    {!isLast && <span aria-hidden>›</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <h1 className="text-lg font-semibold tracking-tight">
          {title || 'Home'}
        </h1>
      </div>
    </header>
  );
}
