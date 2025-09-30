import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useSidebar } from '../store/useSidebar';

export default function Layout() {
  const { collapsed } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main
        className={[
          'flex-1',
          'transition-[padding] duration-300',
          collapsed ? 'px-4 sm:px-6' : 'px-6 sm:px-10',
        ].join(' ')}
      >
        <div className="mx-auto max-w-5xl py-6 sm:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
