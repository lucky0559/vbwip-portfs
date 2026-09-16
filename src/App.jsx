import { useEffect, useRef } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Works from './components/Works'
import Thesis from './components/Thesis'
import Skills from './components/Skills'
import Philosophy from './components/Philosophy'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

function getDocumentTop(element) {
  let current = element
  let top = 0

  while (current) {
    top += current.offsetTop
    current = current.offsetParent
  }

  return top
}

function SmoothScroll({ children }) {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const content = contentRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!wrapper || !content || reducedMotion) return undefined

    const previousBodyHeight = document.body.style.height
    let current = window.scrollY
    let target = current
    let frame = 0

    const scrollToHash = (hash) => {
      const targetElement = document.getElementById(decodeURIComponent(hash.slice(1)))

      if (!targetElement) return

      const scrollMarginTop = Number.parseFloat(getComputedStyle(targetElement).scrollMarginTop) || 0
      target = Math.max(getDocumentTop(targetElement) - scrollMarginTop, 0)
      window.scrollTo({ top: target, left: 0, behavior: 'instant' })
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    const updateBodyHeight = () => {
      document.body.style.height = `${content.scrollHeight}px`
    }

    const render = () => {
      const distance = target - current
      current += distance * 0.09

      if (Math.abs(distance) < 0.1) current = target

      content.style.transform = `translate3d(0, ${-current}px, 0)`
      window.dispatchEvent(new CustomEvent('smoothscroll', {
        detail: { position: current, target },
      }))

      if (Math.abs(target - current) > 0.1) {
        frame = window.requestAnimationFrame(render)
      } else {
        frame = 0
      }
    }

    const handleScroll = () => {
      target = window.scrollY
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    const handleAnchorClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]')
      const hash = link?.getAttribute('href')

      if (!link || !hash || hash === '#' || !document.getElementById(decodeURIComponent(hash.slice(1)))) return

      event.preventDefault()
      window.history.pushState({}, '', hash)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToHash(hash))
      })
    }

    const handleHashChange = () => {
      if (window.location.hash) scrollToHash(window.location.hash)
    }

    const resizeObserver = new ResizeObserver(updateBodyHeight)

    updateBodyHeight()
    wrapper.classList.add('smooth-scroll__wrapper--active')
    content.classList.add('smooth-scroll__content--active')
    resizeObserver.observe(content)
    render()
    if (window.location.hash) window.requestAnimationFrame(() => scrollToHash(window.location.hash))
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleAnchorClick)
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handleHashChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handleHashChange)
      resizeObserver.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
      content.style.transform = ''
      content.classList.remove('smooth-scroll__content--active')
      wrapper.classList.remove('smooth-scroll__wrapper--active')
      document.body.style.height = previousBodyHeight
    }
  }, [])

  return (
    <div ref={wrapperRef} className="smooth-scroll__wrapper">
      <div ref={contentRef} className="smooth-scroll__content">
        {children}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <SmoothScroll>
          <main id="main-content" tabIndex="-1">
            <Hero />
            <About />
            <Services />
            <Works />
            <Thesis />
            <Skills />
            <Philosophy />
            <Contact />
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </MotionConfig>
  )
}
