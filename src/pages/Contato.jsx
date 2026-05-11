import './Contato.css'
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from '../constants/contact'

export default function Contato() {
  return (
    <div className="contato">
      <section className="contato-hero">
        <div className="contato-hero-inner">
          <p className="contato-eyebrow">- Estamos aqui -</p>
          <h1 className="contato-titulo">Fale Conosco</h1>
          <p className="contato-hero-sub">
            Adoramos atender nossos clientes. Entre em contato ou faca seu pedido pelo iFood!
          </p>
        </div>
      </section>

      <section className="contato-body">
        <div className="contato-grid">
          <div className="info-card">
            <div className="info-icon">🕐</div>
            <h3 className="info-label">Horarios</h3>
            <p>Segunda a sexta</p>
            <p className="info-hora">11:00 as 22:00</p>
            <p>Sabado e domingo</p>
            <p className="info-hora">11:00 as 24:00</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3 className="info-label">WhatsApp</h3>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="info-link">
              {WHATSAPP_NUMBER}
            </a>
            <p>Atendimento rapido por mensagem.</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📱</div>
            <h3 className="info-label">Redes Sociais</h3>
            <div className="info-social">
              <a href="https://instagram.com/adonadosquitutes" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
                @adonadosquitutes
              </a>
              <a
                href="https://www.ifood.com.br/delivery/paulinia-sp/a-dona-dos-quitutes---confeitaria-artesanal-jardim-america/84ab3b0f-1d9c-4676-9cd5-b750085f2a4c"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
                Ver no iFood
              </a>
            </div>
          </div>
        </div>

        <div className="contato-cta">
          <p>Pronto para pedir?</p>
          <a
            href="https://www.ifood.com.br/delivery/paulinia-sp/a-dona-dos-quitutes---confeitaria-artesanal-jardim-america/84ab3b0f-1d9c-4676-9cd5-b750085f2a4c"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ifood-cta"
          >
            Abrir no iFood
          </a>
        </div>
      </section>
    </div>
  )
}
