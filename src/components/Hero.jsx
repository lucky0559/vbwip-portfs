import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

const slides = [
  {
    src: '/images/singkaban-aerial.jpg',
    alt: 'Aerial view of the Singkaban commercial hub and training facility in Malolos, Bulacan.',
    label: 'SINGKABAN',
    meta: 'Architectural thesis · Malolos, Bulacan · 2024',
    width: 1300,
    height: 960,
  },
  {
    src: '/images/commercial-hub.jpg',
    alt: 'Interior perspective of the Singkaban commercial hub lobby.',
    label: 'COMMERCIAL HUB',
    meta: 'Interior visualization · Malolos, Bulacan · 2024',
    width: 1250,
    height: 680,
  },
  {
    src: '/images/uniqlo-warehouse.jpg',
    alt: 'Exterior view of the Uniqlo warehouse project.',
    label: 'UNIQLO WAREHOUSE',
    meta: 'Apprentice work · Philippines · 2024',
    width: 1190,
    height: 450,
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })

  const bgY = useTransform(smoothProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(smoothProgress, [0, 1], ['0%', '10%'])
  const textOpacity = useTransform(smoothProgress, [0, 0.62], [1, 0])
  const slide = slides[current]

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[oklch(21%_0.012_72)]"
    >
      <div className="absolute inset-0">
        {slides.map((item, index) => (
          <motion.img
            key={item.src}
            src={item.src}
            alt={index === current ? item.alt : ''}
            aria-hidden={index !== current}
            width={item.width}
            height={item.height}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            initial={false}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.23, 1, 0.32, 1] }}
            style={{
              y: reducedMotion ? 0 : bgY,
              scale: reducedMotion ? 1 : 1.08,
            }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[oklch(21%_0.012_72_/_0.24)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(21%_0.012_72_/_0.92)] via-[oklch(21%_0.012_72_/_0.22)] to-transparent" aria-hidden="true" />

      <motion.div
        style={{ y: reducedMotion ? 0 : textY, opacity: reducedMotion ? 1 : textOpacity }}
        className="relative z-10 grid min-h-[100dvh] grid-rows-[1fr_auto] px-6 pb-7 pt-28 md:px-16 md:pb-10 md:pt-32"
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-end pb-16 md:pb-20">
          <div className="mb-7 flex items-center gap-4">
            <span className="block h-px w-10 bg-[oklch(76%_0.085_55)]" aria-hidden="true" />
            <p className="font-['Albert_Sans'] text-[10px] font-semibold uppercase tracking-[0.2em] text-[oklch(96.2%_0.012_65)]/80">
              Architecture / Malolos, Bulacan
            </p>
          </div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-[12ch] font-['Bodoni_Moda'] text-[clamp(4.25rem,11vw,10rem)] font-normal leading-[0.84] tracking-[-0.055em] text-[oklch(96.2%_0.012_65)]"
          >
            Vanessa<br />
            Benipayo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8 max-w-[32rem] font-['Albert_Sans'] text-base leading-relaxed text-[oklch(90.5%_0.024_57)] md:text-lg"
          >
            Architecture shaped by place, material, and the work between.
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href="#thesis"
              className="inline-flex min-h-[48px] items-center bg-[oklch(56%_0.095_42)] px-6 py-4 font-['Albert_Sans'] text-[10px] font-semibold uppercase tracking-[0.16em] text-[oklch(96.2%_0.012_65)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[oklch(66%_0.095_42)] active:translate-y-0 active:scale-[0.98]"
            >
              View thesis <span className="ml-3 text-base leading-none" aria-hidden="true">↗</span>
            </a>
            <a
              href="#works"
              className="inline-flex min-h-[48px] items-center gap-3 font-['Albert_Sans'] text-[10px] font-semibold uppercase tracking-[0.16em] text-[oklch(96.2%_0.012_65)]/90 transition-colors duration-200 hover:text-[oklch(76%_0.085_55)]"
            >
              Browse selected work
              <span className="block h-px w-8 bg-current" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-5 border-t border-[oklch(96.2%_0.012_65)]/25 pt-5 md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-8">
          <p
            role="status"
            aria-live="polite"
            className="font-['Albert_Sans'] text-[10px] font-semibold uppercase tracking-[0.16em] text-[oklch(90.5%_0.024_57)]/80"
          >
            {slide.meta}
          </p>

          <div className="flex items-center gap-2" role="group" aria-label="Featured work">
            {slides.map((item, index) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Show ${item.label}`}
                aria-pressed={index === current}
                onClick={() => setCurrent(index)}
                className="group flex min-h-[44px] items-center gap-2 py-2"
              >
                <span
                  aria-hidden="true"
                  className={`block h-px transition-[width,background-color] duration-300 ${
                    index === current
                      ? 'w-10 bg-[oklch(76%_0.085_55)]'
                      : 'w-3 bg-[oklch(96.2%_0.012_65)]/40 group-hover:bg-[oklch(96.2%_0.012_65)]/80'
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="hidden justify-self-end font-['Albert_Sans'] text-[10px] font-semibold uppercase tracking-[0.2em] text-[oklch(90.5%_0.024_57)]/60 md:block">
            Scroll to explore
          </p>
        </div>
      </motion.div>
    </section>
  )
}
