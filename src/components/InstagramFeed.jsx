import { useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import './InstagramFeed.css'

const BEHOLD_FEED_ID = 'ZZyNgyjmRfiWMRB4mSly'
const FALLBACK_POSTS = [
  { src: '/images/optimized/produto1.jpg', alt: 'Trufa Crocante' },
  { src: '/images/optimized/produto2.jpg', alt: 'Bolo de Cenoura' },
  { src: '/images/optimized/produto3.jpg', alt: 'Cookie Recheado' },
  { src: '/images/optimized/produto4.jpg', alt: 'Tortinha de Banana' },
]

function FallbackGrid({ inView }) {
  return (
    <div className="insta-grid">
      {FALLBACK_POSTS.map((post, index) => (
        <a
          key={post.alt}
          href="https://instagram.com/adonadosquitutes"
          target="_blank"
          rel="noopener noreferrer"
          className={`insta-post anim-up ${inView ? 'visible' : ''}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <img src={post.src} alt={post.alt} loading="lazy" decoding="async" />
          <div className="insta-overlay">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none" />
            </svg>
            <span>Ver no Instagram</span>
          </div>
        </a>
      ))}
    </div>
  )
}

function BeholdFeed({ feedId, shouldLoad }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!shouldLoad || !feedId || feedId === 'SEU_FEED_ID_AQUI') return

    const widget = document.createElement('behold-widget')
    widget.setAttribute('feed-id', feedId)
    widget.style.width = '100%'

    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(widget)
    }

    if (!document.getElementById('behold-script')) {
      const script = document.createElement('script')
      script.id = 'behold-script'
      script.type = 'module'
      script.src = 'https://w.behold.so/widget.js'
      script.defer = true
      document.head.appendChild(script)
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [feedId, shouldLoad])

  return <div ref={containerRef} className="behold-container" />
}

export default function InstagramFeed() {
  const [ref, inView] = useInView()
  const isConfigured = BEHOLD_FEED_ID && BEHOLD_FEED_ID !== 'SEU_FEED_ID_AQUI'

  return (
    <section className="instagram" ref={ref}>
      <div className="section-wrap">
        <div className={`instagram-head anim-up ${inView ? 'visible' : ''}`}>
          <h2 className="insta-titulo">
            Siga{' '}
            <a
              href="https://instagram.com/adonadosquitutes"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-handle"
            >
              @adonadosquitutes
            </a>
          </h2>
          <p className="insta-sub">Acompanhe nossas novidades e iguarias fresquinhas</p>
        </div>

        {isConfigured ? (
          <BeholdFeed feedId={BEHOLD_FEED_ID} shouldLoad={inView} />
        ) : (
          <FallbackGrid inView={inView} />
        )}

        <div className={`insta-cta anim-up ${inView ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          <a
            href="https://instagram.com/adonadosquitutes"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-insta"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
            </svg>
            Ver todos os posts
          </a>
        </div>
      </div>
    </section>
  )
}
