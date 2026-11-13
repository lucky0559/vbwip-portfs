import { motion } from 'framer-motion'

const principles = [
  {
    number: '01',
    title: 'Start with the place',
    body: 'Climate, culture, movement, and everyday use are not context notes. They are the first design material.',
  },
  {
    number: '02',
    title: 'Let materials be clear',
    body: 'A surface should explain what it is doing. Honest material choices make a space easier to read and easier to care for.',
  },
  {
    number: '03',
    title: 'Make the next step visible',
    body: 'A useful drawing reduces uncertainty. Each view should help the team decide, coordinate, or build with more confidence.',
  },
  {
    number: '04',
    title: 'Leave room for people',
    body: 'Good architecture is not only a composed object. It is a setting for exchange, pause, work, and belonging.',
  },
]

export default function Philosophy() {
  return (
    <section id="philosophy" className="section section--tinted philosophy-section" aria-labelledby="philosophy-title">
      <div className="container">
        <div className="philosophy-heading">
          <div>
            <p className="eyebrow">06 / Working notes</p>
            <h2 id="philosophy-title" className="section-title section-title--medium">Useful ideas make better spaces.</h2>
          </div>
          <blockquote>“The best drawing is the one that makes the next decision easier.”</blockquote>
        </div>

        <div className="principles-list">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.58, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="principle-row"
            >
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
