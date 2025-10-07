import React, { useEffect, useState, Suspense } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Cpu, Smartphone, Globe } from 'lucide-react';

// Lazy 3D placeholder - real 3D should be added later (Three.js / react-three-fiber)
// explicit .tsx extension helps the TypeScript resolver in some configs
const Lazy3DScene = React.lazy(() => import('./Services3DPlaceholder.tsx').catch(() => ({ default: () => null })));

export const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setPrefersReducedMotion(mq.matches);
    handler();
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
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

  return (
    <div className="py-16 px-6 md:px-16 lg:px-24 text-gray-900 bg-white/5">
      {/* Hero */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">{t('services.title')}</h1>
          <p className="mt-4 text-lg text-white/80">{t('services.subtitle')}</p>
          <div className="mt-6 flex space-x-4">
            <a href="#contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-soft hover:shadow-deep focus:outline-none focus:ring-2 focus:ring-blue-300">{t('services.cta.contact')}<ArrowRight size={16} /></a>
            <a href="#projects" className="inline-flex items-center gap-2 border border-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/5">{t('services.cta.case')} </a>
          </div>
        </div>

        <div className="w-full h-64 md:h-80 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
          {!prefersReducedMotion ? (
            <Suspense fallback={<div className="text-white/60">3D loading…</div>}>
              <Lazy3DScene />
            </Suspense>
          ) : (
            <img src="/projects/ABC_AR/1.jpeg" alt="services hero" className="object-cover w-full h-full rounded-xl" />
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">{t('services.list_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <article key={s.id} className="relative bg-white/6 rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-3 hover:scale-[1.01] shadow-soft">
              <div className="absolute inset-0 rounded-2xl -z-10" style={{ boxShadow: 'inset 0 -40px 80px rgba(11,16,32,0.25)' }} />
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/8 rounded-lg">
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
                    <button className="text-sm px-3 py-2 rounded-md bg-white/6 hover:bg-white/10">{t('services.card.detail')}</button>
                    <button className="text-sm px-3 py-2 rounded-md bg-blue-600 text-white">{t('services.card.quote')}</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">{t('services.workflow_title')}</h2>
        <ol className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
          {['consult', 'design', 'build', 'operate'].map((step, idx) => (
            <li key={step} className="flex-1 text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white text-lg font-medium">{idx+1}</div>
              <div className="mt-3 text-white/80 font-medium">{t(`services.workflow.${step}.title`)}</div>
              <div className="mt-1 text-sm text-white/60">{t(`services.workflow.${step}.desc`)}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ & CTA */}
      <section className="max-w-6xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{t('services.faq_title')}</h3>
            <ul className="space-y-3 text-white/80">
              <li><strong>{t('services.faq.q1.title')}</strong><div className="mt-1 text-white/70">{t('services.faq.q1.answer')}</div></li>
              <li><strong>{t('services.faq.q2.title')}</strong><div className="mt-1 text-white/70">{t('services.faq.q2.answer')}</div></li>
              <li><strong>{t('services.faq.q3.title')}</strong><div className="mt-1 text-white/70">{t('services.faq.q3.answer')}</div></li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white">{t('services.cta.big_title')}</h3>
            <p className="mt-3 text-white/80">{t('services.cta.big_desc')}</p>
            <div className="mt-6">
              <a href="#contact" className="inline-flex items-center gap-2 bg-accent px-5 py-3 rounded-lg text-white shadow-soft">{t('services.cta.contact')}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
