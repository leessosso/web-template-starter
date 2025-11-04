import { NavLink } from 'react-router-dom'
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Box
} from '@mui/material'
import { useState } from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuthStore } from '../../store/authStore'

const navItems = [
  { to: '/', label: '대시보드' },
  { to: '/students', label: '학생 관리' },
  { to: '/attendance', label: '출석 관리' },
  { to: '/handbook', label: '핸드북' },
  { to: '/reports', label: '보고서' },
]

export function Navigation() {
  const { user, signOut } = useAuthStore()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    handleClose()
    await signOut()
  }

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/5 bg-background/90 backdrop-blur">
        <div className="container-section flex h-16 items-center justify-between">
          <NavLink to="/" className="text-lg font-semibold text-foreground">
            AWANA LMS
          </NavLink>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden gap-6 text-sm font-medium text-muted-foreground md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'transition-colors hover:text-foreground py-2 px-3 rounded-md',
                    isActive ? 'text-foreground bg-muted' : undefined,
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* 데스크톱 사용자 메뉴 */}
          <div className="hidden items-center gap-2 md:flex">
            <Typography variant="body2" sx={{ mr: 2 }}>
              {user?.churchName} - {user?.displayName}님
            </Typography>
            <Button
              size="small"
              onClick={handleMenu}
              startIcon={<AccountCircle />}
              sx={{ textTransform: 'none' }}
            >
              계정
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>프로필</MenuItem>
              <MenuItem onClick={handleClose}>설정</MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </Menu>
          </div>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <IconButton
            className="md:hidden"
            color="inherit"
            aria-label="메뉴 열기"
            onClick={handleMobileMenuToggle}
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </header>

      {/* 모바일 드로어 메뉴 */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: 'background.paper',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            메뉴
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* 네비게이션 메뉴 */}
          <List>
            {navItems.map((item) => (
              <ListItem key={item.to} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.to}
                  onClick={handleMobileMenuClose}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* 사용자 정보 및 계정 메뉴 */}
          {user && (
            <>
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {user.churchName}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {user.displayName}님
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleMobileMenuClose}>
                    <ListItemText primary="프로필" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleMobileMenuClose}>
                    <ListItemText primary="설정" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="로그아웃" />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
          )}
        </Box>
      </Drawer>
    </>
  )
}

