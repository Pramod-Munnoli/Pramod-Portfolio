import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaGithub, FaCodeBranch, FaStar, FaUsers } from 'react-icons/fa'
import { HiExternalLink } from 'react-icons/hi'

const contributions = [
  'Web development tools',
  'Developer utilities',
  'Documentation improvements',
  'Bug fixes and feature additions',
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
}

export default function OpenSource() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })

  return (
    <section id="opensource" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--accent-green)]/5 rounded-full blur-[120px]" />

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
            Giving Back
          </span>
          <h2 className="section-title gradient-text">
            Open Source Contributions
          </h2>
          <div className="neon-line w-24 mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Hacktoberfest Card */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={1}
            className="glass rounded-2xl relative overflow-hidden"
            style={{ padding: '2.5rem' }}
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-orange)]/10 rounded-full blur-[50px]" />

            <div className="relative z-10">
              <div className="text-5xl mb-4">🎃</div>
              <h3 className="text-2xl font-bold text-[var(--accent-gold)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Hacktoberfest 2025
              </h3>
              <span className="inline-block px-6 py-2.5 rounded-full text-xs font-bold bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] border border-[var(--accent-gold)]/20 mb-4">
                🌟 Super Contributor
              </span>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <FaStar className="text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  Achieved Super Contributor status with 6 accepted PRs
                </li>
                <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <FaCodeBranch className="text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  Contributed to multiple open-source projects
                </li>
                <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <FaUsers className="text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  Part of the global movement supporting open source
                </li>
              </ul>
            </div>
          </motion.div>

          {/* GitHub Stats Card */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={2}
            className="glass rounded-2xl relative overflow-hidden"
            style={{ padding: '1rem' }}
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent-cyan)]/10 rounded-full blur-[50px]" />

            <div className="relative z-10">
              <FaGithub className="text-5xl text-[var(--text-primary)] mb-4" />
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                GitHub Stats
              </h3>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { value: '11+', label: 'Repositories', color: 'var(--accent-cyan)' },
                  { value: '100+', label: 'Contributions 2025', color: 'var(--accent-green)' },
                  { value: '6+', label: 'Accepted PRs', color: 'var(--accent-purple)' },
                  { value: '∞', label: 'Lines of Code', color: 'var(--accent-pink)' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="force-tag-padding rounded-xl bg-white/[0.03] border border-white/[0.06] text-center"
                  >
                    <div className="text-2xl font-bold" style={{ color: stat.color, fontFamily: 'var(--font-heading)' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Areas */}
              <h4 className="text-xs tracking-wider uppercase text-[var(--text-muted)] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                Areas of Contribution
              </h4>
              <div className="flex flex-wrap gap-3">
                {contributions.map((area) => (
                  <span
                    key={area}
                    className="force-tag-padding text-xs rounded-lg bg-white/[0.04] border border-white/[0.06] text-[var(--text-secondary)]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={3}
          className="text-center"
          style={{ marginTop: '1rem' }}
        >
          <a
            href="https://github.com/Pramod-Munnoli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 force-premium-padding rounded-full glass text-[var(--accent-cyan)] font-semibold text-sm hover:bg-white/[0.08] transition-all duration-300"
          >
            <FaGithub /> View Full GitHub Profile <HiExternalLink />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
