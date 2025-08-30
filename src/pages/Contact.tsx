import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, MessageCircle, Github } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'williamddobson3@gmail.com',
    href: 'mailto:williamddobson3@gmail.com'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Tokyo, Japan',
    href: '#'
  }
]

const socialLinks = [
  { icon: Send, href: 'https://t.me/ErosPhoenix', label: 'Telegram' },
  { icon: MessageCircle, href: 'https://discord.com/users/experiencedev_84057', label: 'Discord' },
  { icon: Github, href: 'https://github.com/williamddobson3', label: 'GitHub' },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
    
    // Show success message (you can implement a toast notification here)
    alert('Message sent successfully!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
            <h1 className="text-5xl font-bold gradient-text mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to start your next project? Let's discuss how I can help bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold text-white mb-8">Let's Connect</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question about my work, want to discuss a potential 
                  collaboration, or just want to say hello, I'd love to hear from you.
                </p>

                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    return (
                      <motion.a
                        key={info.title}
                        href={info.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{info.title}</div>
                          <div className="text-gray-400">{info.value}</div>
                        </div>
                      </motion.a>
                    )
                  })}
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-300 hover:text-primary-400 transition-colors"
                      >
                        <social.icon className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold text-white mb-8">Send Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Project inquiry"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold gradient-text mb-6">What I Can Help With</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Web Development',
                  description: 'Full-stack web applications with modern frameworks and best practices.'
                },
                {
                  title: 'Mobile Apps',
                  description: 'Cross-platform mobile applications for iOS and Android.'
                },
                {
                  title: 'Blockchain Solutions',
                  description: 'Smart contracts, DeFi protocols, and Web3 applications.'
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 text-center"
                >
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
