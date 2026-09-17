# Deploy no Cloudflare Pages

Painel: **Workers & Pages -> Create -> Pages -> Connect to Git**.

| Campo | Valor |
|---|---|
| Production branch | `main` |
| Root directory | _(raiz)_ |
| Build command | `npm run build` |
| Build output directory | `dist` |

## Mudanca de comportamento: os 301 das imagens

Os oito redirects de `/images/*` para `/images/optimized/*` sairam do
`netlify.toml` e foram para `public/_redirects`. **No Netlify eles nunca
valeram**, porque os arquivos originais continuam existindo em
`dist/images/` e la um arquivo existente vence um redirect sem `force`. No
Cloudflare o redirect vence sempre, entao a partir do primeiro deploy eles
passam a funcionar de fato — que era a intencao original — e as versoes pesadas
deixam de ser servidas.

## Fallback de SPA

A regra `/* /index.html 200` nao existe aqui e nao deve ser criada: no
Cloudflare um redirect vence qualquer arquivo estatico, entao um catch-all
`/*` alcancaria tambem `/assets/*.js`. Como o build nao gera `404.html` na
raiz, o Cloudflare ja devolve `index.html` para rotas desconhecidas sozinho.

## Observacoes

- As regras de bloqueio que ja estavam em `public/_redirects` (`/wp-*`,
  `/.env`, `/.git/*`, `/xmlrpc.php`, `/phpmyadmin`) continuam valendo e
  funcionam igual no Cloudflare.
- `public/_headers` traz o cache longo de `/assets/*`, `/fonts/*`,
  `/images/optimized/*` e `/logo-optimized.png`.
- Os oito destinos dos 301 e a pasta `/fonts` foram conferidos no `dist/` apos
  um build: todos existem.

O `netlify.toml` foi mantido de proposito. O Cloudflare Pages nao le esse
arquivo, entao ele nao atrapalha; e ele mantem o site funcionando no Netlify
ate o DNS ser apontado para o Cloudflare, o que permite voltar atras.
As regras que precisavam valer no Cloudflare foram reescritas em `_headers` /
`_redirects`, que as duas plataformas leem.

