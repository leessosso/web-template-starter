import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'
type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'emerald' | 'red' | 'indigo'

interface ThemeState {
  theme: Theme
  themeColor: ThemeColor
  setTheme: (theme: Theme) => void
  setThemeColor: (color: ThemeColor) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      themeColor: 'blue',
      setTheme: (theme) => set({ theme }),
      setThemeColor: (themeColor) => set({ themeColor }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage',
    }
  )
)

