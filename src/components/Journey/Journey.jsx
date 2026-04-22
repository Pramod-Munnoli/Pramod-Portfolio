import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HiChevronDown, HiExternalLink, HiChartBar } from 'react-icons/hi'
import { FaReact, FaNodeJs, FaDatabase, FaLock, FaHotel } from 'react-icons/fa'
import { SiMongodb, SiMysql } from 'react-icons/si'

const phases = [
  {
    phase: 1,
    title: 'Frontend Foundations',
    subtitle: 'React & Modern Styling',
    icon: <FaReact />,
    color: '#3b82f6',
    items: [
      'Mastered controlled components, useState with objects/arrays',
      'Tailwind CSS v4 with PostCSS integration',
      'Built: Product Catalog Dashboard, Weather App (Material UI), Subscription Form, Lottery Game',
      'Lifted state across components props-driven architecture',
    ],
  },
  {
    phase: 2,
    title: 'Backend Foundations',
    subtitle: 'Node.js & Express Server',
    icon: <FaNodeJs />,
    color: '#10b981',
    items: [
      'Built Express servers from scratch: routes, middleware, ports',
      'Mastered app.get() vs app.use() vs app.listen()',
      'Dynamic routing with path params (/:username/:id) & req.query',
      'EJS templating with partials — modular, reusable layouts',
      'Built: Instagram Profile Mockup, Roll Dice Game',
      'Fullstack bridge: CORS setup, body parsing, POST form handling',
    ],
  },
  {
    phase: 3,
    title: 'Databases',
    subtitle: 'SQL & NoSQL Mastery',
    icon: <FaDatabase />,
    color: '#f97316',
    items: [
      'MySQL: Secure parameterized queries, full CRUD user system (with password verification before updates/deletes)',
      'MongoDB + Mongoose: Schema design, advanced validation (min/max, minLength, custom error messages)',
      'runValidators for update integrity',
      'Faker.js for realistic data mocking and testing',
      'Built: MySQL User Management System, MongoDB User System',
    ],
  },
  {
    phase: 4,
    title: 'RESTful APIs & OOP',
    subtitle: 'REST Architecture & Modern JS',
    icon: <SiMongodb />,
    color: '#8b5cf6',
    items: [
      'Full REST CRUD: GET/POST/PATCH/DELETE with method-override',
      'UUID for unique resource IDs without a database',
      'ES6 Classes, inheritance, super() — OOP in JavaScript',
      'Built: Quora Post Simulation (stateful REST API)',
      'Built: Mini WhatsApp Chat Simulation (Express + MongoDB, MVC prep)',
    ],
  },
  {
    phase: 5,
    title: 'Auth, Security & Production Patterns',
    subtitle: 'Authentication & Authorization',
    icon: <FaLock />,
    color: '#ef4444',
    items: [
      'JWT: Stateless token auth, Axios interceptors, localStorage persistence',
      'Passport.js: LocalStrategy, automatic password hashing/salting',
      'express-session: Secure cookies, httpOnly, maxAge',
      'connect-flash: One-time success/error notifications',
      'Custom ExpressError class + wrapAsync utility',
      'isOwner & isReviewAuthor middleware guards',
      'Joi validation for schema enforcement',
    ],
  },
  {
    phase: 6,
    title: 'Production Fullstack App',
    subtitle: 'Wanderlust — AirBnB Clone (DEPLOYED)',
    icon: <FaHotel />,
    color: '#f59e0b',
    isCapstone: true,
    liveUrl: 'https://my-wanderlust-app-81gi.onrender.com/',
    items: [
      'Full MVC Architecture with Express Router',
      'Passport.js Auth (Signup, Login, Logout)',
      'JWT + Passport dual auth strategy',
      'Listing ownership + Review authorship authorization',
      'Category filtering (Trending, Mountains, Castles...)',
      'Tax toggle with live GST calculation (+18%)',
      'Like/Unlike system (persistent MongoDB, no page reload)',
      'Flash notifications (dismissible, Tailwind-styled)',
      'Dual validation: Joi (backend) + Tailwind peer classes (frontend)',
      'Static assets served from /public',
    ],
    stack: 'Node.js, Express, MongoDB, Mongoose, Passport.js, EJS, Tailwind CSS, method-override, connect-flash, express-session',
  },
]

const stats = [
  { value: '48', label: 'Git Commits' },
  { value: '6', label: 'Major Phases' },
  { value: '10+', label: 'Mini-Projects' },
  { value: '2', label: 'Database Systems' },
  { value: '1', label: 'Deployed App' },
]

function PhaseCard({ phase, index }) {
  const [expanded, setExpanded] = useState(false)
  const isEven = index % 2 === 0

  return (
    <div className={`relative flex items-start gap-4 md:gap-10 flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Timeline node */}
      <div className="relative md:absolute md:left-1/2 md:-translate-x-1/2 z-10 shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="w-10 h-10 md:w-12 md:h-12 mt-4 md:mt-0 rounded-full flex items-center justify-center text-lg md:text-xl border-2"
          style={{
            backgroundColor: `color-mix(in srgb, ${phase.color} 15%, var(--bg-primary))`,
            borderColor: phase.color,
            color: phase.color,
            boxShadow: `0 0 20px ${phase.color}40`,
          }}
        >
          {phase.icon}
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={`flex-1 md:flex-none md:w-[calc(50%-3rem)] ${isEven ? '' : 'md:mr-auto'} ${
          isEven ? 'md:ml-auto' : ''
        }`}
      >
        <div
          onClick={() => setExpanded(!expanded)}
          className="glass rounded-2xl force-container-padding cursor-pointer hover:bg-white/[0.06] transition-all duration-300 group"
          style={{ borderColor: expanded ? `${phase.color}30` : undefined }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-xs font-bold tracking-wider uppercase"
              style={{ color: phase.color, fontFamily: 'var(--font-mono)' }}
            >
              Phase {phase.phase} {phase.isCapstone && '— CAPSTONE'}
            </span>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[var(--text-muted)]"
            >
              <HiChevronDown />
            </motion.div>
          </div>

          <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
            {phase.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{phase.subtitle}</p>

          {/* Expandable content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="mt-4 space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: phase.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
                {phase.stack && (
                  <p className="mt-4 text-xs text-[var(--text-muted)] italic" style={{ fontFamily: 'var(--font-mono)' }}>
                    Stack: {phase.stack}
                  </p>
                )}
                {phase.liveUrl && (
                  <a
                    href={phase.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                    style={{ color: phase.color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Live <HiExternalLink />
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default function Journey() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })

  return (
    <section id="journey" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent-blue)]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[var(--accent-gold)]/5 rounded-full blur-[100px]" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            The Centerpiece
          </span>
          <h2 className="section-title gradient-text">
            My Fullstack Journey
          </h2>
          <div className="neon-line w-24 mx-auto mt-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-[var(--text-secondary)] max-w-xl mx-auto mb-6 text-lg"
        >
          Not just skills listed — but <span className="text-[var(--accent-cyan)] font-semibold">skills earned</span>.
          <br />
          <span className="text-sm text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
            48 commits. Real code. Real problems solved.
          </span>
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px]">
            <div className="h-full bg-gradient-to-b from-[#3b82f6] via-[#f97316] to-[#f59e0b] opacity-30 rounded-full" />
          </div>

          <div className="space-y-10">
            {phases.map((phase, i) => (
              <PhaseCard key={phase.phase} phase={phase} index={i} />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-3xl"
          style={{ marginTop: '1rem', padding: '1rem' }}
        >
          <h3 className="text-center text-xs tracking-widest uppercase text-[var(--text-muted)] mb-10 flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-mono)' }}>
            <HiChartBar className="text-base text-[var(--accent-cyan)]" /> Journey by the Numbers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {stat.value}
                </div>
                <div className="text-xs tracking-wider uppercase text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '1rem' }}>
            <a
              href="https://github.com/Pramod-Munnoli/fullstack-learning-practice"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass text-[var(--accent-cyan)] font-semibold text-sm hover:bg-white/[0.08] transition-all duration-300"
              style={{ padding: '0.2rem 1.2rem' }}
            >
              View the Full Learning Repo on GitHub <HiExternalLink />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
