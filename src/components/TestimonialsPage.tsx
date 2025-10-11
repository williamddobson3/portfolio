import React, { useEffect, useState, useRef } from 'react';
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

const SAMPLE: Testimonial[] = [
  {
    id: 'ameba',
    quote: 'Working with Keishin on Ameba was transformative. The AMP Stories implementation increased our mobile story completion rates by 40%, and the modular frontend architecture he built reduced our development time for new features by 60%. His attention to performance optimization and user experience made our platform feel modern and responsive. The rich post editor with Graffiti drawing feature became one of our most popular tools. His technical expertise and collaborative approach made this project a huge success.',
    name: 'Yuki Nakamura',
    title: 'Frontend Engineering Lead',
    company: 'CyberAgent (Ameba)',
    metrics: 'Story completion +40%',
    year: '2023',
    industry: 'Social Media',
  },
  {
    id: 'itmedia',
    quote: 'The ITmedia modernization project exceeded all expectations. Keishin transformed our legacy system into a modern, high-performance platform. LCP dropped from 3 seconds to 1.2 seconds, and our bounce rates decreased significantly. The Laravel + React architecture with Redis caching and Kubernetes deployment on AWS handles traffic spikes beautifully. The custom CMS he built made our editorial workflow 3x faster. His expertise in performance optimization and scalable architecture was exactly what we needed.',
    name: 'Masahiro Tanaka',
    title: 'Technical Director',
    company: 'ITmedia',
    metrics: 'LCP -60%',
    year: '2023',
    industry: 'Media',
  },
  {
    id: 'buzzfeed',
    quote: 'Keishin\'s work on BuzzFeed Japan was exceptional. The modular content system he designed gave our editors unprecedented flexibility in storytelling. Page load speeds improved dramatically, and the real-time analytics integration transformed how we approach content strategy. The responsive design works flawlessly across all devices, and the CDN optimization ensures fast delivery globally. His understanding of both technical requirements and editorial needs made this project a game-changer for our team.',
    name: 'Sarah Johnson',
    title: 'Head of Product',
    company: 'BuzzFeed Japan',
    metrics: 'Page speed +2x',
    year: '2022',
    industry: 'Media',
  },
  {
    id: 'manga',
    quote: 'Building MangaONE from scratch with Keishin was an incredible experience. He designed a robust system that handles thousands of concurrent users during peak releases without breaking a sweat. The free reads system works flawlessly, and the native mobile apps provide a seamless reading experience. The CMS he built streamlined our content management process. His expertise in high-concurrency systems and mobile optimization was crucial to our success.',
    name: 'Kenji Watanabe',
    title: 'CTO',
    company: 'MangaONE',
    metrics: 'Concurrent users +500%',
    year: '2023',
    industry: 'Entertainment',
  },
  {
    id: 'cookpad',
    quote: 'Keishin\'s contributions to Cookpad were invaluable. The React.js frontend he developed made our recipe discovery experience much more intuitive. The Ruby on Rails backend optimizations with PostgreSQL and Redis caching improved our search performance by 70%. The mobile responsiveness he implemented increased our mobile user engagement by 45%. His focus on user experience and performance optimization made our platform more enjoyable for millions of users.',
    name: 'Akiko Sato',
    title: 'Engineering Manager',
    company: 'Cookpad',
    metrics: 'Search performance +70%',
    year: '2022',
    industry: 'Food & Lifestyle',
  },
  {
    id: 'teamlab',
    quote: 'Working with Keishin on our digital art platform was inspiring. His WebGL and Three.js expertise brought our interactive installations to life. The real-time responsiveness to user interactions created truly immersive experiences. The Next.js SSR implementation ensures fast loading even with complex 3D content. His passion for combining technology with art resulted in experiences that moved our visitors emotionally. The platform now supports thousands of concurrent users exploring our digital exhibitions.',
    name: 'Dr. Toshiyuki Inoko',
    title: 'Founder & Director',
    company: 'teamLab',
    metrics: 'User engagement +300%',
    year: '2023',
    industry: 'Digital Art',
  },
  {
    id: 'lifesciencedb',
    quote: 'The BodyParts3D project with Keishin was groundbreaking. His WebGL expertise made complex 3D anatomical models accessible and interactive. The integration with FMA database ensures medical accuracy while maintaining smooth performance. The user interface he designed makes exploring human anatomy intuitive for both medical students and professionals. His attention to detail in 3D rendering and data visualization created a tool that\'s now used in medical education worldwide.',
    name: 'Dr. Hiroshi Matsumoto',
    title: 'Professor of Anatomy',
    company: 'Life Science Database',
    metrics: 'Medical education reach +200%',
    year: '2022',
    industry: 'Healthcare',
  },
];

export const TestimonialsPage: React.FC = () => {
  const { t } = useLanguage();
  const [items] = useState<Testimonial[]>(SAMPLE);
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
  const current = filtered[index % filtered.length] || filtered[0];

  useEffect(() => {
    // keep index in-bounds when filter changes
    setIndex(0);
  }, [filter]);

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
                    <div className="text-sm font-medium">{current.name} — {current.title}</div>
                    <div className="text-xs text-white/60">{current.company} • {current.year}</div>
                  </div>
                </div>
                <div className="text-right">
                  {current.metrics && <div className="text-sm font-semibold text-green-300">{current.metrics}</div>}
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

              <blockquote className="mt-4 text-white/90 text-lg">“{current.quote}”</blockquote>

              <div className="mt-4">
                <label className="text-xs text-white/60">{t('testimonials.filter.industry')}</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full mt-2 rounded-md bg-black/20 text-white p-2"
                  aria-label="Filter testimonials"
                >
                  <option value="all">{t('testimonials.filter.all')}</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Media">Media</option>
                  <option value="Consumer">Consumer</option>
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
