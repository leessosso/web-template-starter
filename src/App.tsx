import { Outlet } from 'react-router-dom'

import './styles/global.css'

import { Footer } from './components/layout/Footer'
import { Navigation } from './components/layout/Navigation'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navigation />
        <main className="mx-auto w-full max-w-content px-4 py-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
