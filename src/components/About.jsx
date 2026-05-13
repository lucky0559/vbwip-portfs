import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

export default function About() {
  const sectionRef = useRef(null)
  const { ref: textRef, inView } = useInView(0.1)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const imgY   = useTransform(smooth, [0, 1], ['4%', '-4%'])
  const markX  = useTransform(smooth, [0, 1], ['-2%', '2%'])

  return (
    <section id="about" ref={sectionRef} className="relative bg-[#F8F5F1] py-20 md:py-28 overflow-hidden">

      <motion.div
        aria-hidden style={{ x: markX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 font-['Cormorant_Garamond'] text-[22vw] font-light leading-none text-[#EDE0D4]/25 select-none pointer-events-none whitespace-nowrap"
      >
        About
      </motion.div>

      <div className="max-w-6xl mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Portrait — centered within column */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[420px]">
              <div className="relative overflow-hidden aspect-[3/4] rounded-2xl">
                <motion.div
                  className="absolute inset-0"
                  style={{ y: imgY, scale: 1.22 }}
                >
                  <img
                    src="/images/vanessa-portrait.png"
                    alt="Vanessa Aguilar Benipayo"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 right-0 bg-[#B09070] px-8 py-7 text-[#F8F5F1]"
              >
                <p className="font-['Cormorant_Garamond'] text-2xl font-light leading-tight">BS Arch</p>
                <p className="font-['DM_Sans'] text-[9px] tracking-[0.2em] uppercase mt-1.5 opacity-80">
                  Class of 2024
                </p>
              </motion.div>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[#B09070] mb-6">
                — The Architect
              </p>

              <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08] text-[#1C1815] mb-8">
                Vanessa Aguilar<br />
                <em className="italic text-[#B09070]">Benipayo</em>
              </h2>

              <p className="font-['DM_Sans'] font-light text-[14px] leading-[1.9] text-[#4A3F38] mb-6">
                A graduate of Bachelor of Science in Architecture from National University Manila,
                Batch 2024. Currently working as a project architect at HDPow Construction and
                Development Corporation in Malolos, Bulacan, Philippines, where I handle BIM
                modeling, technical drawings, design coordination, and 3D visualization.
              </p>

              <p className="font-['DM_Sans'] font-light text-[14px] leading-[1.9] text-[#4A3F38] mb-10">
                Proficient in Revit, AutoCAD, Lumion, Enscape, and Adobe Creative Suite — with
                a deep appreciation for architecture rooted in culture, community, and context.
              </p>

              {/* Contact details */}
              <div className="pt-8 border-t border-[#C9B9AE]/40">
                {[
                  { label: 'Email',    value: 'benipayovanessa@gmail.com' },
                  { label: 'Phone',    value: '+639 949 526 454' },
                  { label: 'Location', value: 'Malolos, Bulacan, Philippines' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/vanessabenipayo' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                    className="flex gap-8 items-baseline py-3 border-b border-[#EDE0D4]"
                  >
                    <span className="font-['DM_Sans'] text-[9px] tracking-[0.22em] uppercase text-[#B09070] w-16 shrink-0">
                      {item.label}
                    </span>
                    <span className="font-['DM_Sans'] font-light text-[13px] text-[#4A3F38]">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
