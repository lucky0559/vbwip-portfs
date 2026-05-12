import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

const principles = [
  {
    number: '01',
    title: 'Material Honesty',
    body: 'We let materials speak their own language — concrete remains concrete, timber stays timber. Authenticity in material creates authenticity in space.',
  },
  {
    number: '02',
    title: 'Light as Architect',
    body: 'Every building is sculpted by the light it receives. We design with light as a primary material, shaping atmosphere as much as form.',
  },
  {
    number: '03',
    title: 'Contextual Depth',
    body: 'Architecture that ignores its place ignores its purpose. We study the land, the culture, the climate — then we respond.',
  },
  {
    number: '04',
    title: 'Enduring Form',
    body: 'We resist the trendy in favor of the timeless. A well-made building should feel as right in fifty years as it does today.',
  },
]

function PrincipleItem({ principle, index }) {
  const { ref, inView } = useInView(0.2)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-10 py-14 border-b border-[#C9B9AE]/40 group"
    >
      <span className="font-['Cormorant_Garamond'] text-5xl font-light text-[#C9B9AE] shrink-0 group-hover:text-[#B09070] transition-colors duration-500 leading-none pt-1">
        {principle.number}
      </span>
      <div className="pt-1">
        <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-[#1C1815] mb-4">
          {principle.title}
        </h3>
        <p className="font-['DM_Sans'] font-light text-[14px] leading-[1.9] text-[#4A3F38]">
          {principle.body}
        </p>
      </div>
    </motion.div>
  )
}

// Apple-style: pinned image section with parallax bg + quote floating over it
function ParallaxQuote() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smoothP = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  // Background moves slower than the container (true parallax)
  const bgY = useTransform(smoothP, [0, 1], ['-12%', '12%'])
  // Quote text moves slightly upward as you scroll (subtle float)
  const quoteY = useTransform(smoothP, [0, 1], ['8%', '-8%'])

  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden">
      {/* Slowest layer — background image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1800&q=80)` }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[#1C1815]/52" />

      {/* Faster layer — quote text floats */}
      <motion.div
        style={{ y: quoteY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8 md:px-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          <span className="block font-['DM_Sans'] text-[10px] tracking-[0.35em] uppercase text-[#B09070] mb-10">
            — On Architecture
          </span>
          <p className="font-['Cormorant_Garamond'] italic font-light text-[clamp(1.6rem,4vw,3.2rem)] text-[#EDE0D4] max-w-4xl leading-[1.35] mb-10">
            "Architecture is the will of an epoch<br className="hidden md:block" /> translated into space."
          </p>
          <span className="font-['DM_Sans'] text-[11px] tracking-[0.25em] uppercase text-[#B09070]">
            Mies van der Rohe
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Philosophy() {
  const { ref: headRef, inView } = useInView()

  return (
    <section id="philosophy" className="relative overflow-hidden">
      <ParallaxQuote />

      {/* Principles */}
      <div className="bg-[#F8F5F1] py-44">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40">

            {/* Left heading — sticky as principles scroll */}
            <div ref={headRef} className="lg:sticky lg:top-36 lg:self-start pb-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.95 }}
              >
                <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[#B09070] mb-8">
                  — Design Philosophy
                </p>
                <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.1] text-[#1C1815] mb-10">
                  Guiding<br />
                  <em className="italic text-[#B09070]">Principles</em>
                </h2>
                <p className="font-['DM_Sans'] font-light text-[14px] leading-[1.9] text-[#4A3F38] max-w-xs">
                  These convictions underpin every decision we make — from the first sketch to the final detail.
                </p>
              </motion.div>
            </div>

            {/* Right — principles */}
            <div>
              {principles.map((p, i) => (
                <PrincipleItem key={p.number} principle={p} index={i} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
