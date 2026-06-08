import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════
   CONSTANTES EDITABLES
   Actualizá estos valores para cambiar el contenido del sitio
═══════════════════════════════════════════════════════════════ */
const CONSTANTS = {
  metrics: {
    views: {
      value: 1200000,
      display: '1.2M+',
      label: 'Vistas en TikTok',
      icon: '👁',
    },
    database: {
      value: 340,
      display: '340',
      label: 'Base de datos',
      icon: '🗃',
    },
    conversations: {
      value: 180,
      display: '180',
      label: 'Conversaciones iniciadas',
      icon: '💬',
    },
    lastUpdated: 'Mayo 2025',
  },

  tiktok: {
    // ⚠️ Reemplazá con IDs reales de videos de @chinoconivi o @ccijunior
    // Ejemplo de URL: https://www.tiktok.com/@chinoconivi/video/7321234567890123456
    // El ID es el número al final de la URL
    videoIds: [
      '7321234567890123456',
      '7321234567890123457',
      '7321234567890123458',
    ],
    profileUrl: 'https://www.tiktok.com/@chinoconivi',
    cciJuniorUrl: 'https://www.tiktok.com/@ccijunior',
  },

  // ⚠️ Reemplazá con tu número real (solo dígitos, con código de país, sin + ni espacios)
  // Ejemplo Argentina: 5491112345678
  whatsappLink:
    'https://wa.me/5491100000000?text=Hola%20Ivi!%20Me%20interesa%20saber%20m%C3%A1s%20sobre%20CCI%20Junior.',

  timeline: [
    { status: 'done',     icon: '✅', label: 'Inicio del proyecto',               date: 'Ene 2024' },
    { status: 'done',     icon: '✅', label: 'Primeros 100 seguidores en TikTok', date: 'Mar 2024' },
    { status: 'done',     icon: '✅', label: '1M de vistas',                      date: 'Jun 2024' },
    { status: 'progress', icon: '🔄', label: 'Lanzamiento de clases grupales',    date: '2025'     },
    { status: 'future',   icon: '🎯', label: '500 alumnos inscriptos',             date: '2025'     },
    { status: 'future',   icon: '🚀', label: 'Expansión a otros países',           date: '2026'     },
  ],
}

/* ═══════════════════════════════════════════════════════════════
   DECORACIONES SVG CHINAS
═══════════════════════════════════════════════════════════════ */

function LanternSVG({ className = '', opacity = 1 }) {
  return (
    <svg
      className={className}
      style={{ opacity }}
      viewBox="0 0 60 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hilo superior */}
      <line x1="30" y1="0" x2="30" y2="9" stroke="#1A1A1A" strokeWidth="1.8" />
      {/* Tapa superior */}
      <rect x="16" y="9" width="28" height="6" rx="3" fill="#B02020" />
      {/* Cuerpo */}
      <ellipse cx="30" cy="48" rx="22" ry="32" fill="#D62B2B" />
      {/* Costillas */}
      <ellipse cx="30" cy="30" rx="19" ry="7"  fill="none" stroke="#B02020" strokeWidth="1.2" />
      <ellipse cx="30" cy="48" rx="22" ry="10" fill="none" stroke="#B02020" strokeWidth="1.2" />
      <ellipse cx="30" cy="66" rx="19" ry="7"  fill="none" stroke="#B02020" strokeWidth="1.2" />
      {/* Brillo */}
      <ellipse cx="20" cy="36" rx="5" ry="9" fill="#FF8888" opacity="0.25" />
      {/* Caracter 福 (buena suerte) */}
      <text
        x="30" y="54"
        textAnchor="middle"
        fontSize="18"
        fill="#F5C518"
        fontFamily="'Ma Shan Zheng', serif"
      >
        福
      </text>
      {/* Tapa inferior */}
      <rect x="16" y="77" width="28" height="6" rx="3" fill="#B02020" />
      {/* Borla */}
      <line x1="26" y1="83" x2="24" y2="95" stroke="#F5C518" strokeWidth="2" />
      <line x1="30" y1="83" x2="30" y2="95" stroke="#F5C518" strokeWidth="2" />
      <line x1="34" y1="83" x2="36" y2="95" stroke="#F5C518" strokeWidth="2" />
    </svg>
  )
}

function LuckyCloudSVG({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="35"  cy="42" r="22" fill="#D62B2B" opacity="0.12" />
      <circle cx="60"  cy="32" r="28" fill="#D62B2B" opacity="0.12" />
      <circle cx="95"  cy="35" r="25" fill="#D62B2B" opacity="0.12" />
      <circle cx="125" cy="42" r="20" fill="#D62B2B" opacity="0.12" />
      <rect   x="17" y="46" width="126" height="16" rx="8" fill="#D62B2B" opacity="0.12" />
    </svg>
  )
}

function BrushChar({ char = '好', className = '', opacity = 0.1 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <text
        x="50" y="80"
        textAnchor="middle"
        fontSize="82"
        fill="#D62B2B"
        opacity={opacity}
        fontFamily="'Ma Shan Zheng', serif"
        transform="rotate(-10, 50, 50)"
      >
        {char}
      </text>
    </svg>
  )
}

function WavePattern({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 400 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M0 12 Q50 0 100 12 Q150 24 200 12 Q250 0 300 12 Q350 24 400 12"
        fill="none"
        stroke="#D62B2B"
        strokeWidth="2.5"
        opacity="0.2"
      />
      <path
        d="M0 18 Q50 6 100 18 Q150 30 200 18 Q250 6 300 18 Q350 30 400 18"
        fill="none"
        stroke="#F5C518"
        strokeWidth="2"
        opacity="0.25"
      />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HOOKS PERSONALIZADOS
═══════════════════════════════════════════════════════════════ */

function useOnScreen(ref, threshold = 0.25) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setCount(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return count
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE: FADE IN ON SCROLL
═══════════════════════════════════════════════════════════════ */
function FadeIn({ children, delay = 0, className = '', up = true }) {
  const ref = useRef(null)
  const visible = useOnScreen(ref, 0.1)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0)'
          : up ? 'translateY(28px)' : 'translateY(0)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE: NAVEGACIÓN
═══════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: '你好!',     href: '#hero'     },
  { label: 'Métricas', href: '#metricas'  },
  { label: 'Roadmap',  href: '#roadmap'   },
  { label: 'Contacto', href: '#contacto'  },
]

function Nav() {
  const [open, setOpen]       = useState(false)
  const [shadow, setShadow]   = useState(false)

  useEffect(() => {
    const fn = () => setShadow(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#D62B2B',
        boxShadow: shadow ? '0 3px 16px rgba(0,0,0,0.18)' : 'none',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Barra principal */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1rem', height: '56px', maxWidth: '1100px', margin: '0 auto',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => go(e, '#hero')}
          style={{
            fontFamily: "'Nunito', sans-serif", fontWeight: 900,
            fontSize: '1.35rem', color: '#FFFFFF', textDecoration: 'none',
            letterSpacing: '-0.5px',
          }}
        >
          CCI <span style={{ color: '#F5C518' }}>Junior</span>
        </a>

        {/* Links desktop */}
        <ul
          style={{
            display: 'none', gap: '1.5rem', listStyle: 'none',
          }}
          className="md-nav-links"
        >
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={e => go(e, l.href)}
                style={{
                  fontFamily: "'Nunito', sans-serif", fontWeight: 800,
                  fontSize: '0.9rem', color: '#fff', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseOver={e => (e.target.style.color = '#F5C518')}
                onMouseOut={e  => (e.target.style.color = '#fff')}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Abrir menú"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px', display: 'flex', flexDirection: 'column', gap: '5px',
          }}
          className="hamburger-btn"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block', width: '24px', height: '2.5px',
                background: '#fff', borderRadius: '4px',
                transition: 'all 0.28s ease',
                transform:
                  open && i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : open && i === 1 ? 'scaleX(0) translateX(-8px)'
                  : open && i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Menú mobile desplegable */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? '400px' : '0',
          transition: 'max-height 0.35s ease',
          background: '#C02020',
        }}
        className="mobile-nav"
      >
        <ul style={{ listStyle: 'none', padding: '0.5rem 1rem 1rem' }}>
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
              <a
                href={l.href}
                onClick={e => go(e, l.href)}
                style={{
                  display: 'block', padding: '0.75rem 0',
                  fontFamily: "'Nunito', sans-serif", fontWeight: 800,
                  fontSize: '1.05rem', color: '#fff', textDecoration: 'none',
                  transition: 'color 0.2s',
                  animationDelay: `${i * 40}ms`,
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Estilos responsive inline para el nav */}
      <style>{`
        @media (min-width: 768px) {
          .hamburger-btn { display: none !important; }
          .mobile-nav    { display: none !important; }
          .md-nav-links  { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECCIÓN 1: HERO
═══════════════════════════════════════════════════════════════ */
function Hero() {
  const go = (e) => {
    e.preventDefault()
    document.querySelector('#roadmap')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section
      id="hero"
      style={{
        paddingTop: '56px',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoraciones de fondo */}
      <LanternSVG
        opacity={0.18}
        className="absolute"
        style={{ width: 90, top: 60, right: -10, pointerEvents: 'none' }}
      />
      <LanternSVG
        opacity={0.10}
        className="absolute"
        style={{ width: 55, top: 180, right: 90, pointerEvents: 'none' }}
      />
      <BrushChar
        char="好"
        className="absolute"
        style={{ width: 180, bottom: 20, left: -20, pointerEvents: 'none' }}
        opacity={0.09}
      />
      <BrushChar
        char="学"
        className="absolute"
        style={{ width: 110, top: 70, left: 10, pointerEvents: 'none' }}
        opacity={0.07}
      />
      <LuckyCloudSVG
        className="absolute"
        style={{ width: 260, bottom: 0, right: 0, pointerEvents: 'none' }}
      />

      {/* Contenido */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: '640px', margin: '0 auto',
          padding: '3.5rem 1.5rem',
          textAlign: 'center',
        }}
      >
        {/* Chip superior */}
        <div
          style={{
            display: 'inline-block',
            background: '#fff',
            borderRadius: '999px',
            padding: '5px 18px',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <span
            style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 800,
              fontSize: '0.82rem', color: '#D62B2B', letterSpacing: '0.3px',
            }}
          >
            🎋 Instituto virtual de chino mandarín
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.4rem, 9vw, 4.2rem)',
            color: '#1A1A1A',
            lineHeight: 1.08,
            letterSpacing: '-1.5px',
            marginBottom: '1.2rem',
          }}
        >
          Aprendé chino<br />
          <span style={{ color: '#D62B2B' }}>mandarín</span>
          <br />desde cero
        </h1>

        {/* Subtítulo */}
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 'clamp(1rem, 3.5vw, 1.15rem)',
            color: '#444',
            fontWeight: 600,
            lineHeight: 1.65,
            maxWidth: '420px',
            margin: '0 auto 2.2rem',
          }}
        >
          Clases virtuales con metodología lúdica para chicos.
          Un proyecto con propósito, cultura y mucho{' '}
          <span style={{ fontFamily: "'Ma Shan Zheng', serif", color: '#D62B2B', fontSize: '1.1em' }}>你好</span>.
        </p>

        {/* CTA */}
        <a
          href="#roadmap"
          onClick={go}
          style={{
            display: 'inline-block',
            background: '#D62B2B',
            color: '#fff',
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1rem, 3.5vw, 1.15rem)',
            padding: '1rem 2.2rem',
            borderRadius: '999px',
            textDecoration: 'none',
            boxShadow: '0 6px 22px rgba(214,43,43,0.35)',
            transition: 'transform 0.18s, box-shadow 0.18s',
            letterSpacing: '0.2px',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.04)'
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(214,43,43,0.45)'
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(214,43,43,0.35)'
          }}
        >
          Conocé el proyecto →
        </a>

        {/* Acento chino decorativo */}
        <div
          style={{
            fontFamily: "'Ma Shan Zheng', serif",
            fontSize: '0.95rem',
            color: '#D62B2B',
            opacity: 0.5,
            marginTop: '2rem',
            letterSpacing: '6px',
          }}
        >
          中文 · 文化 · 教育
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECCIÓN 2: SOBRE IVI
═══════════════════════════════════════════════════════════════ */
function SobreIvi() {
  const badges = [
    { label: 'Nivel HSK 4',  bg: '#D62B2B', fg: '#fff'     },
    { label: 'Docente',      bg: '#F5C518', fg: '#1A1A1A'  },
    { label: 'Emprendedora', bg: '#1A1A1A', fg: '#fff'     },
  ]

  return (
    <section id="sobre" style={{ padding: '5rem 1rem' }}>
      <FadeIn>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: '2rem',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 112, height: 112,
                borderRadius: '50%',
                margin: '0 auto 1.2rem',
                background: '#F0E060',
                border: '4px solid #D62B2B',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Placeholder avatar — reemplazá con <img src="foto.jpg" /> */}
              <svg viewBox="0 0 112 112" width="112" height="112" xmlns="http://www.w3.org/2000/svg">
                <circle cx="56" cy="44" r="22" fill="#D62B2B" opacity="0.6" />
                <ellipse cx="56" cy="90" rx="30" ry="20" fill="#D62B2B" opacity="0.4" />
                <text x="56" y="50" textAnchor="middle" fontSize="22" fontWeight="900"
                  fontFamily="'Nunito', sans-serif" fill="#fff">Ivi</text>
              </svg>
            </div>

            <h2
              style={{
                fontFamily: "'Nunito', sans-serif", fontWeight: 900,
                fontSize: '1.9rem', color: '#1A1A1A', marginBottom: '0.2rem',
              }}
            >
              Hola, soy Ivi
            </h2>
            <p
              style={{
                fontFamily: "'Ma Shan Zheng', serif",
                fontSize: '1.15rem', color: '#D62B2B',
                marginBottom: '1.2rem',
              }}
            >
              创始人 · Fundadora de CCI Junior
            </p>

            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                color: '#555', fontSize: '1rem', lineHeight: 1.75,
                marginBottom: '1.8rem',
              }}
            >
              Soy una emprendedora apasionada por el idioma y la cultura china.
              Creé <strong style={{ color: '#D62B2B' }}>CCI Junior</strong> para que
              los chicos de habla hispana puedan aprender mandarín de forma divertida,
              virtual y efectiva — desde cualquier lugar del mundo.
            </p>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
              {badges.map(b => (
                <span
                  key={b.label}
                  style={{
                    background: b.bg, color: b.fg,
                    fontFamily: "'Nunito', sans-serif", fontWeight: 800,
                    fontSize: '0.85rem', padding: '6px 18px',
                    borderRadius: '999px',
                  }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECCIÓN 3: TIKTOK VIDEOS
═══════════════════════════════════════════════════════════════ */
function TikTokVideos() {
  return (
    <section id="videos" style={{ padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 900,
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: '#1A1A1A',
              textAlign: 'center', marginBottom: '0.4rem',
            }}
          >
            Mi contenido
          </h2>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 700,
              fontSize: '1rem', color: '#555',
              textAlign: 'center', marginBottom: '2.5rem',
            }}
          >
            Chino mandarín simple, divertido y viral
          </p>
        </FadeIn>

        {/* Grid de videos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            justifyItems: 'center',
          }}
        >
          {CONSTANTS.tiktok.videoIds.map((id, i) => (
            <FadeIn key={id} delay={i * 130} className="w-full" style={{ width: '100%' }}>
              <div
                style={{
                  background: '#fff',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.10)',
                  width: '100%',
                  maxWidth: '340px',
                  margin: '0 auto',
                }}
              >
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${id}`}
                  style={{ display: 'block', width: '100%', height: '580px', border: 'none' }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={`Video de TikTok ${i + 1}`}
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA ver más */}
        <FadeIn delay={420}>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a
              href={CONSTANTS.tiktok.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#1A1A1A', color: '#fff',
                fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: '1rem',
                padding: '0.85rem 2rem', borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                transition: 'transform 0.18s',
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseOut={e  => (e.currentTarget.style.transform = 'scale(1)')}
            >
              ▶ Ver más en TikTok
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECCIÓN 4: MÉTRICAS
═══════════════════════════════════════════════════════════════ */
function CounterCard({ icon, value, display, label, active }) {
  const raw = useCountUp(value, 1800, active)

  // Formato del número animado
  const formatted =
    value >= 1_000_000
      ? (raw / 1_000_000).toFixed(1) + 'M+'
      : raw.toLocaleString('es-AR')

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '1.25rem',
        padding: '1.8rem 1.5rem',
        textAlign: 'center',
        boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
        borderTop: '5px solid #D62B2B',
      }}
    >
      <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div
        style={{
          fontFamily: "'Nunito', sans-serif", fontWeight: 900,
          fontSize: 'clamp(2rem, 7vw, 2.8rem)',
          color: '#D62B2B', lineHeight: 1,
          marginBottom: '0.5rem',
        }}
      >
        {active ? formatted : '–'}
      </div>
      <div
        style={{
          fontFamily: "'Nunito', sans-serif", fontWeight: 700,
          fontSize: '0.95rem', color: '#555',
        }}
      >
        {label}
      </div>
    </div>
  )
}

function Metricas() {
  const ref = useRef(null)
  const active = useOnScreen(ref, 0.3)
  const { metrics } = CONSTANTS

  return (
    <section id="metricas" style={{ padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 900,
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: '#1A1A1A',
              textAlign: 'center', marginBottom: '0.4rem',
            }}
          >
            El recorrido en números
          </h2>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 700,
              color: '#999', textAlign: 'center', marginBottom: '2.8rem',
            }}
          >
            Desde cero hasta acá, paso a paso
          </p>
        </FadeIn>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.2rem',
          }}
        >
          <CounterCard {...metrics.views}         active={active} />
          <CounterCard {...metrics.database}      active={active} />
          <CounterCard {...metrics.conversations} active={active} />
        </div>

        <FadeIn delay={300}>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif", fontSize: '0.82rem',
              color: '#bbb', fontStyle: 'italic',
              textAlign: 'center', marginTop: '1.5rem',
            }}
          >
            Métricas actualizadas manualmente — última actualización: {metrics.lastUpdated}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECCIÓN 5: ROADMAP
═══════════════════════════════════════════════════════════════ */
const STATUS_DOT = {
  done:     '#D62B2B',
  progress: '#F5C518',
  future:   '#CCCCCC',
}

function Roadmap() {
  return (
    <section id="roadmap" style={{ padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 900,
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: '#1A1A1A',
              textAlign: 'center', marginBottom: '0.4rem',
            }}
          >
            A dónde vamos
          </h2>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 700,
              color: '#666', textAlign: 'center', marginBottom: '3rem',
            }}
          >
            Un proyecto con visión a largo plazo
          </p>
        </FadeIn>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '16px' }}>
          {/* Línea vertical */}
          <div
            style={{
              position: 'absolute',
              left: '35px',
              top: '20px',
              bottom: '20px',
              width: '2px',
              background: 'linear-gradient(to bottom, #D62B2B, #CCCCCC)',
              opacity: 0.3,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {CONSTANTS.timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 90}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  {/* Dot */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 40, height: 40,
                      borderRadius: '50%',
                      background: '#fff',
                      border: `3px solid ${STATUS_DOT[item.status]}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      zIndex: 2, position: 'relative',
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: '1.2rem',
                      padding: '0.85rem 1.2rem',
                      flex: 1,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                      opacity: item.status === 'future' ? 0.65 : 1,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Nunito', sans-serif", fontWeight: 800,
                        color: item.status === 'future' ? '#888' : '#1A1A1A',
                        fontSize: '0.97rem', marginBottom: '2px',
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                        color: STATUS_DOT[item.status],
                        fontSize: '0.8rem',
                      }}
                    >
                      {item.date}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECCIÓN 6: CONTACTO / CTA
═══════════════════════════════════════════════════════════════ */
function Contacto() {
  return (
    <section
      id="contacto"
      style={{
        background: '#D62B2B',
        padding: '5.5rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoraciones */}
      <LanternSVG
        opacity={0.12}
        style={{
          position: 'absolute', right: -10, top: 0,
          width: 100, pointerEvents: 'none',
        }}
      />
      <LanternSVG
        opacity={0.08}
        style={{
          position: 'absolute', left: 20, bottom: 0,
          width: 65, pointerEvents: 'none',
        }}
      />
      <BrushChar
        char="福"
        opacity={0.08}
        style={{
          position: 'absolute', right: 30, bottom: 20,
          width: 160, pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 900,
              fontSize: 'clamp(1.9rem, 5.5vw, 2.9rem)', color: '#fff',
              marginBottom: '1rem',
            }}
          >
            ¿Sos mentor o inversor?
          </h2>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.7,
              maxWidth: '440px',
              margin: '0 auto 2.5rem',
            }}
          >
            Si querés saber más sobre CCI Junior o explorar oportunidades juntos,
            escribime directamente.
          </p>

          <div
            style={{
              display: 'flex', flexDirection: 'column',
              gap: '1rem', alignItems: 'center',
            }}
          >
            {/* WhatsApp */}
            <a
              href={CONSTANTS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#25D366', color: '#fff',
                fontFamily: "'Nunito', sans-serif", fontWeight: 900,
                fontSize: '1.05rem',
                padding: '1rem 2.2rem', borderRadius: '999px',
                textDecoration: 'none', width: 'fit-content',
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 8px 26px rgba(0,0,0,0.3)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)'
              }}
            >
              💬 Escribime por WhatsApp
            </a>

            {/* TikTok */}
            <a
              href={CONSTANTS.tiktok.cciJuniorUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#fff', color: '#D62B2B',
                fontFamily: "'Nunito', sans-serif", fontWeight: 900,
                fontSize: '1.05rem',
                padding: '1rem 2.2rem', borderRadius: '999px',
                textDecoration: 'none', width: 'fit-content',
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 8px 26px rgba(0,0,0,0.3)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)'
              }}
            >
              ▶ Seguime en TikTok
            </a>
          </div>
        </FadeIn>

        {/* Separador decorativo */}
        <WavePattern
          style={{
            position: 'absolute', bottom: -40, left: 0, right: 0,
            width: '100%', opacity: 0.3, pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      style={{
        background: '#1A1A1A',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        fontFamily: "'Nunito', sans-serif",
        fontSize: '0.88rem',
        color: '#777',
      }}
    >
      <span>© 2025 CCI Junior</span>
      <span style={{ margin: '0 0.5rem', color: '#444' }}>·</span>
      <span>Hecho con ❤️ por Ivi</span>
      <span style={{ margin: '0 0.5rem', color: '#444' }}>·</span>
      <span style={{ fontFamily: "'Ma Shan Zheng', serif", color: '#D62B2B', fontSize: '1rem' }}>中文</span>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Metricas />
        <Roadmap />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
