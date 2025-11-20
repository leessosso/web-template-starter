import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/test-utils'
import { Button } from './Button'

describe('Button', () => {
  it('버튼 텍스트를 렌더링한다', () => {
    render(<Button>클릭하세요</Button>)
    expect(screen.getByText('클릭하세요')).toBeInTheDocument()
  })

  it('기본 variant로 렌더링된다', () => {
    render(<Button>버튼</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary')
  })

  it('variant prop에 따라 스타일이 변경된다', () => {
    const { rerender } = render(<Button variant="secondary">버튼</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-muted')

    rerender(<Button variant="outline">버튼</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('border')
  })

  it('size prop에 따라 크기가 변경된다', () => {
    const { rerender } = render(<Button size="sm">버튼</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm')

    rerender(<Button size="lg">버튼</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('px-6', 'py-3', 'text-base')
  })

  it('클릭 이벤트를 처리한다', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>클릭</Button>)

    const button = screen.getByRole('button')
    button.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disabled 상태일 때 클릭할 수 없다', () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        비활성화
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    button.click()
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('커스텀 className을 적용한다', () => {
    render(<Button className="custom-class">버튼</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })
})

