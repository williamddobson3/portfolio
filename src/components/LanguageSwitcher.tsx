import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all duration-300 group shadow-sm"
      aria-label="Toggle language"
    >
      <Globe size={16} className="text-gray-700 group-hover:text-gray-900 transition-colors" />
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
        {language === 'en' ? 'EN' : 'JP'}
      </span>
    </button>
  );
};
