import { create } from 'zustand';

export const useNexusStore = create((set) => ({
  // Core status
  isLoaded: false,
  setLoaded: (val) => set({ isLoaded: val }),

  // Cursor state
  cursorVariant: 'default', // 'default' | 'hover' | 'drag' | 'text' | 'hidden'
  cursorText: '',
  setCursor: (variant, text = '') => set({ cursorVariant: variant, cursorText: text }),

  // Navigation & Sections
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),

  // Global scroll normalized progress (0 to 1)
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  // 3D Scene Interactive Parameters
  distortion: 0.8,
  viscosity: 1.2,
  wireframe: false,
  coreColor: '#00f0ff',
  setDistortion: (val) => set({ distortion: val }),
  setViscosity: (val) => set({ viscosity: val }),
  setWireframe: (val) => set({ wireframe: val }),
  setCoreColor: (val) => set({ coreColor: val }),

  // Audio mute/unmute status
  soundEnabled: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));

