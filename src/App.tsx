import { Outlet } from 'react-router-dom'

import './styles/global.css'

import { Footer } from './components/layout/Footer'
import { Navigation } from './components/layout/Navigation'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="mx-auto w-full max-w-content px-4 py-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
