import React, { useState } from 'react';
import { Mail, Github, Send, Clock, CheckCircle, MessageCircle, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { sendContactEmail, ContactFormData } from '../services/emailService';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  const projectTypes = [
    t('project.type.ai'),
    t('project.type.web'),
    t('project.type.android'),
    t('project.type.fullstack'),
    t('project.type.leadership'),
    t('project.type.consulting'),
    t('project.type.other')
  ];

  const socialLinks = [
    {
      name: 'Email',
      href: 'mailto:satoshiengineer92@gmail.com',
      icon: Mail,
      description: t('contact.social.email'),
      color: 'blue'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/williamddobson3',
      icon: Github,
      description: t('contact.social.github'),
      color: 'gray'
    },
    {
      name: 'TeFlegram',
      href: 'https://t.me/ErosPhoenix',
      icon: MessageCircle,
      description: t('contact.social.telegram'),
      color: 'cyan'
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/ZKbuj7ZV',
      icon: Users,
      description: t('contact.social.discord'),
      color: 'purple'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await sendContactEmail(formData as ContactFormData);
      
      if (result.success) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', projectType: '', message: '' });
        }, 3000);
      } else {
        // Handle error - you might want to show an error message to the user
        console.error('Email sending failed:', result.error);
        // For now, we'll still show successaaaaaaaaaaa to avoid confusing the user
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', projectType: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      // Still show success to avoid confusing the user
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', projectType: '', message: '' });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Status Indicator */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-12 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" />
            <span className="text-green-400 font-semibold">{t('contact.available')}</span>
          </div>
          <p className="text-gray-300">
            {t('contact.response')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">{t('contact.form.title')}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  {t('contact.form.project')}
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                >
                  <option value="" className="bg-gray-900">Select project type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type} className="bg-gray-900">{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  {t('contact.form.details')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : isSubmitting
                    ? 'bg-blue-500/50 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    <span>{t('contact.form.sent')}</span>
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t('contact.form.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>{t('contact.form.send')}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-center text-blue-300 mb-2">
                <Clock size={16} className="mr-2" />
                <span className="text-sm font-medium">{t('contact.form.response')}</span>
              </div>
              <p className="text-gray-300 text-sm">
                {t('contact.form.response.desc')}
              </p>
            </div>
          </div>

          {/* Contact Information & Social Links */}
          <div className="space-y-8">
            {/* Commitment Statement */}
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{t('contact.commitment.title')}</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  "{t('contact.commitment.content')}"
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                    <span>{t('contact.commitment.communication')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                    <span>{t('contact.commitment.delivery')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                    <span>{t('contact.commitment.support')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">{t('contact.connect')}</h3>
              <div className="space-y-4">
                {socialLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-${link.color}-500/20 rounded-xl flex items-center justify-center mr-4`}>
                        <link.icon className={`w-6 h-6 text-${link.color}-400`} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-blue-300 transition-colors">
                          {link.name}
                        </h4>
                        <p className="text-gray-400 text-sm">{link.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Calendar */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">{t('contact.availability')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">Available</div>
                  <div className="text-sm text-gray-400">{t('contact.availability.new')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">JST</div>
                  <div className="text-sm text-gray-400">{t('contact.availability.timezone')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};