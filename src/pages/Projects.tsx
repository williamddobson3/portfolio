import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid, List, Search } from 'lucide-react'
import { projects, Project } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

const categories = [
  { id: 'all', name: 'All Projects', count: projects.length },
  { id: 'web', name: 'Web Development', count: projects.filter(p => p.category === 'web').length },
  { id: 'mobile', name: 'Mobile Apps', count: projects.filter(p => p.category === 'mobile').length },
  { id: 'blockchain', name: 'Blockchain', count: projects.filter(p => p.category === 'blockchain').length },
  { id: 'social', name: 'Social Platforms', count: projects.filter(p => p.category === 'social').length },
  { id: 'ai', name: 'AI & ML', count: projects.filter(p => p.category === 'ai').length },
  { id: 'enterprise', name: 'Enterprise', count: projects.filter(p => p.category === 'enterprise').length },
]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold gradient-text mb-6">My Projects</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive showcase of my work across web development, mobile apps, blockchain solutions, and enterprise applications.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                      : 'glass text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-center">
              <div className="glass rounded-lg p-1 flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${searchTerm}-${viewMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-6'
                }
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={viewMode === 'list' ? 'glass-card p-6' : ''}
                  >
                    {viewMode === 'list' ? (
                      <ProjectListItem project={project} />
                    ) : (
                      <ProjectCard project={project} />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No projects found</h3>
                <p className="text-gray-400 mb-8">
                  Try adjusting your search terms or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-medium"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

function ProjectListItem({ project }: { project: Project }) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
            {project.category}
          </span>
        </div>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md text-sm bg-white/10 text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Duration: {project.duration}</span>
          <span>Role: {project.role}</span>
          <span>Year: {project.year}</span>
        </div>
      </div>
    </div>
  )
}
