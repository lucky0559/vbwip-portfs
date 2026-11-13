import { motion } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

const stats = [
  { value: '2.43 ha', label: 'Total lot area' },
  { value: '3F + RD', label: 'Commercial hub' },
  { value: 'MSMEs', label: 'Primary users' },
  { value: 'Revit', label: 'Primary tool' },
]

const process = [
  {
    number: '01',
    title: 'Read the place',
    body: 'The site sits on MacArthur Highway in Malolos, where local trade, agriculture, and everyday movement overlap.',
  },
  {
    number: '02',
    title: 'Translate the pattern',
    body: 'Singkaban, the decorative bamboo arch associated with Bulacan, becomes a screen, rhythm, and shared identity.',
  },
  {
    number: '03',
    title: 'Compose the exchange',
    body: 'A commercial hub and training facility give micro, small, and medium enterprises room to meet, learn, and grow.',
  },
]

export default function Thesis() {
  const { ref, inView } = useInView(0.12)

  return (
    <section id="thesis" className="thesis-section" aria-labelledby="thesis-title">
      <div className="thesis-header container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow eyebrow--light">04 / Featured study</p>
          <p className="thesis-header__issue">Design 10 · Architectural thesis · 2024</p>
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="thesis-title" className="thesis-header__title">Singkaban</h2>
          <p className="thesis-header__lede">A proposed Malolos commercial hub with training facility: architecture for local enterprise, exchange, and pride of place.</p>
        </motion.div>
        <a href="#contact" className="text-link text-link--light thesis-header__link">Ask about the project <span aria-hidden="true">↗</span></a>
      </div>

      <div className="container thesis-content">
        <div className="thesis-brief">
          <div>
            <p className="eyebrow eyebrow--light">The brief</p>
            <p className="thesis-brief__copy">The proposal uses the language of the local bamboo arch to make a large commercial programme feel familiar, open, and connected to its community.</p>
          </div>
          <dl className="thesis-stats">
            {stats.map(stat => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="thesis-gallery">
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="thesis-image thesis-image--wide"
          >
            <img src="/images/singkaban-aerial.jpg" alt="Aerial perspective of the Singkaban commercial hub, training facility, gardens, and productive landscape." width="1300" height="960" loading="lazy" />
            <figcaption><span>01 / Exterior perspective</span><span>Landscape as shared infrastructure</span></figcaption>
          </motion.figure>
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="thesis-image"
          >
            <img src="/images/commercial-hub.jpg" alt="Interior perspective of the commercial hub lobby showing planted seating and material studies." width="1250" height="710" loading="lazy" />
            <figcaption><span>02 / Commercial hub lobby</span><span>Material + movement</span></figcaption>
          </motion.figure>
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="thesis-image"
          >
            <img src="/images/training-lobby.jpg" alt="Interior perspective of the training facility lobby." width="1200" height="800" loading="lazy" />
            <figcaption><span>03 / Training facility</span><span>Learning in public</span></figcaption>
          </motion.figure>
        </div>

        <div className="thesis-process">
          <div className="thesis-process__heading">
            <p className="eyebrow eyebrow--light">Working method</p>
            <h3>A drawing set that keeps the why close.</h3>
          </div>
          <div className="thesis-process__list">
            {process.map(item => (
              <article key={item.number} className="thesis-process__item">
                <span>{item.number}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
