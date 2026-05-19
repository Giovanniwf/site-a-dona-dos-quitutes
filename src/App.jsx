import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSplash(false)
    }, 1350)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <div className={`app-splash ${showSplash ? 'is-visible' : 'is-hidden'}`} aria-hidden={!showSplash}>
        <div className="app-splash-mark">
          <div className="app-splash-glow" />
          <img
            src="/logo.png"
            alt="A Dona dos Quitutes"
            className="app-splash-logo"
            fetchPriority="high"
          />
        </div>
      </div>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  )
}

export default App
