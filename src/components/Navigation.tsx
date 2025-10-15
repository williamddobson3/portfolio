import React, { useState } from 'react';
import { Home, Folder, Zap, User, Mail, Menu, X, Settings, MessageSquare, BookOpen, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavigationProps {
  currentPage: string;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'projects', label: t('nav.projects'), icon: Folder },
    { id: 'skills', label: t('nav.skills'), icon: Zap },
    { id: 'services', label: t('nav.services'), icon: Settings },
    { id: 'testimonials', label: t('nav.testimonials'), icon: MessageSquare },
    { id: 'blog', label: t('nav.blog'), icon: BookOpen },
    { id: 'chat', label: t('nav.chat'), icon: MessageCircle },
    { id: 'about', label: t('nav.about'), icon: User },
    { id: 'contact', label: t('nav.contact'), icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-3">
          {/* Prevent wrapping so items stay on one line */}
          <div className="flex items-center gap-4 whitespace-nowrap">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  currentPage === id
                    ? 'bg-blue-500/30 text-blue-300 shadow-lg shadow-blue-500/20'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => window.location.hash = id}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full p-3 text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40">
          <div className="fixed top-20 right-6 bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-48">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                  currentPage === id
                    ? 'bg-blue-500/30 text-blue-300'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => {
                  window.location.hash = id;
                  setIsOpen(false);
                }}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
};