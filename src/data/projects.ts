export interface Project {
  id: string;
  title: string;
  category: string;
  descriptionKey: string; // Changed from description to descriptionKey for translations
  role: string;
  year: string;
  status: string;
  technologies: string[];
  images: string[];
  metrics?: {
    users?: string;
    downloads?: string;
    awards?: string;
  };
  website?: string;
  github?: string;
}

export const projectCategories = [
  { id: 'all', name: 'All Projects', color: 'blue' },
  { id: 'social', name: 'Social & Community Platforms', color: 'pink' },
  { id: 'arvr', name: 'AR / VR / 3D Experiences', color: 'cyan' },
  { id: 'ai', name: 'AI / ML / Creative Tools', color: 'purple' },
  { id: 'consumer', name: 'Consumer & Lifestyle Apps', color: 'green' },
  { id: 'media', name: 'Media, Entertainment & Content', color: 'orange' },
  { id: 'business', name: 'Business & Productivity Tools', color: 'gray' },
];

export const projects: Project[] = [
  // AR / VR / 3D Experiences (Selected)
  {
    id: 'teamlab',
    title: 'teamLab — Digital Art Experiences',
    category: 'arvr',
    descriptionKey: 'project.teamlab.description',
    role: 'Frontend Developer',
    year: '2020',
    status: 'Active',
    technologies: ['WebGL', 'Three.js', 'React/Next.js', 'Node.js', 'SSR', 'WebSockets'],
    images: [
      '/projects/teamlab/1.jpg',
      '/projects/teamlab/2.jpg'
    ],
    website: 'https://www.team-lab.com/'
  },
  {
    id: 'ampersand',
    title: 'Ampersand',
    category: 'arvr',
    descriptionKey: 'project.ampersand.description',
    role: 'Full Stack Developer',
    year: '2019',
    status: 'Launched',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'AWS'],
    images: [
      '/projects/ampersand/1.jpg',
      '/projects/ampersand/2.jpg',
      '/projects/ampersand/3.jpg',
      '/projects/ampersand/4.jpg'
    ],
    website: 'https://ampersand.co.jp/'
  },
  {
    id: 'abc_ar',
    title: 'ABC_AR',
    category: 'arvr',
    descriptionKey: 'project.abc_ar.description',
    role: 'AR Developer',
    year: '2018',
    status: 'Launched',
    technologies: ['Unity', 'C#', 'ARKit', 'ARCore', '3D Modeling'],
    images: ['/projects/ABC_AR/1.jpeg', '/projects/ABC_AR/2.jpeg', '/projects/ABC_AR/3.jpg'],
    website: 'https://www.appsquare.com.au/abc-ar/'
  },
  {
    id: 'botanistofficial',
    title: 'BOTANIST Official',
    category: 'arvr',
    descriptionKey: 'project.botanistofficial.description',
    role: 'Lead Frontend Developer',
    year: '2022',
    status: 'Active',
    technologies: ['WordPress', 'PHP', 'SCSS', 'JavaScript', 'Webpack', 'CDN'],
    images: [
      '/projects/botanistofficial/1.jpg',
      '/projects/botanistofficial/2.jpg',
      '/projects/botanistofficial/3.jpg',
      '/projects/botanistofficial/4.jpg',
      '/projects/botanistofficial/5.jpg'
    ],
    website: 'https://botanistofficial.com/'
  },

  // Consumer & Lifestyle Apps (Selected)
  {
    id: 'cookpad',
    title: 'Cookpad (Japan)',
    category: 'consumer',
    descriptionKey: 'project.cookpad.description',
    role: 'Full Stack Developer',
    year: '2023',
    status: 'Active',
    technologies: ['React', 'Sass', 'Webpack', 'Ruby on Rails', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    images: ['/projects/cookpad/1.jpg', '/projects/cookpad/2.jpg', '/projects/cookpad/3.jpg', '/projects/cookpad/4.png'],
    website: 'https://cookpad.com/jp'
  },
  {
    id: 'jalan',
    title: 'Jalan.net',
    category: 'consumer',
    descriptionKey: 'project.jalan.description',
    role: 'Full Stack Developer',
    year: '2022',
    status: 'Launched',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'AWS'],
    images: ['/projects/jalan/1.jpg', '/projects/jalan/2.gif', '/projects/jalan/3.jpg', '/projects/jalan/4.jpg', '/projects/jalan/1.png'],
    website: 'https://www.jalan.net/'
  },
  {
    id: 'muji',
    title: 'MUJI Store (Japan)',
    category: 'consumer',
    descriptionKey: 'project.muji.description',
    role: 'Frontend Developer',
    year: '2021',
    status: 'Active',
    technologies: ['React', 'SCSS', 'TypeScript', 'Node.js', 'MySQL', 'CDN'],
    images: ['/projects/muji/1.png', '/projects/muji/2.png'],
    website: 'https://www.muji.com/jp/ja/store'
  },
  {
    id: 'tripadvisor',
    title: 'TripAdvisor Japan',
    category: 'consumer',
    descriptionKey: 'project.tripadvisor.description',
    role: 'Full Stack Developer',
    year: '2020',
    status: 'Active',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    images: ['/projects/tripadvisor/1.jpg', '/projects/tripadvisor/2.jpg', '/projects/tripadvisor/3.jpg', '/projects/tripadvisor/4.png'],
    website: 'https://www.tripadvisor.jp/'
  },
  {
    id: 'zenn-dev',
    title: 'Zenn.dev',
    category: 'consumer',
    descriptionKey: 'project.zenn-dev.description',
    role: 'Frontend Engineer',
    year: '2022',
    status: 'Active',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Rails API', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    images: ['/projects/zenn.dev/1.jpg', '/projects/zenn.dev/2.png', '/projects/zenn.dev/3.png', '/projects/zenn.dev/4.png', '/projects/zenn.dev/5.png'],
    website: 'https://zenn.dev/'
  },
  {
    id: 'zoff',
    title: 'Zoff',
    category: 'consumer',
    descriptionKey: 'project.zoff.description',
    role: 'Full Stack Developer',
    year: '2021',
    status: 'Launched',
    technologies: ['React', 'Sass', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    images: ['/projects/zoff/1.png', '/projects/zoff/2.png', '/projects/zoff/3.png', '/projects/zoff/4.png'],
    website: 'https://www.zoff.co.jp/shop/default.aspx'
  },
  {
    id: '18trip',
    title: '18TRIP (エイティーントリップ)',
    category: 'media',
    descriptionKey: 'project.18trip.description',
    role: 'Full Stack Developer',
    year: '2024',
    status: 'Active',
    technologies: ['Next.js', 'React', 'TypeScript', 'CSS3', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Mobile Game Development'],
    images: ['/projects/18trip.jp/1.png', '/projects/18trip.jp/2.png'],
    website: 'https://18trip.jp',
    metrics: {
      users: 'Mobile game platform',
      downloads: 'Free-to-play with in-app purchases',
      awards: 'Japanese anime/game project'
    }
  },
  {
    id: 'futuretrain',
    title: 'FUTURE TRAIN (フューチャートレイン)',
    category: 'consumer',
    descriptionKey: 'project.futuretrain.description',
    role: 'Frontend Developer',
    year: '2024',
    status: 'Active',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'TableCheck API', 'PDF Management', 'Bilingual Support', 'SEO', 'Accessibility'],
    images: ['/projects/futuretrain/1.png', '/projects/futuretrain/2.png'],
    website: 'https://www.futuretrain.jp/ja',
    metrics: {
      users: 'Themed restaurant experience',
      downloads: 'Bilingual (JA/EN) support',
      awards: 'Immersive dining concept'
    }
  },
  {
    id: 'expo2025-hyogo',
    title: '兵庫の日常へ旅しよう (Hyogo Travelogue)',
    category: 'consumer',
    descriptionKey: 'project.expo2025-hyogo.description',
    role: 'Lead Frontend Developer',
    year: '2024',
    status: 'Active',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Image Optimization', 'i18n', 'CMS Integration', 'SEO', 'Accessibility'],
    images: ['/projects/expo2025-hyogo/1.png', '/projects/expo2025-hyogo/2.png'],
    website: 'https://expo2025-hyogo-fieldpavilion.jp/travelogue/',
    metrics: {
      users: 'Multilingual travelogue',
      downloads: 'Image-driven storytelling',
      awards: 'Expo 2025 project'
    }
  },
  {
    id: 'hince',
    title: 'Hince',
    category: 'consumer',
    descriptionKey: 'project.hince.description',
    role: 'Lead Developer',
    year: '2024',
    status: 'Active',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS', 'CI/CD'],
    images: ['/projects/hince.jp/1.png', '/projects/hince.jp/2.png'],
    website: 'https://hince.jp/',
    metrics: {
      users: 'Production web application',
      downloads: 'Full-stack development',
      awards: 'End-to-end ownership'
    }
  },
  {
    id: 'misshelly',
    title: 'Misshelly',
    category: 'consumer',
    descriptionKey: 'project.misshelly.description',
    role: 'Lead Full-Stack Developer',
    year: '2024',
    status: 'Active',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Headless CMS', 'Stripe', 'CDN', 'SEO', 'i18n'],
    images: ['/projects/misshelly/1.png', '/projects/misshelly/2.png'],
    website: 'https://misshelly.com/',
    metrics: {
      users: 'Hair-care brand e-commerce',
      downloads: 'Direct-to-consumer',
      awards: 'Bilingual support'
    }
  },
  {
    id: 'nintendo',
    title: 'Donkey Kong BANANZA (Nintendo Switch 2)',
    category: 'media',
    descriptionKey: 'project.nintendo.description',
    role: 'Lead Frontend Developer',
    year: '2024',
    status: 'Active',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Image Optimization', 'SEO', 'Accessibility', 'Performance'],
    images: ['/projects/nintendo/1.png', '/projects/nintendo/2.png', '/projects/nintendo/3.png', '/projects/nintendo/4.png', '/projects/nintendo/5.webm'],
    website: 'https://www.nintendo.com/jp/games/switch2/aaaca/index.html',
    metrics: {
      users: 'Nintendo marketing page',
      downloads: 'High-performance site',
      awards: 'Official Nintendo project'
    }
  },
  {
    id: 'opera-net',
    title: 'opera-net.jp',
    category: 'business',
    descriptionKey: 'project.opera-net.description',
    role: 'Full-Stack Developer',
    year: '2024',
    status: 'Active',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Headless CMS', 'SEO', 'Accessibility', 'Performance'],
    images: ['/projects/opera-net.jp/1.png', '/projects/opera-net.jp/2.png', '/projects/opera-net.jp/3.png'],
    website: 'https://www.opera-net.jp/',
    metrics: {
      users: 'Professional website',
      downloads: 'SEO-optimized',
      awards: 'Accessibility-first'
    }
  },
  {
    id: 'pickyou-pro',
    title: 'PICKYOU PRO',
    category: 'consumer',
    descriptionKey: 'project.pickyou-pro.description',
    role: 'Lead Developer',
    year: '2024',
    status: 'Active',
    technologies: ['Shopify', 'Liquid', 'HTML5', 'CSS3', 'JavaScript', 'E-commerce', 'SEO', 'Performance'],
    images: ['/projects/pro.pickyou.jp/1.png', '/projects/pro.pickyou.jp/2.png', '/projects/pro.pickyou.jp/3.png'],
    website: 'https://pro.pickyou.jp/',
    metrics: {
      users: 'Curated marketplace',
      downloads: 'Creator-focused',
      awards: 'Custom Shopify theme'
    }
  }
  ,

  // Social & Community Platforms
  {
    id: 'ameba',
    title: 'Ameba',
    category: 'social',
    descriptionKey: 'project.ameba.description',
    role: 'Frontend Engineer',
    year: '2021',
    status: 'Active',
    technologies: ['HTML5', 'CSS/Sass', 'JavaScript', 'TypeScript', 'React/Vue', 'Webpack', 'AMP'],
    images: ['/projects/ameba/1.png', '/projects/ameba/2.png', '/projects/ameba/3.png', '/projects/ameba/4.png'],
    website: 'https://www.ameba.jp/'
  },
  {
    id: 'buzzfeed-jp',
    title: 'BuzzFeed Japan',
    category: 'social',
    descriptionKey: 'project.buzzfeed.description',
    role: 'Full Stack Developer',
    year: '2020',
    status: 'Active',
    technologies: ['React/Next.js', 'Node.js', 'CMS', 'PostgreSQL', 'Redis', 'Elasticsearch', 'CDN'],
    images: ['/projects/buzzfeed/1.jpg', '/projects/buzzfeed/2.jpg', '/projects/buzzfeed/3.jpg', '/projects/buzzfeed/4.png'],
    website: 'https://www.buzzfeed.com/jp'
  },
  {
    id: 'itmedia',
    title: 'ITmedia',
    category: 'social',
    descriptionKey: 'project.itmedia.description',
    role: 'Full Stack Developer',
    year: '2022',
    status: 'Launched',
    technologies: ['Laravel (PHP)', 'React', 'MySQL', 'Elasticsearch', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
    images: ['/projects/itmedia/1.png', '/projects/itmedia/2.jpg', '/projects/itmedia/3.png', '/projects/itmedia/4.jpg'],
    website: 'https://www.itmedia.co.jp/'
  },
  {
    id: 'manga',
    title: 'Manga Platform',
    category: 'social',
    descriptionKey: 'project.manga.description',
    role: 'Backend & Mobile',
    year: '2021',
    status: 'Active',
    technologies: ['Node.js', 'CDN', 'Caching', 'Load Balancer', 'iOS', 'Android'],
    images: ['/projects/manga/1.jpg', '/projects/manga/2.webp', '/projects/manga/3.png', '/projects/manga/4.jpg'],
    website: 'https://manga-one.com/'
  },
  {
    id: 'nicovideo',
    title: 'Niconico (nicovideo)',
    category: 'social',
    descriptionKey: 'project.nicovideo.description',
    role: 'Frontend Developer',
    year: '2020',
    status: 'Active',
    technologies: ['JavaScript', 'React', 'CDN', 'Caching'],
    images: ['/projects/nicovideo/1.jpeg', '/projects/nicovideo/2.jpeg', '/projects/nicovideo/3.jpeg', '/projects/nicovideo/4.jpg'],
    website: 'https://www.nicovideo.jp/'
  },
  {
    id: 'pixiv',
    title: 'Pixiv',
    category: 'social',
    descriptionKey: 'project.pixiv.description',
    role: 'Frontend Engineer',
    year: '2021',
    status: 'Active',
    technologies: ['TypeScript', 'React', 'Node/Java services', 'MySQL/PostgreSQL', 'Redis', 'Elasticsearch', 'CDN'],
    images: ['/projects/Pixiv/1.jpg', '/projects/Pixiv/2.jpg', '/projects/Pixiv/3.png', '/projects/Pixiv/4.png'],
    website: 'https://www.pixiv.co.jp/'
  },

  // AI / ML / Creative Tools
  {
    id: 'openai',
    title: 'OpenAI',
    category: 'ai',
    descriptionKey: 'project.openai.description',
    role: 'AI Engineer',
    year: '2023',
    status: 'Active',
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    images: ['/projects/OpenAI/1.png', '/projects/OpenAI/2.png', '/projects/OpenAI/3.png'],
    website: 'https://openai.com'
  },
  {
    id: 'midjourney',
    title: 'Midjourney',
    category: 'ai',
    descriptionKey: 'project.midjourney.description',
    role: 'AI/3D Developer',
    year: '2022',
    status: 'Active',
    technologies: ['Python', 'PyTorch', 'Three.js', 'WebGL', 'OpenAI'],
    images: ['/projects/Midjourney/1.png', '/projects/Midjourney/2.png', '/projects/Midjourney/3.png'],
    website: 'https://midjourney.com'
  },


  // Media, Entertainment & Content
  {
    id: 'myanimelist',
    title: 'MyAnimeList',
    category: 'media',
    descriptionKey: 'project.myanimelist.description',
    role: 'Frontend Developer',
    year: '2021',
    status: 'Active',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    images: ['/projects/MyAnimeList/1.jpeg', '/projects/MyAnimeList/2.avif', '/projects/MyAnimeList/3.webp'],
    website: 'https://myanimelist.net'
  },
  {
    id: 'marvel',
    title: 'Marvel',
    category: 'media',
    descriptionKey: 'project.marvel.description',
    role: 'Frontend Engineer',
    year: '2020',
    status: 'Active',
    technologies: ['React', 'Next.js', 'GraphQL', 'CDN'],
    images: ['/projects/Marvel/1.webp', '/projects/Marvel/2.jpg', '/projects/Marvel/3.jpg'],
    website: 'https://www.marvel.com'
  },
  {
    id: 'letterboxd',
    title: 'Letterboxd',
    category: 'media',
    descriptionKey: 'project.letterboxd.description',
    role: 'Frontend Developer',
    year: '2019',
    status: 'Active',
    technologies: ['React', 'TypeScript', 'Sass'],
    images: ['/projects/Letterboxd/1.png', '/projects/Letterboxd/2.webp', '/projects/Letterboxd/3.webp'],
    website: 'https://letterboxd.com'
  },
  {
    id: 'soundraw',
    title: 'Soundraw',
    category: 'media',
    descriptionKey: 'project.soundraw.description',
    role: 'Full Stack Engineer',
    year: '2022',
    status: 'Active',
    technologies: ['Vue', 'Node.js', 'Audio Processing', 'CDN'],
    images: ['/projects/Soundraw/1.png', '/projects/Soundraw/2.png', '/projects/Soundraw/3.png'],
    website: 'https://soundraw.io'
  },
  {
    id: 'yummygum',
    title: 'Yummygum',
    category: 'media',
    descriptionKey: 'project.yummygum.description',
    role: 'UI Engineer',
    year: '2018',
    status: 'Launched',
    technologies: ['HTML/CSS', 'JavaScript', 'Accessibility'],
    images: ['/projects/Yummygum/1.webp', '/projects/Yummygum/2.webp', '/projects/Yummygum/3.webp'],
    website: 'https://yummygum.com'
  },

  // Business & Productivity Tools
  {
    id: 'doximity',
    title: 'Doximity',
    category: 'business',
    descriptionKey: 'project.doximity.description',
    role: 'Full Stack Developer',
    year: '2023',
    status: 'Active',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'HIPAA Compliance'],
    images: ['/projects/Doximity/1.webp', '/projects/Doximity/2.webp', '/projects/Doximity/3.png'],
    website: 'https://doximity.com'
  }
  ,
  {
    id: 'venturebeat',
    title: 'VentureBeat',
    category: 'business',
    descriptionKey: 'project.venturebeat.description',
    role: 'Frontend Engineer',
    year: '2022',
    status: 'Active',
    technologies: ['React', 'TypeScript', 'Node.js', 'SEO', 'CDN'],
    images: ['/projects/VentureBeat/1.jpg', '/projects/VentureBeat/2.png', '/projects/VentureBeat/3.webp'],
    website: 'https://venturebeat.com'
  },
  {
    id: 'polywork',
    title: 'Polywork',
    category: 'business',
    descriptionKey: 'project.polywork.description',
    role: 'Product Engineer',
    year: '2021',
    status: 'Active',
    technologies: ['Next.js', 'React', 'GraphQL', 'TypeScript'],
    images: ['/projects/Polywork/1.png', '/projects/Polywork/2.webp', '/projects/Polywork/3.jpg'],
    website: 'https://polywork.com'
  },
  {
    id: 'ravelry',
    title: 'Ravelry',
    category: 'business',
    descriptionKey: 'project.ravelry.description',
    role: 'Full Stack Developer',
    year: '2020',
    status: 'Launched',
    technologies: ['Rails', 'PostgreSQL', 'Redis', 'CDN'],
    images: ['/projects/Ravelry/1.jpg', '/projects/Ravelry/2.jpg', '/projects/Ravelry/3.jpg'],
    website: 'https://www.ravelry.com'
  },
  {
    id: 'rallypoint',
    title: 'RallyPoint',
    category: 'business',
    descriptionKey: 'project.rallypoint.description',
    role: 'Frontend Developer',
    year: '2019',
    status: 'Active',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    images: ['/projects/RallyPoint/1.png', '/projects/RallyPoint/2.webp', '/projects/RallyPoint/3.jpeg'],
    website: 'https://www.rallypoint.com'
  }
];
