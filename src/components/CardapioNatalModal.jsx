import { useEffect, useRef } from 'react'
import { CARDAPIO_NATAL_PAGINAS, CARDAPIO_NATAL_PDF } from '../constants/natal'
import { WHATSAPP_LINK } from '../constants/contact'
import './CardapioNatalModal.css'

const PEDIDO_WHATSAPP = `${WHATSAPP_LINK}?text=${encodeURIComponent('Olá! Quero encomendar os quitutes de Natal.')}`

/**
 * Cardapio de Natal numa janela suspensa: as paginas da campanha em coluna,
 * para rolar como um folheto.
 *
 * Sao imagens, e nao um <iframe> com o PDF, porque o leitor embutido do
 * navegador traz junto a barra de ferramentas e o painel de miniaturas, que
 * nao combinam com o site e atrapalham no celular. O PDF continua inteiro no
 * botao de baixar.
 *
 * Usa o <dialog> nativo em vez de uma div com position:fixed — assim o Esc
 * para fechar, o foco preso dentro da janela e o fundo inerte vem prontos do
 * navegador, sem precisar reimplementar nada disso.
 */
export default function CardapioNatalModal({ aberto, onFechar }) {
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
      className="natal-modal"
      aria-labelledby="natal-modal-titulo"
      onClick={(e) => { if (e.target === dialogRef.current) onFechar() }}
    >
      <div className="natal-modal-caixa">
        <header className="natal-modal-topo">
          <div>
            <p className="natal-eyebrow">Aberta a agenda de encomendas</p>
            <h2 id="natal-modal-titulo" className="script natal-titulo">Quitutes de Natal</h2>
          </div>
          <button type="button" className="natal-fechar" onClick={onFechar} aria-label="Fechar o cardápio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="natal-modal-corpo">
          {/* so monta as paginas quando a janela abre: quem nunca clicar no
              cardapio nao baixa nenhuma imagem */}
          {aberto && (
            <div className="natal-paginas">
              {CARDAPIO_NATAL_PAGINAS.map((pagina, i) => (
                <img
                  key={pagina}
                  src={pagina}
                  alt={`Cardápio de Natal — página ${i + 1} de ${CARDAPIO_NATAL_PAGINAS.length}`}
                  width="1200"
                  height="1500"
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable="false"
                />
              ))}
            </div>
          )}
        </div>

        <footer className="natal-modal-rodape">
          <a href={PEDIDO_WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn--natal">
            Fazer pedido no WhatsApp
          </a>
          <a href={CARDAPIO_NATAL_PDF} download className="natal-baixar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12" />
              <polyline points="7 11 12 16 17 11" />
              <path d="M4 19h16" />
            </svg>
            Baixar cardápio
          </a>
        </footer>
      </div>
    </dialog>
  )
}
