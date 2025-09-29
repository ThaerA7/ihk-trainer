import { Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Practice from './pages/Practice';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 flex gap-4">
          <NavLink to="/" className="font-semibold">IHK Trainer</NavLink>
          <NavLink to="/practice" className={({isActive}) => isActive ? 'underline' : ''}>
            Practice
          </NavLink>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </main>
    </div>
  );
}
