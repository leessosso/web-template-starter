import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'

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
    defaultTheme = 'light',
    defaultThemeColor = 'blue'
}) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme)
    const [themeColor, setThemeColor] = useState<ThemeColor>(defaultThemeColor)
    const { user, updateUserTheme } = useAuthStore()

    useEffect(() => {
        // Load theme based on authentication status
        if (user) {
            // User is logged in - use user's theme settings or defaults
            setTheme(user.theme || 'light')
            setThemeColor(user.themeColor || 'blue')
        } else {
            // User is not logged in - use localStorage or defaults
            const savedTheme = localStorage.getItem('theme') as Theme
            const savedThemeColor = localStorage.getItem('themeColor') as ThemeColor

            setTheme(savedTheme || 'light')
            setThemeColor(savedThemeColor || 'blue')
        }
    }, [user])

    useEffect(() => {
        // Apply theme to document
        const root = document.documentElement

        // Remove existing theme classes
        root.removeAttribute('data-theme')
        root.removeAttribute('data-theme-color')

        // Add new theme classes
        root.setAttribute('data-theme', theme)
        root.setAttribute('data-theme-color', themeColor)
    }, [theme, themeColor])

    const handleSetTheme = async (newTheme: Theme) => {
        setTheme(newTheme)

        if (user) {
            // User is logged in - save to Firestore
            try {
                await updateUserTheme(newTheme, undefined)
            } catch (error) {
                console.error('테마 설정 저장 실패:', error)
            }
        } else {
            // User is not logged in - save to localStorage
            localStorage.setItem('theme', newTheme)
        }
    }

    const handleSetThemeColor = async (newThemeColor: ThemeColor) => {
        setThemeColor(newThemeColor)

        if (user) {
            // User is logged in - save to Firestore
            try {
                await updateUserTheme(undefined, newThemeColor)
            } catch (error) {
                console.error('테마 색상 설정 저장 실패:', error)
            }
        } else {
            // User is not logged in - save to localStorage
            localStorage.setItem('themeColor', newThemeColor)
        }
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        handleSetTheme(newTheme)
    }

    const value: ThemeContextType = {
        theme,
        themeColor,
        setTheme: handleSetTheme,
        setThemeColor: handleSetThemeColor,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
