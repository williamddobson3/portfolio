import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    const translations: Record<string, Record<Language, string>> = {
      // HomePage
      'home.title': {
        en: 'Keishin Mie',
        ja: '三重 慧心'
      },
      'home.subtitle.ai': {
        en: 'AI Engineer',
        ja: 'AIエンジニア'
      },
      'home.subtitle.web': {
        en: 'Web Developer',
        ja: 'ウェブ開発者'
      },
      'home.subtitle.android': {
        en: 'Android Developer',
        ja: 'Android開発者'
      },
      'home.tagline': {
        en: 'Building future-ready experiences with AI and Immersive Web',
        ja: 'AIと没入型ウェブで未来に対応した体験を構築'
      },
      'home.tagline.ai': {
        en: 'AI',
        ja: 'AI'
      },
      'home.tagline.immersive': {
        en: 'Immersive Web',
        ja: '没入型ウェブ'
      },
      'home.cta.explore': {
        en: 'Explore My Work',
        ja: '作品を探索'
      },
      'home.cta.about': {
        en: 'About Me',
        ja: '私について'
      },

      // Navigation
      'nav.home': {
        en: 'Home',
        ja: 'ホーム'
      },
      'nav.about': {
        en: 'About',
        ja: 'について'
      },
      'nav.projects': {
        en: 'Projects',
        ja: 'プロジェクト'
      },
      'nav.skills': {
        en: 'Skills',
        ja: 'スキル'
      },
      'nav.contact': {
        en: 'Contact',
        ja: 'お問い合わせ'
      },

      // ProjectsPage
      'projects.title': {
        en: 'Project Galaxy',
        ja: 'プロジェクトギャラクシー'
      },
      'projects.subtitle': {
        en: 'Explore my portfolio of 30+ projects across social platforms, AR/VR experiences, AI tools, consumer apps, media platforms, and business solutions',
        ja: 'ソーシャルプラットフォーム、AR/VR体験、AIツール、コンシューマーアプリ、メディアプラットフォーム、ビジネスソリューションにわたる30以上のプロジェクトのポートフォリオを探索'
      },
      'projects.category.all': {
        en: 'All Projects',
        ja: 'すべてのプロジェクト'
      },
      'projects.category.social': {
        en: 'Social & Community Platforms',
        ja: 'ソーシャル・コミュニティプラットフォーム'
      },
      'projects.category.arvr': {
        en: 'AR / VR / 3D Experiences',
        ja: 'AR / VR / 3D体験'
      },
      'projects.category.ai': {
        en: 'AI / ML / Creative Tools',
        ja: 'AI / ML / クリエイティブツール'
      },
      'projects.category.consumer': {
        en: 'Consumer & Lifestyle Apps',
        ja: 'コンシューマー・ライフスタイルアプリ'
      },
      'projects.category.media': {
        en: 'Media, Entertainment & Content',
        ja: 'メディア、エンターテイメント・コンテンツ'
      },
      'projects.category.business': {
        en: 'Business & Productivity Tools',
        ja: 'ビジネス・生産性ツール'
      },
      'projects.showing': {
        en: 'Showing',
        ja: '表示中'
      },
      'projects.modal.role': {
        en: 'My Role',
        ja: '私の役割'
      },
      'projects.modal.year': {
        en: 'Year',
        ja: '年'
      },
      'projects.modal.technologies': {
        en: 'Technologies Used',
        ja: '使用技術'
      },
      'projects.modal.impact': {
        en: 'Impact & Metrics',
        ja: 'インパクト・指標'
      },
      'projects.modal.live': {
        en: 'Live Demo',
        ja: 'ライブデモ'
      },
      'projects.modal.code': {
        en: 'View Code',
        ja: 'コードを見る'
      },
      'projects.modal.detail': {
        en: 'Detail explanation',
        ja: '詳細説明'
      },

      // ContactPage
      'contact.title': {
        en: 'Get In Touch',
        ja: 'お問い合わせ'
      },
      'contact.subtitle': {
        en: 'Ready to bring your next project to life? Let\'s discuss how we can create something amazing together.',
        ja: '次のプロジェクトを実現する準備はできていますか？一緒に素晴らしいものを作る方法について話し合いましょう。'
      },
      'contact.available': {
        en: 'Currently Available',
        ja: '現在利用可能'
      },
      'contact.response': {
        en: 'Accepting new projects • Response within 24 hours • Tokyo timezone (JST)',
        ja: '新しいプロジェクトを受け入れ中 • 24時間以内に回答 • 東京時間（JST）'
      },
      'contact.form.title': {
        en: 'Start a Conversation',
        ja: '会話を始める'
      },
      'contact.form.name': {
        en: 'Your Name',
        ja: 'お名前'
      },
      'contact.form.email': {
        en: 'Email Address',
        ja: 'メールアドレス'
      },
      'contact.form.project': {
        en: 'Project Type',
        ja: 'プロジェクトタイプ'
      },
      'contact.form.details': {
        en: 'Project Details',
        ja: 'プロジェクト詳細'
      },
      'contact.form.send': {
        en: 'Send Message',
        ja: 'メッセージを送信'
      },
      'contact.form.sending': {
        en: 'Sending...',
        ja: '送信中...'
      },
      'contact.form.sent': {
        en: 'Message Sent!',
        ja: 'メッセージが送信されました！'
      },
      'contact.form.response': {
        en: 'Response Time',
        ja: '回答時間'
      },
      'contact.form.response.desc': {
        en: 'I typically respond within 24 hours with project insights and next steps.',
        ja: '通常24時間以内にプロジェクトの洞察と次のステップで回答いたします。'
      },
      'contact.commitment.title': {
        en: 'My Commitment',
        ja: '私のコミットメント'
      },
      'contact.commitment.content': {
        en: 'I believe in building lasting relationships through integrity, trust, and exceptional delivery. Every project receives my full attention and commitment to excellence.',
        ja: '誠実さ、信頼、卓越した提供を通じて永続的な関係を築くことを信じています。すべてのプロジェクトに全力で取り組み、卓越性へのコミットメントを提供します。'
      },
      'contact.commitment.communication': {
        en: 'Honest communication throughout the project',
        ja: 'プロジェクト全体を通じた誠実なコミュニケーション'
      },
      'contact.commitment.delivery': {
        en: 'Reliable delivery on time and budget',
        ja: '時間と予算内での信頼できる提供'
      },
      'contact.commitment.support': {
        en: 'Ongoing support and maintenance',
        ja: '継続的なサポートとメンテナンス'
      },
      'contact.connect': {
        en: 'Connect With Me',
        ja: '私とつながる'
      },
      'contact.availability': {
        en: 'Current Availability',
        ja: '現在の利用可能性'
      },
      'contact.availability.new': {
        en: 'New Projects',
        ja: '新しいプロジェクト'
      },
      'contact.availability.timezone': {
        en: 'Timezone',
        ja: 'タイムゾーン'
      },
      'contact.social.email': {
        en: 'Direct email contact',
        ja: '直接メール連絡'
      },
      'contact.social.github': {
        en: 'Code repositories',
        ja: 'コードリポジトリ'
      },
      'contact.social.telegram': {
        en: 'Quick messaging',
        ja: 'クイックメッセージ'
      },
      'contact.social.discord': {
        en: 'Gaming & chat',
        ja: 'ゲーム・チャット'
      },

      // Project Types
      'project.type.ai': {
        en: 'AI/ML Development',
        ja: 'AI/ML開発'
      },
      'project.type.web': {
        en: 'Web Application',
        ja: 'ウェブアプリケーション'
      },
      'project.type.android': {
        en: 'Android Application',
        ja: 'Androidアプリケーション'
      },
      'project.type.fullstack': {
        en: 'Full Stack Project',
        ja: 'フルスタックプロジェクト'
      },
      'project.type.leadership': {
        en: 'Team Leadership',
        ja: 'チームリーダーシップ'
      },
      'project.type.consulting': {
        en: 'Consulting',
        ja: 'コンサルティング'
      },
      'project.type.other': {
        en: 'Other',
        ja: 'その他'
      },

      // Project Descriptions
      'project.ameba.description': {
        en: 'Japan’s leading blogging SNS: AMP Stories, rich editor, modular UI, SEO & performance tuning; analytics and CDN integration.',
        ja: '日本最大級のブログSNS。AMPストーリー、リッチエディタ、モジュールUI、SEO/パフォーマンス最適化、分析とCDN統合を担当。'
      },
      'project.buzzfeed.description': {
        en: 'BuzzFeed Japan localization and modular content system. Responsive, performance-optimized UI, CMS workflow, analytics, and ad integrations.',
        ja: 'BuzzFeed Japanのローカライズとモジュール型コンテンツ。レスポンシブ最適化、CMSワークフロー、分析、広告連携を実装。'
      },
      'project.itmedia.description': {
        en: 'Modernized ITmedia with Laravel + React, Elasticsearch, Redis caching, Docker/Kubernetes on AWS; improved LCP and editorial throughput.',
        ja: 'Laravel+React、Elasticsearch、Redisキャッシュ、Docker/Kubernetes(AWS)で刷新。LCP・運用効率を改善。'
      },
      'project.manga.description': {
        en: 'High-concurrency manga platform with CDN, caching, auto-scaling; daily free-reads logic, native apps with offline-friendly reader.',
        ja: 'CDN・キャッシュ・オートスケール対応の高負荷マンガ基盤。毎日の無料閲覧、オフライン対応のネイティブ閲覧機能。'
      },
      'project.nicovideo.description': {
        en: 'Video community features with performant JS/React UI, caching/CDN strategies, and interactive modules.',
        ja: '動画コミュニティ機能。高性能なJS/React UI、キャッシュ/CDN戦略、インタラクティブモジュールを実装。'
      },
      'project.pixiv.description': {
        en: 'Scaled social/creator features: feeds, ranking, uploads, moderation tools; Google Cloud, caching, and anti-fraud integrations.',
        ja: 'フィード・ランキング・投稿・管理ツール等をスケール。Google Cloud、キャッシュ、詐欺対策を統合。'
      },
      'project.cookpad.description': {
        en: 'Recipe platform improvements across UX, performance, and scalability. Built React UI, Rails APIs, and caching with Redis; optimized mobile and SSR for high traffic.',
        ja: 'レシピプラットフォームのUX・性能・拡張性を改善。React UI、Rails API、Redisキャッシュを構築し、高トラフィック向けにモバイルとSSRを最適化。'
      },
      'project.jalan.description': {
        en: 'Travel booking platform with search, filters, profiles, and secure payments. React + Node/Express + PostgreSQL with Stripe; AWS deployment and CI/CD.',
        ja: '検索・絞り込み・プロフィール・安全な決済を備えた旅行予約プラットフォーム。React + Node/Express + PostgreSQL + Stripe。AWSにデプロイしCI/CDを構築。'
      },
      'project.muji.description': {
        en: 'E‑commerce storefront for MUJI Japan. Implemented responsive UI, product filters, and checkout; integrated backend systems and CDN with SCSS optimization.',
        ja: '無印良品のECストア。レスポンシブUI、商品フィルタ、チェックアウトを実装し、バックエンドとCDNを統合。SCSSで最適化。'
      },
      'project.tripadvisor.description': {
        en: 'Localized TripAdvisor Japan experience. Interactive maps, real‑time filters, personalization; Node/Express backend, PostgreSQL/Redis, Docker and AWS.',
        ja: '日本向けにローカライズ。インタラクティブな地図、リアルタイム絞り込み、パーソナライズ。Node/Express、PostgreSQL/Redis、DockerとAWSを使用。'
      },
      'project.zenn-dev.description': {
        en: 'Developer publishing platform using Next.js + TypeScript with Rails API. SSR/SSG, Tailwind UI, CI/CD on AWS; caching and search tuned for growth.',
        ja: 'Next.js + TypeScriptとRails APIを用いた開発者向けプラットフォーム。SSR/SSG、Tailwind UI、AWSでのCI/CD。キャッシュと検索を最適化。'
      },
      'project.zoff.description': {
        en: 'Eyewear e‑commerce with customizable filters, real‑time inventory, and 3D product views. React front‑end with Node/Express backend and Stripe payments.',
        ja: 'カスタマイズ可能なフィルタ、在庫のリアルタイム反映、3D商品ビューを備えたメガネEC。ReactフロントとNode/Expressバックエンド、Stripe決済。'
      },
      'project.lifesciencedb.description': {
        en: 'Interactive 3D human anatomy explorer (BodyParts3D/Anatomography). Built WebGL/Three.js UI to select parts, adjust visualization, and embed/export models; integrated anatomical datasets (FMA).',
        ja: '対話型3D人体解剖プラットフォーム（BodyParts3D/Anatomography）。WebGL/Three.jsで部位選択や可視化調整、埋め込み/エクスポートUIを実装し、FMAなどの解剖データセットを統合。'
      },
      'project.teamlab.description': {
        en: 'Immersive digital art experiences with interactive 3D/real‑time visuals. Contributed to performant WebGL scenes, SSR UI, and real‑time interactions for exhibitions and virtual tours.',
        ja: '没入型デジタルアート体験。パフォーマンスに優れたWebGLシーン、SSR UI、リアルタイムインタラクションを実装し、展示やバーチャルツアーを支援。'
      },
      'project.ampersand.description': {
        en: 'Full‑stack build using React, Node/Express, and MongoDB. Delivered responsive UI, CI/CD-ready build, testing, and scalable architecture with Docker and AWS.',
        ja: 'React、Node/Express、MongoDBによるフルスタック開発。レスポンシブUI、CI/CD対応ビルド、テスト、DockerとAWSでスケーラブルな構成を提供。'
      },
      'project.botanistofficial.description': {
        en: 'Led front‑end for the official site: CMS templating, performance/image strategy (srcset, lazy‑load), accessibility, SEO, and release workflow for campaigns.',
        ja: '公式サイトのフロントエンドをリード。CMSテンプレート、画像最適化（srcset・遅延読み込み）、アクセシビリティ、SEO、キャンペーンのリリースフローを構築。'
      },
      'project.abc_ar.description': {
        en: 'ABC_AR — an educational AR experience about space. Features: Explore Jupiter (3D models placed in the real world), Assemble the ISS with interactive parts, and a gamified Space Debris defense mode. Built with Unity, ARKit/ARCore and native mobile components; released for iOS and Android around 2018.',
        ja: 'ABC_AR — 宇宙をテーマにした教育的なAR体験。機能: 木星の3Dモデルを現実空間に配置して観察、ISSをパーツごとに組み立てるインタラクティブモード、宇宙ゴミを防ぐゲーム型モード。Unity、ARKit/ARCore、ネイティブモバイルで開発され、2018年頃にiOS/Android向けにリリース。'
      },
      'project.are-na.description': {
        en: 'Collaborative visual research and organization platform for collecting and organizing ideas, images, and knowledge networks.',
        ja: 'アイデア、画像、知識ネットワークを収集・整理するための協調的視覚研究・組織化プラットフォーム。'
      },
      'project.asmallworld.description': {
        en: 'Exclusive social networking platform for affluent and influential individuals worldwide.',
        ja: '世界中の富裕層や影響力のある個人向けの排他的ソーシャルネットワーキングプラットフォーム。'
      },
      'project.bereal.description': {
        en: 'Authentic social media app encouraging users to share unfiltered moments with friends.',
        ja: 'ユーザーが友人とフィルターなしの瞬間を共有することを奨励する本物のソーシャルメディアアプリ。'
      },
      'project.openai.description': {
        en: 'Artificial intelligence research organization developing safe and beneficial AI systems including ChatGPT and DALL-E.',
        ja: 'ChatGPTやDALL-Eを含む安全で有益なAIシステムを開発する人工知能研究組織。'
      },
      'project.midjourney.description': {
        en: 'AI-powered image generation platform with 3D visualization and VR integration capabilities.',
        ja: '3D可視化とVR統合機能を備えたAI駆動の画像生成プラットフォーム。'
      },
      'project.bemyeyes.description': {
        en: 'Accessibility app connecting blind and visually impaired users with volunteers worldwide for real-time visual support.',
        ja: '視覚障害者と世界中のボランティアをリアルタイムの視覚サポートでつなぐアクセシビリティアプリ。'
      },
      'project.letterboxd.description': {
        en: 'Social network for film lovers to discover, rate, and review movies.',
        ja: '映画愛好家が映画を発見、評価、レビューするためのソーシャルネットワーク。'
      },
      'project.untappd.description': {
        en: 'Social discovery platform for beer enthusiasts with rating and review system.',
        ja: 'ビール愛好家向けの評価・レビューシステムを備えたソーシャル発見プラットフォーム。'
      },
      'project.myanimelist.description': {
        en: 'Comprehensive anime and manga database with social features for tracking and discovering content.',
        ja: 'コンテンツの追跡と発見のためのソーシャル機能を備えた包括的なアニメ・マンガデータベース。'
      },
      'project.doximity.description': {
        en: 'Professional networking platform for healthcare professionals with secure messaging and collaboration tools.',
        ja: '安全なメッセージングとコラボレーションツールを備えた医療専門家向けプロフェッショナルネットワーキングプラットフォーム。'
      },
      'project.gptstudio.description': {
        en: 'An internal studio for building and fine‑tuning GPT‑powered assistants with orchestration tools and plugin support.',
        ja: 'GPTを活用したアシスタントを構築・ファインチューニングするためのスタジオ。オーケストレーションツールとプラグインサポートを備える。'
      },
      'project.codexpro.description': {
        en: 'AI-assisted developer tooling providing code completion, refactoring suggestions, and CI integrations.',
        ja: 'コード補完やリファクタリング提案、CI連携を備えたAI支援の開発者ツール。'
      },
      'project.voiceai.description': {
        en: 'Speech recognition and synthesis platform with low-latency streaming and multilingual support.',
        ja: '低遅延ストリーミングと多言語対応を備えた音声認識・合成プラットフォーム。'
      },
      'project.synthpix.description': {
        en: 'Generative image platform creating high-fidelity synthesized imagery for AR/3D experiences.',
        ja: 'AR/3D体験向けに高品質な合成画像を生成するジェネレーティブイメージプラットフォーム。'
      },
      'project.marvel.description': {
        en: 'Fan-facing content and interactive features for Marvel.com — high-performance frontend, responsive layouts, and CMS integration.',
        ja: 'Marvel.com向けのファン向けコンテンツとインタラクティブ機能。高性能フロントエンド、レスポンシブレイアウト、CMS連携を担当。'
      },
      'project.soundraw.description': {
        en: 'Server-backed music generation platform: audio processing pipelines, real-time previews, and a responsive web studio.',
        ja: '音楽生成プラットフォーム。オーディオ処理パイプライン、リアルタイムプレビュー、レスポンシブなウェブスタジオを実装。'
      },
      'project.yummygum.description': {
        en: 'Creative agency website and design system work focusing on accessible UI, motion, and performance.',
        ja: 'クリエイティブエージェンシーのウェブサイトとデザインシステム。アクセシブルなUI、モーション、パフォーマンスに注力。'
      },
      'project.venturebeat.description': {
        en: 'News and analysis platform optimised for speed and ads: SEO, article caching, and a modular front-end.',
        ja: 'ニュース・分析プラットフォームの高速化と広告最適化。SEO、記事キャッシュ、モジュール式フロントエンドを実装。'
      },
      'project.polywork.description': {
        en: 'Collaboration and professional network UI: activity feeds, tagging, and cross-platform notifications.',
        ja: 'コラボレーションとプロフェッショナルネットワークのUI。アクティビティフィード、タグ付け、クロスプラットフォーム通知を実装。'
      },
      'project.ravelry.description': {
        en: 'Community-driven marketplace and pattern database — user profiles, search ranking, and storefront integration.',
        ja: 'コミュニティ主導のマーケットプレイス兼パターンデータベース。ユーザープロフィール、検索ランキング、ストアフロント統合。'
      },
      'project.rallypoint.description': {
        en: 'Professional military network features focused on profiles, groups, and secure messaging.',
        ja: '兵士向けのプロフェッショナルネットワーク機能。プロフィール、グループ、セキュアメッセージングに注力。'
      },

      // SkillsPage
      'skills.title': {
        en: 'Skills Constellation',
        ja: 'スキルコンステレーション'
      },
      'skills.subtitle': {
        en: 'My expertise across AI, web development, mobile, and team leadership',
        ja: 'AI、ウェブ開発、モバイル、チームリーダーシップにわたる私の専門知識'
      },
      'skills.category.all': {
        en: 'All Skills',
        ja: 'すべてのスキル'
      },
      'skills.category.ai': {
        en: 'AI & Machine Learning',
        ja: 'AI・機械学習'
      },
      'skills.category.web': {
        en: 'Web Development',
        ja: 'ウェブ開発'
      },
      'skills.category.android': {
        en: 'Android Development',
        ja: 'Android開発'
      },
      'skills.category.management': {
        en: 'Backend & Cloud',
        ja: 'バックエンド・クラウド'
      },
      'skills.category.leadership': {
        en: 'Management',
        ja: 'マネジメント'
      },
      'skills.proficiency': {
        en: 'Proficiency',
        ja: '習熟度'
      },
      'skills.used_in': {
        en: 'Used in:',
        ja: '使用実績:'
      },
      'skills.years': {
        en: 'years',
        ja: '年'
      },
      'skills.stats.experience': {
        en: 'Years of Experience',
        ja: '経験年数'
      },
      'skills.stats.technologies': {
        en: 'Technologies Mastered',
        ja: '習得技術数'
      },
      'skills.stats.expert': {
        en: 'Expert Level Skills',
        ja: 'エキスパートレベルスキル'
      },
      'skills.stats.categories': {
        en: 'Active Categories',
        ja: 'アクティブカテゴリ'
      },

      // AboutPage
      'about.title': {
        en: 'My Journey',
        ja: '私の旅路'
      },
      'about.subtitle': {
        en: 'With 8+ years of experience spanning corporate engineering at Rakuten and international freelancing, now leading distributed teams to deliver AI, web, and mobile solutions worldwide.',
        ja: '楽天での企業エンジニアリングと国際フリーランスにわたる8年以上の経験を持ち、現在は分散チームを率いてAI、ウェブ、モバイルソリューションを世界中に提供しています。'
      },
      'about.currently_available': {
        en: 'Currently Available',
        ja: '現在利用可能'
      },
      'about.currently_desc': {
        en: 'Leading engineering teams while taking on unique and challenging projects',
        ja: 'ユニークで挑戦的なプロジェクトに取り組みながらエンジニアリングチームを率いています'
      },
      'about.open_collaborations': {
        en: 'Open for new collaborations',
        ja: '新しいコラボレーションを受け入れ中'
      },
      'about.download_resume': {
        en: 'Download Resume',
        ja: '履歴書をダウンロード'
      },
      'about.career_timeline': {
        en: 'Career Timeline',
        ja: 'キャリアタイムライン'
      },
      'about.key_highlights': {
        en: 'Key Highlights:',
        ja: '主なハイライト:'
      },
      'about.core_values': {
        en: 'Core Values & Approach',
        ja: 'コアバリュー・アプローチ'
      },
      'about.future_vision': {
        en: 'Future Vision',
        ja: '将来のビジョン'
      },
      'about.future_vision_text': {
        en: 'Continue creating unique and special projects that push the boundaries of technology, while maintaining the trust and integrity that has been the foundation of my career. My goal is to deliver exceptional value to clients worldwide through innovative AI and mobile solutions.',
        ja: '私のキャリアの基盤となってきた信頼と誠実さを維持しながら、技術の境界を押し広げるユニークで特別なプロジェクトの創造を続けます。革新的なAIとモバイルソリューションを通じて、世界中のクライアントに卓越した価値を提供することが私の目標です。'
      },
      'about.stats.experience': {
        en: 'Years of Experience',
        ja: '経験年数'
      },
      'about.stats.projects': {
        en: 'Projects Completed',
        ja: '完了プロジェクト数'
      },
      'about.stats.team': {
        en: 'Team Members Led',
        ja: '率いたチームメンバー数'
      },
      'about.stats.countries': {
        en: 'Countries Worked',
        ja: '活動国数'
      },
      'about.values.integrity': {
        en: 'Integrity & Trust',
        ja: '誠実さ・信頼'
      },
      'about.values.integrity_desc': {
        en: 'Building lasting relationships through honest communication and reliable delivery.',
        ja: '誠実なコミュニケーションと信頼できる提供を通じて永続的な関係を築く。'
      },
      'about.values.innovation': {
        en: 'Innovation Focus',
        ja: 'イノベーション重視'
      },
      'about.values.innovation_desc': {
        en: 'Always pushing boundaries with cutting-edge AI and mobile technologies.',
        ja: '最先端のAIとモバイル技術で常に境界を押し広げる。'
      },
      'about.values.leadership': {
        en: 'Team Leadership',
        ja: 'チームリーダーシップ'
      },
      'about.values.leadership_desc': {
        en: 'Empowering teams to achieve their best through mentorship and collaboration.',
        ja: 'メンターシップとコラボレーションを通じてチームが最高の成果を達成できるよう支援する。'
      },
      'about.values.global': {
        en: 'Global Perspective',
        ja: 'グローバル視点'
      },
      'about.values.global_desc': {
        en: 'Experience across Japan and Malaysia brings unique multicultural insights.',
        ja: '日本とマレーシアでの経験がユニークな多文化インサイトをもたらす。'
      }
      ,
      // Services Page
      'nav.services': {
        en: 'Services',
        ja: '提供サービス'
      },
      'nav.testimonials': {
        en: 'Testimonials',
        ja: 'お客様の声'
      },
      // Testimonials Page
      'testimonials.title': {
        en: 'Client Testimonials — Real results from real projects',
        ja: 'クライアントの声 — 実務での効果と評価'
      },
      'testimonials.intro': {
        en: 'Selected excerpts from client feedback highlighting impact, timelines, and measurable outcomes.',
        ja: '実務での効果や評価を抜粋して掲載しています。期間や定量的な成果を中心にご覧ください。'
      },
      'testimonials.controls.play': {
        en: 'Play rotation',
        ja: '自動再生'
      },
      'testimonials.controls.pause': {
        en: 'Pause rotation',
        ja: '停止'
      },
      'testimonials.filter.all': {
        en: 'All industries',
        ja: 'すべての業種'
      },
      'testimonials.filter.industry': {
        en: 'Industry',
        ja: '業種'
      },
      'testimonials.case.view': {
        en: 'View case study',
        ja: '事例を見る'
      },
      'testimonials.longform.title': {
        en: 'In-depth case studies',
        ja: 'ロングフォーム事例'
      },
      'services.title': {
        en: 'Services — What I can help with',
        ja: '提供サービス — お手伝いできること'
      },
      'services.subtitle': {
        en: 'Professional web, Android and AI development: thoughtful engineering with measurable impact.',
        ja: 'ウェブ・Android・AI の専門的な開発。思慮深い設計と定量的インパクトを重視します。'
      },
      'services.cta.contact': {
        en: 'Book a free 15‑minute consult',
        ja: '無料相談を申し込む（15分）'
      },
      'services.cta.case': {
        en: 'See case studies',
        ja: '事例を見る'
      },
      'services.list_title': {
        en: 'Core Services',
        ja: '主なサービス'
      },
      'services.card.detail': {
        en: 'Details',
        ja: '詳細を見る'
      },
      'services.card.quote': {
        en: 'Request Quote',
        ja: '見積を依頼'
      },
      'services.web.title': {
        en: 'Full‑stack Web Development',
        ja: 'フルスタック Web 開発'
      },
      'services.web.subtitle': {
        en: 'Modern, performant frontends and robust backend systems',
        ja: 'モダンで高性能なフロントエンドと堅牢なバックエンド'
      },
      'services.web.kpi': {
        en: 'Improved LCP / engagement up to 2x',
        ja: 'LCP 改善・エンゲージメント最大2倍'
      },
      'services.web.duration': {
        en: 'Typical: 4–12 weeks',
        ja: '目安: 4〜12 週間'
      },
      'services.android.title': {
        en: 'Android Native Apps',
        ja: 'Android ネイティブアプリ'
      },
      'services.android.subtitle': {
        en: 'Jetpack Compose, modern architecture, performant UX',
        ja: 'Jetpack Compose、最新のアーキテクチャ、パフォーマントな UX'
      },
      'services.android.kpi': {
        en: 'Fast feature delivery; stable releases',
        ja: '迅速な機能提供・安定したリリース'
      },
      'services.android.duration': {
        en: 'Typical: 6–16 weeks',
        ja: '目安: 6〜16 週間'
      },
      'services.ai.title': {
        en: 'AI Model Development & Ops',
        ja: 'AI モデル開発・運用'
      },
      'services.ai.subtitle': {
        en: 'Data→Model→Deployment: pragmatic, production‑focused ML',
        ja: 'データ→モデル→デプロイまで。実運用を見据えた実践的な ML'
      },
      'services.ai.kpi': {
        en: 'Prototype → production in months',
        ja: 'プロトタイプから本番まで数ヶ月'
      },
      'services.ai.duration': {
        en: 'Typical: 8–20 weeks',
        ja: '目安: 8〜20 週間'
      },
      'services.workflow_title': {
        en: 'How I work',
        ja: '進め方'
      },
      'services.workflow.consult.title': {
        en: 'Consult',
        ja: '相談'
      },
      'services.workflow.consult.desc': {
        en: 'We clarify goals, constraints, and success metrics.',
        ja: '目的・制約・成功指標を明確にします。'
      },
      'services.workflow.design.title': {
        en: 'Design',
        ja: '設計'
      },
      'services.workflow.design.desc': {
        en: 'Architect the solution with performance and accessibility in mind.',
        ja: 'パフォーマンスとアクセシビリティを重視して設計します。'
      },
      'services.workflow.build.title': {
        en: 'Implement',
        ja: '実装'
      },
      'services.workflow.build.desc': {
        en: 'Ship reliable, tested features with CI and monitoring.',
        ja: 'CI と監視を備えた信頼性の高い機能を提供します。'
      },
      'services.workflow.operate.title': {
        en: 'Operate',
        ja: '運用'
      },
      'services.workflow.operate.desc': {
        en: 'Ongoing support, maintenance, and optimization.',
        ja: '継続的なサポート・保守・最適化を行います。'
      },
      'services.faq_title': {
        en: 'FAQ — practical details',
        ja: 'よくある質問'
      },
      'services.faq.q1.title': {
        en: 'How long does a typical project take?',
        ja: '一般的な納期はどれくらいですか？'
      },
      'services.faq.q1.answer': {
        en: 'Timeline depends on scope; small features in weeks, larger projects in months. I provide estimates after the initial consultation.',
        ja: 'スコープによります。小さな機能は数週間、大きなプロジェクトは数ヶ月です。最初の相談後に見積りを提示します。'
      },
      'services.faq.q2.title': {
        en: 'Do you provide maintenance?',
        ja: '保守は提供しますか？'
      },
      'services.faq.q2.answer': {
        en: 'Yes — I offer retainer-based maintenance and SLA options.',
        ja: 'はい。リテイナー型の保守や SLA オプションを提供しています。'
      },
      'services.faq.q3.title': {
        en: 'How do you handle accessibility and performance?',
        ja: 'アクセシビリティとパフォーマンスはどう対処しますか？'
      },
      'services.faq.q3.answer': {
        en: 'They are treated as design constraints from the start: audits, tests, and measurable goals.',
        ja: '最初から設計制約として扱います。監査・テスト・定量的目標を設定します。'
      },
      'services.cta.big_title': {
        en: 'Start your project with a short chat',
        ja: '短い相談から始めましょう'
      },
      'services.cta.big_desc': {
        en: 'I’ll help assess fit, scope, and next steps — with clear deliverables and timeline.',
        ja: '適合性、スコープ、次のステップを評価し、明確な成果物とスケジュールを提示します。'
      }
    };

    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    
    return key; // Return key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};