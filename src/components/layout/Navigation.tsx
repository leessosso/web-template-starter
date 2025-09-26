import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const navItems = [
  { to: '/', key: 'navigation.home' },
  { to: '/service', key: 'navigation.service' },
  { to: '/product', key: 'navigation.product' },
  { to: '/portfolio', key: 'navigation.portfolio' },
  { to: '/analytics', key: 'navigation.analytics' },
]

export function Navigation() {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const next = i18n.language === 'ko' ? 'en' : 'ko'
    void i18n.changeLanguage(next)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/90 backdrop-blur">
      <div className="container-section flex h-20 items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold text-white">
          WebTemplateStudio
        </NavLink>
        <nav className="hidden gap-8 text-sm font-medium text-slate-300 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'transition-colors hover:text-white',
                  isActive ? 'text-white' : undefined,
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
          <NavLink to="/contact" className="btn-primary">
            {t('navigation.contact')}
          </NavLink>
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase text-slate-200 transition hover:bg-white/10"
          >
            {i18n.language === 'ko' ? 'EN' : 'KO'}
          </button>
        </div>
      </div>
    </header>
  )
}

