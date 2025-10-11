import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Testimonials3DPlaceholder from './Testimonials3DPlaceholder';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  metrics?: string; // e.g. "Response time -40%"
  year?: string;
  industry?: string;
}

const TestimonialsPage: React.FC = () => {
  const { t } = useLanguage();

  const testimonials: Testimonial[] = useMemo(() => [
    {
      id: 'ameba',
      quote: t('testimonials.ameba.quote'),
      name: t('testimonials.ameba.name'),
      title: t('testimonials.ameba.title'),
      company: t('testimonials.ameba.company'),
      metrics: t('testimonials.ameba.metrics'),
      year: t('testimonials.ameba.year'),
      industry: t('testimonials.ameba.industry'),
    },
    {
      id: 'itmedia',
      quote: t('testimonials.itmedia.quote'),
      name: t('testimonials.itmedia.name'),
      title: t('testimonials.itmedia.title'),
      company: t('testimonials.itmedia.company'),
      metrics: t('testimonials.itmedia.metrics'),
      year: t('testimonials.itmedia.year'),
      industry: t('testimonials.itmedia.industry'),
    },
    {
      id: 'buzzfeed',
      quote: t('testimonials.buzzfeed.quote'),
      name: t('testimonials.buzzfeed.name'),
      title: t('testimonials.buzzfeed.title'),
      company: t('testimonials.buzzfeed.company'),
      metrics: t('testimonials.buzzfeed.metrics'),
      year: t('testimonials.buzzfeed.year'),
      industry: t('testimonials.buzzfeed.industry'),
    },
    {
      id: 'manga',
      quote: t('testimonials.manga.quote'),
      name: t('testimonials.manga.name'),
      title: t('testimonials.manga.title'),
      company: t('testimonials.manga.company'),
      metrics: t('testimonials.manga.metrics'),
      year: t('testimonials.manga.year'),
      industry: t('testimonials.manga.industry'),
    },
    {
      id: 'cookpad',
      quote: t('testimonials.cookpad.quote'),
      name: t('testimonials.cookpad.name'),
      title: t('testimonials.cookpad.title'),
      company: t('testimonials.cookpad.company'),
      metrics: t('testimonials.cookpad.metrics'),
      year: t('testimonials.cookpad.year'),
      industry: t('testimonials.cookpad.industry'),
    },
    {
      id: 'teamlab',
      quote: t('testimonials.teamlab.quote'),
      name: t('testimonials.teamlab.name'),
      title: t('testimonials.teamlab.title'),
      company: t('testimonials.teamlab.company'),
      metrics: t('testimonials.teamlab.metrics'),
      year: t('testimonials.teamlab.year'),
      industry: t('testimonials.teamlab.industry'),
    },
    {
      id: 'lifesciencedb',
      quote: t('testimonials.lifesciencedb.quote'),
      name: t('testimonials.lifesciencedb.name'),
      title: t('testimonials.lifesciencedb.title'),
      company: t('testimonials.lifesciencedb.company'),
      metrics: t('testimonials.lifesciencedb.metrics'),
      year: t('testimonials.lifesciencedb.year'),
      industry: t('testimonials.lifesciencedb.industry'),
    },
    {
      id: 'openai',
      quote: t('testimonials.openai.quote'),
      name: t('testimonials.openai.name'),
      title: t('testimonials.openai.title'),
      company: t('testimonials.openai.company'),
      metrics: t('testimonials.openai.metrics'),
      year: t('testimonials.openai.year'),
      industry: t('testimonials.openai.industry'),
    },
    {
      id: 'marvel',
      quote: t('testimonials.marvel.quote'),
      name: t('testimonials.marvel.name'),
      title: t('testimonials.marvel.title'),
      company: t('testimonials.marvel.company'),
      metrics: t('testimonials.marvel.metrics'),
      year: t('testimonials.marvel.year'),
      industry: t('testimonials.marvel.industry'),
    },
    {
      id: 'untappd',
      quote: t('testimonials.untappd.quote'),
      name: t('testimonials.untappd.name'),
      title: t('testimonials.untappd.title'),
      company: t('testimonials.untappd.company'),
      metrics: t('testimonials.untappd.metrics'),
      year: t('testimonials.untappd.year'),
      industry: t('testimonials.untappd.industry'),
    },
  ], [t]);

  const items = testimonials;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [filter, setFilter] = useState('all');
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % items.length);
      }, 3500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, items.length]);

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  const filtered = filter === 'all' ? items : items.filter((it) => it.industry === filter);
  const current = filtered.length > 0 ? (filtered[index % filtered.length] || filtered[0]) : null;

  useEffect(() => {
    // keep index in-bounds when filter changes
    setIndex(0);
  }, [filter]);

  // Show loading state if no testimonials are available
  if (!current) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 pt-[150px]">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">{t('testimonials.title')}</h1>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">{t('testimonials.intro')}</p>
        </header>
        <div className="flex items-center justify-center h-64">
          <div className="text-white/60">Loading testimonials...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 pt-[150px]">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-white">{t('testimonials.title')}</h1>
        <p className="mt-3 text-white/80 max-w-2xl mx-auto">{t('testimonials.intro')}</p>
      </header>

      <section className="mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="w-full md:flex-1">
            
            <Testimonials3DPlaceholder playing={playing} />
          </div>

          <aside className="w-full md:w-96 mt-4 md:mt-0">
            <div className="bg-white/6 p-4 rounded-xl shadow-soft">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    aria-pressed={playing}
                    onClick={() => setPlaying((p) => !p)}
                    className="p-2 bg-blue-600/80 rounded-md text-white"
                    aria-label={playing ? t('testimonials.controls.pause') : t('testimonials.controls.play')}
                  >
                    {playing ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <div>
                    <div className="text-sm font-medium">{current?.name} — {current?.title}</div>
                    <div className="text-xs text-white/60">{current?.company} • {current?.year}</div>
                  </div>
                </div>
                <div className="text-right">
                  {current?.metrics && <div className="text-sm font-semibold text-green-300">{current.metrics}</div>}
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <button onClick={prev} className="p-2 rounded-md bg-white/8 text-white" aria-label="Previous">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={next} className="p-2 rounded-md bg-white/8 text-white" aria-label="Next">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <blockquote className="mt-4 text-white/90 text-lg">"{current?.quote}"</blockquote>

              <div className="mt-4">
                <label className="text-xs text-white/60">{t('testimonials.filter.industry')}</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full mt-2 rounded-md bg-black/20 text-white p-2"
                  aria-label="Filter testimonials"
                >
                  <option value="all">{t('testimonials.filter.all')}</option>
                  <option value="SaaS">{t('testimonials.filter.saas')}</option>
                  <option value="Media">{t('testimonials.filter.media')}</option>
                  <option value="Consumer">{t('testimonials.filter.consumer')}</option>
                  <option value="Entertainment">{t('testimonials.filter.entertainment')}</option>
                  <option value="Healthcare">{t('testimonials.filter.healthcare')}</option>
                </select>
              </div>

              <div className="mt-4">
                <a href="#projects" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md">{t('testimonials.case.view')}</a>
              </div>
            </div>

            <div className="mt-6 bg-white/4 p-4 rounded-xl">
              <h3 className="text-sm font-medium">{t('testimonials.longform.title')}</h3>
              <ul className="mt-3 space-y-3 text-white/80 text-sm">
                <li><a href="#" className="underline">ABC — 導入前の課題と導入後の改善事例</a></li>
                <li><a href="#" className="underline">XYZ — パフォーマンス改善の結果</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">{t('testimonials.longform.title')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.id} className="bg-white/5 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/8 flex items-center justify-center">{it.name.split(' ')[0].slice(0,1)}</div>
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs text-white/60">{it.title} — {it.company}</div>
                </div>
                <div className="ml-auto text-sm text-green-300">{it.metrics}</div>
              </div>
              <p className="mt-3 text-white/80">{it.quote}</p>
              <div className="mt-3 text-right text-xs"><a href="#projects" className="underline">{t('testimonials.case.view')}</a></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
