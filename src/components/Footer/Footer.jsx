import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Journey', href: '#journey' },
  { name: 'Projects', href: '#projects' },
  { name: 'Open Source', href: '#opensource' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

const socials = [
  { icon: <FaGithub />, href: 'https://github.com/Pramod-Munnoli', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/pramod-munnoli/', label: 'LinkedIn' },
  { icon: <HiMail />, href: 'mailto:pramodmunnoli99@gmail.com', label: 'Email' },
]

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Top gradient line */}
      <div className="neon-line w-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 force-container-padding">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Brand */}
          <div>
            <a
              href="#home"
              onClick={(e) => handleClick(e, '#home')}
              className="text-2xl font-bold gradient-text"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {'<PM />'}
            </a>
            <p className="text-sm text-[var(--text-secondary)] mt-3 max-w-xs leading-relaxed">
              Full Stack MERN Developer crafting innovative web solutions. 
              Hacktoberfest 2025 Super Contributor.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
              Connect
            </h4>
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/30 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Pramod Munnoli. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
            Built with <FaHeart className="text-[var(--accent-pink)] text-[10px]" /> using React & Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}
