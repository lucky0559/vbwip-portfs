import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

const projects = [
  {
    id: 1,
    title: 'SINGKABAN',
    subtitle: 'Commercial Hub with Training Facility',
    category: 'Thesis',
    year: '2024',
    location: 'Malolos, Bulacan',
    image: '/images/singkaban-aerial.jpg',
    size: 'large',
  },
  {
    id: 2,
    title: 'Commercial Hub Lobby',
    subtitle: 'Interior Render — Revit & Lumion',
    category: 'Thesis',
    year: '2024',
    location: 'Malolos, Bulacan',
    image: '/images/commercial-hub.jpg',
    size: 'small',
  },
  {
    id: 3,
    title: 'Training Facility',
    subtitle: 'Exterior Render — Enscape',
    category: 'Thesis',
    year: '2024',
    location: 'Malolos, Bulacan',
    image: '/images/training-facility.jpg',
    size: 'small',
  },
  {
    id: 4,
    title: 'Uniqlo Warehouse',
    subtitle: 'BIM & Revit Modeling',
    category: 'Apprentice',
    year: '2024',
    location: 'Philippines',
    image: '/images/uniqlo-warehouse.jpg',
    size: 'large',
  },
  {
    id: 5,
    title: 'Pampanga Warehouse Scheme',
    subtitle: 'Visualization — Lumion',
    category: 'Apprentice',
    year: '2024',
    location: 'Pampanga',
    image: '/images/pampanga-warehouse.jpg',
    size: 'small',
  },
  {
    id: 6,
    title: 'Sydney Opera House',
    subtitle: 'Mixed Media — Watercolor & Color Pastel',
    category: 'Art',
    year: '2022',
    location: 'Academic Study',
    image: '/images/sydney-watercolor.jpg',
    size: 'small',
  },
]

const categories = ['All', 'Thesis', 'Apprentice', 'Art']

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'center center'] })
  const smooth    = useSpring(scrollYProgress, { stiffness: 70, damping: 22 })
  const imgScale  = useTransform(smooth, [0, 1], [1.1, 1.0])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group cursor-pointer ${project.size === 'large' ? 'lg:col-span-2' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative overflow-hidden ${project.size === 'large' ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ scale: imgScale }}
          animate={{ scale: hovered ? 1.05 : undefined }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#1C1815]/80 via-[#1C1815]/20 to-transparent"
          animate={{ opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.5 }}
        />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className="absolute top-7 right-7 w-11 h-11 border border-[#EDE0D4]/70 flex items-center justify-center"
            >
              <span className="text-[#EDE0D4]">→</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-['DM_Sans'] text-[10px] tracking-[0.22em] uppercase text-[#C9B9AE] mb-2">
                {project.category} · {project.year}
              </p>
              <h3 className="font-['Cormorant_Garamond'] font-light text-[clamp(1.4rem,2.5vw,2.2rem)] text-[#F8F5F1] leading-tight mb-1">
                {project.title}
              </h3>
              <p className="font-['DM_Sans'] text-[11px] text-[#C9B9AE]/80">{project.subtitle}</p>
            </div>
            <p className="font-['DM_Sans'] text-[11px] text-[#C9B9AE] text-right hidden sm:block shrink-0">
              {project.location}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Works() {
  const [filter, setFilter] = useState('All')
  const { ref, inView } = useInView()
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="works" className="bg-[#F8F5F1] py-44 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <div ref={ref} className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[#B09070] mb-5">
              — Selected Works
            </p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-[#1C1815]">
              Projects & Works
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-6 flex-wrap"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-['DM_Sans'] text-[11px] tracking-[0.18em] uppercase pb-1 border-b transition-all duration-300 ${
                  filter === cat ? 'border-[#B09070] text-[#B09070]' : 'border-transparent text-[#4A3F38] hover:text-[#B09070]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
