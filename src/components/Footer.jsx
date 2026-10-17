import { Link } from 'react-router-dom'
import Covabra from './Covabra'
import {
  CARDAPIO_PDF,
  ENDERECO_BAIRRO,
  ENDERECO_RUA,
  IFOOD_LINK,
  INSTAGRAM_HANDLE,
  INSTAGRAM_LINK,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
} from '../constants/contact'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer-inner">
        <Link
          to="/"
          className="footer-logo"
          aria-label="A Dona dos Quitutes - início"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/images/brand/logo-creme.png"
            alt="A Dona dos Quitutes"
            loading="lazy"
            decoding="async"
          />
        </Link>

        <nav className="footer-col">
          <h4 className="footer-col-titulo">Menu</h4>
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Início</Link>
          <a href={CARDAPIO_PDF} target="_blank" rel="noopener noreferrer">
            Cardápio
          </a>
          <a href="#contato">Contato</a>
          <a href={IFOOD_LINK} target="_blank" rel="noopener noreferrer">iFood</a>
        </nav>

        <div className="footer-col">
          <h4 className="footer-col-titulo">Contato</h4>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">{WHATSAPP_NUMBER}</a>
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">{INSTAGRAM_HANDLE}</a>

          <address className="footer-endereco">
            <span>{ENDERECO_RUA}</span>
            <span>{ENDERECO_BAIRRO}</span>
            <span className="footer-covabra">
              na praça de alimentação do Covabra, Paulínia
            </span>
          </address>

          <Covabra className="footer-selo" />
        </div>
      </div>

      <p className="footer-resumo">
        Confeitaria artesanal em Paulínia-SP: cookies, brownies, pão de mel e tortinhas
        feitos à mão. Visite a nossa loja no Covabra de Paulínia ou peça pelo WhatsApp
        e pelo iFood, com entrega.
      </p>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} A Dona dos Quitutes</p>
        <a href="https://zeoxy.com.br" target="_blank" rel="noopener noreferrer" className="footer-zeoxy">
          Feito por <strong>Zeoxy</strong>
        </a>
      </div>
    </footer>
  )
}
