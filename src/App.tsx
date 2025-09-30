// App.tsx
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Subjects from './pages/Subjects';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-zinc-950 via-slate-900 to-neutral-950">
      {/* Two columns (sidebar | main), two rows (topbar | content) */}
      <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
        {/* Sidebar spans the full height */}
        <div className="row-span-2">
          <Sidebar />
        </div>

        {/* Top bar: same gradient as sidebar, edge-to-edge in the main column */}
        <div className="col-start-2 row-start-1">
          <TopBar />
        </div>

        {/* Main content area */}
        <main className="col-start-2 row-start-2 px-4 py-6 sm:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/placeholder-3" element={<Placeholder title="Placeholder 3" />} />
            <Route path="/placeholder-4" element={<Placeholder title="Placeholder 4" />} />
            <Route path="/placeholder-5" element={<Placeholder title="Placeholder 5" />} />
            <Route path="/placeholder-6" element={<Placeholder title="Placeholder 6" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
