import { motion } from 'framer-motion'

const capabilities = [
  ['BIM modeling', 'Revit'],
  ['Technical drawing', 'AutoCAD'],
  ['3D visualization', 'Lumion · Enscape'],
  ['Mixed media art', 'Watercolor · pencil · ink'],
  ['Design coordination', 'Architecture · interiors · MEP'],
  ['Concept sketching', 'Freehand studies'],
]

const software = ['Revit', 'AutoCAD', 'Lumion', 'Enscape', 'Photoshop', 'Illustrator', 'SketchUp', 'Microsoft Office']

const timeline = [
  { label: 'Now', title: 'Project Architect', detail: 'ADGO Architecture and Design Incorporated · Aug 2024—present' },
  { label: '2024', title: 'BS Architecture', detail: 'National University Manila · Dean’s Lister, 1st + 2nd term 2021' },
  { label: '2020—22', title: 'UAP Graduate Auxiliary', detail: 'United Architects of the Philippines' },
]

export default function Skills() {
  return (
    <section id="skills" className="section section--paper skills-section" aria-labelledby="skills-title">
      <div className="container">
        <div className="skills-heading">
          <div>
            <p className="eyebrow">05 / Tools at hand</p>
            <h2 id="skills-title" className="section-title section-title--medium">Range is useful when it <em>stays connected.</em></h2>
          </div>
          <p className="skills-heading__note">The tools change from project to project. The through-line is the ability to move between a broad idea and a precise next step.</p>
        </div>

        <div className="skills-layout">
          <div className="capability-list">
            {capabilities.map(([title, detail], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
                className="capability-row"
              >
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </motion.article>
            ))}
          </div>

          <aside className="software-note">
            <p className="eyebrow">Software</p>
            <ul>
              {software.map(tool => <li key={tool}>{tool}</li>)}
            </ul>
            <p className="software-note__caption">Practical fluency for the handoff between drawing, model, and image.</p>
          </aside>
        </div>

        <div className="timeline-block">
          <p className="eyebrow">Education + experience</p>
          <div className="timeline-list">
            {timeline.map(item => (
              <div key={item.title} className="timeline-item">
                <span>{item.label}</span>
                <div><h3>{item.title}</h3><p>{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
