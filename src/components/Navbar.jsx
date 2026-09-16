import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { label: 'Work', id: 'works' },
  { label: 'Approach', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

const observedIds = ['home', ...links.map(link => link.id)]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const menuButtonRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = observedIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.2, 0.6] },
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const menuButton = menuButtonRef.current
    document.body.style.overflow = 'hidden'
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusFrame = requestAnimationFrame(() => {
      menuRef.current?.querySelector(focusableSelector)?.focus()
    })

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const focusable = [...(menuRef.current?.querySelectorAll(focusableSelector) ?? [])]
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      menuButton?.focus()
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary navigation"
        className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}${menuOpen ? ' site-nav--open' : ''}`}
      >
        <div className="site-nav__inner">
          <a href="#home" onClick={closeMenu} className="site-brand" aria-label="Vanessa Benipayo, back to top">
            <span className="site-brand__name">Vanessa</span>
            <span className="site-brand__mark">/ Benipayo</span>
          </a>

          <div className="site-nav__links">
            {links.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={closeMenu}
                aria-current={activeId === link.id ? 'location' : undefined}
                className={`site-nav__link${activeId === link.id ? ' site-nav__link--active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a href="#contact" onClick={closeMenu} className="site-nav__cta">
            Start a project <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="site-nav__menu-button"
          >
            <span aria-hidden="true" className={`menu-icon${menuOpen ? ' menu-icon--open' : ''}`}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-menu"
          >
            <p className="eyebrow">Site index</p>
            <div className="mobile-menu__links">
              {links.map((link, index) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  aria-current={activeId === link.id ? 'location' : undefined}
                  className={`mobile-menu__link${activeId === link.id ? ' mobile-menu__link--active' : ''}`}
                >
                  <span className="mobile-menu__number">0{index + 1}</span>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mobile-menu__footer">
              <p>Architecture, documentation, and visual thinking from Malolos, Bulacan.</p>
              <a href="mailto:benipayovanessa@gmail.com">benipayovanessa@gmail.com ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
