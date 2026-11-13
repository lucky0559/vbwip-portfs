import { useState } from 'react'
import { motion } from 'framer-motion'

const contactEmail = 'benipayovanessa@gmail.com'

const contactDetails = [
  { label: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
  { label: 'Phone', value: '+63 949 526 454', href: 'tel:+63949526454' },
  { label: 'Based in', value: 'Malolos, Bulacan, Philippines' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    setSubmitStatus('sending')
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          website: '',
        }),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(result.error || 'The message could not be sent.')

      setSubmitStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
      setSubmitError(error instanceof Error ? error.message : 'The message could not be sent. Please try again.')
    }
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-banner">
        <img src="/images/singkaban-board.jpg" alt="" width="1300" height="820" loading="lazy" aria-hidden="true" />
        <div className="contact-banner__veil" aria-hidden="true" />
        <div className="container contact-banner__content">
          <p className="eyebrow eyebrow--light">07 / The next drawing</p>
          <h2 id="contact-title">Have a project, opening, or question?</h2>
          <p>Tell me what you are working through. A clear starting point is enough.</p>
        </div>
      </div>

      <div className="contact-body">
        <div className="container contact-layout">
          <div className="contact-info">
            <p className="eyebrow eyebrow--light">Get in touch</p>
            <h3>Let’s make the next step clear.</h3>
            <p className="contact-info__copy">For studio opportunities, project conversations, or a closer look at the work, send a note directly here.</p>
            <div className="contact-details">
              {contactDetails.map(detail => (
                <div key={detail.label} className="contact-detail">
                  <span>{detail.label}</span>
                  {detail.href ? <a href={detail.href}>{detail.value}</a> : <strong>{detail.value}</strong>}
                </div>
              ))}
            </div>
            <div className="contact-links">
              <a href="https://linkedin.com/in/vanessabenipayo" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={`mailto:${contactEmail}`}>Email ↗</a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="contact-form-wrap"
          >
            {submitStatus === 'sent' ? (
              <div className="contact-success" role="status" aria-live="polite">
                <span className="contact-success__line" aria-hidden="true" />
                <h3>Message sent.</h3>
                <p>Your inquiry is on its way. Vanessa can reply directly to the email address you provided.</p>
                <button type="button" className="button button--outline-light" onClick={() => setSubmitStatus('idle')}>
                  Send another note
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="contact-form"
                aria-busy={submitStatus === 'sending'}
                aria-describedby={`contact-delivery-note${submitError ? ' contact-submit-error' : ''}`}
              >
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
                </div>

                <div className="field-group">
                  <label htmlFor="contact-name">Full name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={event => setForm({ ...form, name: event.target.value })}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={event => setForm({ ...form, email: event.target.value })}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What are you working on?"
                    value={form.message}
                    onChange={event => setForm({ ...form, message: event.target.value })}
                  />
                </div>

                <p id="contact-delivery-note" className="contact-form__note">Submitting sends your inquiry directly to Vanessa. Your email address is used as the reply address.</p>
                {submitError && (
                  <p id="contact-submit-error" role="alert" className="contact-form__error">{submitError}</p>
                )}
                {submitStatus === 'error' && (
                  <p className="contact-form__fallback">
                    Or write directly to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                  </p>
                )}
                <button type="submit" disabled={submitStatus === 'sending'} className="button button--oxide">
                  {submitStatus === 'sending' ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
