import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import InstagramFeed from '../components/InstagramFeed'
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from '../constants/contact'
import './Home.css'
import icone1 from '../assets/icone1.png'
import icone2 from '../assets/icone2.png'
import icone3 from '../assets/icone3.png'

const IFOOD = 'https://www.ifood.com.br/delivery/paulinia-sp/a-dona-dos-quitutes---confeitaria-artesanal-jardim-america/84ab3b0f-1d9c-4676-9cd5-b750085f2a4c'
const HERO_IMAGE = '/images/optimized/hero-torta.png'
const ENTREGA_IMAGE = '/images/optimized/entrega.png'
const SOBRE_IMAGE = '/images/optimized/sobre.png'

const produtos = [
  { src: '/images/cookies_variados.jpg', alt: 'Cookies Variados', nome: 'Cookies Variados', desc: 'Selecao de cookies artesanais com sabores irresistiveis.' },
  { src: '/images/Brownie_Tradicional.jpg', alt: 'Brownie Tradicional', nome: 'Brownie Tradicional', desc: 'Macio por dentro, intenso no chocolate e perfeito a cada mordida.' },
  { src: '/images/Pao_de_mel.jpg', alt: 'Pão de Mel', nome: 'Pão de Mel', desc: 'Massa macia e especiada com cobertura de chocolate deliciosa.' },
  { src: '/images/optimized/produto4.jpg', alt: 'Tortinha de Banana', nome: 'Tortinha de Banana', desc: 'Base crocante, banana caramelizada e chantilly fresco.' },
]

const cards = [
  {
    icon: <img src={icone1} className="icon" alt="" loading="lazy" decoding="async" />,
    titulo: 'Faça seu pedido online',
    desc: 'Peça seus quitutes favoritos de forma rápida e prática, sem sair de casa.',
  },
  {
    icon: <img src={icone2} className="icon" alt="" loading="lazy" decoding="async" />,
    titulo: 'Receba no conforto do seu lar',
    desc: 'Realizamos entregas rápidas e seguras para que você possa desfrutar dos nossos quitutes no conforto da sua casa.',
  },
  {
    icon: <img src={icone3} className="icon" alt="" loading="lazy" decoding="async" />,
    titulo: 'Saboreie cada momento',
    desc: 'Aproveite nossos quitutes fresquinhos, feitos com carinho, para tornar seu dia ainda mais especial.',
  },
]

function ProductCard({ src, alt, nome, desc, delay = 0, clone = false }) {
  const [err, setErr] = useState(false)

  return (
    <div
      className={`product-card ${clone ? 'product-card--clone' : ''}`}
      aria-hidden={clone}
    >
      <div className="product-img-wrap">
        {!err ? (
          <img
            src={src}
            alt={clone ? '' : alt}
            className="product-img"
            loading="lazy"
            decoding="async"
            onError={() => setErr(true)}
          />
        ) : (
          <div className="product-img-placeholder"><span>🍬</span></div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-nome">{nome}</h3>
        <p className="product-desc">{desc}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [heroErr, setHeroErr] = useState(false)
  const [entregaErr, setEntregaErr] = useState(false)
  const [activeCfCard, setActiveCfCard] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const productsMarqueeRef = useRef(null)
  const productsInteractingRef = useRef(false)
  const productsResumeTimeoutRef = useRef(null)

  const [cfRef, cfInView] = useInView()
  const [prodRef, prodInView] = useInView()
  const [entRef, entInView] = useInView()
  const [sobreRef, sobreInView] = useInView()
  const [contatoRef, contatoInView] = useInView()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveCfCard((current) => (current + 1) % cards.length)
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [activeCfCard])

  useEffect(() => {
    const container = productsMarqueeRef.current
    if (!container) return undefined
    let animationFrameId = null
    let previousTime = 0
    const speed = 0.11
    const getLoopPoint = () => container.scrollWidth / 3

    const resetToMiddleIfNeeded = () => {
      const loopPoint = getLoopPoint()

      if (container.scrollLeft <= 0) {
        container.scrollLeft += loopPoint
      } else if (container.scrollLeft >= loopPoint * 2) {
        container.scrollLeft -= loopPoint
      }
    }

    container.scrollLeft = getLoopPoint()

    const step = (time) => {
      if (!previousTime) previousTime = time
      const delta = time - previousTime
      previousTime = time

      if (window.innerWidth <= 480 && !productsInteractingRef.current) {
        container.scrollLeft += delta * speed
        resetToMiddleIfNeeded()
      }

      animationFrameId = window.requestAnimationFrame(step)
    }

    animationFrameId = window.requestAnimationFrame(step)
    container.addEventListener('scroll', resetToMiddleIfNeeded, { passive: true })

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
      container.removeEventListener('scroll', resetToMiddleIfNeeded)
      if (productsResumeTimeoutRef.current) {
        window.clearTimeout(productsResumeTimeoutRef.current)
      }
    }
  }, [])

  const pauseProductsMarquee = () => {
    productsInteractingRef.current = true
    if (productsResumeTimeoutRef.current) {
      window.clearTimeout(productsResumeTimeoutRef.current)
    }
  }

  const resumeProductsMarquee = () => {
    if (productsResumeTimeoutRef.current) {
      window.clearTimeout(productsResumeTimeoutRef.current)
    }

    productsResumeTimeoutRef.current = window.setTimeout(() => {
      productsInteractingRef.current = false
    }, 80)
  }

  const showPrevCfCard = () => {
    setActiveCfCard((current) => (current - 1 + cards.length) % cards.length)
  }

  const showNextCfCard = () => {
    setActiveCfCard((current) => (current + 1) % cards.length)
  }

  const handleCfTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX)
  }

  const handleCfTouchEnd = (event) => {
    if (touchStartX === null) return

    const touchEndX = event.changedTouches[0].clientX
    const deltaX = touchStartX - touchEndX

    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        showNextCfCard()
      } else {
        showPrevCfCard()
      }
    }

    setTouchStartX(null)
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text hero-anim-left">
          <p className="hero-eyebrow">Conheça a Dona dos Quitutes</p>
          <h1 className="hero-title">
            Sabor que<br />surpreende
          </h1>
          <p className="hero-sub">
            Quitutes artesanais preparados com muito carinho,
            para adoçar cada momento especial.
          </p>
          <div className="hero-actions hero-anim-up">
            <a href={IFOOD} target="_blank" rel="noopener noreferrer" className="btn-hero-primary">
              Pedir pelo iFood
            </a>
            <a
              href="#"
              className="btn-hero-secondary"
              onClick={(e) => {
                e.preventDefault()
                alert('Cardápio em breve!')
              }}
            >
              Ver o Cardápio
            </a>
          </div>
        </div>

        <div className="hero-img-wrap hero-anim-right">
          {!heroErr ? (
            <img
              src={HERO_IMAGE}
              alt="Torta artesanal"
              className="hero-img"
              fetchPriority="high"
              decoding="async"
              onError={() => setHeroErr(true)}
            />
          ) : (
            <div className="hero-img-fallback">🍪</div>
          )}
        </div>
      </section>

      <section className="como-funciona" ref={cfRef}>
        <div
          className="cf-carousel"
          onTouchStart={handleCfTouchStart}
          onTouchEnd={handleCfTouchEnd}
        >
          <div className="cf-grid" style={{ '--cf-active-index': activeCfCard }}>
            {cards.map((card, index) => (
              <div
                key={card.titulo}
                className={`cf-card anim-up ${cfInView ? 'visible' : ''} ${activeCfCard === index ? 'is-active' : ''}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="cf-icon">{card.icon}</div>
                <h3 className="cf-titulo">{card.titulo.toUpperCase()}</h3>
                <p className="cf-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="cf-dots" aria-label="Navegação dos cards">
          {cards.map((card, index) => (
            <button
              key={card.titulo}
              type="button"
              className={`cf-dot ${activeCfCard === index ? 'is-active' : ''}`}
              onClick={() => setActiveCfCard(index)}
              aria-label={`Mostrar card ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="produtos" ref={prodRef}>
        <div className="section-wrap">
          <div className={`section-head anim-up ${prodInView ? 'visible' : ''}`}>
            <p className="section-eyebrow">— O que fazemos —</p>
            <h2 className="section-title">Alguns de nossos quitutes</h2>
            <p className="section-sub">
              Uma pequena amostra do que preparamos com amor todos os dias.
            </p>
          </div>
          <div
            ref={productsMarqueeRef}
            className="produtos-marquee"
            onTouchStart={pauseProductsMarquee}
            onTouchEnd={resumeProductsMarquee}
            onMouseDown={pauseProductsMarquee}
            onMouseUp={resumeProductsMarquee}
            onMouseLeave={resumeProductsMarquee}
          >
            <div className="produtos-grid">
              {produtos.map((produto, index) => (
                <ProductCard key={`${produto.nome}-clone-start`} {...produto} delay={index * 100} clone />
              ))}
              {produtos.map((produto, index) => (
                <ProductCard key={produto.nome} {...produto} delay={index * 100} />
              ))}
              {produtos.map((produto, index) => (
                <ProductCard key={`${produto.nome}-clone-end`} {...produto} delay={index * 100} clone />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="entregas" ref={entRef}>
        <div className={`entregas-img anim-left ${entInView ? 'visible' : ''}`}>
          {!entregaErr ? (
            <img
              src={ENTREGA_IMAGE}
              alt="Entregas rápidas"
              loading="lazy"
              decoding="async"
              onError={() => setEntregaErr(true)}
            />
          ) : (
            <div className="hero-img-fallback">🛵</div>
          )}
        </div>
        <div className={`entregas-text anim-right ${entInView ? 'visible' : ''}`}>
          <h2 className="entregas-titulo">Entregas Rápidas</h2>
          <p className="entregas-subtitulo">Saboreie a conveniência</p>
          <p className="entregas-desc">
            Desfrute da praticidade de receber os nossos quitutes no conforto do seu lar.
            Faça agora o seu pedido e tenha uma experiência única.
          </p>
          <a href={IFOOD} target="_blank" rel="noopener noreferrer" className="btn-entregas">
            Fazer Pedido
          </a>
        </div>
      </section>

      <section className="sobre" ref={sobreRef}>
        <div className="sobre-inner">
          <div className={`sobre-visual anim-left ${sobreInView ? 'visible' : ''}`} aria-hidden="true">
            <div className="sobre-blob">
              <img
                src={SOBRE_IMAGE}
                alt="Confeiteira"
                className="sobre-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className={`sobre-text anim-right ${sobreInView ? 'visible' : ''}`}>
            <p className="section-eyebrow" style={{ color: 'var(--yellow)', opacity: 0.75 }}>— Nossa história —</p>
            <h2 className="sobre-titulo">
              Nascemos da paixão<br /><em>pelos sabores</em>
            </h2>
            <p className="sobre-desc">
              A Dona dos Quitutes nasceu do desejo de compartilhar receitas
              artesanais cheias de sabor e carinho. Cada doce é preparado com
              ingredientes frescos e muito amor, do início ao fim.
            </p>
            <p className="sobre-desc">
              Estamos no coração de São Paulo, prontos para tornar qualquer
              momento mais doce e especial.
            </p>
            <a href="#contato" className="btn-sobre">Onde nos encontrar →</a>
          </div>
        </div>
      </section>

      <InstagramFeed />

      <section className="contato" id="contato" ref={contatoRef}>
        <div className="contato-inner">
          <div className={`contato-head anim-up ${contatoInView ? 'visible' : ''}`}>
            <p className="section-eyebrow" style={{ color: 'var(--yellow)', opacity: 0.75 }}>— Fale conosco —</p>
            <h2 className="contato-titulo">Onde nos encontrar</h2>
          </div>

          <div className="contato-grid">
            <div className={`contato-card anim-up ${contatoInView ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>
              <div className="contato-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="contato-card-titulo">Horários</h3>
              <p>Seg – Sex: 11h às 22h</p>
              <p>Sáb – Dom: 11h às 24h</p>
            </div>

            <div className={`contato-card anim-up ${contatoInView ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
              <div className="contato-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l1.08-1.08a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="contato-card-titulo">WhatsApp</h3>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">{WHATSAPP_NUMBER}</a>
              <p>Atendimento por mensagem.</p>
            </div>

            <div className={`contato-card anim-up ${contatoInView ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
              <div className="contato-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <h3 className="contato-card-titulo">Instagram</h3>
              <a href="https://instagram.com/adonadosquitutes" target="_blank" rel="noopener noreferrer">@adonadosquitutes</a>
            </div>
          </div>

          <div className={`contato-ifood anim-up ${contatoInView ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            <p className="contato-ifood-text">Prefere pedir pelo iFood?</p>
            <a href={IFOOD} target="_blank" rel="noopener noreferrer" className="btn-contato-ifood">
              Abrir no iFood
            </a>
          </div>
        </div>
      </section>

      <section className="pedir">
        <div className="pedir-inner">
          <div className="pedir-text">
            <h2 className="pedir-titulo">Pronto para pedir?</h2>
            <p className="pedir-sub">
              Peça pelo iFood e receba nossos quitutes fresquinhos onde você estiver.
            </p>
          </div>
          <a href={IFOOD} target="_blank" rel="noopener noreferrer" className="btn-pedir">
            Abrir no iFood
          </a>
        </div>
      </section>
    </div>
  )
}
