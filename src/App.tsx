import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Subjects from './pages/Subjects.tsx';
import Placeholder from './pages/Placeholder.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Let the sidebar width drive the layout */}
      <div className="grid min-h-screen grid-cols-[auto_1fr]">
        <Sidebar />
        <main className="px-4 py-6 sm:px-8">
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
