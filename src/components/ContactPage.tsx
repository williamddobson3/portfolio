import React, { useState } from 'react';
import { Mail, Github, MessageCircle, Users, ExternalLink, Copy, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const contactMethods = [
    {
      name: 'Email',
      href: 'mailto:satoshiengineer92@gmail.com',
      icon: Mail,
      description: 'Send me an email directly',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      iconColor: 'text-blue-400',
      copyText: 'satoshiengineer92@gmail.com',
      buttonText: 'Send Email'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/williamddobson3',
      icon: Github,
      description: 'Check out my code and projects',
      color: 'from-gray-600 to-gray-700',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20',
      iconColor: 'text-gray-400',
      copyText: 'github.com/williamddobson3',
      buttonText: 'View Profile'
    },
    {
      name: 'Telegram',
      href: 'https://t.me/ErosPhoenix',
      icon: MessageCircle,
      description: 'Chat with me on Telegram',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      iconColor: 'text-cyan-400',
      copyText: 't.me/ErosPhoenix',
      buttonText: 'Start Chat'
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/ZKbuj7ZV',
      icon: Users,
      description: 'Join my Discord server',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      iconColor: 'text-purple-400',
      copyText: 'discord.gg/ZKbuj7ZV',
      buttonText: 'Join Server'
    }
  ];

  const handleCopy = async (text: string, itemName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemName);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
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

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={method.name}
              className={`group relative bg-white/5 backdrop-blur-sm border ${method.borderColor} rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className={`w-8 h-8 ${method.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {method.name}
                    </h3>
                    <p className="text-gray-400">{method.description}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-6">
                  <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 mb-4">
                    <span className="text-gray-300 font-mono text-sm">{method.copyText}</span>
                    <button
                      onClick={() => handleCopy(method.copyText, method.name)}
                      className="flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      {copiedItem === method.name ? (
                        <>
                          <Check size={16} className="text-green-400" />
                          <span className="text-green-400 text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} className="text-gray-400" />
                          <span className="text-gray-400 text-sm">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href={method.href}
                  target={method.name === 'Email' ? '_self' : '_blank'}
                  rel={method.name === 'Email' ? '' : 'noopener noreferrer'}
                  className={`inline-flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r ${method.color} hover:shadow-lg hover:shadow-${method.name.toLowerCase()}-500/25 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105`}
                >
                  <method.icon size={20} className="mr-2" />
                  {method.buttonText}
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Special Email Interface */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Direct Email Contact</h2>
            <p className="text-gray-300 text-lg">
              For the fastest response, send me an email directly
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">satoshiengineer92@gmail.com</h3>
                  <p className="text-gray-400">Click to compose your message</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleCopy('satoshiengineer92@gmail.com', 'email')}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  >
                    {copiedItem === 'email' ? (
                      <>
                        <Check size={16} className="text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="text-gray-400" />
                        <span className="text-gray-400">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <a
              href="mailto:satoshiengineer92@gmail.com"
              className="block w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
            >
              <Mail size={20} className="inline mr-2" />
              Open Email Client
            </a>
          </div>
        </div>

        {/* Availability Status */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-green-400 rounded-full animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Available</h3>
            <p className="text-gray-400">Accepting new projects</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-blue-400 rounded-full" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">24h Response</h3>
            <p className="text-gray-400">Quick turnaround time</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-purple-400 rounded-full" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">JST Timezone</h3>
            <p className="text-gray-400">Tokyo, Japan</p>
          </div>
        </div>
      </div>
    </div>
  );
};