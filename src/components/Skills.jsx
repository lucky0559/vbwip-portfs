import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Layers, PenLine, Box, Palette, GitMerge, Pen } from 'lucide-react'
import { useInView } from '../hooks/useParallax'

const software = [
  { name: 'Revit',             level: 92 },
  { name: 'AutoCAD',           level: 90 },
  { name: 'Lumion',            level: 85 },
  { name: 'Enscape',           level: 85 },
  { name: 'Adobe Photoshop',   level: 80 },
  { name: 'Adobe Illustrator', level: 75 },
  { name: 'SketchUp & LayOut', level: 78 },
  { name: 'Microsoft Office',  level: 95 },
]

const skills = [
  {
    Icon: Layers,
    title: 'BIM Modeling',
    body: 'Building information modeling using Revit — architectural and structural coordination, clash detection, and full project documentation.',
    img: '/images/singkaban-aerial.jpg',
  },
  {
    Icon: PenLine,
    title: 'Technical Drawing',
    body: 'Detailed AutoCAD drafting for floor plans, elevations, sections, reflected ceiling plans, and construction documents.',
    img: '/images/commercial-hub.jpg',
  },
  {
    Icon: Box,
    title: '3D Visualization',
    body: 'Photo-realistic rendering using Lumion and Enscape — real-time walkthroughs and immersive environment presentations.',
    img: '/images/training-lobby.jpg',
  },
  {
    Icon: Palette,
    title: 'Mixed Media Art',
    body: 'Architectural illustration in watercolor, color pencil, pastel, pen & ink, alcohol markers, and graphite.',
    img: '/images/sydney-watercolor.jpg',
  },
  {
    Icon: GitMerge,
    title: 'Design Coordination',
    body: 'Cross-discipline coordination among architectural, structural, MEP, and interior design teams throughout project development.',
    img: '/images/training-facility.jpg',
  },
  {
    Icon: Pen,
    title: 'Free Hand Drawing',
    body: 'Expressive hand-rendered sketches and concept ideation in pen & ink — rapid design communication at any stage.',
    img: '/images/singkaban-board.jpg',
  },
]

function SkillBar({ name, level, index }) {
  const { ref, inView } = useInView(0.3)
  return (
    <div ref={ref} className="py-4 border-b border-[oklch(76%_0.025_55)]/30">
      <div className="flex justify-between items-center mb-2.5">
        <span className="font-['DM_Sans'] text-[13px] text-[oklch(14%_0.008_52)]">{name}</span>
        <span className="font-['DM_Sans'] text-[11px] text-[oklch(64%_0.057_55)] tracking-wider tabular-nums">{level}%</span>
      </div>
      <div className="h-px bg-[oklch(89.5%_0.022_60)] relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[oklch(64%_0.057_55)]"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

function SkillSlide({ s, index, total, scrollProgress }) {
  const n     = total
  const start = index / n
  const end   = (index + 1) / n
  const gap   = 0.025

  const opacityKeys = index === 0
    ? [0, end - gap, end + gap]
    : [start - gap, start + gap, end - gap, end + gap]
  const opacityVals = index === 0
    ? [1, 1, 0]
    : [0, 1, 1, 0]

  const opacity = useTransform(scrollProgress, opacityKeys, opacityVals)

  const yKeys = index === 0
    ? [0, end - gap, end + gap]
    : [start - gap, start + gap, end - gap, end + gap]
  const yVals = index === 0
    ? ['0px', '0px', '-50px']
    : ['50px', '0px', '0px', '-50px']

  const contentY = useTransform(scrollProgress, yKeys, yVals)
  const bgY      = useTransform(scrollProgress, [start, end], ['-6%', '6%'])

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none"
      aria-hidden={index !== 0}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${s.img})`, y: bgY }}
        />
      </div>
      <div className="absolute inset-0 bg-[oklch(14%_0.008_52)]/72" />

      <motion.div
        style={{ y: contentY }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8"
      >
        <span className="text-[oklch(64%_0.057_55)] mb-8 block">
          <s.Icon size={40} strokeWidth={1} />
        </span>
        <h3 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.8rem,6vw,5.5rem)] text-[oklch(97.5%_0.006_65)] leading-[1.0] mb-8">
          {s.title}
        </h3>
        <div className="w-12 h-px bg-[oklch(64%_0.057_55)] mb-8" />
        <p className="font-['DM_Sans'] font-light text-[15px] text-[oklch(76%_0.025_55)] leading-[1.95] max-w-lg">
          {s.body}
        </p>
      </motion.div>

      <div className="absolute bottom-10 left-8 md:left-16 z-10 flex items-center gap-4">
        <span className="font-['Cormorant_Garamond'] text-4xl font-light text-[oklch(64%_0.057_55)] leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-['DM_Sans'] text-[9px] tracking-[0.25em] uppercase text-[oklch(76%_0.025_55)]/60">
          / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="absolute bottom-12 right-8 md:right-16 z-10 flex flex-col gap-2 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-px"
            style={{
              height: i === index ? '2rem' : '0.5rem',
              backgroundColor: i === index ? 'oklch(64% 0.057 55)' : 'oklch(76% 0.025 55 / 0.4)',
              transition: 'height 600ms var(--ease-out), background-color 600ms var(--ease-out)',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef  = useRef(null)
  const showcaseRef = useRef(null)
  const { ref: headRef, inView } = useInView()

  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const sectionSmooth = useSpring(sectionProgress, { stiffness: 60, damping: 20 })
  const markX = useTransform(sectionSmooth, [0, 1], ['4%', '-4%'])

  const { scrollYProgress: showcaseProgress } = useScroll({ target: showcaseRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(showcaseProgress, { stiffness: 40, damping: 18 })

  return (
    <>
      <section id="skills" ref={sectionRef} className="bg-[oklch(89.5%_0.022_60)] py-20 md:py-28 overflow-hidden relative">

        <motion.div
          aria-hidden
          style={{ x: markX }}
          className="absolute top-1/2 right-0 -translate-y-1/2 font-['Cormorant_Garamond'] text-[16vw] font-light leading-none text-[oklch(76%_0.025_55)]/30 select-none pointer-events-none whitespace-nowrap"
        >
          Skills
        </motion.div>

        <div className="max-w-6xl mx-auto px-8 md:px-16 relative z-10">

          <div ref={headRef} className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[oklch(64%_0.057_55)] mb-5">
                — Capabilities
              </p>
              <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-[oklch(14%_0.008_52)]">
                Skills & Software
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <p className="font-['DM_Sans'] text-[11px] tracking-[0.22em] uppercase text-[oklch(64%_0.057_55)] mb-10">
              Software Proficiency
            </p>
            {software.map((s, i) => <SkillBar key={s.name} {...s} index={i} />)}
          </motion.div>

          {/* Education & Experience — no side-stripe borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[oklch(76%_0.025_55)]/40">
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-['DM_Sans'] text-[11px] tracking-[0.22em] uppercase text-[oklch(64%_0.057_55)] mb-8">
                  {col.label}
                </p>
                <div className="space-y-0">
                  {col.items.map((item, itemIdx) => (
                    <div
                      key={item.title}
                      className={`py-7 ${itemIdx < col.items.length - 1 ? 'border-b border-[oklch(76%_0.025_55)]/35' : ''}`}
                    >
                      <p className="font-['Cormorant_Garamond'] text-xl font-light text-[oklch(14%_0.008_52)] mb-1">{item.title}</p>
                      <p className="font-['DM_Sans'] text-[12px] text-[oklch(30%_0.020_52)] mb-1">{item.sub}</p>
                      {item.note && (
                        <p className="font-['DM_Sans'] text-[11px] italic text-[oklch(64%_0.057_55)]">{item.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <div ref={showcaseRef} className="relative" style={{ height: `${skills.length * 100 + 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">

          <div className="absolute top-0 left-0 right-0 z-20 px-8 md:px-16 pt-8 flex items-center justify-between">
            <p className="font-['DM_Sans'] text-[10px] tracking-[0.32em] uppercase text-[oklch(76%_0.025_55)]/70">
              — Core Capabilities
            </p>
            <p className="font-['DM_Sans'] text-[10px] tracking-[0.22em] uppercase text-[oklch(76%_0.025_55)]/50">
              Scroll to explore
            </p>
          </div>

          {skills.map((s, i) => (
            <SkillSlide
              key={s.title}
              s={s}
              index={i}
              total={skills.length}
              scrollProgress={smooth}
            />
          ))}
        </div>
      </div>
    </>
  )
}
