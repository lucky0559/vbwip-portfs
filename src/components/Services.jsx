import { motion } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

const services = [
  {
    number: '01',
    title: '3D modelling',
    label: 'Revit + concept studies',
    body: 'Concept studies and spatial planning that hold onto the original idea while making the next decision visible.',
    src: '/images/singkaban-board.jpg',
    alt: 'Architectural study board with plans, elevations, and material notes.',
  },
  {
    number: '02',
    title: '3D animation rendering',
    label: 'Animation + sequence',
    body: 'A moving read of space, light, and sequence for ideas that need to be understood frame by frame.',
    src: '/images/training-lobby.jpg',
    alt: 'Interior visualization of a bright lobby with layered seating and a planted court.',
  },
  {
    number: '03',
    title: '3D architectural visualization',
    label: 'Lumion + Enscape',
    body: 'Lumion and Enscape images that explain atmosphere, material, and how a proposal might feel before it exists.',
    src: '/images/singkaban-aerial.jpg',
    alt: 'Aerial visualization of the Singkaban commercial hub and training facility.',
  },
  {
    number: '04',
    title: '3D interior visualization',
    label: 'Interior + material',
    body: 'Interior views that make scale, material, and the everyday experience of a room easier to imagine.',
    src: '/images/commercial-hub.jpg',
    alt: 'Interior perspective of the Singkaban commercial hub lobby with planted seating.',
  },
]

export default function Services() {
  const { ref: introRef, inView } = useInView(0.12)

  return (
    <section id="services" className="section section--paper services-section" aria-labelledby="services-title">
      <div className="container">
        <div ref={introRef} className="services-header">
          <p className="eyebrow">02 / Visualization practice</p>
          <motion.h2
            id="services-title"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="services-headline"
          >
            Visual studies that make architectural ideas legible.
          </motion.h2>
        </div>

        <ol className="services-list">
          {services.map(service => (
            <li key={service.number} className="services-row">
              <span className="services-row__number">{service.number}</span>
              <div className="services-row__text">
                <h3>{service.title}</h3>
                <span className="services-row__label">{service.label}</span>
                <p>{service.body}</p>
                <a href="#contact" className="text-link">
                  Discuss {service.title.toLowerCase()} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <img
                className="services-row__image"
                src={service.src}
                alt={service.alt}
                width="640"
                height="420"
                loading="lazy"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
