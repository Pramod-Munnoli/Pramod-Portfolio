import { motion } from 'framer-motion'
import { HiArrowDown, HiDownload } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient overlays for depth on top of the global 3D bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)]/80 z-[1]" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--accent-cyan)]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--accent-purple)]/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6"
        >
          <span
            className="inline-block force-tag-padding rounded-full text-sm font-medium glass text-[var(--accent-cyan)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            👋 Welcome to my portfolio
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Hi, I'm{' '}
          <span className="gradient-text">Pramod</span>
          <br />
          <span className="gradient-text">Munnoli</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg md:text-xl text-[var(--text-secondary)] mb-4 max-w-2xl mx-auto"
        >
          Full Stack Developer crafting innovative web solutions
        </motion.p>

        {/* Roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 md:gap-5 mb-14"
        >
          {['MERN Specialist', 'Open Source Contributor', 'Hackathon Enthusiast'].map((role, i) => (
            <span
              key={role}
              className="force-tag-padding text-xs sm:text-sm rounded-full glass text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group force-premium-padding rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-[var(--bg-primary)] font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-[var(--accent-cyan)]/25 transition-all duration-300 flex items-center justify-center gap-3"
          >
            Explore My Work
            <HiArrowDown className="group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group force-premium-padding rounded-full glass text-[var(--text-primary)] font-semibold text-sm sm:text-base hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <HiDownload className="group-hover:-translate-y-0.5 transition-transform" />
            Download Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href="https://github.com/Pramod-Munnoli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] text-xl transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/pramod-munnoli/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] text-xl transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[var(--text-muted)] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
          Scroll Down
        </span>
        <HiArrowDown className="text-[var(--accent-cyan)] animate-scroll-indicator" />
      </motion.div>
    </section>
  )
}
