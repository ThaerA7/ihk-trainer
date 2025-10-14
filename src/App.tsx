// App.tsx
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ChatSidebar from './components/ChatSidebar';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Subjects from './pages/Subjects';
import Placeholder from './pages/Placeholder';
import InformationUndGrundbegriffe from './pages/it-grundlagen/InformationUndGrundbegriffe.tsx';

export default function App() {
  return (
    <div className="min-h-screen text-white bg-zinc-900">
      {/* Three columns (left | main | right), two rows (topbar | content) */}
      <div className="grid min-h-screen grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr]">
        {/* Left sidebar spans full height */}
        <div className="row-span-2">
          <Sidebar />
        </div>

        {/* TopBar only in the middle column so it touches both sidebars */}
        <div className="col-start-2 row-start-1">
          <TopBar />
        </div>

        {/* Main content */}
        <main className="col-start-2 row-start-2 px-4 py-6 sm:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/subjects" element={<Subjects />} />

            {/* NEW: catch-all placeholders for the two large sections */}
            <Route
              path="/it-grundlagen/information-und-grundbegriffe"
              element={<InformationUndGrundbegriffe />}
            />

            <Route
              path="/netzwerke/*"
              element={
                <Placeholder title="Netzwerke und Internettechnologien" />
              }
            />

            <Route
              path="/placeholder-3"
              element={<Placeholder title="Placeholder 3" />}
            />
            <Route
              path="/placeholder-4"
              element={<Placeholder title="Placeholder 4" />}
            />
            <Route
              path="/placeholder-5"
              element={<Placeholder title="Placeholder 5" />}
            />
            <Route
              path="/placeholder-6"
              element={<Placeholder title="Placeholder 6" />}
            />
          </Routes>
        </main>

        {/* Right chat sidebar now spans full height */}
        <div className="col-start-3 row-start-1 row-span-2">
          <ChatSidebar />
        </div>
      </div>
    </div>
  );
}
