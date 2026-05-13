import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const slides = [
  { src: '/images/singkaban-aerial.jpg', label: 'SINGKABAN — Architectural Thesis, 2024' },
  { src: '/images/commercial-hub.jpg', label: 'Commercial Hub Lobby · Malolos, Bulacan' },
  { src: '/images/uniqlo-warehouse.jpg', label: 'Uniqlo Warehouse · Apprentice Work, 2024' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
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

      {/* Background — slowest layer */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out bg-cover bg-center"
            style={{ backgroundImage: `url(${s.src})`, opacity: i === current ? 1 : 0 }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-[#1C1815]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C1815]/70" />

      {/* Content — faster layer */}
      <motion.div
        style={{ y: textY, opacity, scale }}
        className="relative z-10 h-full flex flex-col justify-end w-full px-12 md:px-24 pb-24 md:pb-32"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="block w-10 h-px bg-[#B09070]" />
          <span className="font-['DM_Sans'] text-[11px] tracking-[0.3em] uppercase text-[#C9B9AE]">
            BS Architecture · Malolos, Bulacan
          </span>
        </motion.div>

        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: 140 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Cormorant_Garamond'] font-light text-[clamp(3.2rem,8vw,8.5rem)] leading-[0.9] text-[#F8F5F1]"
          >
            Vanessa Benipayo
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-16">
          <motion.p
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Cormorant_Garamond'] italic font-light text-[clamp(1.3rem,3vw,2.6rem)] text-[#C9B9AE] leading-snug"
          >
            Designing spaces with purpose.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="flex items-center gap-8"
        >
          <button
            onClick={() => document.getElementById('thesis')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-['DM_Sans'] text-[11px] tracking-[0.22em] uppercase px-9 py-4 bg-[#B09070] text-[#F8F5F1] hover:bg-[#8A6E50] transition-colors duration-300 cursor-pointer"
          >
            View Thesis
          </button>
          <button
            onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-['DM_Sans'] text-[11px] tracking-[0.22em] uppercase text-[#EDE0D4] hover:text-white transition-colors duration-300 flex items-center gap-3 cursor-pointer"
          >
            See Works
            <span className="block w-10 h-px bg-current" />
          </button>
        </motion.div>
      </motion.div>

      {/* Slide label */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-11 left-12 md:left-24 z-10"
      >
        <p className="font-['DM_Sans'] text-[10px] tracking-[0.2em] uppercase text-[#C9B9AE]/70">
          {slides[current].label}
        </p>
      </motion.div>

      {/* Slide indicators — padded for 44px touch target */}
      <div className="absolute bottom-6 right-12 md:right-24 z-10 flex gap-1 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="flex items-center justify-center py-4 px-2 cursor-pointer"
          >
            <span className={`block h-px transition-all duration-500 ${
              i === current ? 'w-10 bg-[#B09070]' : 'w-3 bg-[#C9B9AE]/50'
            }`} />
          </button>
        ))}
      </div>

      {/* Scroll cue — stops after 4 cycles */}
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
          <span className="font-['DM_Sans'] text-[9px] tracking-[0.35em] uppercase text-[#C9B9AE]">Scroll</span>
          <div className="w-px h-14 bg-[#C9B9AE]/30 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#B09070]"
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
