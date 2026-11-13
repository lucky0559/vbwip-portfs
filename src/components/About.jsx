import { motion } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

const details = [
  { label: 'Based in', value: 'Malolos, Bulacan' },
  { label: 'Practice', value: 'Design · BIM · Visualization' },
  { label: 'Education', value: 'BS Architecture · 2024' },
]

export default function About() {
  const { ref, inView } = useInView(0.15)

  return (
    <section id="about" className="section section--paper about-section" aria-labelledby="about-title">
      <div className="container">
        <div ref={ref} className="section-heading section-heading--split">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">01 / About the practice</p>
            <h2 id="about-title" className="section-title">
              Attention to the work between.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="section-lede"
          >
            A working portfolio by Vanessa Benipayo, an architect interested in how place, material, and clear documentation turn an idea into something people can use.
          </motion.p>
        </div>

        <div className="about-layout">
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="portrait-frame"
          >
            <img
              src="/images/vanessa-portrait.jpeg"
              alt="Portrait of Vanessa Aguilar Benipayo seated in a chair, smiling toward the camera."
              width="1122"
              height="1402"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>Vanessa Aguilar Benipayo</span>
              <span>Architect / Visual thinker</span>
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="about-copy"
          >
            <p className="about-copy__lead">
              I am a project architect at ADGO Architecture and Design Incorporated, working between early ideas and the drawings that make them buildable.
            </p>
            <p>
              My day-to-day practice moves through BIM modeling, technical drawings, design coordination, and 3D visualization. Each discipline is a different way to test the same question: does the space make sense for the people and place it serves?
            </p>
            <a href="#contact" className="text-link">
              Open to thoughtful collaborations <span aria-hidden="true">↗</span>
            </a>

            <dl className="about-details">
              {details.map(detail => (
                <div key={detail.label} className="about-detail">
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
