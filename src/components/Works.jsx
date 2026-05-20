import { useState } from 'react'
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
    title: 'Pampanga Warehouse',
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group cursor-pointer ${
        project.size === 'large' ? 'md:col-span-2 lg:col-span-2' : 'md:col-span-1 lg:col-span-1'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden h-[280px] md:h-[360px]">
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[oklch(14%_0.008_52)]/80 via-[oklch(14%_0.008_52)]/20 to-transparent"
          animate={{ opacity: hovered ? 1 : 0.68 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-5 right-5 w-10 h-10 border border-[oklch(89.5%_0.022_60)]/70 flex items-center justify-center"
            >
              <span className="text-[oklch(89.5%_0.022_60)] text-sm">→</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-['DM_Sans'] text-[10px] tracking-[0.22em] uppercase text-[oklch(76%_0.025_55)] mb-1.5">
            {project.category} · {project.year}
          </p>
          <h3 className="font-['Cormorant_Garamond'] font-light text-[clamp(1.1rem,2vw,1.5rem)] text-[oklch(97.5%_0.006_65)] leading-tight mb-1">
            {project.title}
          </h3>
          <p className="font-['DM_Sans'] text-[11px] text-[oklch(76%_0.025_55)]/80">{project.subtitle}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Works() {
  const [filter, setFilter] = useState('All')
  const { ref, inView }     = useInView()
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="works" className="bg-[oklch(97.5%_0.006_65)] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 md:px-16 mb-12">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[oklch(64%_0.057_55)] mb-4">
              — Selected Works
            </p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] text-[oklch(14%_0.008_52)]">
              Projects & Works
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="flex gap-6 flex-wrap"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="font-['DM_Sans'] text-[11px] tracking-[0.18em] uppercase pb-1 cursor-pointer min-h-[44px]"
                style={{
                  borderBottom: `1px solid ${filter === cat ? 'oklch(64% 0.057 55)' : 'transparent'}`,
                  color: filter === cat ? 'oklch(64% 0.057 55)' : 'oklch(30% 0.020 52)',
                  transition: 'color 200ms var(--ease-out), border-color 200ms var(--ease-out), transform 160ms var(--ease-out)',
                }}
                onMouseOver={e => { if (filter !== cat) e.currentTarget.style.color = 'oklch(64% 0.057 55)' }}
                onMouseOut={e => { if (filter !== cat) e.currentTarget.style.color = 'oklch(30% 0.020 52)' }}
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4"
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
