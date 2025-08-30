import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Code, Database, Smartphone, Globe, Zap, Users } from 'lucide-react'
import { getFeaturedProjects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

const stats = [
  { label: 'Years Experience', value: '10+', icon: Code },
  { label: 'Projects Completed', value: '25+', icon: Database },
  { label: 'Technologies', value: '50+', icon: Zap },
  { label: 'Happy Clients', value: '100+', icon: Users },
]

const skills = [
  { name: 'Full Stack Development', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { name: 'Blockchain Development', icon: Database, color: 'from-purple-500 to-pink-500' },
  { name: 'Mobile Development', icon: Smartphone, color: 'from-green-500 to-emerald-500' },
  { name: 'Web3 & DeFi', icon: Globe, color: 'from-orange-500 to-red-500' },
]

export default function Home() {
  const featuredProjects = getFeaturedProjects()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">Senior Developer</span>
              <br />
              <span className="text-white">Portfolio</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Full Stack & Blockchain Developer with 10 years of experience
              <br />
              Creating innovative digital solutions with cutting-edge technology
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white flex items-center space-x-2"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/resume">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-lg font-semibold text-white flex items-center space-x-2"
                >
                  <span>View Resume</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass rounded-lg font-semibold text-white border border-white/20"
                >
                  Get In Touch
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Expertise</h2>
            <p className="text-xl text-gray-400">Specialized in modern technologies and frameworks</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="glass-card p-6 text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${skill.color} rounded-2xl flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{skill.name}</h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-400">A showcase of my recent work and achievements</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass rounded-lg font-semibold text-white border border-white/20 flex items-center space-x-2 mx-auto"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
