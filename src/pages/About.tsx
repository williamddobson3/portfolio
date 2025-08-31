import { motion } from 'framer-motion'
import { Download, Mail, MessageCircle, Github, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const skills = [
  {
    categoryKey: 'about.skillCategories.frontend',
    technologies: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'Framer Motion']
  },
  {
    categoryKey: 'about.skillCategories.backend',
    technologies: ['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL']
  },
  {
    categoryKey: 'about.skillCategories.blockchain',
    technologies: ['Solidity', 'Rust', 'Web3.js', 'Ethereum', 'Polkadot', 'Hyperledger', 'DeFi Protocols']
  },
  {
    categoryKey: 'about.skillCategories.mobile',
    technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo', 'Firebase']
  },
  {
    categoryKey: 'about.skillCategories.devops',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins', 'Git']
  },
  {
    categoryKey: 'about.skillCategories.ai',
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Computer Vision', 'NLP', 'Machine Learning']
  }
]

const experiences = [
  { year: '2023' },
  { year: '2022' },
  { year: '2021' },
  { year: '2020' }
]

export default function About() {
  const { t } = useTranslation()
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
            <h1 className="text-5xl font-bold gradient-text mb-6">{t('about.title')}</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('about.subtitle')}
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
                <h2 className="text-3xl font-bold text-white mb-6">{t('about.whoIAm')}</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t('about.description1')}
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t('about.description2')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('about.description3')}
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
                  <span>{t('about.downloadCV')}</span>
                </motion.a>
                
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 glass rounded-lg text-white font-medium flex items-center space-x-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{t('about.contactMe')}</span>
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
                    titleKey: 'about.social.telegram'
                  },
                  { 
                    icon: MessageCircle, 
                    href: 'https://discord.com/users/experiencedev_84057', 
                    label: 'Discord',
                    titleKey: 'about.social.discord'
                  },
                  { 
                    icon: Github, 
                    href: 'https://github.com/williamddobson3', 
                    label: 'GitHub',
                    titleKey: 'about.social.github'
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t(social.titleKey)}
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
            <h2 className="text-4xl font-bold gradient-text mb-4">{t('about.skillsTitle')}</h2>
            <p className="text-xl text-gray-400">{t('about.skillsSubtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.categoryKey}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">{t(skillGroup.categoryKey)}</h3>
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
            <h2 className="text-4xl font-bold gradient-text mb-4">{t('about.experienceTitle')}</h2>
            <p className="text-xl text-gray-400">{t('about.experienceSubtitle')}</p>
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
                    <div className="text-3xl font-bold gradient-text mb-2">{t(`about.experiences.${index}.year`)}</div>
                    <div className="text-xl font-semibold text-white">{t(`about.experiences.${index}.title`)}</div>
                    <div className="text-gray-400">{t(`about.experiences.${index}.company`)}</div>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="glass-card p-6">
                    <p className="text-gray-300 leading-relaxed">{t(`about.experiences.${index}.description`)}</p>
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
              { labelKey: 'about.stats.experience', value: '10+' },
              { labelKey: 'about.stats.projects', value: '25+' },
              { labelKey: 'about.stats.technologies', value: '50+' },
              { labelKey: 'about.stats.clients', value: '100+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400">{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
