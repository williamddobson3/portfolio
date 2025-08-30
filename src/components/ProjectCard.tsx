import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Clock, Users } from 'lucide-react'
import { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
}

const categoryColors = {
  web: 'from-blue-500 to-cyan-500',
  mobile: 'from-green-500 to-emerald-500',
  blockchain: 'from-purple-500 to-pink-500',
  social: 'from-orange-500 to-red-500',
  ai: 'from-indigo-500 to-purple-500',
  enterprise: 'from-gray-500 to-slate-500',
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const categoryColor = categoryColors[project.category]

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      <Link to={`/project/${project.id}`}>
        <div className="glass-card overflow-hidden h-full">
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryColor} text-white`}>
                {project.category}
              </span>
            </div>
            
            {/* Year Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white">
                {project.year}
              </span>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
              {project.title}
            </h3>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>
            
            {/* Project Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{project.role}</span>
              </div>
            </div>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-md text-xs bg-white/10 text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 rounded-md text-xs bg-white/10 text-gray-300">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
            
            {/* Impact */}
            <div className="text-xs text-gray-400 mb-4">
              <strong className="text-primary-400">Impact:</strong> {project.impact}
            </div>
            
            {/* View Details */}
            <div className="flex items-center justify-between">
              <span className="text-primary-400 text-sm font-medium group-hover:text-primary-300 transition-colors">
                View Details
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-400 transition-colors" />
            </div>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        </div>
      </Link>
    </motion.div>
  )
}
