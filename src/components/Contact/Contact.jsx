import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiMail, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import emailjs from '@emailjs/browser'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
}

const socialLinks = [
  {
    name: 'Email',
    icon: <HiMail />,
    href: 'mailto:pramodmunnoli99@gmail.com',
    label: 'pramodmunnoli99@gmail.com',
    color: 'var(--accent-cyan)',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin />,
    href: 'https://www.linkedin.com/in/pramod-munnoli/',
    label: 'pramod-munnoli',
    color: 'var(--accent-blue)',
  },
  {
    name: 'GitHub',
    icon: <FaGithub />,
    href: 'https://github.com/Pramod-Munnoli',
    label: 'Pramod-Munnoli',
    color: 'var(--accent-purple)',
  },
  {
    name: 'Location',
    icon: <HiLocationMarker />,
    href: null,
    label: 'Bengaluru, Karnataka, India',
    color: 'var(--accent-green)',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // 'success' | 'error' | 'sending'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    } catch (err) {
      console.error('EmailJS Error:', err)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ paddingBottom: 0, marginBottom: 0 }}>
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--accent-cyan)]/5 rounded-full blur-[150px]" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="text-center mb-10"
        >
          <span className="section-label">
            Get in Touch
          </span>
          <h2 className="section-title gradient-text">
            Let's Build Something Amazing
          </h2>
          <div className="neon-line w-24 mx-auto mt-4" />
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={1}
            className="space-y-5"
          >
            {socialLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ x: 4 }}
                className="glass rounded-xl flex items-center gap-5 hover:bg-white/[0.06] transition-all duration-300"
                style={{ padding: '1rem 1.25rem', marginBottom: '1rem' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${link.color} 15%, transparent)`,
                    color: link.color,
                  }}
                >
                  {link.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">{link.name}</h4>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <p className="text-sm text-[var(--text-secondary)]">{link.label}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={2}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl force-container-padding space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl bg-white/[0.08] border border-white/[0.12] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30 hover:bg-white/[0.12] transition-all duration-300"
                    style={{ padding: '0.75rem 1.25rem' }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-xl bg-white/[0.08] border border-white/[0.12] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30 hover:bg-white/[0.12] transition-all duration-300"
                    style={{ padding: '0.75rem 1.25rem' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can I help you?"
                  className="w-full rounded-xl bg-white/[0.08] border border-white/[0.12] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30 hover:bg-white/[0.12] transition-all duration-300"
                  style={{ padding: '0.75rem 1.25rem' }}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full rounded-xl bg-white/[0.08] border border-white/[0.12] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30 hover:bg-white/[0.12] transition-all duration-300 resize-none"
                  style={{ padding: '1rem 1.25rem' }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-[var(--bg-primary)] font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[var(--accent-cyan)]/20 transition-all duration-300 ${
                  status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <HiPaperAirplane className={status === 'sending' ? 'animate-pulse' : 'rotate-45'} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </motion.button>

              {/* Status messages */}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-[var(--accent-green)] font-medium"
                >
                  ✅ Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-[var(--accent-red)] font-medium"
                >
                  ❌ Something went wrong. Please try again or email me directly.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
