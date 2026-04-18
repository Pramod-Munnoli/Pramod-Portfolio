import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Journey', href: '#journey' },
  { name: 'Projects', href: '#projects' },
  { name: 'Open Source', href: '#opensource' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-4' : 'py-5 sm:py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span
            className="text-2xl font-bold gradient-text"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {'<PM />'}
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] group-hover:w-full transition-all duration-300" />
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${activeSection === link.href.replace('#', '')
                  ? 'text-[var(--accent-cyan)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              {link.name}
              {activeSection === link.href.replace('#', '') && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-[var(--accent-cyan)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="ml-4 force-premium-padding text-sm font-semibold rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-[var(--bg-primary)] hover:shadow-lg hover:shadow-[var(--accent-cyan)]/20 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-[var(--text-primary)] z-50"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`text-2xl font-medium transition-colors ${activeSection === link.href.replace('#', '')
                    ? 'gradient-text'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              className="mt-4 force-premium-padding rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-[var(--bg-primary)] font-bold text-base"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
