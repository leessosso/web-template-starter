# 기여 가이드 (Contributing Guide)

이 문서는 프로젝트에 기여하거나 새 컴포넌트를 개발할 때 따라야 할 가이드라인입니다.

## 목차

- [컴포넌트 개발 가이드](#컴포넌트-개발-가이드)
- [코딩 스타일](#코딩-스타일)
- [테마 시스템](#테마-시스템)
- [체크리스트](#체크리스트)

## 컴포넌트 개발 가이드

### 중요: 다크모드 호환성

이 프로젝트는 **`data-theme="dark"` 속성 기반의 CSS 변수 테마 시스템**을 사용합니다. 
**Tailwind의 `dark:` 클래스는 작동하지 않으므로** 하드코딩된 색상을 절대 사용하지 마세요.

### 올바른 방법

```tsx
// CSS 변수 기반 클래스 사용
<div className="bg-card text-card-foreground">
  {/* 카드/팝업/드롭다운 배경 */}
</div>

<div className="bg-background text-foreground">
  {/* 페이지 기본 배경 */}
</div>

<div className="bg-muted text-muted-foreground">
  {/* 부드러운 배경 */}
</div>
```

### 피해야 할 방법

```tsx
// 하드코딩된 색상 + dark: 클래스 (작동하지 않음!)
<div className="bg-white dark:bg-gray-900">
  {/* 이 프로젝트에서는 작동하지 않습니다! */}
</div>

// 하드코딩된 색상만 사용
<div className="bg-gray-100 text-gray-900">
  {/* 다크모드에서 작동하지 않습니다! */}
</div>
```

## 테마 시스템

### 사용 가능한 테마 클래스

| 용도 | 배경 | 텍스트 | 설명 |
|------|------|--------|------|
| 기본 배경 | `bg-background` | `text-foreground` | 페이지 기본 배경 및 텍스트 |
| 카드/팝업/드롭다운 | `bg-card` | `text-card-foreground` | 카드, 팝업, 드롭다운 메뉴, 셀렉트박스 등 |
| 부드러운 배경 | `bg-muted` | `text-muted-foreground` | 보조 배경 및 설명 텍스트 |
| 브랜드 색상 | `bg-primary` | `text-primary-foreground` | 주요 액션 버튼, 링크 등 |
| 강조 색상 | `bg-accent` | `text-accent-foreground` | 호버, 포커스 상태 등 |
| 테두리 | `border-border` | - | 모든 테두리 |

### 테마 클래스 사용 예시

```tsx
// 올바른 컴포넌트 예시
export function MyDropdown() {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-md p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-card-foreground">제목</h3>
      <p className="text-sm text-muted-foreground">설명 텍스트</p>
      <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
        액션
      </button>
    </div>
  )
}

// Select/Dropdown 컴포넌트 예시
export function MySelect() {
  return (
    <SelectPrimitive.Content className="bg-card text-card-foreground">
      <SelectPrimitive.Item className="text-card-foreground">
        옵션
      </SelectPrimitive.Item>
    </SelectPrimitive.Content>
  )
}
```

## 코딩 스타일

### 컴포넌트 파일 구조

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

// 1. 타입 정의
interface MyComponentProps {
  className?: string
  children?: React.ReactNode
}

// 2. 컴포넌트 구현
export const MyComponent = React.forwardRef<
  HTMLDivElement,
  MyComponentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-card text-card-foreground border border-border rounded-md p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

MyComponent.displayName = "MyComponent"
```

### 필수 규칙

1. **항상 `cn()` 유틸리티 사용**: 클래스 병합을 위해
2. **`forwardRef` 사용**: ref 전달을 위해
3. **`displayName` 설정**: 디버깅을 위해
4. **타입 정의**: TypeScript 타입 명시
5. **텍스트 색상 명시**: 항상 텍스트 색상 클래스 포함

## 체크리스트

새 컴포넌트를 만들거나 기존 컴포넌트를 수정할 때:

### 다크모드 호환성
- [ ] `bg-white`, `dark:bg-gray-900` 같은 하드코딩된 색상 사용하지 않기
- [ ] CSS 변수 기반 클래스(`bg-card`, `bg-background` 등) 사용하기
- [ ] 텍스트 색상도 명시적으로 지정하기 (`text-card-foreground`, `text-foreground` 등)
- [ ] 다크모드에서 테스트하기

### 코드 품질
- [ ] TypeScript 타입 정의
- [ ] `forwardRef` 사용 (필요한 경우)
- [ ] `displayName` 설정
- [ ] `cn()` 유틸리티로 클래스 병합
- [ ] 접근성 고려 (aria-label, role 등)

### 테스트
- [ ] 라이트 모드에서 확인
- [ ] 다크 모드에서 확인
- [ ] 반응형 디자인 확인 (모바일/태블릿/데스크톱)

## 문제 해결

### 다크모드에서 텍스트가 보이지 않는 경우

1. **원인 확인**: `bg-white`, `dark:bg-gray-900` 같은 코드가 있는지 확인
2. **수정**: `bg-card` 또는 `bg-background`로 변경
3. **텍스트 색상 추가**: `text-card-foreground` 또는 `text-foreground` 추가

```tsx
// 문제가 있는 코드
<div className="bg-white dark:bg-gray-900">
  <p>텍스트</p> {/* 색상이 지정되지 않음 */}
</div>

// 수정된 코드
<div className="bg-card text-card-foreground">
  <p className="text-card-foreground">텍스트</p>
</div>
```

### 다크모드에서 배경이 흰색으로 보이는 경우

1. **원인 확인**: `bg-white` 같은 하드코딩된 색상 사용 여부 확인
2. **수정**: `bg-card` 또는 `bg-background`로 변경

```tsx
// 문제가 있는 코드
<div className="bg-white">
  {/* 다크모드에서도 흰색 배경 */}
</div>

// 수정된 코드
<div className="bg-card">
  {/* 다크모드에서 자동으로 어두운 배경 */}
</div>
```

## 참고 자료

- [README.md](./README.md) - 프로젝트 개요 및 빠른 시작
- [src/styles/global.css](./src/styles/global.css) - CSS 변수 정의
- [tailwind.config.js](./tailwind.config.js) - Tailwind 설정

## 추가 팁

### 컴포넌트 템플릿

새 컴포넌트를 만들 때 다음 템플릿을 사용하세요:

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  // 추가 props
}

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-card text-card-foreground border border-border",
        className
      )}
      {...props}
    />
  )
})

ComponentName.displayName = "ComponentName"
```

### 자주 사용하는 패턴

```tsx
// 팝업/드롭다운 컨텐츠
className="bg-card text-card-foreground border border-border shadow-lg"

// 버튼
className="bg-primary text-primary-foreground hover:bg-primary/90"

// 보조 텍스트
className="text-muted-foreground text-sm"

// 카드
className="bg-card text-card-foreground border border-border rounded-lg p-4"
```

---

**질문이나 제안사항이 있으면 이슈를 생성해주세요!**
