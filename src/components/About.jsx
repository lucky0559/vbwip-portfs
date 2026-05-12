import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

export default function About() {
  const sectionRef = useRef(null)
  const { ref: textRef, inView } = useInView(0.1)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const imgY   = useTransform(smooth, [0, 1], ['6%', '-6%'])
  const markX  = useTransform(smooth, [0, 1], ['-2%', '2%'])

  return (
    <section id="about" ref={sectionRef} className="relative bg-[#F8F5F1] py-44 md:py-56 overflow-hidden">

      <motion.div
        aria-hidden style={{ x: markX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 font-['Cormorant_Garamond'] text-[22vw] font-light leading-none text-[#EDE0D4]/50 select-none pointer-events-none whitespace-nowrap"
      >
        About
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">

          {/* Portrait */}
          <div className="relative pb-16 lg:pb-0">
            <div className="relative overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              <motion.img
                src="/images/vanessa-portrait.jpg"
                alt="Vanessa Aguilar Benipayo"
                className="w-full h-full object-cover object-center"
                style={{ y: imgY }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 right-0 lg:-right-12 bg-[#B09070] px-10 py-9 text-[#F8F5F1]"
            >
              <p className="font-['Cormorant_Garamond'] text-3xl font-light leading-tight">BS Arch</p>
              <p className="font-['DM_Sans'] text-[10px] tracking-[0.2em] uppercase mt-2 opacity-80">
                Class of 2024
              </p>
            </motion.div>
          </div>

          {/* Text */}
          <div ref={textRef} className="pt-16 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[#B09070] mb-8">
                — The Architect
              </p>

              <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.08] text-[#1C1815] mb-10">
                Vanessa Aguilar<br />
                <em className="italic text-[#B09070]">Benipayo</em>
              </h2>

              <p className="font-['DM_Sans'] font-light text-[15px] leading-[1.95] text-[#4A3F38] mb-8">
                A graduate of Bachelor of Science in Architecture from National University Manila,
                Batch 2024. Currently working as a project architect at HDPow Construction and
                Development Corporation in Malolos, Bulacan, Philippines, where I handle BIM
                modeling, technical drawings, design coordination, and 3D visualization.
              </p>

              <p className="font-['DM_Sans'] font-light text-[15px] leading-[1.95] text-[#4A3F38] mb-14">
                Proficient in Revit, AutoCAD, Lumion, Enscape, and Adobe Creative Suite. My
                academic and professional journey has shaped a deep appreciation for architecture
                that is rooted in culture, community, and context — best exemplified in my thesis
                project, Singkaban, a community-centered commercial hub in Malolos.
              </p>

              {/* Contact details */}
              <div className="space-y-0 pt-12 border-t border-[#C9B9AE]/40">
                {[
                  { label: 'Email',    value: 'benipayovanessa@gmail.com' },
                  { label: 'Phone',    value: '+639 949 526 454' },
                  { label: 'Location', value: 'Malolos, Bulacan, Philippines' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/vanessabenipayo' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                    className="flex gap-8 items-start py-4 border-b border-[#EDE0D4]"
                  >
                    <span className="font-['DM_Sans'] text-[10px] tracking-[0.2em] uppercase text-[#B09070] w-20 shrink-0 pt-0.5">
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
