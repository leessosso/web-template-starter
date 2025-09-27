import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import type { Theme, ThemeColor } from '../../contexts/ThemeContext'
import { Button } from './Button'

const themeOptions: { value: Theme; label: string; icon: string }[] = [
    { value: 'light', label: '라이트', icon: '☀️' },
    { value: 'dark', label: '다크', icon: '🌙' },
]

const colorOptions: { value: ThemeColor; label: string; color: string }[] = [
    { value: 'blue', label: '블루', color: '#3b82f6' },
    { value: 'green', label: '그린', color: '#22c55e' },
    { value: 'purple', label: '퍼플', color: '#9333ea' },
    { value: 'orange', label: '오렌지', color: '#f97316' },
    { value: 'rose', label: '로즈', color: '#f43f5e' },
    { value: 'emerald', label: '에메랄드', color: '#10b981' },
    { value: 'red', label: '레드', color: '#dc2626' },
    { value: 'indigo', label: '인디고', color: '#4f46e5' },
]

export const ThemeSelector: React.FC = () => {
    const { theme, themeColor, setTheme, setThemeColor } = useTheme()

    return (
        <div className="flex flex-col gap-4 p-4 bg-card border border-border rounded-lg">
            <div>
                <h3 className="text-sm font-medium text-foreground mb-3">테마 모드</h3>
                <div className="flex gap-2">
                    {themeOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant={theme === option.value ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setTheme(option.value)}
                        >
                            <span className="mr-1">{option.icon}</span>
                            {option.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-foreground mb-3">색상 테마</h3>
                <div className="flex gap-2 flex-wrap">
                    {colorOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setThemeColor(option.value)}
                            className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${themeColor === option.value
                                ? 'border-primary scale-110 ring-2 ring-primary/20'
                                : 'border-border hover:scale-105 hover:border-primary/50'
                                }`}
                            style={{ backgroundColor: option.color }}
                            title={option.label}
                        />
                    ))}
                </div>
            </div>

            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                현재: {themeOptions.find(t => t.value === theme)?.label} 모드, {colorOptions.find(c => c.value === themeColor)?.label} 색상
            </div>
        </div>
    )
}
