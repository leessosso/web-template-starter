import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import { LanguageSelector } from '../ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const navItems = [
  { to: '/', key: 'navigation.home' },
  { to: '/test', key: 'navigation.test' },
  { to: '/types', key: 'navigation.types' },
]

export function Navigation() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 border-b border-border/5 bg-background/90 backdrop-blur">
      <div className="container-section flex h-20 items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          LoveType
        </NavLink>

        {/* 데스크톱 네비게이션 */}
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

        {/* 데스크톱 액션 버튼들 */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSelector />
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center justify-center gap-2 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-2 bg-white shadow-xl border-2">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <NavLink
                    to={item.to}
                    className="w-full cursor-pointer text-gray-900 hover:bg-gray-100"
                  >
                    {t(item.key)}
                  </NavLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

