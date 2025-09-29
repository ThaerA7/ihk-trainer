// import { NavLink, useNavigate } from 'react-router-dom';
// import { Menu, RefreshCw, Search as SearchIcon } from 'lucide-react';
// import { useSearch } from '../store/useSearch.ts';
// import { useCallback } from 'react';

// export default function Header() {
//   const navigate = useNavigate();
//   const { query, setQuery } = useSearch();

//   const onSubmit = useCallback(
//     (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       // Route to Practice so search feels useful immediately
//       navigate('/practice');
//     },
//     [navigate]
//   );

//   const onRefresh = useCallback(() => {
//     // Full page refresh
//     window.location.reload();
//   }, []);

//   return (
//     <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-gray-900 via-indigo-900 to-slate-900 text-white shadow-sm">
//       <nav className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
//         {/* Left: menu icon + brand */}
//         <button
//           type="button"
//           aria-label="Open menu"
//           className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 hover:bg-white/10 active:bg-white/15"
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         <NavLink to="/" className="text-base font-semibold tracking-tight hover:opacity-90">
//           IHK Trainer
//         </NavLink>

//         {/* Middle: primary links */}
//         <div className="flex items-center gap-3">
//           <NavLink
//             to="/practice"
//             className={({ isActive }) =>
//               `rounded-lg px-2 py-1 text-sm ${
//                 isActive ? 'underline underline-offset-4' : 'opacity-90 hover:opacity-100'
//               }`
//             }
//           >
//             Practice
//           </NavLink>
//         </div>

//         {/* Spacer */}
//         <div className="flex-1" />

//         {/* Right: search + refresh */}
//         <form onSubmit={onSubmit} className="relative hidden min-w-[220px] items-center sm:flex">
//           <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" />
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search questions, topics..."
//             className="h-9 w-full rounded-lg border border-white/20 bg-white/10 pl-9 pr-3 text-sm placeholder-white/60 outline-none transition focus:ring-2 focus:ring-white/30"
//           />
//         </form>

//         <button
//           type="button"
//           onClick={onRefresh}
//           className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/15 active:bg-white/20"
//         >
//           <RefreshCw className="h-4 w-4" />
//           <span>Refresh</span>
//         </button>
//       </nav>
//     </header>
//   );
// }