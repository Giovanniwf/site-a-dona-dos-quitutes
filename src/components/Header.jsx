import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IFOOD_LINK } from '../constants/contact'
import './Header.css'

const LOGO = '/images/brand/logo-creme.png'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header-inner">
        <Link
          to="/"
          className="logo-link"
          aria-label="A Dona dos Quitutes - início"
          onClick={() => { close(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <img src={LOGO} alt="A Dona dos Quitutes" className="logo-img" decoding="async" />
        </Link>

        <nav className={`nav ${open ? 'nav--open' : ''}`}>
          <a
            href="#cardapio"
            className="nav-link"
            onClick={(e) => { e.preventDefault(); close(); window.alert('Cardápio em breve!') }}
          >
            Cardápio
          </a>
          <a href={IFOOD_LINK} target="_blank" rel="noopener noreferrer" className="nav-link" onClick={close}>
            iFood
          </a>
          <a
            href="#contato"
            className="nav-link"
            onClick={(e) => { e.preventDefault(); close(); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Contato
          </a>
          <a href={IFOOD_LINK} target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={close}>
            Pedir Agora
          </a>
        </nav>

        <button
          className={`burger ${open ? 'burger--open' : ''}`}
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
