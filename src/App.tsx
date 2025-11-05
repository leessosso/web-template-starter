import { Outlet, useLocation } from 'react-router-dom'

import './styles/global.css'

import { Footer } from './components/layout/Footer'
import { Navigation } from './components/layout/Navigation'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toaster } from './components/ui'
import AuthGuard from './components/auth/AuthGuard'
import { useAuthStore } from './store/authStore'

// 인증이 필요하지 않은 경로들
const PUBLIC_ROUTES = ['/login', '/signup'];

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {isAuthenticated && !isPublicRoute && <Navigation />}
        <main className="mx-auto w-full max-w-content px-4 py-4">
          {isPublicRoute ? (
            <Outlet />
          ) : (
            <AuthGuard>
              <Outlet />
            </AuthGuard>
          )}
        </main>
        {isAuthenticated && !isPublicRoute && <Footer />}
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App
