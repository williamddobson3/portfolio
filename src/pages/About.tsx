import { motion } from 'framer-motion'
import { Download, Mail, MessageCircle, Github, Send } from 'lucide-react'
import { Link } from 'react-router-dom'

const skills = [
  {
    category: 'Frontend',
    technologies: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'Framer Motion']
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL']
  },
  {
    category: 'Blockchain',
    technologies: ['Solidity', 'Rust', 'Web3.js', 'Ethereum', 'Polkadot', 'Hyperledger', 'DeFi Protocols']
  },
  {
    category: 'Mobile',
    technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo', 'Firebase']
  },
  {
    category: 'DevOps & Cloud',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins', 'Git']
  },
  {
    category: 'AI & ML',
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Computer Vision', 'NLP', 'Machine Learning']
  }
]

const experiences = [
  {
    year: '2023',
    title: 'Senior Full Stack Developer',
    company: 'Various Companies',
    description: 'Led development of 25+ projects across web, mobile, and blockchain technologies.'
  },
  {
    year: '2022',
    title: 'Blockchain Developer',
    company: 'DeFi & Web3 Projects',
    description: 'Developed smart contracts, DeFi protocols, and blockchain infrastructure.'
  },
  {
    year: '2021',
    title: 'Full Stack Developer',
    company: 'Tech Startups',
    description: 'Built scalable web applications and mobile apps for growing startups.'
  },
  {
    year: '2020',
    title: 'Software Engineer',
    company: 'Enterprise Solutions',
    description: 'Developed enterprise-grade applications and microservices architecture.'
  }
]

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold gradient-text mb-6">About Me</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Senior Full Stack and Blockchain Developer with 10 years of experience creating innovative digital solutions.
            </p>
          </motion.div>

          {/* Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Who I Am</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I'm a passionate developer with over a decade of experience in full-stack development, 
                  blockchain technology, and mobile applications. My journey in tech has been driven by 
                  curiosity and a desire to create meaningful solutions that impact people's lives.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Throughout my career, I've worked on diverse projects ranging from social platforms 
                  and enterprise solutions to cutting-edge blockchain applications and AI-powered systems. 
                  I believe in writing clean, maintainable code and staying up-to-date with the latest 
                  technologies and best practices.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                  projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-64 h-64 mx-auto mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold text-white">👨‍💻</span>
              </div>
              
              {/* Contact Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="/satoshi.pdf"
                  download="Satoshi_Resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-medium flex items-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download CV</span>
                </motion.a>
                
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 glass rounded-lg text-white font-medium flex items-center space-x-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Contact Me</span>
                  </motion.button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 mt-8">
                {[
                  { 
                    icon: Send, 
                    href: 'https://t.me/ErosPhoenix', 
                    label: 'Telegram',
                    title: 'Message on Telegram'
                  },
                  { 
                    icon: MessageCircle, 
                    href: 'https://discord.com/users/experiencedev_84057', 
                    label: 'Discord',
                    title: 'Connect on Discord'
                  },
                  { 
                    icon: Github, 
                    href: 'https://github.com/williamddobson3', 
                    label: 'GitHub',
                    title: 'View GitHub Profile'
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.title}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-4xl font-bold gradient-text mb-4">Skills & Technologies</h2>
            <p className="text-xl text-gray-400">Comprehensive expertise across modern development stack</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-sm bg-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Experience</h2>
            <p className="text-xl text-gray-400">My professional journey in technology</p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="lg:w-1/3">
                  <div className="glass-card p-6 text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">{exp.year}</div>
                    <div className="text-xl font-semibold text-white">{exp.title}</div>
                    <div className="text-gray-400">{exp.company}</div>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="glass-card p-6">
                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Years Experience', value: '10+' },
              { label: 'Projects Completed', value: '25+' },
              { label: 'Technologies', value: '50+' },
              { label: 'Happy Clients', value: '100+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
