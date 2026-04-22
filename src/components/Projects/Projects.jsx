import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiExternalLink } from 'react-icons/hi'
import { FaGithub, FaGraduationCap, FaLeaf, FaHotel } from 'react-icons/fa'
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiLatex, SiOpenai, SiVercel
} from 'react-icons/si'

const projects = [
  {
    title: 'AI LaTeX Resume Builder',
    icon: <FaGraduationCap />,
    description: 'Your intelligent companion for crafting ATS-optimized, professional resumes.',
    features: [
      'AI-powered content generation and optimization',
      'Real-time LaTeX compilation and preview',
      'Multiple professional templates',
      'ATS-friendly formatting',
      'Download as PDF',
    ],
    techStack: ['React', 'Node.js', 'Express', 'Supabase', 'LaTeX', 'GroqAI API'],
    impact: [
      'Streamlines resume creation process',
      'Helps job seekers create professional documents',
      'Reduces time from hours to minutes',
    ],
    liveUrl: 'https://ai-latex-resume-builder.vercel.app/',
    githubUrl: 'https://github.com/Pramod-Munnoli/AI_Latex_Resume_Builder',
    gradient: 'from-[#3b82f6] to-[#8b5cf6]',
    accentColor: '#3b82f6',
  },
  {
    title: 'AgriMitra',
    icon: <FaLeaf />,
    description: 'Empowering farmers with technology and connecting them directly to markets.',
    features: [
      'Direct farmer-to-consumer marketplace',
      'Real-time crop price updates',
      'Weather forecasting integration',
      'Crop management dashboard',
      'Multilingual support',
    ],
    techStack: ['Supabase', 'Express', 'React', 'Node.js', 'REST API','GroqAI API'],
    impact: [
      'Eliminates middlemen, increasing farmer profits',
      'Provides market transparency',
      'Improves agricultural supply chain efficiency',
    ],
    liveUrl: 'https://agri-mitra-alpha.vercel.app/',
    githubUrl: 'https://github.com/sanjeevkoshti/Agri-Mitra',
    gradient: 'from-[#10b981] to-[#059669]',
    accentColor: '#10b981',
  },
  {
    title: 'Wanderlust — AirBnB Clone',
    icon: <FaHotel />,
    description: 'A full-stack capstone project — deployed production app with auth, CRUD, and category filtering.',
    features: [
      'Full MVC Architecture with Express Router',
      'Passport.js Auth (Signup, Login, Logout)',
      'Category filtering & Tax toggle',
      'Like/Unlike system (persistent MongoDB)',
      'Flash notifications & Dual validation',
    ],
    techStack: ['Node.js', 'Express', 'MongoDB', 'Passport.js', 'Tailwind CSS'],
    impact: [
      'Demonstrates production-level fullstack skills',
      'Complete authentication & authorization flow',
      'Deployed and accessible live',
    ],
    liveUrl: 'https://my-wanderlust-app-81gi.onrender.com/',
    githubUrl: 'https://github.com/Pramod-Munnoli/fullstack-learning-practice',
    gradient: 'from-[#f59e0b] to-[#ef4444]',
    accentColor: '#f59e0b',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-0 w-[350px] h-[350px] bg-[var(--accent-blue)]/5 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-[var(--accent-green)]/5 rounded-full blur-[100px] translate-x-1/3" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="text-center mb-6"
        >
          <span className="section-label">
            What I've Built
          </span>
          <h2 className="section-title gradient-text">
            Featured Projects
          </h2>
          <div className="neon-line w-24 mx-auto mt-4" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="glass rounded-2xl overflow-hidden h-full flex flex-col hover:bg-white/[0.06] transition-all duration-500">
                {/* Gradient top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

                <div className="flex-1 flex flex-col" style={{ padding: '1.5rem' }}>
                  {/* Title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: `color-mix(in srgb, ${project.accentColor} 15%, transparent)`, color: project.accentColor }}
                    >
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {project.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{project.description}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-xs tracking-wider uppercase text-[var(--text-muted)] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                      ✨ Features
                    </h4>
                    <ul className="space-y-1.5">
                      {project.features.slice(0, 4).map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: project.accentColor }} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-xs tracking-wider uppercase text-[var(--text-muted)] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                      🛠️ Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="force-tag-padding text-xs rounded-lg bg-white/[0.05] border border-white/[0.08] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="mb-6 flex-1">
                    <h4 className="text-xs tracking-wider uppercase text-[var(--text-muted)] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                      💡 Impact
                    </h4>
                    <ul className="space-y-1">
                      {project.impact.map((imp) => (
                        <li key={imp} className="text-xs text-[var(--text-muted)]">• {imp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-[var(--bg-primary)] transition-all duration-300"
                      style={{ background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}dd)` }}
                    >
                      Live Demo <HiExternalLink />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300"
                    >
                      <FaGithub /> Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
