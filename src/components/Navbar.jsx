import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Works', id: 'works' },
  { label: 'Skills', id: 'skills' },
  { label: 'Thesis', id: 'thesis' },
  { label: 'Philosophy', id: 'philosophy' },
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
    const onScroll = () => setScrolled(window.scrollY > 60)
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
      { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.25, 0.6] },
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
    const focusFirst = () => menuRef.current?.querySelector(focusableSelector)?.focus()
    const focusFrame = requestAnimationFrame(focusFirst)

    const onKeyDown = event => {
      if (event.key === 'Escape') setMenuOpen(false)

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

  const navTone = scrolled || menuOpen
    ? 'text-[oklch(21%_0.012_72)]'
    : 'text-[oklch(96.2%_0.012_65)]'
  const linkTone = scrolled || menuOpen
    ? 'text-[oklch(38%_0.018_63)]'
    : 'text-[oklch(96.2%_0.012_65)]/80'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding] duration-300 ${
          scrolled
            ? 'border-b border-[oklch(80%_0.024_62)]/70 bg-[oklch(96.2%_0.012_65)]/92 py-4 backdrop-blur-md'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center px-6 md:px-16">
          <a
            href="#home"
            aria-label="Vanessa Benipayo, back to top"
            onClick={() => setMenuOpen(false)}
            className={`font-['Albert_Sans'] text-[13px] font-semibold tracking-[0.22em] transition-colors duration-200 ${navTone}`}
          >
            VAB<span className="text-[oklch(56%_0.095_42)]">.</span>
          </a>

          <div className="ml-auto hidden items-center gap-7 md:flex">
            {links.map(link => {
              const isActive = activeId === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative flex min-h-[44px] items-center font-['Albert_Sans'] text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${
                    isActive ? 'text-[oklch(56%_0.095_42)]' : linkTone
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-px bg-[oklch(56%_0.095_42)] transition-[width,opacity] duration-200 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                  {link.label}
                </a>
              )
            })}
          </div>

          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`ml-auto flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 md:hidden ${navTone}`}
          >
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
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
            className="fixed inset-0 z-40 flex flex-col bg-[oklch(96.2%_0.012_65)] px-8 pb-10 pt-32"
          >
            <p className="font-['Albert_Sans'] text-[10px] font-semibold uppercase tracking-[0.18em] text-[oklch(56%_0.095_42)]">
              Site index
            </p>
            <div className="mt-8 flex flex-col items-start gap-5">
              {links.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeId === link.id ? 'location' : undefined}
                  className={`font-['Bodoni_Moda'] text-4xl font-normal leading-none transition-colors duration-200 ${
                    activeId === link.id
                      ? 'text-[oklch(56%_0.095_42)]'
                      : 'text-[oklch(21%_0.012_72)]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="mt-auto max-w-[22rem] font-['Albert_Sans'] text-sm leading-relaxed text-[oklch(38%_0.018_63)]">
              Architecture, documentation, and visual thinking from Malolos, Bulacan.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
