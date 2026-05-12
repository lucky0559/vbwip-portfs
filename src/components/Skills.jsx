import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

const software = [
  { name: 'Revit',               level: 92 },
  { name: 'AutoCAD',             level: 90 },
  { name: 'Lumion',              level: 85 },
  { name: 'Enscape',             level: 85 },
  { name: 'Adobe Photoshop',     level: 80 },
  { name: 'Adobe Illustrator',   level: 75 },
  { name: 'SketchUp & LayOut',   level: 78 },
  { name: 'Microsoft Office',    level: 95 },
]

const skills = [
  { icon: '◻', title: 'BIM Modeling',           body: 'Building information modeling using Revit — architectural and structural coordination, clash detection, and documentation.' },
  { icon: '◈', title: 'Technical Drawing',       body: 'Detailed AutoCAD drafting for floor plans, elevations, sections, reflected ceiling plans, and construction documents.' },
  { icon: '◇', title: '3D Visualization',        body: 'Photo-realistic rendering using Lumion and Enscape; real-time walkthroughs and immersive environment presentations.' },
  { icon: '◉', title: 'Mixed Media Art',         body: 'Architectural illustration in watercolor, color pencil, pastel, pen & ink, alcohol markers, and graphite.' },
  { icon: '△', title: 'Design Coordination',     body: 'Cross-discipline coordination among architectural, structural, MEP, and interior design teams during project development.' },
  { icon: '◎', title: 'Free Hand Drawing',       body: 'Expressive hand-rendered sketches and concept ideation in pen & ink — used for rapid design communication.' },
]

function SkillBar({ name, level, index }) {
  const { ref, inView } = useInView(0.3)
  return (
    <div ref={ref} className="py-4 border-b border-[#C9B9AE]/30">
      <div className="flex justify-between items-center mb-2">
        <span className="font-['DM_Sans'] text-[13px] text-[#1C1815]">{name}</span>
        <span className="font-['DM_Sans'] text-[11px] text-[#B09070] tracking-wider">{level}%</span>
      </div>
      <div className="h-px bg-[#EDE0D4] relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#B09070]"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const { ref: headRef, inView } = useInView()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const markX  = useTransform(smooth, [0, 1], ['4%', '-4%'])

  return (
    <section id="skills" ref={sectionRef} className="bg-[#EDE0D4] py-44 overflow-hidden relative">

      <motion.div
        aria-hidden style={{ x: markX }}
        className="absolute top-1/2 right-0 -translate-y-1/2 font-['Cormorant_Garamond'] text-[16vw] font-light leading-none text-[#C9B9AE]/30 select-none pointer-events-none whitespace-nowrap"
      >
        Skills
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">

        <div ref={headRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95 }}
          >
            <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[#B09070] mb-5">
              — Capabilities
            </p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-[#1C1815]">
              Skills & Software
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 mb-24">

          {/* Software bars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-['DM_Sans'] text-[11px] tracking-[0.22em] uppercase text-[#B09070] mb-10">
              Software Proficiency
            </p>
            {software.map((s, i) => <SkillBar key={s.name} {...s} index={i} />)}
          </motion.div>

          {/* Skill cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#C9B9AE]/30">
            {skills.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#EDE0D4] px-8 py-10 group hover:bg-[#F8F5F1] transition-colors duration-500"
              >
                <span className="block font-['Cormorant_Garamond'] text-2xl text-[#B09070] mb-5 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {s.icon}
                </span>
                <h3 className="font-['Cormorant_Garamond'] text-lg font-light text-[#1C1815] mb-3">{s.title}</h3>
                <p className="font-['DM_Sans'] font-light text-[12px] leading-[1.85] text-[#4A3F38]">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education & Experience row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-[#C9B9AE]/40">
          {[
            {
              label: 'Education',
              items: [
                { title: 'BS Architecture', sub: 'National University — Manila · Batch 2024', note: "Dean's Lister, 1st & 2nd Term 2021" },
                { title: 'Senior High School (STEM)', sub: "Dr. Yanga's Colleges Inc. · Batch 2019", note: '' },
              ]
            },
            {
              label: 'Experience',
              items: [
                { title: 'Project Architect', sub: 'HDPow Construction & Development Corp. · Aug 2024 – Present', note: 'BIM, Technical Drawings, Design Coordination, 3D Visualization' },
                { title: 'UAP Graduate Auxiliary', sub: 'United Architects of the Philippines · 2020 – 2022', note: '' },
              ]
            }
          ].map(col => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
            >
              <p className="font-['DM_Sans'] text-[11px] tracking-[0.22em] uppercase text-[#B09070] mb-8">{col.label}</p>
              <div className="space-y-8">
                {col.items.map(item => (
                  <div key={item.title} className="pl-6 border-l border-[#C9B9AE]/50">
                    <p className="font-['Cormorant_Garamond'] text-xl font-light text-[#1C1815] mb-1">{item.title}</p>
                    <p className="font-['DM_Sans'] text-[12px] text-[#4A3F38] mb-1">{item.sub}</p>
                    {item.note && <p className="font-['DM_Sans'] text-[11px] italic text-[#B09070]">{item.note}</p>}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
