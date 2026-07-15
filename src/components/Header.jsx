import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const IFOOD = 'https://www.ifood.com.br/delivery/paulinia-sp/a-dona-dos-quitutes---confeitaria-artesanal-jardim-america/84ab3b0f-1d9c-4676-9cd5-b750085f2a4c'
const LOGO_IMAGE = '/logo-optimized.png'

function Whisk() {
  return (
    <svg className="whisk-svg" viewBox="0 0 44 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="46" width="8" height="24" rx="4" fill="#96257c" />
      <ellipse cx="22" cy="28" rx="16" ry="20" fill="none" stroke="#96257c" strokeWidth="5" />
      <path d="M12 10 Q17 28 12 46" stroke="#96257c" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M22 7 Q22 28 22 48" stroke="#96257c" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M32 10 Q27 28 32 46" stroke="#96257c" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function LogoCss() {
  return (
    <div className="logo-css">
      <span className="logo-top">A DONA DOS</span>
      <div className="logo-row">
        <span className="logo-main">Quitutes</span>
        <div className="logo-whisk"><Whisk /></div>
      </div>
    </div>
  )
}

function Logo() {
  const [imgErr, setImgErr] = useState(false)

  return (
    <Link
      to="/"
      className="logo-link"
      aria-label="A Dona dos Quitutes - início"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      {imgErr ? (
        <LogoCss />
      ) : (
        <img
          src={LOGO_IMAGE}
          alt="A Dona dos Quitutes"
          className="logo-img"
          decoding="async"
          onError={() => setImgErr(true)}
        />
      )}
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner">
        <Logo />

        <nav className={`nav ${open ? 'nav--open' : ''}`}>
          <a
            href="/cardapio.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Cardápio
          </a>
          <a href={IFOOD} target="_blank" rel="noopener noreferrer" className="nav-link">
            iFood
          </a>
          <a href="#contato" className="nav-link" onClick={() => setOpen(false)}>
            Contato
          </a>
          <a href={IFOOD} target="_blank" rel="noopener noreferrer" className="nav-cta">
            Pedir Agora
          </a>
        </nav>

        <button className="burger" aria-label="Menu" onClick={() => setOpen((value) => !value)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
