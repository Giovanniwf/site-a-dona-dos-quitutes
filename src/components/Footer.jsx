import { Link } from 'react-router-dom'
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from '../constants/contact'
import './Footer.css'

const IFOOD = 'https://www.ifood.com.br/delivery/paulinia-sp/a-dona-dos-quitutes---confeitaria-artesanal-jardim-america/84ab3b0f-1d9c-4676-9cd5-b750085f2a4c'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link
            to="/"
            className="footer-logo"
            aria-label="A Dona dos Quitutes - inicio"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/logo.png"
              alt="A Dona dos Quitutes"
              className="footer-logo-img"
              loading="lazy"
              decoding="async"
            />
          </Link>
        </div>

        <div className="footer-nav">
          <h4 className="footer-nav-title">Menu</h4>
          <Link to="/">Inicio</Link>
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Cardapio em breve!') }}>Cardapio</a>
          <a href="#contato">Contato</a>
          <a href={IFOOD} target="_blank" rel="noopener noreferrer">iFood</a>
        </div>

        <div className="footer-nav">
          <h4 className="footer-nav-title">Contato</h4>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">{WHATSAPP_NUMBER}</a>
          <a href="https://instagram.com/adonadosquitutes" target="_blank" rel="noopener noreferrer">
            @adonadosquitutes
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} A Dona dos Quitutes</p>
      </div>

      <div className="footer-credit">
        <a
          href="https://zeoxy.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-zeoxy"
        >
          Feito por <strong>Zeoxy</strong>
        </a>
      </div>
    </footer>
  )
}
