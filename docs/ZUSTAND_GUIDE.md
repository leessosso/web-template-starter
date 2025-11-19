# Zustand 사용 가이드

이 프로젝트는 전역 상태 관리를 위해 Zustand를 사용합니다.

## 📚 목차

- [Zustand란?](#zustand란)
- [설치 및 설정](#설치-및-설정)
- [기본 사용법](#기본-사용법)
- [프로젝트의 스토어 구조](#프로젝트의-스토어-구조)
- [고급 사용법](#고급-사용법)
- [모범 사례](#모범-사례)

## Zustand란?

Zustand는 작고 빠르며 확장 가능한 상태 관리 라이브러리입니다. Redux와 같은 복잡한 보일러플레이트 없이 간단하게 전역 상태를 관리할 수 있습니다.

### 주요 특징

- ✅ **작은 번들 크기**: 약 1KB
- ✅ **간단한 API**: 보일러플레이트 최소화
- ✅ **TypeScript 지원**: 완벽한 타입 안전성
- ✅ **미들웨어 지원**: persist, devtools 등
- ✅ **React 외부에서도 사용 가능**: 컴포넌트 외부에서도 스토어 접근 가능

## 설치 및 설정

Zustand는 이미 프로젝트에 설치되어 있습니다:

```bash
npm install zustand
```

## 기본 사용법

### 1. 스토어 생성

```typescript
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
```

### 2. 컴포넌트에서 사용

```tsx
import { useCounterStore } from './stores/useCounterStore'

function Counter() {
  const { count, increment, decrement } = useCounterStore()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
```

### 3. 선택적 구독 (성능 최적화)

특정 상태만 구독하여 불필요한 리렌더링을 방지:

```tsx
function CounterDisplay() {
  // count만 구독
  const count = useCounterStore((state) => state.count)
  
  return <p>Count: {count}</p>
}

function CounterControls() {
  // increment와 decrement만 구독
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  
  return (
    <>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  )
}
```

## 프로젝트의 스토어 구조

프로젝트에는 두 개의 기본 스토어가 있습니다:

### 1. useThemeStore

테마 관련 상태 관리:

```typescript
import { useThemeStore } from '@/stores'

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()
  
  return (
    <button onClick={toggleTheme}>
      현재 테마: {theme}
    </button>
  )
}
```

**상태:**
- `theme`: 'light' | 'dark'
- `themeColor`: 테마 색상
- `setTheme`: 테마 설정
- `setThemeColor`: 테마 색상 설정
- `toggleTheme`: 테마 토글

### 2. useAppStore

앱 전역 상태 관리:

```typescript
import { useAppStore } from '@/stores'

function LoadingSpinner() {
  const isLoading = useAppStore((state) => state.isLoading)
  
  if (!isLoading) return null
  
  return <div>로딩 중...</div>
}
```

**상태:**
- `isLoading`: 로딩 상태
- `error`: 에러 메시지
- `setLoading`: 로딩 상태 설정
- `setError`: 에러 설정
- `clearError`: 에러 제거

## 고급 사용법

### 1. Persist 미들웨어 (로컬 스토리지 저장)

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage', // localStorage 키
    }
  )
)
```

### 2. Devtools 미들웨어 (개발 도구)

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // ... 상태
    }),
    {
      name: 'app-store', // Redux DevTools에서 표시될 이름
    }
  )
)
```

### 3. 비동기 액션

```typescript
interface DataState {
  data: Data | null
  loading: boolean
  fetchData: () => Promise<void>
}

export const useDataStore = create<DataState>((set) => ({
  data: null,
  loading: false,
  fetchData: async () => {
    set({ loading: true })
    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      set({ data, loading: false })
    } catch (error) {
      set({ loading: false })
      console.error(error)
    }
  },
}))
```

### 4. 컴포넌트 외부에서 스토어 사용

```typescript
// 컴포넌트 외부에서도 스토어 접근 가능
const { theme } = useThemeStore.getState()

// 액션 실행
useThemeStore.getState().toggleTheme()

// 구독 (컴포넌트 외부)
const unsubscribe = useThemeStore.subscribe(
  (state) => state.theme,
  (theme) => {
    console.log('테마 변경:', theme)
  }
)
```

### 5. 여러 미들웨어 조합

```typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        // ... 상태
      }),
      {
        name: 'store-storage',
      }
    ),
    {
      name: 'store',
    }
  )
)
```

## 모범 사례

### 1. 스토어 분리

관심사에 따라 스토어를 분리하세요:

```
src/stores/
  ├── useThemeStore.ts    # 테마 관련
  ├── useUserStore.ts     # 사용자 관련
  ├── useCartStore.ts     # 장바구니 관련
  └── index.ts            # 통합 export
```

### 2. 타입 안전성

항상 TypeScript 인터페이스를 정의하세요:

```typescript
interface StoreState {
  // 상태
  value: string
  
  // 액션
  setValue: (value: string) => void
}
```

### 3. 선택적 구독 사용

성능을 위해 필요한 상태만 구독하세요:

```tsx
// ❌ 나쁜 예: 전체 스토어 구독
const store = useStore()

// ✅ 좋은 예: 필요한 상태만 구독
const value = useStore((state) => state.value)
```

### 4. 액션 네이밍

액션은 동사로 시작하세요:

```typescript
// ✅ 좋은 예
setUser, incrementCount, toggleTheme

// ❌ 나쁜 예
user, count, theme
```

### 5. 불변성 유지

상태를 직접 수정하지 마세요:

```typescript
// ❌ 나쁜 예
const increment = () => {
  state.count++ // 직접 수정
}

// ✅ 좋은 예
const increment = () => set((state) => ({ 
  count: state.count + 1 
}))
```

## 예시: 사용자 인증 스토어

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

## 추가 리소스

- [Zustand 공식 문서](https://docs.pmnd.rs/zustand)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Zustand 예시](https://github.com/pmndrs/zustand/tree/main/examples)

