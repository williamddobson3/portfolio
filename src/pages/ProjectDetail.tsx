import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar, Clock, Users, Code, Database } from 'lucide-react'
import { getProjectById } from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [selectedImage, setSelectedImage] = useState(0)
  
  const project = getProjectById(id || '')
  
  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-medium"
            >
              Back to Projects
            </motion.button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Projects</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-2/3">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
                <p className="text-xl text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                
                {/* Project Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: Calendar, label: 'Year', value: project.year },
                    { icon: Clock, label: 'Duration', value: project.duration },
                    { icon: Users, label: 'Role', value: project.role },
                    { icon: Code, label: 'Category', value: project.category },
                  ].map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="glass-card p-4 text-center"
                      >
                        <Icon className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-400">{stat.label}</div>
                        <div className="text-lg font-semibold text-white">{stat.value}</div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Project Impact</h3>
                  <p className="text-gray-300 mb-6">{project.impact}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-medium flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live Project</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Project Gallery</h2>
            
            {/* Main Image */}
            <div className="mb-8">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={project.images[selectedImage]}
                alt={`${project.title} - Image ${selectedImage + 1}`}
                className="w-full h-96 md:h-[500px] object-cover rounded-2xl"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                      selectedImage === index ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Thumbnail ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-primary-500/20" />
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Technologies & Features */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Code className="w-6 h-6 text-primary-400 mr-3" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg text-white border border-primary-500/30"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Database className="w-6 h-6 text-primary-400 mr-3" />
                  Key Features
                </h3>
                <ul className="space-y-4">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold gradient-text mb-8">Explore More Projects</h2>
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass rounded-lg font-semibold text-white border border-white/20 flex items-center space-x-2 mx-auto"
              >
                <span>View All Projects</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
