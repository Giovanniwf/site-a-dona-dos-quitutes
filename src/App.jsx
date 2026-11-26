import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CardapioNatalModal from './components/CardapioNatalModal'
import PedirModal from './components/PedirModal'
import NeveNatal from './components/NeveNatal'
import Home from './pages/Home'
import './App.css'

// Conteudo do site sem o roteador. Fica separado para a pre-renderizacao do
// build poder montar a mesma arvore com um MemoryRouter no Node (o
// BrowserRouter depende de window/history e nao roda fora do navegador).
export function AppContent() {
  const [showSplash, setShowSplash] = useState(true)
  const [natalAberto, setNatalAberto] = useState(false)
  const abrirNatal = useCallback(() => setNatalAberto(true), [])
  const fecharNatal = useCallback(() => setNatalAberto(false), [])
  // janela de escolha do delivery (iFood ou 99Food), aberta pelos botoes "Pedir"
  const [pedirAberto, setPedirAberto] = useState(false)
  const abrirPedir = useCallback(() => setPedirAberto(true), [])
  const fecharPedir = useCallback(() => setPedirAberto(false), [])

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
      <NeveNatal />
      <Header onCardapioNatal={abrirNatal} onPedir={abrirPedir} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home onCardapioNatal={abrirNatal} onPedir={abrirPedir} />} />
          <Route path="/contato" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <WhatsAppButton />
      <Footer onCardapioNatal={abrirNatal} />
      <CardapioNatalModal aberto={natalAberto} onFechar={fecharNatal} />
      <PedirModal aberto={pedirAberto} onFechar={fecharPedir} />
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
