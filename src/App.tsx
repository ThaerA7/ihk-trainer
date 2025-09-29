import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Header from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </main>
    </div>
  );
}
