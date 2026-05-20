import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Services', 'Works', 'Skills', 'Thesis', 'Philosophy', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding] duration-300 ${
          scrolled
            ? 'bg-[oklch(97.5%_0.006_65)]/95 backdrop-blur-md border-b border-[oklch(76%_0.025_55)]/30 py-5'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="w-full px-8 md:px-16 flex items-center">
          <div className="flex-1">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="font-['Cormorant_Garamond'] text-2xl font-medium tracking-[0.2em] text-[oklch(14%_0.008_52)] uppercase cursor-pointer"
            >
              VAB<span className="text-[oklch(64%_0.057_55)]">.</span>
            </motion.button>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="font-['DM_Sans'] text-[11px] tracking-[0.14em] uppercase text-[oklch(30%_0.020_52)] hover:text-[oklch(64%_0.057_55)] transition-[color] duration-200 cursor-pointer active:scale-[0.97]"
                style={{ transition: 'color 200ms var(--ease-out), transform 160ms var(--ease-out)' }}
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden flex flex-col gap-1.5 min-w-[44px] min-h-[44px] items-center justify-center cursor-pointer"
              style={{ transition: 'transform 160ms var(--ease-out)' }}
            >
              <span className={`block w-6 h-px bg-[oklch(14%_0.008_52)] transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-px bg-[oklch(14%_0.008_52)] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px bg-[oklch(14%_0.008_52)] transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[oklch(97.5%_0.006_65)] flex flex-col items-center justify-center gap-10"
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo(link)}
                className="font-['Cormorant_Garamond'] text-4xl font-light tracking-wider text-[oklch(14%_0.008_52)] hover:text-[oklch(64%_0.057_55)] transition-[color] duration-200 cursor-pointer"
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
