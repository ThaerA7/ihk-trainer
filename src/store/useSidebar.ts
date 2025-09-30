import { create } from 'zustand';

type SidebarState = {
  collapsed: boolean;
  toggle: () => void;
  set: (v: boolean) => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  collapsed: false,
  toggle: () => set((s) => {
    const next = !s.collapsed;
    localStorage.setItem('sidebarCollapsed', String(next));
    return { collapsed: next };
  }),
  set: (v) => {
    localStorage.setItem('sidebarCollapsed', String(v));
    set({ collapsed: v });
  },
}));
