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
    // Start preloading components immediately
    const preloadComponents = () => {
      return Promise.all([
        import('./components/About/About'),
        import('./components/Skills/Skills'),
        import('./components/Journey/Journey'),
        import('./components/Projects/Projects'),
        import('./components/OpenSource/OpenSource'),
        import('./components/Experience/Experience'),
        import('./components/Contact/Contact'),
        import('./components/Footer/Footer')
      ])
    }

    const timer = new Promise(resolve => {
      const interval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            resolve()
            return 100
          }
          return prev + Math.random() * 15 + 5
        })
      }, 150)
    })

    // Wait for BOTH the fake progress AND the actual component chunks
    Promise.all([preloadComponents(), timer]).then(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 600)
    })
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
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Journey />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <OpenSource />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

function SectionLoader() {
  return null // Components are preloaded, so we avoid visible spinners during fast scrolls
}

export default App
