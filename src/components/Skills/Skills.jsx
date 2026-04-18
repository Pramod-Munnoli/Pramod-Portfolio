import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaDatabase,
  FaDocker, FaAws, FaGitAlt, FaGithub
} from 'react-icons/fa'
import {
  SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiNextdotjs,
  SiRedux, SiFirebase, SiPostgresql, SiMysql, SiVercel,
  SiPostman, SiJsonwebtokens, SiSupabase, SiSocketdotio
} from 'react-icons/si'
import { TbBrandVscode } from 'react-icons/tb'

const skillCategories = [
  {
    title: 'Frontend',
    color: 'var(--accent-cyan)',
    skills: [
      { name: 'React.js', icon: <FaReact /> },
      { name: 'Redux', icon: <SiRedux /> },
      { name: 'HTML5', icon: <FaHtml5 /> },
      { name: 'CSS3', icon: <FaCss3Alt /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'Zustand', icon: <FaReact /> },
    ],
  },
  {
    title: 'Backend',
    color: 'var(--accent-green)',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'Real-Time (Socket.io)', icon: <SiSocketdotio /> },
      { name: 'RESTful APIs', icon: <FaServer /> },
      { name: 'JWT Auth', icon: <SiJsonwebtokens /> },
    ],
  },
  {
    title: 'Database',
    color: 'var(--accent-orange)',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'Mongoose Aggregation', icon: <SiMongodb /> },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'Supabase', icon: <SiSupabase /> },
    ],
  },
  {
    title: 'DevOps & Tools',
    color: 'var(--accent-purple)',
    skills: [
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'GitHub', icon: <FaGithub /> },
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'AWS', icon: <FaAws /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'VS Code', icon: <TbBrandVscode /> },
    ],
  },
]

function FaServer() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" width="1em" height="1em">
      <path d="M480 160H32c-17.67 0-32-14.33-32-32V64c0-17.67 14.33-32 32-32h448c17.67 0 32 14.33 32 32v64c0 17.67-14.33 32-32 32zm-48-88c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm-64 0c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm112 248H32c-17.67 0-32-14.33-32-32v-64c0-17.67 14.33-32 32-32h448c17.67 0 32 14.33 32 32v64c0 17.67-14.33 32-32 32zm-48-88c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm-64 0c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm112 248H32c-17.67 0-32-14.33-32-32v-64c0-17.67 14.33-32 32-32h448c17.67 0 32 14.33 32 32v64c0 17.67-14.33 32-32 32zm-48-88c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm-64 0c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24z" />
    </svg>
  )
}

/* 3D Rotating Sphere of skill nodes */
function SkillSphere() {
  const groupRef = useRef()
  const count = 24
  const points = useMemo(() => {
    const pts = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i
      pts.push([Math.cos(theta) * radius * 2.5, y * 2.5, Math.sin(theta) * radius * 2.5])
    }
    return pts
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15
    }
  })

  const colors = ['#00f5ff', '#10b981', '#f97316', '#a855f7']

  return (
    <group ref={groupRef}>
      {points.map((pos, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={0.3}>
          <mesh position={pos}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={colors[i % 4]}
              emissive={colors[i % 4]}
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
      {/* Connection lines */}
      {points.map((p1, i) => {
        const connections = []
        for (let j = i + 1; j < points.length; j++) {
          const dist = Math.sqrt(
            (p1[0] - points[j][0]) ** 2 +
            (p1[1] - points[j][1]) ** 2 +
            (p1[2] - points[j][2]) ** 2
          )
          if (dist < 2.8) {
            const lineGeo = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(...p1),
              new THREE.Vector3(...points[j]),
            ])
            connections.push(
              <line key={`${i}-${j}`} geometry={lineGeo}>
                <lineBasicMaterial color="#ffffff" transparent opacity={0.06} />
              </line>
            )
          }
        }
        return connections
      })}
    </group>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} eventSource={document.getElementById('root')}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.5} />
          <SkillSphere />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <span className="section-label">
            My Expertise
          </span>
          <h2 className="section-title gradient-text">
            Skills & Technologies
          </h2>
          <div className="neon-line w-24 mx-auto mt-4" />
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={ci + 1}
              className="glass rounded-2xl force-container-padding hover:bg-white/[0.06] transition-all duration-300"
            >
              <h3
                className="text-xl font-bold mb-5 flex items-center gap-3"
                style={{ fontFamily: 'var(--font-heading)', color: cat.color }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-3 md:gap-5">
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex items-center gap-3 force-tag-padding rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-white/[0.15] transition-all duration-300 cursor-default"
                  >
                    <span className="text-base" style={{ color: cat.color }}>{skill.icon}</span>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
