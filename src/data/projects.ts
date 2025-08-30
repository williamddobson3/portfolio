export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'blockchain' | 'social' | 'ai' | 'enterprise';
  technologies: string[];
  images: string[];
  features: string[];
  year: number;
  client?: string;
  role: string;
  duration: string;
  impact: string;
}

export const projects: Project[] = [
  {
    id: 'are-na-groups',
    title: 'Are.na Groups',
    category: 'social',
    description: 'A collaborative platform for saving content, creating collections over time, and connecting ideas. Built for students, hobbyists, and knowledge collectors with transparent business model.',
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'Collaboration Tools'],
    images: ['/projects/Are.na_-_Groups/Are.na_-_Groups.png'],
    features: ['Content saving and organization', 'Collaborative collections', 'Block organization', 'Mindset-aware design'],
    year: 2023,
    role: 'Full Stack Developer',
    duration: '6 months',
    impact: 'Enhanced user collaboration and content discovery'
  },
  {
    id: 'asmallworld',
    title: 'ASMALLWORLD',
    category: 'social',
    description: 'A luxury-focused global community platform for modern luxury travelers, featuring VIP hotel benefits, exclusive social events, and curated travel inspiration.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    images: ['/projects/Asmallworld/1.jpg', '/projects/Asmallworld/2.jpg', '/projects/Asmallworld/3.jpg'],
    features: ['Premium membership tiers', 'VIP hotel rates', 'Exclusive event access', 'Enhanced privacy features'],
    year: 2023,
    role: 'Senior Full Stack Developer',
    duration: '8 months',
    impact: 'Increased user engagement by 40% and premium conversions by 25%'
  },
  {
    id: 'astar-network',
    title: 'Astar Network',
    category: 'blockchain',
    description: 'Multi-VM blockchain platform supporting EVM & WASM with developer-friendly features, interoperability, and advanced smart contract capabilities.',
    technologies: ['Rust', 'Substrate', 'WebAssembly', 'Ethereum', 'Polkadot'],
    images: ['/projects/Astar Network/1.jpg', '/projects/Astar Network/2.png', '/projects/Astar Network/3.png'],
    features: ['Multi-VM support (EVM & WASM)', 'Developer-friendly features', 'Interoperability', 'Astar 2.0 architecture'],
    year: 2023,
    role: 'Blockchain Developer',
    duration: '12 months',
    impact: 'Launched successful mainnet with 1000+ developers'
  },
  {
    id: 'bemyeyes',
    title: 'Be My Eyes',
    category: 'ai',
    description: 'AI-powered visual assistance platform helping visually impaired users through community support and advanced AI technology.',
    technologies: ['React Native', 'Python', 'TensorFlow', 'WebRTC', 'AWS'],
    images: ['/projects/BeMyEyes/1.png', '/projects/BeMyEyes/2.png', '/projects/BeMyEyes/3.png'],
    features: ['AI visual assistance', 'Community support', 'Real-time video calls', 'Multi-platform support'],
    year: 2023,
    role: 'AI/Full Stack Developer',
    duration: '10 months',
    impact: 'Helped 500,000+ visually impaired users worldwide'
  },
  {
    id: 'bereal',
    title: 'BeReal',
    category: 'social',
    description: 'Authentic social media platform encouraging genuine moments through time-limited photo sharing and real-time connections.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    images: ['/projects/BeReal/1.jpg', '/projects/BeReal/2.webp', '/projects/BeReal/3.jpg'],
    features: ['Time-limited sharing', 'Dual camera capture', 'Real-time notifications', 'Authentic social experience'],
    year: 2023,
    role: 'Mobile Developer',
    duration: '7 months',
    impact: 'Achieved 50M+ downloads and viral growth'
  },
  {
    id: 'blockchainhub-inc',
    title: 'BlockchainHub Inc',
    category: 'blockchain',
    description: 'Comprehensive blockchain solutions provider offering consulting, development, and infrastructure services for enterprise clients.',
    technologies: ['Ethereum', 'Hyperledger', 'Solidity', 'React', 'Node.js'],
    images: ['/projects/BlockchainHub Inc/1.jpg', '/projects/BlockchainHub Inc/2.png', '/projects/BlockchainHub Inc/3.png'],
    features: ['Smart contract development', 'DeFi solutions', 'Enterprise blockchain', 'Consulting services'],
    year: 2023,
    role: 'Senior Blockchain Developer',
    duration: '9 months',
    impact: 'Delivered 15+ enterprise blockchain solutions'
  },
  {
    id: 'doximity',
    title: 'Doximity',
    category: 'enterprise',
    description: 'Professional network for healthcare professionals with secure messaging, career tools, and medical collaboration features.',
    technologies: ['React', 'Python', 'PostgreSQL', 'HIPAA Compliance', 'AWS'],
    images: ['/projects/Doximity/1.webp', '/projects/Doximity/2.webp', '/projects/Doximity/3.png'],
    features: ['Secure messaging', 'Professional networking', 'Career tools', 'HIPAA compliance'],
    year: 2023,
    role: 'Full Stack Developer',
    duration: '11 months',
    impact: 'Connected 2M+ healthcare professionals'
  },
  {
    id: 'eversystem-inc',
    title: 'Eversystem Inc',
    category: 'enterprise',
    description: 'Enterprise software solutions provider specializing in workflow automation, data analytics, and business process optimization.',
    technologies: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    images: ['/projects/Eversystem Inc/1.png', '/projects/Eversystem Inc/2.jpeg', '/projects/Eversystem Inc/3.png'],
    features: ['Workflow automation', 'Data analytics', 'Business process optimization', 'Enterprise integration'],
    year: 2023,
    role: 'Senior Full Stack Developer',
    duration: '14 months',
    impact: 'Improved client efficiency by 60%'
  },
  {
    id: 'letterboxd',
    title: 'Letterboxd',
    category: 'social',
    description: 'Social platform for film enthusiasts to discover, rate, and review movies while connecting with other cinephiles worldwide.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    images: ['/projects/Letterboxd/1.png', '/projects/Letterboxd/2.webp', '/projects/Letterboxd/3.webp'],
    features: ['Movie discovery', 'Social reviews', 'Watchlist management', 'Community features'],
    year: 2023,
    role: 'Full Stack Developer',
    duration: '8 months',
    impact: 'Built community of 10M+ film enthusiasts'
  },
  {
    id: 'mastodon-ello-diaspora',
    title: 'Mastodon, Ello & Diaspora',
    category: 'social',
    description: 'Decentralized social media platforms promoting user privacy, data ownership, and community-driven content sharing.',
    technologies: ['Ruby on Rails', 'PostgreSQL', 'Redis', 'ActivityPub', 'Docker'],
    images: ['/projects/Mastodon  Ello  Diaspora/1.png', '/projects/Mastodon  Ello  Diaspora/2.jpg', '/projects/Mastodon  Ello  Diaspora/3.jpg'],
    features: ['Decentralized architecture', 'Privacy-focused', 'Data ownership', 'Community-driven'],
    year: 2023,
    role: 'Backend Developer',
    duration: '12 months',
    impact: 'Created privacy-first social alternatives'
  },
  {
    id: 'mewe',
    title: 'MeWe',
    category: 'social',
    description: 'Privacy-focused social network emphasizing user data protection, ad-free experience, and authentic social connections.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'WebRTC', 'AWS'],
    images: ['/projects/MeWe/1.jpg', '/projects/MeWe/2.jpg', '/projects/MeWe/3.png'],
    features: ['Privacy protection', 'Ad-free experience', 'Authentic connections', 'Data ownership'],
    year: 2023,
    role: 'Mobile Developer',
    duration: '9 months',
    impact: 'Grew to 20M+ privacy-conscious users'
  },
  {
    id: 'myanimelist',
    title: 'MyAnimeList',
    category: 'social',
    description: 'Comprehensive anime and manga database with social features, tracking tools, and community-driven content discovery.',
    technologies: ['React', 'PHP', 'MySQL', 'Redis', 'AWS'],
    images: ['/projects/MyAnimeList/1.jpeg', '/projects/MyAnimeList/2.avif', '/projects/MyAnimeList/3.webp'],
    features: ['Anime/manga database', 'Social tracking', 'Community features', 'Content discovery'],
    year: 2023,
    role: 'Full Stack Developer',
    duration: '10 months',
    impact: 'Served 15M+ anime enthusiasts monthly'
  },
  {
    id: 'pair',
    title: 'Pair',
    category: 'social',
    description: 'Intimate social platform designed for close relationships, featuring private sharing, mood tracking, and relationship insights.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'WebRTC', 'AWS'],
    images: ['/projects/Pair/1.jpg', '/projects/Pair/2.jpg', '/projects/Pair/3.jpg'],
    features: ['Private sharing', 'Mood tracking', 'Relationship insights', 'Intimate connections'],
    year: 2023,
    role: 'Mobile Developer',
    duration: '6 months',
    impact: 'Enhanced relationship connections for 1M+ users'
  },
  {
    id: 'path',
    title: 'Path',
    category: 'social',
    description: 'Personal journaling and life sharing platform with beautiful storytelling features and intimate social connections.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS', 'Image Processing'],
    images: ['/projects/Path/1.jpg', '/projects/Path/2.webp', '/projects/Path/3.webp'],
    features: ['Personal journaling', 'Life sharing', 'Storytelling', 'Intimate connections'],
    year: 2023,
    role: 'Mobile Developer',
    duration: '8 months',
    impact: 'Created meaningful connections for 5M+ users'
  },
  {
    id: 'pixelfed-ui',
    title: 'Pixelfed UI',
    category: 'social',
    description: 'Modern UI/UX design system for Pixelfed, a decentralized image sharing platform with Instagram-like features.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Design System'],
    images: ['/projects/Pixelfed-ui/Pixelfed-ui.png'],
    features: ['Modern UI design', 'Responsive layout', 'Accessibility', 'Design system'],
    year: 2023,
    role: 'UI/UX Developer',
    duration: '5 months',
    impact: 'Improved user experience and accessibility'
  },
  {
    id: 'polywork',
    title: 'Polywork',
    category: 'social',
    description: 'Professional networking platform for multi-passionate professionals to showcase diverse skills and projects.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS'],
    images: ['/projects/Polywork/1.png', '/projects/Polywork/2.webp', '/projects/Polywork/3.jpg'],
    features: ['Multi-passionate profiles', 'Project showcasing', 'Professional networking', 'Skill diversity'],
    year: 2023,
    role: 'Full Stack Developer',
    duration: '11 months',
    impact: 'Connected 500K+ multi-passionate professionals'
  },
  {
    id: 'poparazzi',
    title: 'Poparazzi',
    category: 'social',
    description: 'Social media app where users can only post photos of their friends, creating authentic and collaborative content.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Image Recognition', 'AWS'],
    images: ['/projects/Poparazzi/1.jpg', '/projects/Poparazzi/2.webp', '/projects/Poparazzi/3.png'],
    features: ['Friend-only posting', 'Collaborative content', 'Authentic sharing', 'Social connections'],
    year: 2023,
    role: 'Mobile Developer',
    duration: '7 months',
    impact: 'Achieved viral growth with authentic content'
  },
  {
    id: 'rallypoint',
    title: 'RallyPoint',
    category: 'social',
    description: 'Military-focused social networking platform connecting service members, veterans, and their families worldwide.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Security Compliance', 'AWS'],
    images: ['/projects/RallyPoint/1.png', '/projects/RallyPoint/2.webp', '/projects/RallyPoint/3.jpeg'],
    features: ['Military networking', 'Veteran support', 'Family connections', 'Security compliance'],
    year: 2023,
    role: 'Full Stack Developer',
    duration: '10 months',
    impact: 'Connected 2M+ military personnel and families'
  },
  {
    id: 'ravelry',
    title: 'Ravelry',
    category: 'social',
    description: 'Social platform for fiber artists, knitters, and crocheters to share patterns, projects, and connect with the crafting community.',
    technologies: ['PHP', 'MySQL', 'Redis', 'Image Processing', 'AWS'],
    images: ['/projects/Ravelry/1.jpg', '/projects/Ravelry/2.jpg', '/projects/Ravelry/3.jpg'],
    features: ['Pattern sharing', 'Project tracking', 'Crafting community', 'Fiber arts focus'],
    year: 2023,
    role: 'Backend Developer',
    duration: '12 months',
    impact: 'Built community of 9M+ fiber artists'
  },
  {
    id: 'small-business-bonfire',
    title: 'Small Business Bonfire',
    category: 'enterprise',
    description: 'Platform supporting small business growth through networking, resources, and community-driven business development.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    images: ['/projects/Small Business Bonfire/1.webp'],
    features: ['Business networking', 'Resource sharing', 'Community support', 'Growth tools'],
    year: 2023,
    role: 'Full Stack Developer',
    duration: '8 months',
    impact: 'Supported 50K+ small businesses'
  },
  {
    id: 'solashi-blockchain-portfolio',
    title: 'Solashi\'s Blockchain Portfolio',
    category: 'blockchain',
    description: 'Comprehensive blockchain investment and portfolio management platform with DeFi integration and analytics.',
    technologies: ['React', 'Solidity', 'Web3.js', 'Ethereum', 'DeFi Protocols'],
    images: ['/projects/Solashi\'s Blockchain Portfolio/1.webp', '/projects/Solashi\'s Blockchain Portfolio/2.webp', '/projects/Solashi\'s Blockchain Portfolio/3.webp'],
    features: ['Portfolio tracking', 'DeFi integration', 'Analytics dashboard', 'Investment tools'],
    year: 2023,
    role: 'Blockchain Developer',
    duration: '9 months',
    impact: 'Managed $100M+ in digital assets'
  },
  {
    id: 'soramitsu-co-ltd',
    title: 'Soramitsu Co., Ltd',
    category: 'blockchain',
    description: 'Blockchain technology company specializing in digital identity, payments, and enterprise blockchain solutions.',
    technologies: ['Rust', 'Substrate', 'Hyperledger', 'React', 'Docker'],
    images: ['/projects/Soramitsu Co., Ltd/1.jpg', '/projects/Soramitsu Co., Ltd/2.jpg', '/projects/Soramitsu Co., Ltd/3.png'],
    features: ['Digital identity', 'Payment solutions', 'Enterprise blockchain', 'Security focus'],
    year: 2023,
    role: 'Senior Blockchain Developer',
    duration: '15 months',
    impact: 'Deployed blockchain solutions for 10+ enterprises'
  },
  {
    id: 'trust-cafe',
    title: 'Trust Cafe',
    category: 'social',
    description: 'Community-driven platform fostering trust and authentic connections through verified user interactions.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Identity Verification', 'AWS'],
    images: ['/projects/trust-cafe_0/trust-cafe_0.png'],
    features: ['Trust verification', 'Authentic connections', 'Community building', 'Identity verification'],
    year: 2023,
    role: 'Full Stack Developer',
    duration: '7 months',
    impact: 'Built trusted community of 100K+ users'
  },
  {
    id: 'untappd',
    title: 'Untappd',
    category: 'social',
    description: 'Social platform for beer enthusiasts to discover, rate, and share craft beer experiences with the global beer community.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Image Recognition', 'AWS'],
    images: ['/projects/Untappd/1.jpg', '/projects/Untappd/2.gif', '/projects/Untappd/3.png'],
    features: ['Beer discovery', 'Social check-ins', 'Rating system', 'Community features'],
    year: 2023,
    role: 'Mobile Developer',
    duration: '11 months',
    impact: 'Connected 8M+ beer enthusiasts worldwide'
  },
  {
    id: 'venturebeat',
    title: 'VentureBeat',
    category: 'enterprise',
    description: 'Leading technology news and media platform covering startups, innovation, and the latest in tech industry developments.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Content Management', 'AWS'],
    images: ['/projects/VentureBeat/1.jpg', '/projects/VentureBeat/2.png', '/projects/VentureBeat/3.webp'],
    features: ['Content management', 'News publishing', 'Analytics dashboard', 'Media platform'],
    year: 2023,
    role: 'Full Stack Developer',
    duration: '13 months',
    impact: 'Served 10M+ monthly readers with tech news'
  },
  {
    id: 'bombas',
    title: 'Bombas',
    category: 'web',
    description: 'Comfort-focused e-commerce platform for premium socks and apparel with integrated social impact mission and seamless shopping experience.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Shopify Plus', 'Stripe', 'AWS'],
    images: ['/projects/Bombas/1.png', '/projects/Bombas/2.png', '/projects/Bombas/3.png'],
    features: ['E-commerce platform', 'Social impact tracking', 'Product customization', 'Subscription management', 'Mobile-first design'],
    year: 2024,
    role: 'Senior Frontend Developer',
    duration: '10 months',
    impact: 'Increased online sales by 45% and improved user engagement'
  },
  {
    id: 'hellomobility',
    title: 'Hellomobility',
    category: 'web',
    description: 'Innovative mobility solutions platform providing seamless transportation services through advanced web technologies and user-centric design.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Google Maps API', 'Socket.io', 'PWA'],
    images: ['/projects/Hellomobility/1.png', '/projects/Hellomobility/2.png', '/projects/Hellomobility/3.png'],
    features: ['Real-time tracking', 'Route optimization', 'Payment integration', 'Multi-modal transport', 'Progressive Web App'],
    year: 2024,
    role: 'Full Stack Developer',
    duration: '8 months',
    impact: 'Enhanced transportation efficiency by 35% for urban commuters'
  },
  {
    id: 'marvel',
    title: 'Marvel',
    category: 'web',
    description: 'Collaborative design platform enabling teams to create, prototype, and iterate on digital products with powerful web-based tools.',
    technologies: ['React', 'TypeScript', 'WebGL', 'Canvas API', 'WebSockets', 'Node.js'],
    images: ['/projects/Marvel/1.webp', '/projects/Marvel/2.jpg', '/projects/Marvel/3.jpg'],
    features: ['Interactive prototyping', 'Real-time collaboration', 'Design handoff', 'Version control', 'Cross-platform sync'],
    year: 2024,
    role: 'Frontend Developer',
    duration: '12 months',
    impact: 'Streamlined design workflow for 500K+ designers worldwide'
  },
  {
    id: 'yummygum',
    title: 'Yummygum',
    category: 'web',
    description: 'Digital product agency website showcasing B2B tech transformations with sophisticated design systems and modern web development practices.',
    technologies: ['React', 'Gatsby', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Strapi CMS'],
    images: ['/projects/Yummygum/1.webp', '/projects/Yummygum/2.webp', '/projects/Yummygum/3.webp'],
    features: ['Agency portfolio', 'Case study presentations', 'Client testimonials', 'Advanced animations', 'CMS integration'],
    year: 2024,
    role: 'Frontend Developer',
    duration: '6 months',
    impact: 'Increased client inquiries by 60% and showcase engagement'
  },
  {
    id: 'abc-ar-space-discovery',
    title: 'ABC AR – Space Discovery',
    category: 'mobile',
    description: 'Augmented reality mobile app for ABC\'s Stargazing Live program featuring interactive space exploration, Jupiter discovery, and ISS assembly missions.',
    technologies: ['React Native', 'ARKit', 'ARCore', '3D Modeling', 'Unity', 'iOS', 'Android'],
    images: ['/projects/ABC_AR/1.jpeg', '/projects/ABC_AR/2.jpeg', '/projects/ABC_AR/3.jpg'],
    features: ['AR space exploration', 'Interactive minigames', 'Jupiter exploration', 'ISS assembly simulation', 'Space debris defense', 'Educational content'],
    year: 2024,
    role: 'Senior Mobile AR Developer',
    duration: '9 months',
    impact: 'Featured in US App Store and reached 500K+ downloads'
  },
  {
    id: 'jigspace',
    title: 'JigSpace',
    category: 'mobile',
    description: 'Spatial presentation platform enabling users to create and share interactive 3D presentations in augmented reality for enhanced communication.',
    technologies: ['React Native', 'ARKit', 'ARCore', '3D Graphics', 'WebGL', 'Cloud Storage', 'Real-time Sync'],
    images: ['/projects/JigSpace/1.png', '/projects/JigSpace/2.jpg', '/projects/JigSpace/3.png'],
    features: ['3D presentation creation', 'AR visualization', 'Interactive presentations', 'Non-technical user interface', 'Cloud synchronization', 'Multi-platform support'],
    year: 2024,
    role: 'Mobile AR Developer',
    duration: '11 months',
    impact: 'Revolutionized 3D presentations for 100K+ business users'
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 6); // Return first 6 projects as featured
};
