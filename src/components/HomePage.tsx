import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Mail, MessageCircle, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const HomePage: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const { t } = useLanguage();
  
  const titles = [
    t('home.subtitle.ai'),
    t('home.subtitle.web'),
    t('home.subtitle.android')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const orbitalNodes = [
    { name: 'AI/ML', color: 'purple', delay: 0 },
    { name: 'React', color: 'blue', delay: 1 },
    { name: 'Android', color: 'green', delay: 2 },
    { name: 'Node.js', color: 'emerald', delay: 3 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Orbital Skills */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-96 h-96">
          {orbitalNodes.map((node, index) => (
            <div
              key={node.name}
              className="absolute w-16 h-16 -ml-8 -mt-8"
              style={{
                left: '50%',
                top: '50%',
                animation: `orbit 20s linear infinite`,
                animationDelay: `${node.delay * 5}s`
              }}
            >
              <div className={`w-full h-full bg-${node.color}-500/20 border-2 border-${node.color}-500/50 rounded-full flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform duration-300 cursor-pointer`}>
                <span className="text-xs font-bold text-gray-800">{node.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Central Content */}
      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        {/* Name */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              {t('home.title')}
            </span>
          </h1>
          
          {/* Animated Title */}
          <div className="h-16 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-semibold text-blue-600 transition-all duration-500">
              {titles[textIndex]}
            </h2>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('home.tagline').replace('AI', '').replace('Immersive Web', '').trim()}{' '}
          <span className="text-purple-600 font-semibold">{t('home.tagline.ai')}</span> and{' '}
          <span className="text-cyan-600 font-semibold">{t('home.tagline.immersive')}</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button 
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
            onClick={() => window.location.hash = 'projects'}
          >
            <span className="flex items-center">
              {t('home.cta.explore')}
              <ChevronDown className="ml-2 group-hover:translate-y-1 transition-transform duration-300" size={20} />
            </span>
          </button>
          
          <button 
            className="border-2 border-gray-400 text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => window.location.hash = 'about'}
          >
{t('home.cta.about')}
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-8">
          {[
            { Icon: Github, href: 'https://github.com/williamddobson3', label: 'GitHub' },
            { Icon: Mail, href: 'mailto:satoshiengineer92@gmail.com', label: 'Email' },
            { Icon: MessageCircle, href: 'https://t.me/ErosPhoenix', label: 'Telegram' },
            { Icon: Users, href: 'https://discord.gg/ZKbuj7ZV', label: 'Discord' }
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300 transform hover:scale-110"
              aria-label={label}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-gray-600" size={32} />
      </div>

      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};