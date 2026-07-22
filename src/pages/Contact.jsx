import { useState } from 'react'
import emailjs from '@emailjs/browser'

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:muzainahfaisal.mf@gmail.com',
    icon: '✉️',
  },
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

  function handleChange(event) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error')
      return
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'muzainahfaisal.mf@gmail.com',
        },
        publicKey,
      )
      .then(() => {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      })
      .catch((error) => {
        console.error('EmailJS error:', error)
        setStatus('error')
      })
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
          {status === 'error' && (
            <p className="form-feedback error">
              The message could not be sent. Please check your EmailJS Service ID, Template ID, and Public Key in your .env file.
            </p>
          )}
          <p className="form-note">
            Configure your EmailJS Service ID, Template ID, and Public Key in your local .env file.
          </p>
        </form>

        <div className="contact-sidebar">
          <div className="info-card">
            <h2>Contact Details</h2>
            <p>Email: muzainahfaisal.mf@gmail.com</p>
            <p>Location: Karachi, Pakistan</p>
          </div>

          <div className="info-card">
            <h2>Social Links</h2>
            <div className="social-links">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  <span className="social-icon" aria-hidden="true">
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
