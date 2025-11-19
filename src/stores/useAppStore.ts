import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AppState {
  isLoading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      isLoading: false,
      error: null,
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'app-store',
    }
  )
)

