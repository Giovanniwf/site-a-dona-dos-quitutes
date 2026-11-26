import { useEffect, useRef } from 'react'
import { APP99_LINK, IFOOD_LINK } from '../constants/contact'
import './PedirModal.css'

/**
 * Janela de escolha do delivery: os botoes "Pedir" do site abrem aqui, e daqui
 * o cliente segue para o iFood ou para o 99Food.
 *
 * Mesma base do cardapio de Natal: <dialog> nativo, porque o Esc para fechar,
 * o foco preso dentro da janela e o fundo inerte vem prontos do navegador.
 */

const APPS = [
  {
    nome: 'iFood',
    href: IFOOD_LINK,
    desc: 'Nossa loja no app de sempre',
    classe: 'pedir-opcao--ifood',
  },
  {
    nome: '99Food',
    href: APP99_LINK,
    desc: 'Também entregamos pelo 99',
    classe: 'pedir-opcao--99',
  },
]

export default function PedirModal({ aberto, onFechar }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (aberto && !dialog.open) dialog.showModal()
    if (!aberto && dialog.open) dialog.close()

    // o <dialog> sozinho nao trava a rolagem do fundo em todos os navegadores
    document.body.classList.toggle('sem-rolagem', aberto)
    return () => document.body.classList.remove('sem-rolagem')
  }, [aberto])

  // O evento "close" do <dialog> nao borbulha, entao a prop onClose do React
  // nao dispara quando o usuario fecha no Esc. Sem escutar o evento nativo, o
  // estado aqui continuaria "aberto": a pagina ficaria travada e a janela nao
  // reabriria no proximo clique.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const aoFechar = () => onFechar()
    dialog.addEventListener('close', aoFechar)
    return () => dialog.removeEventListener('close', aoFechar)
  }, [onFechar])

  return (
    <dialog
      ref={dialogRef}
      className="pedir-modal"
      aria-labelledby="pedir-modal-titulo"
      onClick={(e) => { if (e.target === dialogRef.current) onFechar() }}
    >
      <div className="pedir-modal-caixa">
        <button type="button" className="pedir-fechar" onClick={onFechar} aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h2 id="pedir-modal-titulo" className="script pedir-titulo">Como prefere pedir?</h2>
        <p className="pedir-desc">Escolha o aplicativo de entrega e a gente já começa a preparar.</p>

        <div className="pedir-opcoes">
          {APPS.map((app) => (
            <a
              key={app.nome}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`pedir-opcao ${app.classe}`}
              onClick={onFechar}
            >
              <span className="pedir-opcao-nome">{app.nome}</span>
              <span className="pedir-opcao-desc">{app.desc}</span>
              <span className="pedir-opcao-seta" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h13" />
                  <polyline points="12 6 18 12 12 18" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </dialog>
  )
}
