import { MotionConfig } from 'framer-motion'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import About         from './components/About'
import Services      from './components/Services'
import Works         from './components/Works'
import Thesis        from './components/Thesis'
import Skills        from './components/Skills'
import Philosophy    from './components/Philosophy'
import Contact       from './components/Contact'
import Footer        from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Works />
      <Thesis />
      <Skills />
      <Philosophy />
      <Contact />
      <Footer />
    </MotionConfig>
  )
}
