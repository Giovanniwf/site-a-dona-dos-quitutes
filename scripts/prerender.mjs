// Injeta o HTML do site dentro de dist/index.html depois do build.
//
// Motivo: o Vite entrega um index.html com <div id="root"></div> vazio, e os
// robos de IA (ChatGPT, Claude, Perplexity) em geral nao executam JavaScript —
// para eles a pagina chegava em branco. O Google ate renderiza JS, mas o HTML
// pronto tambem o ajuda. O site continua sendo uma SPA normal: ao carregar, o
// React assume a pagina por cima desse HTML.
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// fileURLToPath em vez de import.meta.dirname: funciona em qualquer Node 14+,
// incluindo versoes mais antigas que o Netlify/Cloudflare possam usar no build.
const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = resolve(raiz, 'dist/index.html')
const entradaSSR = resolve(raiz, 'dist-ssr/entry-server.js')

if (!existsSync(entradaSSR)) {
  console.error('[prerender] dist-ssr/entry-server.js nao existe. Rode o build de SSR antes.')
  process.exit(1)
}

const { render } = await import(pathToFileURL(entradaSSR).href)
const corpo = render()

if (!corpo || corpo.length < 500) {
  console.error('[prerender] HTML gerado veio vazio ou curto demais. Abortando.')
  process.exit(1)
}

const html = readFileSync(htmlPath, 'utf8')

if (!html.includes('<div id="root"></div>')) {
  console.error('[prerender] nao encontrei <div id="root"></div> em dist/index.html.')
  process.exit(1)
}

writeFileSync(htmlPath, html.replace('<div id="root"></div>', `<div id="root">${corpo}</div>`))
rmSync(resolve(raiz, 'dist-ssr'), { recursive: true, force: true })

console.log(`[prerender] dist/index.html agora tem ${corpo.length} caracteres de conteudo real.`)
