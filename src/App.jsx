import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import './App.css'

// Conteudo do site sem o roteador. Fica separado para a pre-renderizacao do
// build poder montar a mesma arvore com um MemoryRouter no Node (o
// BrowserRouter depende de window/history e nao roda fora do navegador).
export function AppContent() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSplash(false)
    }, 1350)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <div className={`app-splash ${showSplash ? 'is-visible' : 'is-hidden'}`} aria-hidden={!showSplash}>
        <div className="app-splash-mark">
          <div className="app-splash-glow" />
          <img
            src="/images/brand/logo-roxo.png"
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
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
