import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaCode, FaServer, FaDatabase, FaPaintBrush, FaUsers, FaTrophy, FaLightbulb } from 'react-icons/fa'
import { HiStar } from 'react-icons/hi'

const highlights = [
  {
    icon: <HiStar className="text-2xl" />,
    title: 'Hacktoberfest 2025 Super Contributor',
    color: 'var(--accent-gold)',
    items: [
      'Earned the prestigious Super Contributor badge',
      '6+ accepted PRs in open-source projects',
      'Active participant in the global developer community',
    ],
  },
  {
    icon: <FaTrophy className="text-2xl" />,
    title: 'Hackathon Enthusiast',
    color: 'var(--accent-purple)',
    items: [
      'Regular participant in national & international hackathons',
      'Building solutions that make real-world impact',
      'Collaborative team player with strong problem-solving skills',
    ],
  },
  {
    icon: <FaLightbulb className="text-2xl" />,
    title: 'What I Do',
    color: 'var(--accent-cyan)',
    items: [
      'Full-stack web application development',
      'RESTful API design and implementation',
      'Database architecture and optimization',
      'UI/UX implementation with modern frameworks',
      'Open-source contribution and community building',
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[var(--accent-purple)]/5 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute top-1/4 right-0 w-[250px] h-[250px] bg-[var(--accent-cyan)]/5 rounded-full blur-[80px] translate-x-1/3" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="text-center mb-6"
        >
          <span className="section-label">
            Get to know me
          </span>
          <h2 className="section-title gradient-text">
            About Me
          </h2>
          <div className="neon-line w-24 mx-auto mt-4" />
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Bio */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={1}
          >
            <div className="glass rounded-2xl glass-card">
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                I'm a passionate <span className="text-[var(--accent-cyan)] font-semibold">MERN stack developer</span> specializing
                in building scalable, user-centric web applications. With expertise in{' '}
                <span className="text-[var(--accent-purple)] font-semibold">MongoDB, Express.js, React, and Node.js</span>,
                I transform complex problems into elegant digital solutions.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                Currently a <span className="text-[var(--accent-gold)] font-semibold">BCA final year student</span>, I have worked
                on real-world projects that solve genuine problems — from AI-powered resume builders to agricultural
                marketplace platforms. I believe in learning by building.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '11+', label: 'Repositories' },
                  { value: '345+', label: 'Contributions' },
                  { value: '10+', label: 'Open Source PRs' },
                ].map((stat) => (
                  <div 
                    key={stat.label} 
                    className="text-center rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-center"
                    style={{ padding: '0.75rem 0.25rem' }}
                  >
                    <div className="text-xl font-bold gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-tighter text-[var(--text-muted)] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Highlight Cards */}
          <div className="flex flex-col gap-8">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 2}
                className="glass rounded-2xl hover:bg-white/[0.06] transition-all duration-300 group cursor-default"
                style={{ padding: '1.25rem 1.5rem' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xl"
                    style={{ backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                </div>
                <ul className="space-y-3" style={{ paddingLeft: '2.5rem' }}>
                  {item.items.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
