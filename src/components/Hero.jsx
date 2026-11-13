import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const slides = [
  {
    type: 'video',
    src: '/videos/hero-scene.mp4',
    label: 'Scene study',
    meta: 'Atmospheric film · Spatial mood study · 2026',
  },
  {
    type: 'image',
    src: '/images/singkaban-aerial.jpg',
    alt: 'Aerial view of the Singkaban commercial hub and training facility in Malolos, Bulacan.',
    label: 'Singkaban',
    meta: 'Architectural thesis · Malolos, Bulacan · 2024',
  },
  {
    type: 'image',
    src: '/images/commercial-hub.jpg',
    alt: 'Interior perspective of the Singkaban commercial hub lobby with planted seating and layered floors.',
    label: 'Commercial hub',
    meta: 'Interior visualization · Malolos, Bulacan · 2024',
  },
  {
    type: 'image',
    src: '/images/uniqlo-warehouse.jpg',
    alt: 'Exterior view of the Uniqlo warehouse project in the Philippines.',
    label: 'Uniqlo warehouse',
    meta: 'Apprentice work · Philippines · 2024',
  },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const heroRef = useRef(null)
  const pinRef = useRef(null)
  const videoRef = useRef(null)
  const reducedMotion = Boolean(useReducedMotion())
  const [paused, setPaused] = useState(reducedMotion)
  const slide = slides[current]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (paused) video.pause()
    else video.play().catch(() => {})
  }, [paused])

  useEffect(() => {
    let frame = 0
    const pin = pinRef.current

    const updatePin = () => {
      frame = 0
      const hero = heroRef.current

      if (!hero || !pin) return

      const rect = hero.getBoundingClientRect()
      const pinOffset = reducedMotion
        ? 0
        : clamp(-rect.top, 0, window.innerHeight)

      pin.style.transform = `translate3d(0, ${pinOffset}px, 0)`
    }

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updatePin)
    }

    updatePin()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
      if (pin) pin.style.transform = ''
    }
  }, [reducedMotion])

  return (
    <section ref={heroRef} id="home" aria-labelledby="hero-title" className="hero">
      <div ref={pinRef} className="hero__pin">
        <div className="hero__media" aria-hidden="true">
          {slides.map((item, index) => (
            item.type === 'video' ? (
              <motion.video
                key={item.src}
                ref={videoRef}
                src={item.src}
                autoPlay={!reducedMotion}
                muted
                loop
                playsInline
                preload="metadata"
                initial={false}
                animate={{ opacity: index === current ? 1 : 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="hero__video"
              />
            ) : (
              <motion.img
                key={item.src}
                src={item.src}
                alt=""
                width="1300"
                height="960"
                loading="lazy"
                fetchPriority="auto"
                initial={false}
                animate={{ opacity: index === current ? 1 : 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.23, 1, 0.32, 1] }}
                style={{ scale: reducedMotion ? 1.02 : 1.08 }}
                className="hero__image"
              />
            )
          ))}
        </div>
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__grain" aria-hidden="true" />

        <motion.div className="hero__inner container">
        <div className="hero__topline">
          <span>VAB / 01</span>
          <span>Working portfolio / 2024–now</span>
        </div>

        <div className="hero__content">
          <p className="eyebrow eyebrow--light">Architecture + visual thinking</p>
          <h1 id="hero-title" className="hero__title">
            Spaces with
            <em>a point of view.</em>
          </h1>
          <p className="hero__intro">
            Vanessa Benipayo is an architect working across design, documentation, and the visual language that helps ideas become real.
          </p>
          <div className="hero__actions">
            <a href="#works" className="button button--light">
              View selected work <span aria-hidden="true">↘</span>
            </a>
            <a href="#about" className="text-link text-link--light">
              Meet the architect <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero__footer">
          <div className="hero__project">
            <span className="hero__project-label">Featured study</span>
            <strong>{slide.label}</strong>
            <span role="status" aria-live="polite">{slide.meta}</span>
          </div>

          <div className="hero__selector" role="group" aria-label="Featured work">
            {slides.map((item, index) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Show ${item.label}`}
                aria-pressed={index === current}
                onClick={() => setCurrent(index)}
                className={`hero__dot${index === current ? ' hero__dot--active' : ''}`}
              >
                <span aria-hidden="true">0{index + 1}</span>
                <span className="hero__dot-line" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="hero__aside">
            <button
              type="button"
              className="hero__pause"
              onClick={() => setPaused(value => !value)}
            >
              {paused ? 'Play background film' : 'Pause background film'}
            </button>

            <p className="hero__scroll-note"><span aria-hidden="true">↓</span> Scroll to explore</p>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  )
}
