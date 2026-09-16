import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

const services = [
  {
    number: '01',
    title: '3D modelling',
    label: 'Coming soon',
    body: 'Concept studies and spatial planning that hold onto the original idea while making the next decision visible.',
    src: '/images/singkaban-board.jpg',
    alt: 'Architectural study board with plans, elevations, and material notes.',
  },
  {
    number: '02',
    title: '3D animation rendering',
    label: 'Moving image',
    body: 'A moving read of space, light, and sequence for ideas that need to be understood frame by frame.',
    src: '/images/training-lobby.jpg',
    alt: 'Interior visualization of a bright lobby with layered seating and a planted court.',
  },
  {
    number: '03',
    title: '3D architectural visualization',
    label: 'Light + context',
    body: 'Lumion and Enscape images that explain atmosphere, material, and how a proposal might feel before it exists.',
    src: '/images/singkaban-aerial.jpg',
    alt: 'Aerial visualization of the Singkaban commercial hub and training facility.',
  },
  {
    number: '04',
    title: '3D interior visualization',
    label: 'Material + atmosphere',
    body: 'Interior views that make scale, material, and the everyday experience of a room easier to imagine.',
    src: '/images/commercial-hub.jpg',
    alt: 'Interior perspective of the Singkaban commercial hub lobby with planted seating.',
  },
]

const ringSlotCount = 14
const ringSlotAngle = 360 / ringSlotCount

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getDocumentTop(element) {
  let current = element
  let top = 0

  while (current) {
    top += current.offsetTop
    current = current.offsetParent
  }

  return top
}

function applyReelProgress(carousel, images, progress, reducedMotion) {
  const motionProgress = reducedMotion ? 0 : progress
  const rotation = -101 + (motionProgress * 76)
  const ringY = motionProgress * 100
  const imageX = 100 - (motionProgress * 200)
  const imageY = -64 + (motionProgress * 142)

  carousel.style.transform = `translate3d(0, ${ringY}%, calc(var(--service-reel-radius) * -1)) rotateY(${rotation}deg)`
  images.forEach(image => {
    image.style.transform = `translate3d(${imageX}px, ${imageY}px, 0) scale(1.42)`
  })
}

export default function Services() {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const imageRefs = useRef([])
  const { ref: introRef, inView } = useInView(0.12)
  const reducedMotion = Boolean(useReducedMotion())

  useEffect(() => {
    let frame = 0
    let visualScrollPosition = window.scrollY

    const updateProgress = () => {
      frame = 0
      const section = sectionRef.current
      const carousel = carouselRef.current

      if (!section || !carousel) return

      const sectionStart = getDocumentTop(section)
      const viewportLead = Math.min(window.innerHeight * 0.5, 420)
      const motionStart = sectionStart - viewportLead
      const motionEnd = sectionStart + Math.max(section.offsetHeight - 180, 1)
      const scrollRange = Math.max(motionEnd - motionStart, 1)
      const nextProgress = clamp((visualScrollPosition - motionStart) / scrollRange, 0, 1)
      applyReelProgress(carousel, imageRefs.current.filter(Boolean), nextProgress, reducedMotion)
    }

    const handleScroll = () => {
      visualScrollPosition = window.scrollY
      if (!frame) frame = window.requestAnimationFrame(updateProgress)
    }

    const handleSmoothScroll = event => {
      visualScrollPosition = event.detail?.position ?? window.scrollY
      if (frame) window.cancelAnimationFrame(frame)
      updateProgress()
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('smoothscroll', handleSmoothScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('smoothscroll', handleSmoothScroll)
      window.removeEventListener('resize', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  const handleStageKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    window.scrollBy({ top: direction * Math.max(window.innerHeight * 0.55, 260), behavior: 'instant' })
  }

  return (
    <section ref={sectionRef} id="services" className="section section--paper service-reel-section" aria-labelledby="services-title">
      <div className="container">
        <div ref={introRef} className="service-reel__header">
          <motion.h2
            id="services-title"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="service-reel__headline"
          >
            We create visual studies that make architectural ideas and projects <em>stand out.</em>
          </motion.h2>
        </div>

        <div
          className="service-reel__stage"
          role="region"
          aria-label="Services presentation. Scroll to rotate the service ring."
          aria-roledescription="carousel"
          tabIndex="0"
          onKeyDown={handleStageKeyDown}
        >
          <ul
            ref={carouselRef}
            className="service-reel__carousel"
            aria-label="Architectural visualization services"
            style={{ transform: 'translate3d(0, 0%, calc(var(--service-reel-radius) * -1)) rotateY(-101deg)' }}
          >
            {Array.from({ length: ringSlotCount }, (_, index) => {
              const service = services[index]
              return (
                <li
                  key={`service-slot-${index}`}
                  className={`service-reel__slot${service ? ' service-reel__slot--filled' : ''}`}
                  style={{ transform: `rotateY(${(index + 1) * ringSlotAngle}deg) translateZ(var(--service-reel-radius))` }}
                  aria-hidden={service ? undefined : 'true'}
                >
                  {service && (
                    <a className="service-reel__card" href="#contact" aria-label={`Discuss ${service.title}`}>
                      <img
                        ref={(element) => { imageRefs.current[index] = element }}
                        className="service-reel__card-image"
                        src={service.src}
                        alt={service.alt}
                        width="900"
                        height="900"
                        loading="lazy"
                        style={{ transform: 'translate3d(100px, -64px, 0) scale(1.42)' }}
                      />
                      <span className="service-reel__card-overlay" aria-hidden="true" />
                      <span className="service-reel__card-copy">
                        <span className="service-reel__card-meta">{service.number} / {service.label}</span>
                        <strong>{service.title}</strong>
                        <span className="service-reel__card-action">View service <span aria-hidden="true">↗</span></span>
                      </span>
                      <span className="sr-only">{service.body}</span>
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
