import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'emerald' | 'red' | 'indigo'

export type { Theme, ThemeColor }

export interface ThemeContextType {
    theme: Theme
    themeColor: ThemeColor
    setTheme: (theme: Theme) => void
    setThemeColor: (color: ThemeColor) => void
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

interface ThemeProviderProps {
    children: React.ReactNode
    defaultTheme?: Theme
    defaultThemeColor?: ThemeColor
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    defaultTheme = 'dark',
    defaultThemeColor = 'red'
}) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme)
    const [themeColor, setThemeColor] = useState<ThemeColor>(defaultThemeColor)

    useEffect(() => {
        // Load theme from localStorage on mount
        const savedTheme = localStorage.getItem('theme') as Theme
        const savedThemeColor = localStorage.getItem('themeColor') as ThemeColor

        if (savedTheme) {
            setTheme(savedTheme)
        }
        if (savedThemeColor) {
            setThemeColor(savedThemeColor)
        }
    }, [])

    useEffect(() => {
        // Apply theme to document
        const root = document.documentElement

        // Remove existing theme classes
        root.removeAttribute('data-theme')
        root.removeAttribute('data-theme-color')

        // Add new theme classes
        root.setAttribute('data-theme', theme)
        root.setAttribute('data-theme-color', themeColor)

        // Save to localStorage
        localStorage.setItem('theme', theme)
        localStorage.setItem('themeColor', themeColor)
    }, [theme, themeColor])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    const value: ThemeContextType = {
        theme,
        themeColor,
        setTheme,
        setThemeColor,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
