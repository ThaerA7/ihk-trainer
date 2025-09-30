// TopBar.tsx
import { useLocation } from 'react-router-dom';

const TITLES: Record<string, string> = {
  '/': 'Home',
  '/practice': 'Practice',
  '/subjects': 'Subjects',
  '/placeholder-3': 'Placeholder 3',
  '/placeholder-4': 'Placeholder 4',
  '/placeholder-5': 'Placeholder 5',
  '/placeholder-6': 'Placeholder 6',
};

// If your Sidebar uses a different gradient, copy those exact classes here:
const SIDEBAR_GRADIENT = 'bg-zinc-950';

export default function TopBar() {
  const { pathname } = useLocation();
  const fallback =
    pathname
      .replace(/^\//, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Home';
  const title = TITLES[pathname] ?? fallback;

  return (
    <header className={`${SIDEBAR_GRADIENT} text-white border-b border-white/15`}>
      {/* padding inside, but the bar itself touches the container edges */}
      <div className="px-4 py-3 sm:px-8">
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
    </header>
  );
}
