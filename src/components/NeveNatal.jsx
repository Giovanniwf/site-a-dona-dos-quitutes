import './NeveNatal.css'

// Posicao, tamanho, duracao e atraso fixos: sorteio em tempo de execucao
// deixaria a neve diferente a cada carregamento e quebraria a pre-renderizacao
// (servidor e navegador gerariam valores distintos).
const FLOCOS = [
  { esquerda: 4, tamanho: 9, duracao: 15, atraso: 0, desvio: 26, brilho: 0.7 },
  { esquerda: 12, tamanho: 6, duracao: 19, atraso: 4, desvio: -18, brilho: 0.5 },
  { esquerda: 19, tamanho: 11, duracao: 13, atraso: 8, desvio: 34, brilho: 0.8 },
  { esquerda: 27, tamanho: 7, duracao: 17, atraso: 2, desvio: -28, brilho: 0.55 },
  { esquerda: 35, tamanho: 10, duracao: 21, atraso: 6, desvio: 20, brilho: 0.65 },
  { esquerda: 43, tamanho: 5, duracao: 14, atraso: 11, desvio: -22, brilho: 0.45 },
  { esquerda: 51, tamanho: 12, duracao: 18, atraso: 1, desvio: 30, brilho: 0.75 },
  { esquerda: 59, tamanho: 8, duracao: 16, atraso: 9, desvio: -16, brilho: 0.6 },
  { esquerda: 67, tamanho: 6, duracao: 20, atraso: 5, desvio: 24, brilho: 0.5 },
  { esquerda: 74, tamanho: 11, duracao: 15, atraso: 13, desvio: -30, brilho: 0.7 },
  { esquerda: 82, tamanho: 7, duracao: 22, atraso: 3, desvio: 18, brilho: 0.55 },
  { esquerda: 89, tamanho: 9, duracao: 17, atraso: 10, desvio: -24, brilho: 0.65 },
  { esquerda: 95, tamanho: 6, duracao: 19, atraso: 7, desvio: 28, brilho: 0.5 },
  { esquerda: 23, tamanho: 5, duracao: 23, atraso: 14, desvio: 16, brilho: 0.4 },
  { esquerda: 63, tamanho: 10, duracao: 14, atraso: 16, desvio: -20, brilho: 0.6 },
  { esquerda: 8, tamanho: 8, duracao: 20, atraso: 12, desvio: 22, brilho: 0.55 },
]

/**
 * Neve de Natal: camada fixa sobre o site, sem capturar cliques e sem mexer em
 * nenhum elemento existente. Some sozinha para quem pediu menos animacao no
 * sistema (prefers-reduced-motion) — ver NeveNatal.css.
 */
export default function NeveNatal() {
  return (
    <div className="neve" aria-hidden="true">
      {FLOCOS.map((f, i) => (
        <span
          key={i}
          className="neve-floco"
          style={{
            left: `${f.esquerda}%`,
            width: `${f.tamanho}px`,
            height: `${f.tamanho}px`,
            opacity: f.brilho,
            animationDuration: `${f.duracao}s`,
            animationDelay: `-${f.atraso}s`,
            '--desvio': `${f.desvio}px`,
          }}
        />
      ))}
    </div>
  )
}
