import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Testimonials3DPlaceholder: React.FC<{ playing: boolean }> = ({ playing }) => {
  const { t } = useLanguage();

  return (
    <div
      aria-hidden
      className={`w-full max-w-3xl mx-auto h-80 md:h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-soft ring-1 ring-white/5 flex items-center justify-center overflow-hidden`}
    >
      {/* Lightweight visual placeholder for 3D carousel. Replace with lazy-loaded three.js scene later. */}
      <div className="text-center text-white/80 px-6">
        <div className="text-sm mb-2">{t('testimonials.intro')}</div>
        <div className="mt-4 inline-flex items-center space-x-3">
          <div className="w-20 h-20 bg-white/6 rounded-lg flex items-center justify-center">3D</div>
          <div className="text-left">
            <div className="font-medium">{playing ? t('testimonials.controls.pause') : t('testimonials.controls.play')}</div>
            <div className="text-xs text-white/60">{t('testimonials.filter.all')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials3DPlaceholder;
