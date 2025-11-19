import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('클래스명을 병합한다', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('중복된 클래스를 제거한다', () => {
    expect(cn('foo', 'foo')).toBe('foo')
  })

  it('조건부 클래스를 처리한다', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
    expect(cn('foo', true && 'bar')).toBe('foo bar')
  })

  it('Tailwind 클래스 충돌을 해결한다', () => {
    // tailwind-merge가 동일한 유틸리티의 다른 값들을 병합
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('빈 값들을 무시한다', () => {
    expect(cn('foo', '', null, undefined, false)).toBe('foo')
  })
})

