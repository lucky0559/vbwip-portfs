import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

const services = [
  {
    icon: '◻',
    title: 'Architectural Design',
    body: 'From concept to construction documentation — residential, cultural, civic, and hospitality projects of all scales.',
  },
  {
    icon: '◈',
    title: 'Interior Architecture',
    body: 'Spatial planning, material selection, and detailing that transforms interiors into cohesive environments.',
  },
  {
    icon: '◇',
    title: 'Master Planning',
    body: 'Urban and landscape master planning that balances programme, ecology, movement, and community life.',
  },
  {
    icon: '◉',
    title: 'Heritage & Renovation',
    body: 'Sensitive interventions into existing fabric — restoration, adaptive reuse, and extension of historic buildings.',
  },
  {
    icon: '△',
    title: 'Competition & Research',
    body: 'Speculative and competition work exploring the boundaries of what architecture can be and do.',
  },
  {
    icon: '◎',
    title: 'Consultancy',
    body: 'Design reviews, expert witness, feasibility studies, and advisory services for developers and institutions.',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const { ref: headRef, inView } = useInView()

  // Watermark drifts rightward as you scroll through
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const smoothP = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const markX = useTransform(smoothP, [0, 1], ['4%', '-4%'])

  return (
    <section id="services" ref={sectionRef} className="bg-[#EDE0D4] py-44 overflow-hidden relative">
      {/* Drifting watermark */}
      <motion.div
        aria-hidden
        style={{ x: markX }}
        className="absolute top-1/2 right-0 -translate-y-1/2 font-['Cormorant_Garamond'] text-[18vw] font-light leading-none text-[#C9B9AE]/30 select-none pointer-events-none whitespace-nowrap"
      >
        Services
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">

        <div ref={headRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95 }}
          >
            <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[#B09070] mb-5">
              — What We Offer
            </p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-[#1C1815]">
              Services
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9B9AE]/30">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#EDE0D4] px-12 py-14 group hover:bg-[#F8F5F1] transition-colors duration-500"
            >
              <span className="block font-['Cormorant_Garamond'] text-3xl text-[#B09070] mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
                {s.icon}
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-xl font-light text-[#1C1815] mb-5">
                {s.title}
              </h3>
              <p className="font-['DM_Sans'] font-light text-[13px] leading-[1.9] text-[#4A3F38]">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
