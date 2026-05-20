import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

const spaces = [
  { label: 'Commercial Hub Lobby', img: '/images/commercial-hub.jpg' },
  { label: 'Training Facility',    img: '/images/training-lobby.jpg' },
  { label: 'Aerial Perspective',   img: '/images/singkaban-aerial.jpg' },
]

function SpaceCard({ label, img, index }) {
  const { ref, inView } = useInView(0.15)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden aspect-[16/9] group">
        <motion.img
          src={img}
          alt={label}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-[oklch(14%_0.008_52)]/20 group-hover:bg-[oklch(14%_0.008_52)]/8 transition-[background-color] duration-500" />
      </div>
      <p className="font-['DM_Sans'] text-[11px] tracking-[0.18em] uppercase text-[oklch(64%_0.057_55)] mt-4">{label}</p>
    </motion.div>
  )
}

function ParallaxBand({ src, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const bgY    = useTransform(smooth, [0, 1], ['-10%', '10%'])
  const txtY   = useTransform(smooth, [0, 1], ['6%', '-6%'])

  return (
    <div ref={ref} className="relative h-[65vh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
      </motion.div>
      <div className="absolute inset-0 bg-[oklch(14%_0.008_52)]/55" />
      <motion.div style={{ y: txtY }} className="relative z-10 h-full flex items-center justify-center px-8 text-center">
        {children}
      </motion.div>
    </div>
  )
}

export default function Thesis() {
  const sectionRef = useRef(null)
  const { ref: headRef, inView } = useInView()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const markX  = useTransform(smooth, [0, 1], ['2%', '-2%'])

  return (
    <section id="thesis" ref={sectionRef} className="relative overflow-hidden">

      <ParallaxBand src="/images/singkaban-aerial.jpg">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-['DM_Sans'] text-[10px] tracking-[0.35em] uppercase text-[oklch(64%_0.057_55)] mb-8">
            — Architectural Thesis · Design 10 · 2024
          </p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.5rem,7vw,6rem)] text-[oklch(97.5%_0.006_65)] leading-[0.95] mb-6">
            SINGKABAN
          </h2>
          <p className="font-['Cormorant_Garamond'] italic font-light text-[clamp(1rem,2.5vw,1.8rem)] text-[oklch(76%_0.025_55)]">
            A Proposed Malolos Commercial Hub with Training Facility
          </p>
        </motion.div>
      </ParallaxBand>

      <div className="bg-[oklch(97.5%_0.006_65)] py-20 md:py-28">
        <div className="px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,400px)_1fr] gap-16 lg:gap-20">

            <div ref={headRef} className="lg:sticky lg:top-24 lg:self-start pb-8">
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[oklch(64%_0.057_55)] mb-8">
                  — Design Concept
                </p>
                <h3 className="font-['Cormorant_Garamond'] font-light text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-[oklch(14%_0.008_52)] mb-10">
                  Empowerment<br />
                  <em className="italic text-[oklch(64%_0.057_55)]">&amp; Experience</em>
                </h3>
                <p className="font-['DM_Sans'] font-light text-[14px] leading-[1.9] text-[oklch(30%_0.020_52)] mb-8">
                  Singkaban — the Filipino word for the decorative bamboo arch synonymous with Bulacan —
                  inspired the form language of this project. The aluminum cladding façade replicates
                  the intricate weave of the traditional arch.
                </p>
                <p className="font-['DM_Sans'] font-light text-[14px] leading-[1.9] text-[oklch(30%_0.020_52)] mb-10">
                  Located on MacArthur Highway, Malolos, the 2.43-hectare development serves micro,
                  small, and medium enterprises (MSMEs) — creating a platform for local industry,
                  agriculture, and cultural exchange.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[oklch(76%_0.025_55)]/40">
                  {[
                    { v: '2.43 ha', l: 'Total Lot Area' },
                    { v: '3F + RD', l: 'Commercial Hub' },
                    { v: 'MSMEs',   l: 'Primary Users' },
                    { v: 'Revit',   l: 'Primary Tool' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.l}
                      initial={{ opacity: 0, y: 14 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.28 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="font-['Cormorant_Garamond'] text-2xl font-light text-[oklch(14%_0.008_52)] mb-1">{s.v}</p>
                      <p className="font-['DM_Sans'] text-[10px] tracking-[0.15em] uppercase text-[oklch(30%_0.020_52)]">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <SpaceCard {...spaces[0]} index={0} />
              </div>
              <SpaceCard {...spaces[1]} index={1} />
              <SpaceCard {...spaces[2]} index={2} />
            </div>

          </div>
        </div>
      </div>

      <div className="bg-[oklch(89.5%_0.022_60)] py-16">
        <div className="px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[oklch(76%_0.025_55)]/30">
            {[
              { n: '01', t: 'Cultural Exhibition', b: 'Exhibit the culture and local products of Malolos, rooting the building in its community identity.' },
              { n: '02', t: 'Business Ecosystem',  b: 'Create a conducive environment to generate businesses and support livelihood programmes.' },
              { n: '03', t: 'People-Centric Design', b: 'Establish spaces that prioritize human experience, accessibility, and social cohesion.' },
            ].map((obj, i) => (
              <motion.div
                key={obj.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[oklch(89.5%_0.022_60)] px-12 py-14 hover:bg-[oklch(97.5%_0.006_65)] group"
                style={{ transition: 'background-color 400ms var(--ease-out)' }}
              >
                <span
                  className="font-['Cormorant_Garamond'] text-4xl font-light text-[oklch(76%_0.025_55)] group-hover:text-[oklch(64%_0.057_55)] block mb-6"
                  style={{ transition: 'color 400ms var(--ease-out)' }}
                >
                  {obj.n}
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-xl font-light text-[oklch(14%_0.008_52)] mb-5">{obj.t}</h4>
                <p className="font-['DM_Sans'] font-light text-[13px] leading-[1.9] text-[oklch(30%_0.020_52)]">{obj.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
