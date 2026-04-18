import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiAcademicCap, HiBriefcase, HiBadgeCheck } from 'react-icons/hi'

const education = [
  {
    type: 'education',
    title: 'Bachelor of Computer Applications (BCA)',
    subtitle: 'Final Year Student',
    period: 'Expected 2026',
    description: 'Studying computer science fundamentals, software engineering, and modern web technologies. Building real-world project experience alongside academic curriculum.',
    icon: <HiAcademicCap />,
    color: 'var(--accent-cyan)',
  },
]

const experience = [
  {
    type: 'experience',
    title: 'Full Stack Developer',
    subtitle: 'Real-World Projects',
    period: '2025 – Present',
    description: 'Working on production-grade projects including AI-powered resume builders, agricultural marketplace platforms, and full-stack AirBnB clones. Applying MERN stack expertise to solve real problems.',
    icon: <HiBriefcase />,
    color: 'var(--accent-purple)',
  },
  {
    type: 'experience',
    title: 'Open Source Contributor',
    subtitle: 'Hacktoberfest 2025 Super Contributor',
    period: '2025',
    description: 'Achieved Super Contributor status with 6+ accepted PRs. Contributed web development tools, bug fixes, and documentation improvements to the global open-source community.',
    icon: <HiBriefcase />,
    color: 'var(--accent-green)',
  },
]

const certifications = [
  {
    title: 'Java Skill Up',
    issuer: 'GeeksforGeeks',
    date: 'Issued Jan 2026',
    color: 'var(--accent-orange)',
  },
  {
    title: 'Getting Started with AWS',
    issuer: 'Simplilearn',
    date: 'Issued Jul 2025',
    color: 'var(--accent-blue)',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
}

function TimelineItem({ item, index }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeUp}
      custom={index}
      className="relative last:pb-0"
      style={{ paddingLeft: '4rem', paddingBottom: '3.5rem' }}
    >
      {/* Vertical line */}
      <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-white/[0.06] last:hidden" />

      {/* Node */}
      <div
        className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center text-sm border-2"
        style={{
          borderColor: item.color,
          color: item.color,
          backgroundColor: `color-mix(in srgb, ${item.color} 10%, var(--bg-primary))`,
          boxShadow: `0 0 12px ${item.color}30`,
        }}
      >
        {item.icon}
      </div>

      {/* Content */}
      <div className="glass rounded-xl force-container-padding hover:bg-white/[0.06] transition-all duration-300">
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: item.color, fontFamily: 'var(--font-mono)' }}
        >
          {item.period}
        </span>
        <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
          {item.title}
        </h3>
        <p className="text-sm text-[var(--accent-cyan)] mt-0.5">{item.subtitle}</p>
        <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[var(--accent-purple)]/5 rounded-full blur-[100px] translate-x-1/3" />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <span className="section-label">
            My Background
          </span>
          <h2 className="section-title gradient-text">
            Experience & Education
          </h2>
          <div className="neon-line w-24 mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
            <motion.h3
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={1}
              className="text-xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <HiBriefcase className="text-[var(--accent-purple)]" /> Experience
            </motion.h3>
            {experience.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i + 2} />
            ))}
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={1}
              className="text-xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <HiAcademicCap className="text-[var(--accent-cyan)]" /> Education
            </motion.h3>
            {education.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i + 2} />
            ))}

            {/* Certifications */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={4}
              className="mt-20"
            >
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-heading)' }}>
                <HiBadgeCheck className="text-2xl text-[var(--accent-gold)]" /> Certifications
              </h3>
              <div className="space-y-6">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="glass rounded-xl flex items-center gap-4 hover:bg-white/[0.06] transition-all duration-300"
                    style={{ padding: '0.75rem 1.25rem', marginBottom: '1.25rem' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `color-mix(in srgb, ${cert.color} 15%, transparent)` }}
                    >
                      <HiBadgeCheck className="text-xl" style={{ color: cert.color }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{cert.title}</h4>
                      <p className="text-xs text-[var(--text-secondary)]">{cert.issuer}</p>
                      <p className="text-xs text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
