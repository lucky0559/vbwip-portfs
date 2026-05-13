import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  },
  {
    id: 2,
    title: 'Commercial Hub Lobby',
    subtitle: 'Interior Render — Revit & Lumion',
    category: 'Thesis',
    year: '2024',
    location: 'Malolos, Bulacan',
    image: '/images/commercial-hub.jpg',
  },
  {
    id: 3,
    title: 'Training Facility',
    subtitle: 'Exterior Render — Enscape',
    category: 'Thesis',
    year: '2024',
    location: 'Malolos, Bulacan',
    image: '/images/training-facility.jpg',
  },
  {
    id: 4,
    title: 'Uniqlo Warehouse',
    subtitle: 'BIM & Revit Modeling',
    category: 'Apprentice',
    year: '2024',
    location: 'Philippines',
    image: '/images/uniqlo-warehouse.jpg',
  },
  {
    id: 5,
    title: 'Pampanga Warehouse',
    subtitle: 'Visualization — Lumion',
    category: 'Apprentice',
    year: '2024',
    location: 'Pampanga',
    image: '/images/pampanga-warehouse.jpg',
  },
  {
    id: 6,
    title: 'Sydney Opera House',
    subtitle: 'Mixed Media — Watercolor & Color Pastel',
    category: 'Art',
    year: '2022',
    location: 'Academic Study',
    image: '/images/sydney-watercolor.jpg',
  },
]

const categories = ['All', 'Thesis', 'Apprentice', 'Art']

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#1C1815]/80 via-[#1C1815]/20 to-transparent"
          animate={{ opacity: hovered ? 1 : 0.65 }}
          transition={{ duration: 0.5 }}
        />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="absolute top-5 right-5 w-10 h-10 border border-[#EDE0D4]/70 flex items-center justify-center"
            >
              <span className="text-[#EDE0D4] text-sm">→</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-['DM_Sans'] text-[10px] tracking-[0.22em] uppercase text-[#C9B9AE] mb-1.5">
            {project.category} · {project.year}
          </p>
          <h3 className="font-['Cormorant_Garamond'] font-light text-[clamp(1.1rem,2vw,1.5rem)] text-[#F8F5F1] leading-tight mb-1">
            {project.title}
          </h3>
          <p className="font-['DM_Sans'] text-[11px] text-[#C9B9AE]/80">{project.subtitle}</p>
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
    <section id="works" className="bg-[#F8F5F1] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 md:px-16 mb-12">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[#B09070] mb-4">
              — Selected Works
            </p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] text-[#1C1815]">
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
                className={`font-['DM_Sans'] text-[11px] tracking-[0.18em] uppercase pb-1 border-b transition-all duration-300 cursor-pointer min-h-[44px] ${
                  filter === cat ? 'border-[#B09070] text-[#B09070]' : 'border-transparent text-[#4A3F38] hover:text-[#B09070]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="px-8 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-6 gap-3 md:gap-4"
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
