import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useInView } from '../hooks/useParallax'

const projects = [
  {
    id: '01',
    title: 'Singkaban',
    subtitle: 'Commercial hub with training facility',
    category: 'Thesis',
    year: '2024',
    location: 'Malolos, Bulacan',
    role: 'Architectural thesis, Revit + Lumion + Enscape',
    status: 'Featured study',
    image: '/images/singkaban-board.jpg',
    alt: 'Architectural study board with plans, elevations, and material notes for the Singkaban commercial hub and training facility.',
    views: ['Study board: plans and elevations', 'Aerial view', 'Lobby interior', 'Training facility exterior'],
    href: '#thesis',
    link: 'Read the study',
  },
  {
    id: '02',
    title: 'Uniqlo Warehouse',
    subtitle: 'BIM and Revit modeling',
    category: 'Apprentice',
    year: '2024',
    location: 'Philippines',
    role: 'Apprentice work',
    status: 'Professional work',
    image: '/images/uniqlo-warehouse.jpg',
    alt: 'Exterior view of the Uniqlo warehouse project.',
    href: '#contact',
    link: 'Ask about this work',
  },
  {
    id: '03',
    title: 'Pampanga Warehouse',
    subtitle: 'Architectural visualization',
    category: 'Apprentice',
    year: '2024',
    location: 'Pampanga',
    role: 'Lumion',
    status: 'Professional work',
    image: '/images/pampanga-warehouse.jpg',
    alt: 'Architectural visualization of the Pampanga warehouse project.',
    href: '#contact',
    link: 'Ask about this work',
  },
  {
    id: '04',
    title: 'Sydney Opera House',
    subtitle: 'Watercolor and color pencil study',
    category: 'Art',
    year: '2022',
    location: 'Academic study',
    role: 'Mixed media',
    status: 'Visual research',
    image: '/images/sydney-watercolor.jpg',
    alt: 'Close crop of a watercolor and color pencil study of the Sydney Opera House.',
    href: '#contact',
    link: 'Ask about this work',
  },
]

const categories = ['All', 'Thesis', 'Apprentice', 'Art']

export default function Works() {
  const [filter, setFilter] = useState('All')
  const { ref, inView } = useInView(0.12)
  const filtered = filter === 'All' ? projects : projects.filter(project => project.category === filter)

  return (
    <section id="works" className="section section--paper works-section" aria-labelledby="works-title">
      <div className="container">
        <div ref={ref} className="works-heading">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">03 / Selected work</p>
            <h2 id="works-title" className="section-title section-title--medium">
              A small archive of decisions.
            </h2>
          </motion.div>

          <div className="works-heading__aside">
            <p>Project context comes first: place, year, role, and status stay beside the image.</p>
            <div className="filter-bar" role="group" aria-label="Filter selected work">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                  className={`filter-button${filter === category ? ' filter-button--active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="filter-status" role="status" aria-live="polite">
              Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="project-index"
          >
            {filtered.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
                className="project-row"
              >
                <a href={project.href} className="project-row__link" aria-label={`${project.title}: ${project.link}`}>
                  <span className="project-row__number">{project.id}</span>
                  <div className="project-row__context">
                    <span className="project-row__category">{project.category} / {project.status}</span>
                    <h3>{project.title}</h3>
                    <span className="project-row__subtitle">{project.subtitle}</span>
                    {project.views && (
                      <span className="project-row__views">Views: {project.views.join(' / ')}</span>
                    )}
                  </div>
                  <dl className="project-row__facts">
                    <div><dt>Place</dt><dd>{project.location}</dd></div>
                    <div><dt>Year</dt><dd>{project.year}</dd></div>
                    <div><dt>Role</dt><dd>{project.role}</dd></div>
                  </dl>
                  <div className="project-row__media">
                    <img src={project.image} alt={project.alt} width="640" height="420" loading="lazy" />
                  </div>
                  <span className="project-row__action">{project.link} <span aria-hidden="true">↗</span></span>
                </a>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="works-note">
          <span className="works-note__line" aria-hidden="true" />
          <p>More drawings, models, and working files available on request.</p>
          <a href="#contact" className="text-link">Start with a question <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
