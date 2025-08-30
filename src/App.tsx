import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import ParticleBackground from './components/ParticleBackground'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Resume = lazy(() => import('./pages/Resume'))

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        {/* 3D Particle Background */}
        <ParticleBackground />
        
        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  )
}

export default App
