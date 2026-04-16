import { Link } from 'react-router-dom'
import './Footer.css'

const IFOOD = 'https://www.ifood.com.br/delivery/paulinia-sp/a-dona-dos-quitutes---confeitaria-artesanal-jardim-america/84ab3b0f-1d9c-4676-9cd5-b750085f2a4c'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <div className="footer-logo">
            <img
              src="/logo.png"
              alt="A Dona dos Quitutes"
              className="footer-logo-img"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="footer-tagline">Iguarias artesanais feitas com amor.</p>
        </div>

        <div className="footer-nav">
          <h4 className="footer-nav-title">Menu</h4>
          <Link to="/">Início</Link>
          <a href="#" onClick={e => { e.preventDefault(); alert('Cardápio em breve!') }}>Cardápio</a>
          <a href="#contato">Contato</a>
          <a href={IFOOD} target="_blank" rel="noopener noreferrer">iFood</a>
        </div>

        <div className="footer-nav">
          <h4 className="footer-nav-title">Contato</h4>
          <span>Rua Prates, 194 — Bom Retiro</span>
          <span>São Paulo - SP</span>
          <span>(11) 3456-7890</span>
          <a href="https://instagram.com/adonadosquitutes" target="_blank" rel="noopener noreferrer">
            @adonadosquitutes
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} A Dona dos Quitutes</p>
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
