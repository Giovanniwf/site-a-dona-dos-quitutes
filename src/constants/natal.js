// Cardapio de Natal 2026. Precos, pesos e porcoes conferidos item a item
// contra as paginas de detalhe do PDF "ADDQ-Natal-Cardapio-Mostruario-v5".
// Caminho reservado para o PDF do cardapio. O arquivo enviado tinha 62 MB
// (fotos em JPEG 2000), pesado demais para download no celular, entao o botao
// "Baixar cardapio em PDF" sai do ar ate chegar uma exportacao mais leve.
// Para religar: colocar o arquivo em public/cardapio-natal.pdf e devolver o
// <a> em .natal-acoes apontando para esta constante.
export const CARDAPIO_NATAL_PDF = '/cardapio-natal.pdf'

export const NATAL_COMPARTILHAR = [
  {
    nome: 'Torta Cookie Nutella',
    desc: 'Massa de cookie tradicional de baunilha com gotas de chocolate ao leite e meio amargo, generosamente recheada com Nutella.',
    peso: '1300g',
    porcoes: '10 porções',
    preco: 190,
  },
  {
    nome: 'Torta Pica Pau',
    desc: 'Massa de cookie tradicional de baunilha, caramelo amanteigado de açúcar mascavo e fina camada de chocolate meio amargo.',
    peso: '1300g',
    porcoes: '10 porções',
    preco: 160,
  },
  {
    nome: 'Torta Natalina',
    desc: 'Massa sucrée com a combinação de castanha-do-pará e frutas cristalizadas, com um creme de caramelo imperdível.',
    peso: '800g',
    porcoes: '10 porções',
    preco: 160,
  },
  {
    nome: 'Cheesecake',
    desc: 'Base de biscoito amanteigado e especiarias, creme à base de queijo cremoso e nossa geleia artesanal de frutas vermelhas.',
    peso: '1500g',
    porcoes: '10 porções',
    preco: 140,
  },
  {
    nome: 'Torta Morango',
    desc: 'Torta de massa sucrée, creme de confeiteiro, morangos selecionados e merengue para finalizar.',
    peso: '800g',
    porcoes: '10 porções',
    preco: 120,
  },
  {
    nome: 'Merengue de Morango',
    desc: 'Base do nosso bolo branco, morangos, creme de brigadeiro branco, chantilly e suspiro.',
    peso: '1000g',
    porcoes: '10 porções',
    preco: 100,
  },
  {
    nome: 'Banoffee',
    desc: 'Biscoito artesanal triturado, camada de doce de leite também artesanal, bananas e chantilly.',
    peso: '1300g',
    porcoes: '10 porções',
    preco: 100,
  },
  {
    nome: 'Guirlanda Brownie',
    desc: 'Brownie de cacau coberto com brigadeiro de chocolate meio amargo e brigadeiro de ninho, morangos e brigadeiros para enfeitar sua mesa de Natal.',
    peso: '1000g',
    porcoes: '8 porções',
    preco: 100,
  },
  {
    nome: 'Tiramissu',
    desc: 'Bases intercaladas de bolo, biscoito champanhe com café e creme de queijo com licor de laranja.',
    peso: '800g',
    porcoes: '8 porções',
    preco: 100,
  },
  {
    nome: 'Bolo Natalino',
    desc: 'Bolo à base de melaço de cana, muito perfumado com canela e noz-moscada, nozes e uvas passas pretas.',
    peso: '800g',
    porcoes: '12 porções',
    preco: 60,
  },
]

export const NATAL_INDIVIDUAIS = [
  {
    nome: 'Brownietone',
    desc: 'Brownie cremoso de cacau, pedaços de chocotone e gotas de chocolate branco.',
    peso: '250g',
    porcoes: 'porção individual',
    preco: 35,
  },
  {
    nome: 'Mini Chocotone Recheado',
    desc: 'Recheios: brigadeiro tradicional, brigadeiro de ninho com Nutella, brigadeiro de pistache ou brigadeiro de caramelo salgado.',
    peso: '200g',
    porcoes: 'porção individual',
    preco: 30,
  },
  {
    nome: 'Caixinha Árvore de Natal',
    desc: '6 brigadeiros em embalagem de árvore de Natal.',
    peso: '120g',
    porcoes: 'porção individual',
    preco: 30,
  },
  {
    nome: 'Caixinha com 4 Brigadeiros',
    desc: 'Quatro brigadeiros em caixinha exclusiva da campanha.',
    peso: '80g',
    porcoes: 'porção individual',
    preco: 24,
  },
  {
    nome: 'Trio de Brigadeiros',
    desc: 'Três brigadeiros em embalagem exclusiva.',
    peso: '60g',
    porcoes: 'porção individual',
    preco: 20,
  },
  {
    nome: 'Guirlanda Brownie Individual',
    desc: 'A versão individual da guirlanda, com embalagem exclusiva.',
    peso: '130g',
    porcoes: 'porção individual',
    preco: 20,
  },
  {
    nome: 'Pão de Mel',
    desc: 'A combinação perfeita de pão de mel e doce de leite, banhados em chocolate meio amargo.',
    peso: '75g',
    porcoes: 'porção individual',
    preco: 18,
  },
  {
    nome: 'Bem Natalino',
    desc: 'Nosso bem-casado natalino, com embalagem exclusiva.',
    peso: '35g',
    porcoes: 'porção individual',
    preco: 9,
  },
]
