import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

const services = [
  {
    title: 'Architectural Design',
    body: 'From concept to construction documentation — residential, cultural, civic, and hospitality projects of all scales.',
  },
  {
    title: 'Interior Architecture',
    body: 'Spatial planning, material selection, and detailing that transforms interiors into cohesive environments.',
  },
  {
    title: 'Master Planning',
    body: 'Urban and landscape master planning that balances programme, ecology, movement, and community life.',
  },
  {
    title: 'Heritage & Renovation',
    body: 'Sensitive interventions into existing fabric — restoration, adaptive reuse, and extension of historic buildings.',
  },
  {
    title: 'Competition & Research',
    body: 'Speculative and competition work exploring the boundaries of what architecture can be and do.',
  },
  {
    title: 'Consultancy',
    body: 'Design reviews, expert witness, feasibility studies, and advisory services for developers and institutions.',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const { ref: headRef, inView: headInView } = useInView()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const smoothP = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const markX   = useTransform(smoothP, [0, 1], ['4%', '-4%'])

  return (
    <section id="services" ref={sectionRef} className="bg-[oklch(89.5%_0.022_60)] py-28 md:py-36 overflow-hidden relative">
      <motion.div
        aria-hidden
        style={{ x: markX }}
        className="absolute top-1/2 right-0 -translate-y-1/2 font-['Cormorant_Garamond'] text-[12vw] font-light leading-none text-[oklch(76%_0.025_55)]/30 select-none pointer-events-none whitespace-nowrap"
      >
        Services
      </motion.div>

      <div className="max-w-6xl mx-auto px-8 md:px-16 relative z-10">

        <div ref={headRef} className="mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[oklch(64%_0.057_55)] mb-5">
              — What I Offer
            </p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-[oklch(14%_0.008_52)]">
              Services
            </h2>
          </motion.div>
        </div>

        <div>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-8 md:gap-14 py-10 border-b border-[oklch(76%_0.025_55)]/35 cursor-default"
            >
              <span className="font-['Cormorant_Garamond'] text-[3rem] md:text-[4.5rem] font-light leading-none text-[oklch(76%_0.025_55)] group-hover:text-[oklch(64%_0.057_55)] shrink-0 tabular-nums"
                style={{ transition: 'color 280ms var(--ease-out)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex-1 flex flex-col md:flex-row gap-3 md:gap-14 pt-2 md:pt-5">
                <h3
                  className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-light text-[oklch(14%_0.008_52)] group-hover:text-[oklch(64%_0.057_55)] shrink-0 md:w-60"
                  style={{ transition: 'color 280ms var(--ease-out)' }}
                >
                  {s.title}
                </h3>
                <p className="font-['DM_Sans'] font-light text-[13px] md:text-[14px] leading-[1.9] text-[oklch(30%_0.020_52)]">
                  {s.body}
                </p>
              </div>

              <span
                className="hidden md:block text-[oklch(76%_0.025_55)] group-hover:text-[oklch(64%_0.057_55)] pt-5 shrink-0 text-sm"
                style={{ transition: 'color 280ms var(--ease-out), transform 280ms var(--ease-out)' }}
              >
                →
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
