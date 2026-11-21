import { create } from 'zustand'

type Theme = 'light' | 'dark'
interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const key = 'id-master-theme'

function getInitialTheme(): Theme {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? 'null')
    return value?.theme === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function save(theme: Theme) {
  try {
    window.localStorage.setItem(key, JSON.stringify({ theme }))
  } catch {
    // A private or restricted browser can still change theme for this visit.
  }
  return { theme }
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () => set((state) => save(state.theme === 'light' ? 'dark' : 'light')),
  setTheme: (theme) => set(save(theme)),
}))
