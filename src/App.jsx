import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Works        from './components/Works'
import Thesis       from './components/Thesis'
import Skills       from './components/Skills'
import Contact      from './components/Contact'
import Footer       from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Works />
      <Thesis />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}
