import { describe, it, expect, beforeEach } from 'vitest'
import { useThemeStore } from './useThemeStore'

describe('useThemeStore', () => {
  beforeEach(() => {
    // 스토어 상태 초기화
    useThemeStore.setState({
      theme: 'dark',
      themeColor: 'blue',
    })
  })

  it('초기 테마 상태를 반환한다', () => {
    const { theme, themeColor } = useThemeStore.getState()
    expect(theme).toBe('dark')
    expect(themeColor).toBe('blue')
  })

  it('테마를 변경한다', () => {
    const { setTheme } = useThemeStore.getState()
    setTheme('light')
    
    const { theme } = useThemeStore.getState()
    expect(theme).toBe('light')
  })

  it('테마 색상을 변경한다', () => {
    const { setThemeColor } = useThemeStore.getState()
    setThemeColor('green')
    
    const { themeColor } = useThemeStore.getState()
    expect(themeColor).toBe('green')
  })

  it('테마를 토글한다', () => {
    const { toggleTheme, theme: initialTheme } = useThemeStore.getState()
    toggleTheme()
    
    const { theme } = useThemeStore.getState()
    expect(theme).toBe(initialTheme === 'light' ? 'dark' : 'light')
  })

  it('여러 번 토글해도 올바르게 동작한다', () => {
    const { toggleTheme } = useThemeStore.getState()
    
    toggleTheme() // dark -> light
    expect(useThemeStore.getState().theme).toBe('light')
    
    toggleTheme() // light -> dark
    expect(useThemeStore.getState().theme).toBe('dark')
  })
})

