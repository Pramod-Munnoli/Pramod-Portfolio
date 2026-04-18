import { useState, useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Background3D from './components/Background3D'
import LoadingScreen from './components/LoadingScreen'

const About = lazy(() => import('./components/About/About'))
const Skills = lazy(() => import('./components/Skills/Skills'))
const Journey = lazy(() => import('./components/Journey/Journey'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const OpenSource = lazy(() => import('./components/OpenSource/OpenSource'))
const Experience = lazy(() => import('./components/Experience/Experience'))
const Contact = lazy(() => import('./components/Contact/Contact'))
const Footer = lazy(() => import('./components/Footer/Footer'))

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 400)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <LoadingScreen progress={Math.min(loadProgress, 100)} />
  }

  return (
    <div className="relative">
      {/* Fixed 3D background that stays behind everything */}
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      {/* Scrollable content layer */}
      <div className="content-layer">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<SectionLoader />}>
            <About />
            <Skills />
            <Journey />
            <Projects />
            <OpenSource />
            <Experience />
            <Contact />
            <Footer />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-[var(--accent-cyan)] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default App
