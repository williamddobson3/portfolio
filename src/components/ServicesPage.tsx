import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Cpu, Smartphone, Globe, ChevronRight, Brain } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [currentProcessStep, setCurrentProcessStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);


  // Auto-rotate case studies
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCaseStudy((prev) => (prev + 1) % caseStudies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance process steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProcessStep((prev) => (prev + 1) % processSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      id: 'web',
      title: t('services.web.title'),
      subtitle: t('services.web.subtitle'),
      icon: Globe,
      kpi: t('services.web.kpi'),
      duration: t('services.web.duration')
    },
    {
      id: 'android',
      title: t('services.android.title'),
      subtitle: t('services.android.subtitle'),
      icon: Smartphone,
      kpi: t('services.android.kpi'),
      duration: t('services.android.duration')
    },
    {
      id: 'ai',
      title: t('services.ai.title'),
      subtitle: t('services.ai.subtitle'),
      icon: Cpu,
      kpi: t('services.ai.kpi'),
      duration: t('services.ai.duration')
    }
  ];

  const caseStudies = [
    {
      id: 'ameba',
      title: t('services.case_studies.ameba.title'),
      description: t('services.case_studies.ameba.description'),
      kpi: t('services.case_studies.ameba.kpi'),
      duration: t('services.case_studies.ameba.duration'),
      role: t('services.case_studies.ameba.role'),
      image: '/projects/ameba/1.png'
    },
    {
      id: 'buzzfeed',
      title: t('services.case_studies.buzzfeed.title'),
      description: t('services.case_studies.buzzfeed.description'),
      kpi: t('services.case_studies.buzzfeed.kpi'),
      duration: t('services.case_studies.buzzfeed.duration'),
      role: t('services.case_studies.buzzfeed.role'),
      image: '/projects/buzzfeed/1.jpg'
    },
    {
      id: 'itmedia',
      title: t('services.case_studies.itmedia.title'),
      description: t('services.case_studies.itmedia.description'),
      kpi: t('services.case_studies.itmedia.kpi'),
      duration: t('services.case_studies.itmedia.duration'),
      role: t('services.case_studies.itmedia.role'),
      image: '/projects/itmedia/1.png'
    }
  ];

  const processSteps = [
    {
      id: 'consult',
      title: t('services.workflow.consult.title'),
      description: t('services.workflow.consult.desc'),
      icon: '💬',
      color: '#0B76FF'
    },
    {
      id: 'design',
      title: t('services.workflow.design.title'),
      description: t('services.workflow.design.desc'),
      icon: '🎨',
      color: '#FF7B6B'
    },
    {
      id: 'build',
      title: t('services.workflow.build.title'),
      description: t('services.workflow.build.desc'),
      icon: '⚡',
      color: '#9AE66E'
    },
    {
      id: 'operate',
      title: t('services.workflow.operate.title'),
      description: t('services.workflow.operate.desc'),
      icon: '🚀',
      color: '#FFD700'
    }
  ];

  const serviceDetails = {
    web: {
      title: t('services.web.title'),
      subtitle: t('services.web.subtitle'),
      description: t('services.web.description'),
      features: [
        t('services.web.features.1'),
        t('services.web.features.2'),
        t('services.web.features.3'),
        t('services.web.features.4'),
        t('services.web.features.5'),
        t('services.web.features.6')
      ],
      duration: t('services.web.duration'),
      goal: t('services.web.goal'),
      technologies: ["React", "Next.js", "Vue", "Node.js", "Express", "Laravel", "Django", "MySQL", "PostgreSQL", "MongoDB"],
      color: "#0B76FF"
    },
    android: {
      title: t('services.android.title'),
      subtitle: t('services.android.subtitle'),
      description: t('services.android.description'),
      features: [
        t('services.android.features.1'),
        t('services.android.features.2'),
        t('services.android.features.3'),
        t('services.android.features.4'),
        t('services.android.features.5'),
        t('services.android.features.6')
      ],
      duration: t('services.android.duration'),
      goal: t('services.android.goal'),
      technologies: ["Jetpack Compose", "MVVM", "Clean Architecture", "Hilt", "Dagger", "Firebase", "Room", "DataStore"],
      color: "#FF7B6B"
    },
    ai: {
      title: t('services.ai.title'),
      subtitle: t('services.ai.subtitle'),
      description: t('services.ai.description'),
      features: [
        t('services.ai.features.1'),
        t('services.ai.features.2'),
        t('services.ai.features.3'),
        t('services.ai.features.4'),
        t('services.ai.features.5'),
        t('services.ai.features.6')
      ],
      duration: t('services.ai.duration'),
      goal: t('services.ai.goal'),
      technologies: ["TensorFlow", "PyTorch", "scikit-learn", "MLflow", "DVC", "Docker", "Kubernetes", "AWS SageMaker", "GCP Vertex AI"],
      color: "#9AE66E"
    }
  };

  return (
    <div className="py-32 px-6 md:px-16 lg:px-24 text-gray-900 bg-white/5 min-h-screen">
      {/* Hero Section with 3D Scene */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {t('services.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            {t('services.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a 
              href="#contact" 
              className="group inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              {t('services.cta.contact')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#projects" 
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-6 py-4 rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              {t('services.cta.case')}
              <ChevronRight size={18} />
            </a>
          </div>
        </div>

        <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl relative group">
          {/* Hero Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/hero_back.png" 
              alt={t('services.hero.alt')} 
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
          </div>
          
          {/* Floating Interactive Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Animated Data Points */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100 shadow-lg shadow-green-400/50"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-coral-400 rounded-full animate-pulse delay-200 shadow-lg shadow-coral-400/50"></div>
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300 shadow-lg shadow-purple-400/50"></div>
            
            {/* Connection Lines Animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line 
                x1="25%" y1="30%" x2="75%" y2="70%" 
                stroke="url(#gradient1)" 
                strokeWidth="1" 
                opacity="0.6"
                className="animate-pulse"
              />
              <line 
                x1="75%" y1="30%" x2="25%" y2="70%" 
                stroke="url(#gradient2)" 
                strokeWidth="1" 
                opacity="0.4"
                className="animate-pulse delay-100"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0B76FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#9AE66E" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF7B6B" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0B76FF" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-coral-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-coral-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      </section>

      {/* Services Grid with 3D Cards */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('services.list_title')}</h2>
          <p className="text-white/70 text-lg">Service delivery focused on core technology stacks and outcomes</p>
        </div>
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {services.map(s => (
            <div
              key={s.id}
              className="group relative bg-white/6 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] shadow-soft hover:shadow-deep cursor-pointer"
              style={{
                transform: hoveredCard === s.id ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                transformStyle: 'preserve-3d',
                transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1)'
              }}
              onMouseEnter={() => setHoveredCard(s.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* 3D Card Layers */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800/20 to-slate-900/20 -z-10"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 -z-5"></div>
              
              <div className="relative z-10 flex items-start space-x-4">
                <div className="p-3 bg-white/8 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                  <s.icon size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white">{s.title}</h3>
                  <p className="text-sm text-white/70 mt-1">{s.subtitle}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-white/70">
                    <span>{s.kpi}</span>
                    <span>{s.duration}</span>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button 
                      onClick={() => setSelectedService(s.id)}
                      className="text-sm px-3 py-2 rounded-md bg-white/6 hover:bg-white/10 transition-colors"
                    >
                      See details
                    </button>
                    <button 
                      onClick={() => window.location.hash = 'contact'}
                      className="text-sm px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      {t('services.card.quote')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies with 3D Rotation */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('services.representative_cases.title')}</h2>
          <p className="text-white/70 text-lg">{t('services.representative_cases.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="group relative cursor-pointer"
              style={{
                transform: activeCaseStudy === index ? 'translateY(0) scale(1.05)' : 'translateY(20px) scale(1)',
                opacity: activeCaseStudy === index ? 1 : 0.6,
                transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1)'
              }}
              onClick={() => setActiveCaseStudy(index)}
            >
              {/* Case Study Card */}
              <div className="w-full h-64 rounded-xl overflow-hidden relative bg-gradient-to-br from-slate-800 to-slate-900">
                {/* Background Image */}
                <div className="absolute inset-0 z-10">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover opacity-40 " />
                </div>
                
                {/* 3D Rotating Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl transform group-hover:rotate-2 transition-transform duration-500"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4">
                  <div className="w-32 h-8 bg-green-500/20 backdrop-blur-sm padding-[10px] rounded-full flex items-center justify-center">
                    <span className="text-green-300 text-xs font-semibold">{study.kpi}</span>
                  </div>
                </div>
                
                <div className="absolute top-4 left-4">
                  <div className="w-16 h-8 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-blue-300 text-xs font-semibold">{study.duration}</span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-8 bg-coral-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-coral-300 text-xs font-semibold text-center">{study.role}</span>
                  </div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold text-white mb-2">{study.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{study.description}</p>
                  </div>
                </div>
              </div>
          ))}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {caseStudies.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCaseStudy(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeCaseStudy === index 
                  ? 'bg-blue-500 w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Case study ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Process Workflow with 3D Tokens */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('services.workflow_title')}</h2>
          <p className="text-white/70 text-lg">{t('services.workflow.subtitle')}</p>
        </div>
        
        <div className="relative">
          {/* Process Workflow with CSS 3D Tokens */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
            {processSteps.map((step, idx) => (
              <div
                key={step.id}
                className="flex-1 text-center cursor-pointer group"
                onClick={() => setCurrentProcessStep(idx)}
              >
                {/* 3D Token */}
                <div 
                  className="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                  style={{ 
                    backgroundColor: step.color,
                    transform: idx <= currentProcessStep ? 'scale(1.1) translateY(-8px)' : 'scale(1) translateY(0)',
                    boxShadow: idx <= currentProcessStep ? `0 20px 40px ${step.color}40` : '0 10px 20px rgba(0,0,0,0.3)'
                  }}
                >
                  {idx + 1}
                </div>
                
                {/* Connection Arrow */}
                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent transform translate-x-10 -translate-y-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-blue-500/50 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                )}
                
                <div className="mt-4 text-white/90 font-semibold text-lg group-hover:text-white transition-colors">
                  {step.title}
                </div>
                <div className="mt-2 text-sm text-white/70 max-w-xs mx-auto group-hover:text-white/90 transition-colors">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
          
          {/* Floating Particles Effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('services.faq_title')}</h2>
          <p className="text-white/70 text-lg">{t('services.faq.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <span className="text-2xl">⏱️</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">{t('services.faq.q1.title')}</h3>
            <p className="text-white/70 leading-relaxed">{t('services.faq.q1.answer')}</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <span className="text-2xl">🔧</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">{t('services.faq.q2.title')}</h3>
            <p className="text-white/70 leading-relaxed">{t('services.faq.q2.answer')}</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 rounded-full bg-coral-500/20 flex items-center justify-center mb-4">
              <span className="text-2xl">♿</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">{t('services.faq.q3.title')}</h3>
            <p className="text-white/70 leading-relaxed">{t('services.faq.q3.answer')}</p>
          </div>
        </div>
      </section>

      {/* Final CTA with 3D Badge */}
      <section className="max-w-5xl mx-auto mb-24">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-12 md:p-16 overflow-hidden shadow-2xl">
          {/* Decorative 3D elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('services.cta.big_title')}
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('services.cta.big_desc')}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="#contact" 
                className="group inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-5 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {t('services.cta.contact')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="#projects" 
                className="inline-flex items-center gap-3 border-2 border-white/40 text-white px-8 py-5 rounded-xl font-semibold hover:bg-white/10 hover:border-white/60 transition-all duration-300"
              >
                {t('services.cta.examples')}
                <ChevronRight size={20} />
              </a>
          </div>

            {/* Trust indicators */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">8+</div>
                <div className="text-white/70 text-sm">{t('services.stats.experience')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">30+</div>
                <div className="text-white/70 text-sm">{t('services.stats.projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24 hours</div>
                <div className="text-white/70 text-sm">{t('services.stats.timeframe')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-white/70 text-sm">{t('services.stats.satisfaction')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className="mt-10 relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 scale-100 opacity-100"
            style={{
              background: `linear-gradient(135deg, ${serviceDetails[selectedService as keyof typeof serviceDetails]?.color}10, rgba(15, 23, 42, 0.95))`
            }}
          >
            {/* Modal Header */}
            <div className="relative p-8 border-b border-white/10">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-10 h-10 z-1000 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors group"
              >
                <svg className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex items-start space-x-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: serviceDetails[selectedService as keyof typeof serviceDetails]?.color }}
                >
                  {selectedService === 'web' && <Globe className="w-8 h-8 text-white" />}
                  {selectedService === 'android' && <Smartphone className="w-8 h-8 text-white" />}
                  {selectedService === 'ai' && <Brain className="w-8 h-8 text-white" />}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {serviceDetails[selectedService as keyof typeof serviceDetails]?.title}
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {serviceDetails[selectedService as keyof typeof serviceDetails]?.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
                  <p className="text-white/80 leading-relaxed">
                    {serviceDetails[selectedService as keyof typeof serviceDetails]?.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {serviceDetails[selectedService as keyof typeof serviceDetails]?.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: serviceDetails[selectedService as keyof typeof serviceDetails]?.color }}
                        />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Technologies & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {serviceDetails[selectedService as keyof typeof serviceDetails]?.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white/80 text-sm transition-colors"
                        style={{ 
                          border: `1px solid ${serviceDetails[selectedService as keyof typeof serviceDetails]?.color}30` 
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="text-white font-semibold mb-2">Duration</h4>
                    <p className="text-white/80">{serviceDetails[selectedService as keyof typeof serviceDetails]?.duration}</p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="text-white font-semibold mb-2">Goal</h4>
                    <p className="text-white/80 text-sm">{serviceDetails[selectedService as keyof typeof serviceDetails]?.goal}</p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="text-white font-semibold mb-2">Support</h4>
                    <p className="text-white/80">Continuous support after delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => window.location.hash = 'contact'}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Start Your Project
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-8 py-3 border border-white/20 hover:border-white/40 text-white rounded-xl font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Decorative Elements
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-coral-500/10 to-transparent rounded-full blur-2xl"></div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
