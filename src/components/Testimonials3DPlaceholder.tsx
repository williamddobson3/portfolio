import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Quote, Users, TrendingUp } from 'lucide-react';

export const Testimonials3DPlaceholder: React.FC<{ playing: boolean }> = ({ playing }) => {
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Testimonials for the 3D placeholder using translations
  const testimonials = useMemo(() => [
    {
      quote: t('testimonials.ameba.quote'),
      author: t('testimonials.ameba.name'),
      company: t('testimonials.ameba.company'),
      metric: t('testimonials.ameba.metrics')
    },
    {
      quote: t('testimonials.itmedia.quote'),
      author: t('testimonials.itmedia.name'), 
      company: t('testimonials.itmedia.company'),
      metric: t('testimonials.itmedia.metrics')
    },
    {
      quote: t('testimonials.buzzfeed.quote'),
      author: t('testimonials.buzzfeed.name'),
      company: t('testimonials.buzzfeed.company'), 
      metric: t('testimonials.buzzfeed.metrics')
    }
  ], [t]);

  // Auto-rotate testimonials when playing
  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [playing, testimonials.length]);

  return (
    <div className="w-full max-w-4xl mx-auto h-110 md:h-145 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-coral-900/20 rounded-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-800/90 to-slate-900/90 rounded-2xl"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-coral-500/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-8 w-8 h-8 bg-green-500/20 rounded-full animate-pulse delay-500"></div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="url(#gradient1)" strokeWidth="1" opacity="0.3" className="animate-pulse" />
        <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="url(#gradient2)" strokeWidth="1" opacity="0.2" className="animate-pulse delay-1000" />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B76FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9AE66E" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7B6B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0B76FF" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          {/* Quote icon */}
          <div className="mb-6">
            <Quote className="w-12 h-12 text-blue-400 mx-auto animate-pulse" />
          </div>
          
          {/* Testimonial content */}
          <div className="space-y-4">
            <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed italic">
              "{testimonials[currentTestimonial].quote}"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="text-right">
                <div className="font-semibold text-white">{testimonials[currentTestimonial].author}</div>
                <div className="text-sm text-white/70">{testimonials[currentTestimonial].company}</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-coral-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Metrics badge */}
            <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{testimonials[currentTestimonial].metric}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentTestimonial 
                ? 'bg-blue-400 w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => setCurrentTestimonial(index)}
          />
        ))}
      </div>

      {/* Play/Pause indicator */}
      <div className="absolute top-6 right-6">
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2">
          <div className={`w-2 h-2 rounded-full ${playing ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-xs text-white/70">
            {playing ? t('testimonials.controls.auto_rotating') : t('testimonials.controls.paused')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Testimonials3DPlaceholder;
