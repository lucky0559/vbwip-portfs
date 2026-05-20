import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useParallax'

function ParallaxBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const bgY  = useTransform(smooth, [0, 1], ['-12%', '12%'])
  const txtY = useTransform(smooth, [0, 1], ['6%', '-6%'])

  return (
    <div ref={ref} className="relative h-[50vh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/singkaban-board.jpg)` }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[oklch(14%_0.008_52)]/60" />
      <motion.div style={{ y: txtY }} className="relative z-10 h-full flex items-center justify-center px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Cormorant_Garamond'] font-light text-[clamp(2rem,5vw,4.5rem)] text-[oklch(97.5%_0.006_65)] leading-snug"
        >
          Open to opportunities<br />
          <em className="italic text-[oklch(76%_0.025_55)]">&amp; collaborations.</em>
        </motion.p>
      </motion.div>
    </div>
  )
}

const inputBase =
  'w-full bg-transparent border-b border-[oklch(30%_0.020_52)]/40 py-5 font-["DM_Sans"] text-[14px] text-[oklch(76%_0.025_55)] placeholder-[oklch(30%_0.020_52)]/60 focus:outline-none focus:border-[oklch(64%_0.057_55)]'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent]  = useState(false)
  const { ref, inView }  = useInView()

  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <section id="contact" className="relative overflow-hidden">
      <ParallaxBanner />

      <div className="bg-[oklch(14%_0.008_52)] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            <div ref={ref}>
              <motion.div
                initial={{ opacity: 0, y: 44 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-['DM_Sans'] text-[11px] tracking-[0.28em] uppercase text-[oklch(64%_0.057_55)] mb-8">
                  — Get in Touch
                </p>
                <h2 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.1] text-[oklch(97.5%_0.006_65)] mb-10">
                  Start a<br />
                  <em className="italic text-[oklch(64%_0.057_55)]">conversation</em>
                </h2>

                <div className="space-y-0">
                  {[
                    { label: 'Name',     value: 'Vanessa Aguilar Benipayo' },
                    { label: 'Email',    value: 'benipayovanessa@gmail.com' },
                    { label: 'Phone',    value: '+639 949 526 454' },
                    { label: 'Location', value: 'Malolos, Bulacan, Philippines' },
                  ].map(item => (
                    <div key={item.label} className="flex gap-10 items-start border-b border-[oklch(30%_0.020_52)]/40 py-7">
                      <span className="font-['DM_Sans'] text-[10px] tracking-[0.22em] uppercase text-[oklch(64%_0.057_55)] w-20 shrink-0 pt-0.5">
                        {item.label}
                      </span>
                      <span className="font-['DM_Sans'] font-light text-[14px] text-[oklch(76%_0.025_55)] leading-relaxed">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-8 mt-14">
                  {[
                    { label: 'LinkedIn', href: 'https://linkedin.com/in/vanessabenipayo' },
                    { label: 'Email',    href: 'mailto:benipayovanessa@gmail.com' },
                  ].map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-['DM_Sans'] text-[10px] tracking-[0.18em] uppercase text-[oklch(76%_0.025_55)] hover:text-[oklch(64%_0.057_55)]"
                      style={{ transition: 'color 200ms var(--ease-out)' }}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 44 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {sent ? (
                <div className="h-full flex flex-col items-start justify-center gap-6">
                  <div className="w-12 h-px bg-[oklch(64%_0.057_55)]" />
                  <p className="font-['Cormorant_Garamond'] italic font-light text-4xl text-[oklch(97.5%_0.006_65)]">
                    Message received.
                  </p>
                  <p className="font-['DM_Sans'] font-light text-[14px] text-[oklch(76%_0.025_55)] leading-relaxed">
                    I'll get back to you within two business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                  <div>
                    <label htmlFor="contact-name" className="block font-['DM_Sans'] text-[10px] tracking-[0.25em] uppercase text-[oklch(64%_0.057_55)] mb-3">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className={inputBase}
                      style={{ transition: 'border-color 200ms var(--ease-out)' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block font-['DM_Sans'] text-[10px] tracking-[0.25em] uppercase text-[oklch(64%_0.057_55)] mb-3">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className={inputBase}
                      style={{ transition: 'border-color 200ms var(--ease-out)' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block font-['DM_Sans'] text-[10px] tracking-[0.25em] uppercase text-[oklch(64%_0.057_55)] mb-3">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Your message or project inquiry..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className={`${inputBase} resize-none`}
                      style={{ transition: 'border-color 200ms var(--ease-out)' }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                    className="font-['DM_Sans'] text-[11px] tracking-[0.22em] uppercase py-5 bg-[oklch(64%_0.057_55)] text-[oklch(97.5%_0.006_65)] mt-2 cursor-pointer"
                    style={{ transition: 'background-color 220ms var(--ease-out), transform 160ms var(--ease-out)' }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = 'oklch(51% 0.058 54)'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'oklch(64% 0.057 55)'}
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
