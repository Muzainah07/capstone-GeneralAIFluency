import { useState } from 'react'
import emailjs from '@emailjs/browser'

const emailAddress = 'muzainahfaisal.mf@gmail.com'
const emailSubject = 'Portfolio Contact'
const emailBody = 'Hi Muzainah,\n\nI found your portfolio and would like to get in touch.'
const emailHref = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

const contactLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muzainah-faisal-9b73ab28a',
    icon: 'in',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Muzainah07',
    icon: '⌘',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)

  function handleChange(event) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (error) {
      console.error('Failed to copy email:', error)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    // EmailJS credentials are read from Vite environment variables in the local .env file.
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error')
      setErrorMessage(
        'Email service is not configured yet. Please contact me directly using the email or LinkedIn links.',
      )
      return
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'muzainahfaisal.mf@gmail.com',
    }

    try {
      emailjs.init(publicKey)

      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then(() => {
          setStatus('success')
          setErrorMessage('')
          setFormData({ name: '', email: '', subject: '', message: '' })
        })
        .catch((error) => {
          const details = error?.text || error?.message || 'Unknown EmailJS error'
          console.error('EmailJS error:', details, error)
          setStatus('error')
          setErrorMessage(
            'Unable to send your message right now. Please try again later or contact me directly.',
          )
        })
    } catch (error) {
      console.error('EmailJS initialization error:', error)
      setStatus('error')
      setErrorMessage(
        'Unable to send your message right now. Please try again later or contact me directly.',
      )
    }
  }

  return (
    <section className="page-card contact-page">
      <div className="section-heading">
        <p className="eyebrow">Get In Touch</p>
        <h1>Let’s Connect</h1>
      </div>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project inquiry"
              required
            />
          </label>

          <label>
            Message
            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or idea"
              required
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && <p className="form-feedback success">Message sent successfully.</p>}
          {status === 'error' && <p className="form-feedback error">{errorMessage}</p>}
          <p className="form-note">
            Configure your EmailJS Service ID, Template ID, and Public Key in your local .env file.
          </p>
        </form>

        <div className="contact-sidebar">
          <div className="info-card">
            <h2>Contact Details</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <p style={{ margin: 0 }}>Email: {emailAddress}</p>
              <button type="button" className="btn btn-secondary" onClick={handleCopyEmail}>
                {copiedEmail ? 'Copied!' : 'Copy Email'}
              </button>
            </div>
            <p>Location: Karachi, Pakistan</p>
          </div>

          <div className="info-card">
            <h2>Social Links</h2>
            <div className="social-links">
              {contactLinks.map((link) => {
                const isExternal = link.href.startsWith('http')

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    <span className="social-icon" aria-hidden="true">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
