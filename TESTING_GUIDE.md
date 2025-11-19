# 테스트 가이드

이 프로젝트는 **Vitest**와 **React Testing Library**를 사용하여 테스트를 작성합니다.

## 📚 목차

- [테스트 환경 설정](#테스트-환경-설정)
- [테스트 실행](#테스트-실행)
- [TDD (Test Driven Development)](#tdd-test-driven-development)
- [테스트 작성 가이드](#테스트-작성-가이드)
- [테스트 예시](#테스트-예시)
- [모범 사례](#모범-사례)

## 테스트 환경 설정

### 설치된 패키지

- **Vitest**: Vite 기반의 빠른 테스트 러너
- **React Testing Library**: 컴포넌트 테스트 유틸리티
- **@testing-library/jest-dom**: DOM 매처 확장
- **@testing-library/user-event**: 사용자 이벤트 시뮬레이션
- **jsdom**: 브라우저 환경 시뮬레이션

### 설정 파일

- `vite.config.ts`: Vitest 설정 포함
- `src/test/setup.ts`: 테스트 환경 초기화
- `src/test/test-utils.tsx`: 커스텀 렌더 유틸리티

## 테스트 실행

### 기본 명령어

```bash
# Watch 모드로 테스트 실행 (개발 중 권장)
npm test

# 테스트 UI 실행 (브라우저에서 테스트 실행)
npm run test:ui

# 커버리지 확인
npm run test:coverage

# 테스트 한 번만 실행 (CI/CD용)
npm run test:run
```

### 특정 파일만 테스트

```bash
# 특정 파일만 실행
npm test Button.test.tsx

# 패턴 매칭
npm test -- Button
```

## TDD (Test Driven Development)

이 프로젝트는 **TDD**를 완전히 지원합니다. Vitest의 Watch 모드를 활용하여 빠른 피드백 루프를 제공합니다.

### TDD란?

**Test Driven Development**는 테스트를 먼저 작성하고, 그 테스트를 통과하는 최소한의 코드를 작성한 후, 리팩토링하는 개발 방법론입니다.

### TDD 사이클: Red → Green → Refactor

```
1. Red: 실패하는 테스트 작성
   ↓
2. Green: 테스트를 통과하는 최소한의 코드 작성
   ↓
3. Refactor: 코드 개선 (테스트는 계속 통과)
   ↓
   (반복)
```

### TDD 워크플로우

#### 1단계: Watch 모드 시작

터미널에서 Watch 모드를 실행합니다:

```bash
npm test
```

이제 파일을 저장할 때마다 관련 테스트가 자동으로 실행됩니다.

#### 2단계: 실패하는 테스트 작성 (Red)

새로운 기능을 개발할 때, 먼저 테스트를 작성합니다:

```tsx
// src/components/ui/Counter.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import { Counter } from './Counter'

describe('Counter', () => {
  it('초기값 0을 표시한다', () => {
    render(<Counter />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('증가 버튼 클릭 시 카운트가 증가한다', () => {
    render(<Counter />)
    const incrementButton = screen.getByRole('button', { name: '+' })
    incrementButton.click()
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
```

**이 시점에서 테스트는 실패합니다** (컴포넌트가 아직 없으므로) ✅ **Red 단계**

#### 3단계: 테스트를 통과하는 코드 작성 (Green)

최소한의 코드만 작성하여 테스트를 통과시킵니다:

```tsx
// src/components/ui/Counter.tsx
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

**이제 테스트가 통과합니다** ✅ **Green 단계**

#### 4단계: 리팩토링 (Refactor)

코드를 개선하되, 테스트는 계속 통과해야 합니다:

```tsx
// 개선된 코드
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(prev => prev + 1)

  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl font-bold">{count}</span>
      <button 
        onClick={increment}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        +
      </button>
    </div>
  )
}
```

**테스트는 여전히 통과합니다** ✅ **Refactor 단계**

### TDD 실전 예시: 유틸리티 함수

#### 1. 테스트 먼저 작성 (Red)

```tsx
// src/lib/formatCurrency.test.ts
import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('숫자를 통화 형식으로 변환한다', () => {
    expect(formatCurrency(1000)).toBe('₩1,000')
  })

  it('소수점이 있는 숫자를 처리한다', () => {
    expect(formatCurrency(1234.56)).toBe('₩1,235')
  })
})
```

#### 2. 최소한의 구현 (Green)

```tsx
// src/lib/formatCurrency.ts
export function formatCurrency(amount: number): string {
  return `₩${Math.round(amount).toLocaleString()}`
}
```

#### 3. 리팩토링 (Refactor)

```tsx
// 개선된 구현
export function formatCurrency(
  amount: number,
  options?: { locale?: string; currency?: string }
): string {
  const { locale = 'ko-KR', currency = 'KRW' } = options || {}
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
```

### TDD 실전 예시: Zustand 스토어

#### 1. 테스트 먼저 작성 (Red)

```tsx
// src/stores/useCartStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from './useCartStore'

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0 })
  })

  it('초기 상태는 빈 장바구니다', () => {
    const { items, total } = useCartStore.getState()
    expect(items).toEqual([])
    expect(total).toBe(0)
  })

  it('상품을 추가한다', () => {
    const { addItem } = useCartStore.getState()
    addItem({ id: '1', name: '상품1', price: 1000 })
    
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].name).toBe('상품1')
  })
})
```

#### 2. 최소한의 구현 (Green)

```tsx
// src/stores/useCartStore.ts
import { create } from 'zustand'

interface CartItem {
  id: string
  name: string
  price: number
}

interface CartState {
  items: CartItem[]
  total: number
  addItem: (item: CartItem) => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
      total: state.total + item.price,
    })),
}))
```

### TDD의 장점

1. **명확한 요구사항**: 테스트가 요구사항을 문서화합니다
2. **안전한 리팩토링**: 테스트가 있으면 코드 변경이 안전합니다
3. **빠른 피드백**: Watch 모드로 즉시 결과를 확인할 수 있습니다
4. **설계 개선**: 테스트하기 쉬운 코드는 좋은 설계입니다
5. **버그 예방**: 테스트를 먼저 작성하면 버그를 미리 발견합니다

### Watch 모드 활용 팁

#### 파일 변경 감지

```bash
# Watch 모드 실행 중
npm test

# 파일을 저장하면 자동으로 테스트 실행됨
# 관련된 테스트만 실행되어 매우 빠름
```

#### 특정 테스트만 실행

Watch 모드에서:
- `f` 키: 실패한 테스트만 실행
- `t` 키: 필터 모드 (파일명/테스트명으로 필터링)
- `a` 키: 모든 테스트 실행
- `q` 키: 종료

#### UI 모드 활용

```bash
npm run test:ui
```

브라우저에서 테스트를 시각적으로 확인하고 디버깅할 수 있습니다.

### TDD 체크리스트

새 기능을 개발할 때:

- [ ] **Red**: 실패하는 테스트를 먼저 작성했는가?
- [ ] **Green**: 테스트를 통과하는 최소한의 코드를 작성했는가?
- [ ] **Refactor**: 코드를 개선했는가? (테스트는 여전히 통과하는가?)
- [ ] **Edge Cases**: 경계 케이스에 대한 테스트를 추가했는가?
- [ ] **Clean Code**: 테스트 코드도 깔끔하고 읽기 쉬운가?

### TDD vs 일반 테스트 작성

#### 일반 테스트 작성 (Test After)
```
코드 작성 → 테스트 작성 → 리팩토링
```

#### TDD (Test First)
```
테스트 작성 → 코드 작성 → 리팩토링
```

**TDD의 핵심**: 테스트가 설계를 이끌어갑니다.

## 테스트 작성 가이드

### 파일 명명 규칙

- 테스트 파일: `*.test.tsx` 또는 `*.spec.tsx`
- 테스트 파일 위치: 테스트 대상 파일과 같은 디렉토리

```
src/
  components/
    ui/
      Button.tsx
      Button.test.tsx    # ✅ 같은 디렉토리
  lib/
    utils.ts
    utils.test.ts        # ✅ 같은 디렉토리
```

### 테스트 구조

**Arrange-Act-Assert (AAA) 패턴** 사용:

```tsx
describe('ComponentName', () => {
  it('should do something', () => {
    // Arrange: 테스트 준비
    const props = { ... }
    
    // Act: 테스트 실행
    render(<Component {...props} />)
    
    // Assert: 결과 검증
    expect(...).toBe(...)
  })
})
```

## 테스트 예시

### 컴포넌트 테스트

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test/test-utils'
import { Button } from './Button'

describe('Button', () => {
  it('버튼 텍스트를 렌더링한다', () => {
    render(<Button>클릭하세요</Button>)
    expect(screen.getByText('클릭하세요')).toBeInTheDocument()
  })

  it('클릭 이벤트를 처리한다', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>클릭</Button>)
    
    screen.getByText('클릭').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### 유틸리티 함수 테스트

```tsx
import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('클래스명을 병합한다', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('중복된 클래스를 제거한다', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})
```

### Zustand 스토어 테스트

```tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { useThemeStore } from './useThemeStore'

describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'dark' })
  })

  it('테마를 변경한다', () => {
    const { setTheme } = useThemeStore.getState()
    setTheme('light')
    
    expect(useThemeStore.getState().theme).toBe('light')
  })
})
```

### 비동기 테스트

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../test/test-utils'

describe('AsyncComponent', () => {
  it('비동기 데이터를 로드한다', async () => {
    render(<AsyncComponent />)
    
    // 로딩 상태 확인
    expect(screen.getByText('로딩 중...')).toBeInTheDocument()
    
    // 데이터 로드 대기
    await waitFor(() => {
      expect(screen.getByText('데이터 로드 완료')).toBeInTheDocument()
    })
  })
})
```

### 사용자 이벤트 테스트

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('사용자 입력을 처리한다', async () => {
    const user = userEvent.setup()
    render(<Input />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, '테스트 입력')
    
    expect(input).toHaveValue('테스트 입력')
  })
})
```

## 모범 사례

### 1. 접근성 중심 쿼리 사용

```tsx
// ❌ 나쁜 예: 구현 세부사항에 의존
const button = container.querySelector('.btn-primary')

// ✅ 좋은 예: 접근성 중심 쿼리
const button = screen.getByRole('button', { name: '제출' })
```

### 2. 사용자 관점에서 테스트

```tsx
// ❌ 나쁜 예: 내부 상태 확인
expect(component.state.isOpen).toBe(true)

// ✅ 좋은 예: 사용자가 보는 것 확인
expect(screen.getByText('메뉴 열림')).toBeInTheDocument()
```

### 3. 테스트 격리

각 테스트는 독립적으로 실행되어야 합니다:

```tsx
describe('Component', () => {
  beforeEach(() => {
    // 각 테스트 전 상태 초기화
    cleanup()
  })

  it('test 1', () => { ... })
  it('test 2', () => { ... })
})
```

### 4. 의미 있는 테스트 이름

```tsx
// ❌ 나쁜 예
it('works', () => { ... })
it('test 1', () => { ... })

// ✅ 좋은 예
it('버튼 클릭 시 모달이 열린다', () => { ... })
it('유효하지 않은 이메일 입력 시 에러 메시지를 표시한다', () => { ... })
```

### 5. 테스트 커버리지

중요한 비즈니스 로직과 사용자 플로우에 집중:

```bash
# 커버리지 확인
npm run test:coverage
```

### 6. Mock 사용

외부 의존성은 Mock 처리:

```tsx
import { vi } from 'vitest'

// API 호출 Mock
vi.mock('../api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'test' })),
}))
```

## 테스트 유틸리티

프로젝트의 `src/test/test-utils.tsx`는 다음 Provider를 자동으로 포함합니다:

- **BrowserRouter**: React Router 지원
- **I18nextProvider**: 다국어 지원
- **ThemeProvider**: 테마 컨텍스트

```tsx
import { render, screen } from '../test/test-utils'
// 모든 Provider가 자동으로 적용됨
```

## 추가 리소스

- [Vitest 공식 문서](https://vitest.dev/)
- [React Testing Library 문서](https://testing-library.com/react)
- [Testing Library 쿼리 우선순위](https://testing-library.com/docs/queries/about/#priority)
- [Vitest UI](https://vitest.dev/guide/ui.html)

