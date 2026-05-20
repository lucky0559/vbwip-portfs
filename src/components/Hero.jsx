import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const slides = [
  { src: '/images/singkaban-aerial.jpg', label: 'SINGKABAN — Architectural Thesis, 2024' },
  { src: '/images/commercial-hub.jpg',   label: 'Commercial Hub Lobby · Malolos, Bulacan' },
  { src: '/images/uniqlo-warehouse.jpg', label: 'Uniqlo Warehouse · Apprentice Work, 2024' },
]

const TAP = { scale: 0.97 }
const TAP_TRANSITION = { duration: 0.16, ease: [0.23, 1, 0.32, 1] }

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })

  const bgY     = useTransform(smoothProgress, [0, 1], ['0%', '30%'])
  const textY   = useTransform(smoothProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(smoothProgress, [0, 0.55], [1, 0])
  const scale   = useTransform(smoothProgress, [0, 0.55], [1, 0.96])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${s.src})`,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 2200ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-[oklch(14%_0.008_52)]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(14%_0.008_52)]/70" />

      <motion.div
        style={{ y: textY, opacity, scale }}
        className="relative z-10 h-full flex flex-col justify-end w-full px-12 md:px-24 pb-24 md:pb-32"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="block w-10 h-px bg-[oklch(64%_0.057_55)]" />
          <span className="font-['DM_Sans'] text-[11px] tracking-[0.3em] uppercase text-[oklch(76%_0.025_55)]">
            BS Architecture · Malolos, Bulacan
          </span>
        </motion.div>

        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: 130 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Cormorant_Garamond'] font-light text-[clamp(3.2rem,8vw,8.5rem)] leading-[0.9] text-[oklch(97.5%_0.006_65)]"
          >
            Vanessa Benipayo
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-16">
          <motion.p
            initial={{ y: 70 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.0, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Cormorant_Garamond'] italic font-light text-[clamp(1.3rem,3vw,2.6rem)] text-[oklch(76%_0.025_55)] leading-snug"
          >
            Designing spaces with purpose.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex items-center gap-8"
        >
          <motion.button
            onClick={() => document.getElementById('thesis')?.scrollIntoView({ behavior: 'smooth' })}
            whileTap={TAP}
            transition={TAP_TRANSITION}
            className="font-['DM_Sans'] text-[11px] tracking-[0.22em] uppercase px-9 py-4 bg-[oklch(64%_0.057_55)] text-[oklch(97.5%_0.006_65)] cursor-pointer"
            style={{ transition: 'background-color 220ms var(--ease-out), transform 160ms var(--ease-out)' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'oklch(51% 0.058 54)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'oklch(64% 0.057 55)'}
          >
            View Thesis
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
            whileTap={TAP}
            transition={TAP_TRANSITION}
            className="font-['DM_Sans'] text-[11px] tracking-[0.22em] uppercase text-[oklch(89.5%_0.022_60)] flex items-center gap-3 cursor-pointer"
            style={{ transition: 'color 220ms var(--ease-out), transform 160ms var(--ease-out)' }}
            onMouseOver={e => e.currentTarget.style.color = 'white'}
            onMouseOut={e => e.currentTarget.style.color = 'oklch(89.5% 0.022 60)'}
          >
            See Works
            <span className="block w-10 h-px bg-current" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-11 left-12 md:left-24 z-10"
      >
        <p className="font-['DM_Sans'] text-[10px] tracking-[0.2em] uppercase text-[oklch(76%_0.025_55)]/70">
          {slides[current].label}
        </p>
      </motion.div>

      <div className="absolute bottom-6 right-12 md:right-24 z-10 flex gap-1 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="flex items-center justify-center py-4 px-2 cursor-pointer"
          >
            <span
              className="block h-px"
              style={{
                width: i === current ? '2.5rem' : '0.75rem',
                backgroundColor: i === current ? 'oklch(64% 0.057 55)' : 'oklch(76% 0.025 55 / 0.5)',
                transition: 'width 400ms var(--ease-out), background-color 400ms var(--ease-out)',
              }}
            />
          </button>
        ))}
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-['DM_Sans'] text-[9px] tracking-[0.35em] uppercase text-[oklch(76%_0.025_55)]">Scroll</span>
          <div className="w-px h-14 bg-[oklch(76%_0.025_55)]/30 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[oklch(64%_0.057_55)]"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: 4, ease: 'linear' }}
              style={{ height: '50%' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
