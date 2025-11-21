import { create } from 'zustand'

interface ThemeStore {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

// Initialize theme from localStorage or default to dark
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('id-master-theme')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return parsed.theme || 'dark'
      } catch {
        return 'dark'
      }
    }
  }
  return 'dark'
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(newTheme)
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('id-master-theme', JSON.stringify({ theme: newTheme }))
      }
      return { theme: newTheme }
    }),
  setTheme: (theme) => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('id-master-theme', JSON.stringify({ theme }))
    }
    set({ theme })
  },
}))
