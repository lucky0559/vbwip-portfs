import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Works', 'Skills', 'Thesis', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F8F5F1]/95 backdrop-blur-md border-b border-[#C9B9AE]/30 py-4'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-['Cormorant_Garamond'] text-xl font-medium tracking-[0.2em] text-[#1C1815] uppercase"
          >
            VAB<span className="text-[#B09070]">.</span>
          </button>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="font-['DM_Sans'] text-xs tracking-[0.18em] uppercase text-[#4A3F38] hover:text-[#B09070] transition-colors duration-300"
              >
                {link}
              </button>
            ))}
          </div>

          <a
            href="mailto:benipayovanessa@gmail.com"
            className="hidden md:block font-['DM_Sans'] text-xs tracking-[0.18em] uppercase px-5 py-2.5 border border-[#B09070] text-[#B09070] hover:bg-[#B09070] hover:text-[#F8F5F1] transition-all duration-300"
          >
            Hire Me
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1"
          >
            <span className={`block w-6 h-px bg-[#1C1815] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-[#1C1815] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-[#1C1815] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#F8F5F1] flex flex-col items-center justify-center gap-10"
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(link)}
                className="font-['Cormorant_Garamond'] text-4xl font-light tracking-wider text-[#1C1815] hover:text-[#B09070] transition-colors"
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
