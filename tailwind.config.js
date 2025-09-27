/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary brand colors - now using CSS variables
        primary: {
          50: 'rgb(var(--color-primary) / 0.05)',
          100: 'rgb(var(--color-primary) / 0.1)',
          200: 'rgb(var(--color-primary) / 0.2)',
          300: 'rgb(var(--color-primary) / 0.3)',
          400: 'rgb(var(--color-primary) / 0.4)',
          500: 'rgb(var(--color-primary) / 0.5)',
          600: 'rgb(var(--color-primary) / 0.6)',
          700: 'rgb(var(--color-primary) / 0.7)',
          800: 'rgb(var(--color-primary) / 0.8)',
          900: 'rgb(var(--color-primary) / 0.9)',
          DEFAULT: 'rgb(var(--color-primary))',
        },
        // Semantic colors using CSS variables
        background: 'rgb(var(--color-background))',
        foreground: 'rgb(var(--color-foreground))',
        muted: 'rgb(var(--color-muted))',
        'muted-foreground': 'rgb(var(--color-muted-foreground))',
        accent: 'rgb(var(--color-accent))',
        'accent-foreground': 'rgb(var(--color-accent-foreground))',
        border: 'rgb(var(--color-border))',
        card: 'rgb(var(--color-card))',
        'card-foreground': 'rgb(var(--color-card-foreground))',
        // Legacy brand colors for backward compatibility
        brand: {
          DEFAULT: '#2563eb',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

