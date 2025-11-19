# TDD 실전 예시

이 문서는 실제 프로젝트에서 TDD를 어떻게 적용하는지 단계별로 보여줍니다.

## 📋 예시: 사용자 프로필 카드 컴포넌트

### 요구사항

- 사용자 이름, 이메일, 아바타를 표시
- 편집 버튼 클릭 시 편집 모드로 전환
- 저장 버튼 클릭 시 변경사항 저장

---

## 1단계: Red - 실패하는 테스트 작성

먼저 테스트를 작성합니다:

```tsx
// src/components/user/UserProfileCard.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/test-utils'
import userEvent from '@testing-library/user-event'
import { UserProfileCard } from './UserProfileCard'

describe('UserProfileCard', () => {
  const mockUser = {
    id: '1',
    name: '홍길동',
    email: 'hong@example.com',
    avatar: '/avatars/hong.jpg',
  }

  it('사용자 정보를 표시한다', () => {
    render(<UserProfileCard user={mockUser} />)
    
    expect(screen.getByText('홍길동')).toBeInTheDocument()
    expect(screen.getByText('hong@example.com')).toBeInTheDocument()
    expect(screen.getByAltText('홍길동')).toHaveAttribute('src', '/avatars/hong.jpg')
  })

  it('편집 버튼을 클릭하면 편집 모드로 전환된다', async () => {
    const user = userEvent.setup()
    render(<UserProfileCard user={mockUser} />)
    
    const editButton = screen.getByRole('button', { name: '편집' })
    await user.click(editButton)
    
    expect(screen.getByLabelText('이름')).toBeInTheDocument()
    expect(screen.getByLabelText('이메일')).toBeInTheDocument()
  })

  it('저장 버튼을 클릭하면 변경사항이 저장된다', async () => {
    const onSave = vi.fn()
    const user = userEvent.setup()
    
    render(<UserProfileCard user={mockUser} onSave={onSave} />)
    
    // 편집 모드로 전환
    const editButton = screen.getByRole('button', { name: '편집' })
    await user.click(editButton)
    
    // 이름 변경
    const nameInput = screen.getByLabelText('이름')
    await user.clear(nameInput)
    await user.type(nameInput, '김철수')
    
    // 저장
    const saveButton = screen.getByRole('button', { name: '저장' })
    await user.click(saveButton)
    
    expect(onSave).toHaveBeenCalledWith({
      ...mockUser,
      name: '김철수',
    })
  })
})
```

**현재 상태**: 테스트는 실패합니다 (컴포넌트가 없음) ✅ **Red**

---

## 2단계: Green - 최소한의 구현

테스트를 통과하는 최소한의 코드를 작성합니다:

```tsx
// src/components/user/UserProfileCard.tsx
import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface UserProfileCardProps {
  user: User
  onSave?: (user: User) => void
}

export function UserProfileCard({ user, onSave }: UserProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleSave = () => {
    onSave?.(editedUser)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="p-4 border rounded-lg">
        <label>
          이름
          <input
            type="text"
            aria-label="이름"
            value={editedUser.name}
            onChange={(e) =>
              setEditedUser({ ...editedUser, name: e.target.value })
            }
          />
        </label>
        <label>
          이메일
          <input
            type="email"
            aria-label="이메일"
            value={editedUser.email}
            onChange={(e) =>
              setEditedUser({ ...editedUser, email: e.target.value })
            }
          />
        </label>
        <button onClick={handleSave}>저장</button>
        <button onClick={() => setIsEditing(false)}>취소</button>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => setIsEditing(true)}>편집</button>
    </div>
  )
}
```

**현재 상태**: 테스트가 통과합니다 ✅ **Green**

---

## 3단계: Refactor - 코드 개선

테스트는 여전히 통과하면서 코드를 개선합니다:

```tsx
// src/components/user/UserProfileCard.tsx
import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card } from '../ui/Card'

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface UserProfileCardProps {
  user: User
  onSave?: (user: User) => void
}

export function UserProfileCard({ user, onSave }: UserProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleSave = () => {
    onSave?.(editedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedUser(user)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <Input
              type="text"
              aria-label="이름"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">이메일</label>
            <Input
              type="email"
              aria-label="이메일"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>저장</Button>
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button onClick={() => setIsEditing(true)}>편집</Button>
      </div>
    </Card>
  )
}
```

**현재 상태**: 테스트는 여전히 통과하며 코드가 개선되었습니다 ✅ **Refactor**

---

## 추가 테스트: Edge Cases

경계 케이스에 대한 테스트를 추가합니다:

```tsx
// UserProfileCard.test.tsx에 추가

describe('UserProfileCard - Edge Cases', () => {
  it('onSave가 없어도 편집 모드가 작동한다', async () => {
    const user = userEvent.setup()
    const mockUser = {
      id: '1',
      name: '홍길동',
      email: 'hong@example.com',
      avatar: '/avatars/hong.jpg',
    }
    
    render(<UserProfileCard user={mockUser} />)
    
    const editButton = screen.getByRole('button', { name: '편집' })
    await user.click(editButton)
    
    expect(screen.getByLabelText('이름')).toBeInTheDocument()
  })

  it('취소 버튼을 클릭하면 변경사항이 취소된다', async () => {
    const user = userEvent.setup()
    const mockUser = {
      id: '1',
      name: '홍길동',
      email: 'hong@example.com',
      avatar: '/avatars/hong.jpg',
    }
    
    render(<UserProfileCard user={mockUser} />)
    
    // 편집 모드로 전환
    const editButton = screen.getByRole('button', { name: '편집' })
    await user.click(editButton)
    
    // 이름 변경
    const nameInput = screen.getByLabelText('이름')
    await user.clear(nameInput)
    await user.type(nameInput, '변경된 이름')
    
    // 취소
    const cancelButton = screen.getByRole('button', { name: '취소' })
    await user.click(cancelButton)
    
    // 원래 이름이 표시됨
    expect(screen.getByText('홍길동')).toBeInTheDocument()
  })
})
```

---

## TDD의 장점 (이 예시에서)

1. **명확한 요구사항**: 테스트가 컴포넌트의 동작을 명확히 정의
2. **안전한 리팩토링**: UI를 개선해도 테스트가 통과하는지 확인 가능
3. **빠른 피드백**: Watch 모드로 즉시 결과 확인
4. **설계 개선**: 테스트하기 쉬운 구조로 자연스럽게 설계됨

---

## 다음 단계

이제 실제 프로젝트에서 TDD를 적용해보세요:

1. `npm test`로 Watch 모드 시작
2. 새 기능의 테스트 작성 (Red)
3. 최소한의 코드 작성 (Green)
4. 코드 개선 (Refactor)
5. Edge cases 테스트 추가

**핵심**: 테스트가 설계를 이끌어갑니다! 🚀

