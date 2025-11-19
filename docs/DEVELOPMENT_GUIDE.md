# 개발 가이드

이 문서는 main 브랜치에서 새로운 웹 개발을 시작할 때 필요한 기초 세팅과 개발 규칙을 정리한 가이드입니다.

## 📋 목차

- [브랜치 전략](#브랜치-전략)
- [초기 세팅](#초기-세팅)
- [개발 환경 설정](#개발-환경-설정)
- [코딩 규칙](#코딩-규칙)
- [커밋 규칙](#커밋-규칙)
- [테스트 가이드](#테스트-가이드)
- [배포 가이드](#배포-가이드)

## 🌿 브랜치 전략

### 브랜치 명명 규칙

- `main`: 프로덕션 배포 브랜치 (보호됨)
- `develop`: 개발 통합 브랜치 (선택사항)
- `feature/기능명`: 새로운 기능 개발
- `fix/버그명`: 버그 수정
- `hotfix/긴급수정명`: 긴급 수정사항
- `refactor/리팩토링명`: 리팩토링 작업

### 브랜치 생성 예시

```bash
# 기능 개발
git checkout -b feature/user-authentication

# 버그 수정
git checkout -b fix/login-error

# 긴급 수정
git checkout -b hotfix/security-patch
```

### 브랜치 워크플로우

1. **새 기능 개발 시작**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **개발 완료 후 PR 생성**
   - 브랜치를 원격 저장소에 푸시
   - Pull Request 생성
   - 코드 리뷰 요청
   - CI/CD 통과 확인
   - 승인 후 main 브랜치에 머지

3. **머지 후 브랜치 삭제**
   ```bash
   git checkout main
   git pull origin main
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

## 🚀 초기 세팅

### 1. 저장소 클론 및 의존성 설치

```bash
# 저장소 클론
git clone <repository-url>
cd web-template-starter

# 의존성 설치
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 참고하여 `.env` 파일을 생성하세요:

```bash
cp .env.example .env
```

필요한 환경 변수를 설정합니다:

```env
# Google Analytics 측정 ID
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Microsoft Clarity 프로젝트 ID
VITE_CLARITY_PROJECT_ID=your_clarity_project_id
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속하여 확인합니다.

## ⚙️ 개발 환경 설정

### 필수 VS Code 확장 프로그램

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### EditorConfig 설정

프로젝트 루트의 `.editorconfig` 파일이 자동으로 적용됩니다.

### Pre-commit Hooks

프로젝트에는 Husky를 통한 pre-commit hooks가 설정되어 있습니다:

- 코드 포맷팅 자동 적용 (Prettier)
- 린팅 검사 (ESLint)
- 타입 체크 (TypeScript)

## 📝 코딩 규칙

### 코드 스타일

- **인덴테이션**: 2 spaces
- **문자열**: Single quotes (작은따옴표) 사용
- **세미콜론**: 사용하지 않음
- **등호**: 항상 `===` 사용 (엄격한 비교)
- **변수명**: camelCase 사용
- **컴포넌트명**: PascalCase 사용

### TypeScript 규칙

- 모든 컴포넌트와 함수에 타입 정의
- `any` 타입 사용 지양 (필요시 `unknown` 사용)
- 인터페이스는 `I` 접두사 없이 사용
- 타입은 가능한 한 명시적으로 정의

### React 규칙

- 함수형 컴포넌트만 사용
- Hooks는 컴포넌트 최상위에서만 호출
- Props는 구조 분해 할당 사용
- 조건부 렌더링은 삼항 연산자 또는 `&&` 사용

### 파일 구조 규칙

```
src/
  components/          # 재사용 가능한 컴포넌트
    ui/               # 기본 UI 컴포넌트
    layout/           # 레이아웃 컴포넌트
    content/          # 콘텐츠 컴포넌트
  templates/          # 페이지 템플릿
  hooks/              # 커스텀 훅
  contexts/           # React Context
  lib/                # 유틸리티 함수
  styles/             # 전역 스타일
  i18n/               # 다국어 설정
  routes/             # 라우트 설정
```

### 컴포넌트 작성 규칙

1. **Named Export 사용**
   ```tsx
   export function Button() {
     // ...
   }
   ```

2. **Props 인터페이스 정의**
   ```tsx
   interface ButtonProps {
     children: React.ReactNode
     onClick?: () => void
     variant?: 'primary' | 'secondary'
   }
   ```

3. **타입 안전성 확보**
   ```tsx
   export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
     // ...
   }
   ```

## 📋 커밋 규칙

### 커밋 메시지 형식

커밋 메시지는 다음 형식을 따릅니다:

```
type(scope): description

[optional body]

[optional footer]
```

### 커밋 타입

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가 또는 수정
- `chore`: 빌드 업무 수정, 패키지 매니저 설정 등
- `perf`: 성능 개선
- `ci`: CI/CD 설정 변경

### 커밋 예시

```bash
# 기능 추가
git commit -m "feat(auth): 사용자 로그인 기능 추가"

# 버그 수정
git commit -m "fix(navigation): 모바일 메뉴 닫힘 오류 수정"

# 문서 수정
git commit -m "docs(readme): 설치 가이드 업데이트"

# 리팩토링
git commit -m "refactor(components): Button 컴포넌트 구조 개선"
```

### 커밋 전 체크리스트

- [ ] 코드가 정상적으로 작동하는지 확인
- [ ] ESLint 오류가 없는지 확인 (`npm run lint`)
- [ ] 타입 오류가 없는지 확인 (`npm run type-check`)
- [ ] 테스트가 통과하는지 확인 (`npm test`)
- [ ] 불필요한 console.log 제거
- [ ] 커밋 메시지가 규칙을 따르는지 확인

## 🧪 테스트 가이드

### TDD (Test Driven Development)

이 프로젝트는 **TDD**를 완전히 지원합니다. Watch 모드를 활용하여 빠른 피드백 루프를 제공합니다.

#### TDD 사이클: Red → Green → Refactor

1. **Red**: 실패하는 테스트 작성
2. **Green**: 테스트를 통과하는 최소한의 코드 작성
3. **Refactor**: 코드 개선 (테스트는 계속 통과)

#### TDD 워크플로우

```bash
# 1. Watch 모드 시작
npm test

# 2. 테스트 파일 작성 (예: Component.test.tsx)
# 3. 파일 저장 → 자동으로 테스트 실행
# 4. 실패 확인 (Red) → 코드 작성
# 5. 통과 확인 (Green) → 리팩토링
```

자세한 내용은 [TESTING_GUIDE.md](./TESTING_GUIDE.md#tdd-test-driven-development)를 참고하세요.

### 테스트 실행

```bash
# 모든 테스트 실행 (Watch 모드) - TDD 권장
npm test

# 테스트 UI 실행 (브라우저에서 테스트 실행)
npm run test:ui

# 커버리지 확인
npm run test:coverage

# 테스트 한 번만 실행 (CI/CD용)
npm run test:run
```

### 테스트 환경

이 프로젝트는 **Vitest**와 **React Testing Library**를 사용합니다:

- **Vitest**: Vite 기반의 빠른 테스트 러너
- **React Testing Library**: 컴포넌트 테스트를 위한 유틸리티
- **jsdom**: 브라우저 환경 시뮬레이션

### 테스트 파일 위치

테스트 파일은 다음 위치에 작성합니다:

```
src/
  components/
    ui/
      Button.tsx
      Button.test.tsx    # 컴포넌트와 같은 디렉토리
  lib/
    utils.ts
    utils.test.ts        # 유틸리티와 같은 디렉토리
  stores/
    useThemeStore.ts
    useThemeStore.test.ts # 스토어와 같은 디렉토리
```

### 테스트 작성 규칙

1. **파일명**: `*.test.tsx` 또는 `*.spec.tsx`
2. **테스트 위치**: 컴포넌트와 같은 디렉토리 또는 `__tests__` 폴더
3. **테스트 구조**: Arrange-Act-Assert 패턴 사용

### 테스트 예시

#### 컴포넌트 테스트

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

#### 유틸리티 함수 테스트

```tsx
import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('클래스명을 병합한다', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })
})
```

#### Zustand 스토어 테스트

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

### 테스트 유틸리티

프로젝트의 `src/test/test-utils.tsx`는 React Router, i18n, Theme Provider가 포함된 커스텀 렌더 함수를 제공합니다:

```tsx
import { render, screen } from '../test/test-utils'
// 자동으로 모든 Provider가 적용됨
```

## 🚢 배포 가이드

### 빌드

```bash
# 프로덕션 빌드 생성
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 배포 전 체크리스트

- [ ] 모든 테스트 통과
- [ ] 빌드 오류 없음
- [ ] 환경 변수 설정 확인
- [ ] 분석 도구 설정 확인
- [ ] 반응형 디자인 확인
- [ ] 브라우저 호환성 확인
- [ ] 성능 최적화 확인

### 배포 플랫폼별 가이드

#### Netlify
1. `dist` 폴더를 드래그 앤 드롭
2. 또는 Netlify CLI 사용: `npx netlify deploy --prod`

#### Vercel
```bash
npx vercel
```

#### GitHub Pages
```bash
npm run build
# dist 폴더 내용을 gh-pages 브랜치에 푸시
```

## 🔍 코드 리뷰 가이드

### 리뷰어 체크리스트

- [ ] 코드가 요구사항을 충족하는가?
- [ ] 코드 스타일이 프로젝트 규칙을 따르는가?
- [ ] 타입 안전성이 확보되었는가?
- [ ] 에러 처리가 적절한가?
- [ ] 성능 이슈가 없는가?
- [ ] 보안 이슈가 없는가?
- [ ] 테스트가 충분한가?
- [ ] 문서화가 필요한가?

### 리뷰 작성 시 주의사항

- 건설적인 피드백 제공
- 코드 자체에 대한 비판, 개인에 대한 비판 금지
- 구체적인 개선 제안 포함
- 긍정적인 부분도 언급

## 📚 추가 리소스

- [React 공식 문서](https://react.dev)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Vite 가이드](https://vitejs.dev/guide/)
- [React Router 문서](https://reactrouter.com/)

## 🆘 문제 해결

### 일반적인 문제

#### 의존성 오류
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 타입 오류
```bash
npm run type-check
```

#### 빌드 오류
```bash
npm run lint
npm run build
```

### 도움이 필요할 때

1. 프로젝트 문서 확인 (README.md, 이 가이드)
2. 이슈 검색
3. 팀원에게 질문
4. 새로운 이슈 생성

