// Campanha de Natal 2026.
//
// O cardapio e' mostrado dentro da janela suspensa como uma coluna de imagens,
// e nao num visualizador de PDF: assim ninguem ve a barra de ferramentas nem o
// painel de miniaturas do navegador, so as paginas.
//
// As imagens sao as proprias paginas do PDF da campanha, exportadas em WebP
// (1200px de largura). O botao de baixar continua entregando o PDF.
export const CARDAPIO_NATAL_PDF = '/cardapio-natal.pdf'

export const CARDAPIO_NATAL_PAGINAS = Array.from(
  { length: 17 },
  (_, i) => `/images/natal/pagina-${String(i + 1).padStart(2, '0')}.webp`,
)
