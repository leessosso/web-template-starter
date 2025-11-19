import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from './useAppStore'

describe('useAppStore', () => {
  beforeEach(() => {
    // 스토어 상태 초기화
    useAppStore.setState({
      isLoading: false,
      error: null,
    })
  })

  it('초기 상태를 반환한다', () => {
    const { isLoading, error } = useAppStore.getState()
    expect(isLoading).toBe(false)
    expect(error).toBe(null)
  })

  it('로딩 상태를 설정한다', () => {
    const { setLoading } = useAppStore.getState()
    setLoading(true)
    
    const { isLoading } = useAppStore.getState()
    expect(isLoading).toBe(true)
  })

  it('에러를 설정한다', () => {
    const { setError } = useAppStore.getState()
    setError('에러 발생')
    
    const { error } = useAppStore.getState()
    expect(error).toBe('에러 발생')
  })

  it('에러를 제거한다', () => {
    const { setError, clearError } = useAppStore.getState()
    setError('에러 발생')
    clearError()
    
    const { error } = useAppStore.getState()
    expect(error).toBe(null)
  })
})

