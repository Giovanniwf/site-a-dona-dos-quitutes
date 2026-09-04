import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import InstagramFeed from '../components/InstagramFeed'
import {
  IFOOD_LINK,
  INSTAGRAM_HANDLE,
  INSTAGRAM_LINK,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
} from '../constants/contact'
import './Home.css'

const heroSlides = [
  // "cheio" = recorte sem fundo, ocupa toda a area; as fotos entram menores, coladas embaixo/direita
  { src: '/images/brand/cookie.png', alt: 'Cookie recheado com chocolate branco', cheio: true },
  { src: '/images/brand/brigadeiro.png', alt: 'Brigadeiro artesanal' },
  { src: '/images/brand/morango.png', alt: 'Doce de morango' },
]

const cards = [
  {
    icon: '/images/brand/icone1.png',
    titulo: 'Faça seu pedido online',
    desc: 'Peça seus quitutes favoritos de forma rápida e prática, sem sair de casa.',
  },
  {
    icon: '/images/brand/icone2.png',
    titulo: 'Receba no conforto do seu lar',
    desc: 'Realizamos entregas rápidas e seguras para que você possa desfrutar dos nossos quitutes no conforto da sua casa.',
  },
  {
    icon: '/images/brand/icone3.png',
    titulo: 'Saboreie cada momento',
    desc: 'Aproveite nossos quitutes fresquinhos, feitos com carinho, para tornar seu dia ainda mais especial.',
  },
]

const produtos = [
  { src: '/images/cookies_variados.jpg', nome: 'Cookies Variados', desc: 'Cookies artesanais recheados com sabores irresistíveis!' },
  { src: '/images/Brownie_Tradicional.jpg', nome: 'Brownie Tradicional', desc: 'Macio por dentro, intenso no chocolate e perfeito a cada mordida.' },
  { src: '/images/Pao_de_mel.jpg', nome: 'Pão de Mel', desc: 'Massa macia e recheio cremoso, com cobertura de chocolate deliciosa.' },
  { src: '/images/optimized/produto4.jpg', nome: 'Tortinha de Banana', desc: 'Base crocante, banana caramelizada e chantilly fresco.' },
]

function emBreve(event) {
  event.preventDefault()
  window.alert('Cardápio em breve!')
}

function ProductCard({ src, nome, desc }) {
  const [err, setErr] = useState(false)

  return (
    <article className="produto-card">
      <div className="produto-img-wrap">
        {!err ? (
          <img
            src={src}
            alt={nome}
            className="produto-img"
            loading="lazy"
            decoding="async"
            onError={() => setErr(true)}
          />
        ) : (
          <div className="produto-img-fallback"><span>🍪</span></div>
        )}
      </div>
      <div className="produto-info">
        <h3 className="produto-nome">{nome}</h3>
        <p className="produto-desc">{desc}</p>
      </div>
    </article>
  )
}

export default function Home() {
  const [slide, setSlide] = useState(0)

  const [cfRef, cfInView] = useInView()
  const [prodRef, prodInView] = useInView()
  const [entRef, entInView] = useInView()
  const [sobreRef, sobreInView] = useInView()
  const [contatoRef, contatoInView] = useInView()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSlide((current) => (current + 1) % heroSlides.length)
    }, 4200)

    return () => window.clearTimeout(timer)
  }, [slide])

  return (
    <div className="home">
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero-visual">
          {heroSlides.map((item, index) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className={`hero-img ${item.cheio ? '' : 'hero-img--foto'} ${slide === index ? 'is-active' : ''}`}
              fetchPriority={index === 0 ? 'high' : 'low'}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
        </div>

        <div className="hero-inner">
          <div className="hero-card">
            <h1 className="script hero-titulo">Sabor que surpreende</h1>
            <p className="hero-desc">
              Quitutes artesanais preparados com muito carinho,
              para adoçar cada momento especial.
            </p>
            <div className="hero-actions">
              <a href={IFOOD_LINK} target="_blank" rel="noopener noreferrer" className="btn btn--purple">
                Pedir pelo iFood
              </a>
              <a href="#cardapio" className="btn btn--purple" onClick={emBreve}>
                Ver o Cardápio
              </a>
            </div>
          </div>
        </div>

        <div className="hero-dots" role="tablist" aria-label="Destaques">
          {heroSlides.map((item, index) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={slide === index}
              aria-label={`Mostrar ${item.alt}`}
              className={`hero-dot ${slide === index ? 'is-active' : ''}`}
              onClick={() => setSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* ---------------- COMO FUNCIONA ---------------- */}
      <section className="como-funciona" ref={cfRef}>
        <div className="section-shell cf-grid">
          {cards.map((card, index) => (
            <article
              key={card.titulo}
              className={`cf-card anim-up ${cfInView ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="cf-icon">
                <img src={card.icon} alt="" loading="lazy" decoding="async" />
              </div>
              <h3 className="cf-titulo">{card.titulo}</h3>
              <p className="cf-desc">{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- PRODUTOS ---------------- */}
      <section className="produtos" id="cardapio" ref={prodRef}>
        <div className="section-shell">
          <div className={`produtos-head anim-up ${prodInView ? 'visible' : ''}`}>
            <h2 className="script produtos-titulo">Alguns de nossos quitutes</h2>
            <p className="produtos-sub">
              Uma pequena amostra do que preparamos com amor todos os dias
              e também daqueles de edição limitada.
            </p>
          </div>
        </div>

        <div className="produtos-marquee">
          <div className="produtos-trilha">
            {produtos.map((produto) => <ProductCard key={produto.nome} {...produto} />)}
          </div>
        </div>
      </section>

      {/* ---------------- ENTREGAS ---------------- */}
      <section className="entregas" ref={entRef}>
        <div className="section-shell entregas-inner">
          <div className={`entregas-text anim-left ${entInView ? 'visible' : ''}`}>
            <p className="entregas-eyebrow">Saboreie a conveniência</p>
            <h2 className="script entregas-titulo">Entregas Rápidas</h2>
            <p className="entregas-desc">
              Desfrute da praticidade de receber os nossos quitutes no conforto
              do seu lar. Faça agora o seu pedido e saboreie quitutes deliciosos.
            </p>
          </div>

          <div className={`entregas-visual anim-right ${entInView ? 'visible' : ''}`}>
            <img src="/images/brand/sacola.png" alt="Sacola A Dona dos Quitutes" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="entregas-actions">
          <div className="section-shell entregas-actions-inner">
            <a href={IFOOD_LINK} target="_blank" rel="noopener noreferrer" className="btn btn--gold">
              Pedir pelo iFood
            </a>
            <a href="#cardapio" className="btn btn--ghost-cream" onClick={emBreve}>
              Ver o Cardápio
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- SOBRE ---------------- */}
      <section className="sobre" ref={sobreRef}>
        <div className="section-shell sobre-inner">
          <div className={`sobre-visual anim-left ${sobreInView ? 'visible' : ''}`}>
            <div className="sobre-circulo">
              <img
                src="/images/brand/personagem2.png"
                alt="Confeiteira da Dona dos Quitutes"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className={`sobre-text anim-right ${sobreInView ? 'visible' : ''}`}>
            <h2 className="script sobre-titulo">
              <span className="sobre-titulo-1">Nascemos da</span>
              <span className="sobre-titulo-2">paixão pelos sabores</span>
            </h2>
            <p className="sobre-desc">
              A Dona dos Quitutes nasceu do desejo de compartilhar receitas artesanais
              cheias de sabor e carinho. Cada doce é preparado com ingredientes frescos
              e muito amor, do início ao fim.
            </p>
            <p className="sobre-desc">
              Estamos prontos para tornar o seu dia mais doce e especial.
            </p>
            <a href="#contato" className="sobre-link">Onde nos encontrar -&gt;</a>
          </div>
        </div>
      </section>

      <InstagramFeed />

      {/* ---------------- CONTATO ---------------- */}
      <section className="contato" id="contato" ref={contatoRef}>
        <div className="section-shell">
          <h2 className={`script contato-titulo anim-up ${contatoInView ? 'visible' : ''}`}>
            Onde nos Encontrar
          </h2>

          <div className="contato-grid">
            <article className={`contato-card anim-up ${contatoInView ? 'visible' : ''}`} style={{ transitionDelay: '80ms' }}>
              <span className="contato-icone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15.5 14" />
                </svg>
              </span>
              <h3 className="contato-card-titulo">Horários</h3>
              <p>Dom – Qui: 8h às 21h</p>
              <p>Sex – Sáb: 8h às 23h</p>
            </article>

            <a
              className={`contato-card anim-up ${contatoInView ? 'visible' : ''}`}
              style={{ transitionDelay: '180ms' }}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contato-icone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l1.08-1.08a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <h3 className="contato-card-titulo">WhatsApp</h3>
              <p>{WHATSAPP_NUMBER}</p>
              <p className="contato-card-nota">Atendimento por mensagem.</p>
            </a>

            <a
              className={`contato-card anim-up ${contatoInView ? 'visible' : ''}`}
              style={{ transitionDelay: '280ms' }}
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contato-icone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <h3 className="contato-card-titulo">Instagram</h3>
              <p>{INSTAGRAM_HANDLE}</p>
            </a>
          </div>

          <div className={`contato-ifood anim-up ${contatoInView ? 'visible' : ''}`} style={{ transitionDelay: '360ms' }}>
            <p>Prefere pedir pelo iFood?</p>
            <a href={IFOOD_LINK} target="_blank" rel="noopener noreferrer" className="btn btn--white">
              Abrir no iFood
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
