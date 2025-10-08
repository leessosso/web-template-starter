import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const navItems = [
  { to: '/', key: 'navigation.home' },
  { to: '/test', key: 'navigation.test' },
  { to: '/types', key: 'navigation.types' },
]

export function Navigation() {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const next = i18n.language === 'ko' ? 'en' : 'ko'
    void i18n.changeLanguage(next)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/5 bg-background/90 backdrop-blur">
      <div className="container-section flex h-20 items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          LoveType
        </NavLink>
        <nav className="hidden gap-8 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'transition-colors hover:text-foreground',
                  isActive ? 'text-foreground' : undefined,
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/test" className="btn-primary bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
            테스트 시작
          </NavLink>
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-border/10 bg-muted/5 px-4 py-2 text-xs font-semibold uppercase text-muted-foreground transition hover:bg-muted/10"
          >
            {i18n.language === 'ko' ? 'EN' : 'KO'}
          </button>
        </div>
      </div>
    </header>
  )
}

