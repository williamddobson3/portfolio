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
      'nav.chat': {
        en: 'Chat',
        ja: 'チャット'
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
      'testimonials.controls.auto_rotating': {
        en: 'Auto-rotating',
        ja: '自動回転中'
      },
      'testimonials.controls.paused': {
        en: 'Paused',
        ja: '一時停止中'
      },
      'testimonials.filter.all': {
        en: 'All industries',
        ja: 'すべての業種'
      },
      'testimonials.filter.industry': {
        en: 'Industry',
        ja: '業種'
      },
      'testimonials.filter.saas': {
        en: 'SaaS',
        ja: 'SaaS'
      },
      'testimonials.filter.media': {
        en: 'Media',
        ja: 'メディア'
      },
      'testimonials.filter.consumer': {
        en: 'Consumer',
        ja: 'コンシューマー'
      },
      'testimonials.filter.entertainment': {
        en: 'Entertainment',
        ja: 'エンターテインメント'
      },
      'testimonials.filter.healthcare': {
        en: 'Healthcare',
        ja: 'ヘルスケア'
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
      'services.hero.alt': {
        en: 'Professional workspace with laptop, smartphones, and AI network',
        ja: 'ラップトップ、スマートフォン、AIネットワークを備えたプロフェッショナルなワークスペース'
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
      'services.web.description': {
        en: 'I provide complete web development solutions — from intuitive front-end interfaces to secure and scalable back-end systems. With a focus on modern technologies and clean architecture, I help clients build fast, reliable, and maintainable web applications that drive real results.',
        ja: '直感的なフロントエンドインターフェースから安全でスケーラブルなバックエンドシステムまで、完全なWeb開発ソリューションを提供します。モダンな技術とクリーンなアーキテクチャに焦点を当て、クライアントが実際の結果をもたらす高速で信頼性の高い保守可能なWebアプリケーションを構築するのを支援します。'
      },
      'services.web.features.1': {
        en: 'Responsive, mobile-first front-end development',
        ja: 'レスポンシブ、モバイルファーストのフロントエンド開発'
      },
      'services.web.features.2': {
        en: 'RESTful / GraphQL API integration',
        ja: 'RESTful / GraphQL API統合'
      },
      'services.web.features.3': {
        en: 'Secure authentication and user management',
        ja: '安全な認証とユーザー管理'
      },
      'services.web.features.4': {
        en: 'Performance optimization (LCP, Core Web Vitals)',
        ja: 'パフォーマンス最適化（LCP、Core Web Vitals）'
      },
      'services.web.features.5': {
        en: 'Deployment & maintenance on AWS, GCP, or Vercel',
        ja: 'AWS、GCP、Vercelでのデプロイメントとメンテナンス'
      },
      'services.web.features.6': {
        en: 'Continuous support after delivery',
        ja: '納品後の継続的なサポート'
      },
      'services.web.goal': {
        en: 'Modern, fast, and reliable web applications that deliver measurable outcomes',
        ja: '測定可能な結果をもたらすモダンで高速で信頼性の高いWebアプリケーション'
      },
      'services.android.description': {
        en: 'I build modern, high-performance Android applications using the latest native technologies and best practices. Every app is designed for speed, stability, and an excellent user experience, ensuring it performs beautifully across all Android devices.',
        ja: '最新のネイティブ技術とベストプラクティスを使用して、モダンで高性能なAndroidアプリケーションを構築します。すべてのアプリは速度、安定性、優れたユーザーエクスペリエンスのために設計され、すべてのAndroidデバイスで美しく動作することを保証します。'
      },
      'services.android.features.1': {
        en: 'UI/UX design implementation with Jetpack Compose',
        ja: 'Jetpack ComposeによるUI/UXデザイン実装'
      },
      'services.android.features.2': {
        en: 'MVVM / Clean Architecture for maintainable, testable code',
        ja: '保守可能でテスト可能なコードのためのMVVM / Clean Architecture'
      },
      'services.android.features.3': {
        en: 'Integration with RESTful APIs, Firebase, and third-party SDKs',
        ja: 'RESTful API、Firebase、サードパーティSDKとの統合'
      },
      'services.android.features.4': {
        en: 'Offline support with Room database or DataStore',
        ja: 'RoomデータベースまたはDataStoreによるオフラインサポート'
      },
      'services.android.features.5': {
        en: 'Push notifications, analytics, and background services',
        ja: 'プッシュ通知、分析、バックグラウンドサービス'
      },
      'services.android.features.6': {
        en: 'App performance optimization and Google Play deployment',
        ja: 'アプリパフォーマンス最適化とGoogle Playデプロイメント'
      },
      'services.android.goal': {
        en: 'Fast, stable, and user-focused Android apps that align with your business objectives',
        ja: 'ビジネス目標に合致した高速で安定したユーザー重視のAndroidアプリ'
      },
      'services.ai.description': {
        en: 'I design and deploy AI and machine learning solutions that transform data into real-world value. From data preparation to model development and production deployment, my focus is on building practical, reliable systems that deliver measurable business impact.',
        ja: 'データを実世界の価値に変換するAIと機械学習ソリューションを設計・デプロイします。データ準備からモデル開発、本番デプロイメントまで、測定可能なビジネスインパクトをもたらす実用的で信頼性の高いシステムの構築に焦点を当てています。'
      },
      'services.ai.features.1': {
        en: 'Data preprocessing, feature engineering, and model training',
        ja: 'データ前処理、特徴エンジニアリング、モデル訓練'
      },
      'services.ai.features.2': {
        en: 'Custom ML/DL model design (TensorFlow / PyTorch)',
        ja: 'カスタムML/DLモデル設計（TensorFlow / PyTorch）'
      },
      'services.ai.features.3': {
        en: 'Model evaluation, tuning, and performance optimization',
        ja: 'モデル評価、チューニング、パフォーマンス最適化'
      },
      'services.ai.features.4': {
        en: 'Automated pipelines with MLOps tools (MLflow, DVC, CI/CD)',
        ja: 'MLOpsツールによる自動化パイプライン（MLflow、DVC、CI/CD）'
      },
      'services.ai.features.5': {
        en: 'Deployment to cloud platforms (AWS SageMaker, GCP Vertex AI, Azure ML)',
        ja: 'クラウドプラットフォームへのデプロイメント（AWS SageMaker、GCP Vertex AI、Azure ML）'
      },
      'services.ai.features.6': {
        en: 'Integration with existing apps or APIs',
        ja: '既存のアプリやAPIとの統合'
      },
      'services.ai.goal': {
        en: 'Rapidly transform prototypes into production-ready AI systems that are scalable and efficient',
        ja: 'プロトタイプをスケーラブルで効率的な本番対応AIシステムに迅速に変換'
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
        en: 'I\'ll help assess fit, scope, and next steps — with clear deliverables and timeline.',
        ja: '適合性、スコープ、次のステップを評価し、明確な成果物とスケジュールを提示します。'
      },
      'services.representative_cases.title': {
        en: 'Representative Cases',
        ja: '代表事例'
      },
      'services.representative_cases.subtitle': {
        en: 'Proven projects and quantifiable results',
        ja: '実績のあるプロジェクトと定量的な結果'
      },
      'services.workflow.subtitle': {
        en: 'From consultation to operation, comprehensive support',
        ja: '相談から運用まで、包括的なサポート'
      },
      'services.faq.subtitle': {
        en: 'Regarding practical details',
        ja: '実務的な詳細について'
      },
      'services.cta.examples': {
        en: 'See examples',
        ja: '事例を見る'
      },
      'services.stats.experience': {
        en: 'years of experience',
        ja: '年の経験'
      },
      'services.stats.projects': {
        en: 'Completed Projects',
        ja: '完了プロジェクト'
      },
      'services.stats.satisfaction': {
        en: 'Customer Satisfaction',
        ja: '顧客満足度'
      },
      'services.stats.timeframe': {
        en: 'Within [timeframe]',
        ja: '[時間内]'
      },
      'services.stats.response': {
        en: 'Response Time',
        ja: 'レスポンス時間'
      },
      'services.case_studies.ameba.title': {
        en: 'Ameba - Japan\'s largest blog SNS',
        ja: 'Ameba - 日本最大のブログSNS'
      },
      'services.case_studies.ameba.description': {
        en: 'AMP Stories, Rich Editor, Module UI, SEO/Performance Optimization',
        ja: 'AMP Stories、リッチエディター、モジュールUI、SEO/パフォーマンス最適化'
      },
      'services.case_studies.ameba.kpi': {
        en: 'LCP 40% improvement',
        ja: 'LCP 40%改善'
      },
      'services.case_studies.ameba.duration': {
        en: '3 months',
        ja: '3ヶ月'
      },
      'services.case_studies.ameba.role': {
        en: 'Front-End Lead',
        ja: 'フロントエンドリード'
      },
      'services.case_studies.buzzfeed.title': {
        en: 'BuzzFeed Japan',
        ja: 'BuzzFeed Japan'
      },
      'services.case_studies.buzzfeed.description': {
        en: 'Localization and modular content. Responsive optimization, CMS workflow',
        ja: 'ローカライゼーションとモジュラーコンテンツ。レスポンシブ最適化、CMSワークフロー'
      },
      'services.case_studies.buzzfeed.kpi': {
        en: 'Double the engagement',
        ja: 'エンゲージメント2倍'
      },
      'services.case_studies.buzzfeed.duration': {
        en: '4 months',
        ja: '4ヶ月'
      },
      'services.case_studies.buzzfeed.role': {
        en: 'Full-stack development',
        ja: 'フルスタック開発'
      },
      'services.case_studies.itmedia.title': {
        en: 'ITmedia Modernization',
        ja: 'ITmedia モダナイゼーション'
      },
      'services.case_studies.itmedia.description': {
        en: 'Refreshed with Laravel+React, Elasticsearch, Redis Cache, Docker/Kubernetes (AWS)',
        ja: 'Laravel+React、Elasticsearch、Redis Cache、Docker/Kubernetes（AWS）で刷新'
      },
      'services.case_studies.itmedia.kpi': {
        en: 'LCP・Operational Efficiency Improvement',
        ja: 'LCP・運用効率改善'
      },
      'services.case_studies.itmedia.duration': {
        en: '3 months',
        ja: '3ヶ月'
      },
      'services.case_studies.itmedia.role': {
        en: 'Architect',
        ja: 'アーキテクト'
      },
      // Blog Page
      'nav.blog': {
        en: 'Blog',
        ja: 'ブログ'
      },
      // Testimonials Page - Detailed translations
      'testimonials.ameba.quote': {
        en: 'Working with Keishin on Ameba was transformative. The AMP Stories implementation increased our mobile story completion rates by 40%, and the modular frontend architecture he built reduced our development time for new features by 60%. His attention to performance optimization and user experience made our platform feel modern and responsive. The rich post editor with Graffiti drawing feature became one of our most popular tools. His technical expertise and collaborative approach made this project a huge success.',
        ja: 'AmebaでのKeishinとの仕事は革新的でした。AMP Storiesの実装により、モバイルストーリーの完了率が40%向上し、彼が構築したモジュラー型フロントエンドアーキテクチャにより、新機能の開発時間が60%短縮されました。パフォーマンス最適化とユーザーエクスペリエンスへの配慮により、プラットフォームは現代的でレスポンシブなものになりました。Graffiti描画機能付きのリッチポストエディターは最も人気のあるツールの一つになりました。彼の技術的専門知識と協力的なアプローチにより、このプロジェクトは大成功を収めました。'
      },
      'testimonials.ameba.name': {
        en: 'Yuki Nakamura',
        ja: '中村 由紀'
      },
      'testimonials.ameba.title': {
        en: 'Frontend Engineering Lead',
        ja: 'フロントエンドエンジニアリングリード'
      },
      'testimonials.ameba.company': {
        en: 'CyberAgent (Ameba)',
        ja: 'サイバーエージェント（Ameba）'
      },
      'testimonials.ameba.metrics': {
        en: 'Story completion +40%',
        ja: 'ストーリー完了率 +40%'
      },
      'testimonials.ameba.year': {
        en: '2023',
        ja: '2023年'
      },
      'testimonials.ameba.industry': {
        en: 'Social Media',
        ja: 'ソーシャルメディア'
      },
      'testimonials.itmedia.quote': {
        en: 'The ITmedia modernization project exceeded all expectations. Keishin transformed our legacy system into a modern, high-performance platform. LCP dropped from 3 seconds to 1.2 seconds, and our bounce rates decreased significantly. The Laravel + React architecture with Redis caching and Kubernetes deployment on AWS handles traffic spikes beautifully. The custom CMS he built made our editorial workflow 3x faster. His expertise in performance optimization and scalable architecture was exactly what we needed.',
        ja: 'ITmediaのモダナイゼーションプロジェクトはすべての期待を上回りました。Keishinは私たちのレガシーシステムを現代的で高性能なプラットフォームに変革しました。LCPは3秒から1.2秒に短縮され、直帰率も大幅に減少しました。RedisキャッシュとAWSでのKubernetesデプロイメントを備えたLaravel + Reactアーキテクチャは、トラフィックスパイクを美しく処理します。彼が構築したカスタムCMSにより、編集ワークフローが3倍高速化されました。パフォーマンス最適化とスケーラブルなアーキテクチャの専門知識は、まさに私たちが必要としていたものでした。'
      },
      'testimonials.itmedia.name': {
        en: 'Masahiro Tanaka',
        ja: '田中 正弘'
      },
      'testimonials.itmedia.title': {
        en: 'Technical Director',
        ja: 'テクニカルディレクター'
      },
      'testimonials.itmedia.company': {
        en: 'ITmedia',
        ja: 'ITmedia'
      },
      'testimonials.itmedia.metrics': {
        en: 'LCP -60%',
        ja: 'LCP -60%'
      },
      'testimonials.itmedia.year': {
        en: '2023',
        ja: '2023年'
      },
      'testimonials.itmedia.industry': {
        en: 'Media',
        ja: 'メディア'
      },
      'testimonials.buzzfeed.quote': {
        en: 'Keishin\'s work on BuzzFeed Japan was exceptional. The modular content system he designed gave our editors unprecedented flexibility in storytelling. Page load speeds improved dramatically, and the real-time analytics integration transformed how we approach content strategy. The responsive design works flawlessly across all devices, and the CDN optimization ensures fast delivery globally. His understanding of both technical requirements and editorial needs made this project a game-changer for our team.',
        ja: 'BuzzFeed JapanでのKeishinの仕事は卓越していました。彼が設計したモジュラー型コンテンツシステムにより、編集者はストーリーテリングにおいて前例のない柔軟性を得ました。ページ読み込み速度は劇的に改善され、リアルタイム分析統合によりコンテンツ戦略へのアプローチが変革されました。レスポンシブデザインはすべてのデバイスで完璧に動作し、CDN最適化によりグローバルな高速配信を実現しています。技術要件と編集ニーズの両方を理解する彼の能力により、このプロジェクトは私たちのチームにとってゲームチェンジャーとなりました。'
      },
      'testimonials.buzzfeed.name': {
        en: 'Sarah Johnson',
        ja: 'サラ・ジョンソン'
      },
      'testimonials.buzzfeed.title': {
        en: 'Head of Product',
        ja: 'プロダクトヘッド'
      },
      'testimonials.buzzfeed.company': {
        en: 'BuzzFeed Japan',
        ja: 'BuzzFeed Japan'
      },
      'testimonials.buzzfeed.metrics': {
        en: 'Page speed +2x',
        ja: 'ページ速度 +2倍'
      },
      'testimonials.buzzfeed.year': {
        en: '2022',
        ja: '2022年'
      },
      'testimonials.buzzfeed.industry': {
        en: 'Media',
        ja: 'メディア'
      },
      'testimonials.manga.quote': {
        en: 'Building MangaONE from scratch with Keishin was an incredible experience. He designed a robust system that handles thousands of concurrent users during peak releases without breaking a sweat. The free reads system works flawlessly, and the native mobile apps provide a seamless reading experience. The CMS he built streamlined our content management process. His expertise in high-concurrency systems and mobile optimization was crucial to our success.',
        ja: 'Keishinと一緒にMangaONEをゼロから構築した経験は素晴らしいものでした。彼が設計した堅牢なシステムは、ピークリリース時に数千の同時ユーザーを問題なく処理します。無料読みシステムは完璧に動作し、ネイティブモバイルアプリはシームレスな読書体験を提供します。彼が構築したCMSにより、コンテンツ管理プロセスが合理化されました。高並行システムとモバイル最適化の専門知識は、私たちの成功に不可欠でした。'
      },
      'testimonials.manga.name': {
        en: 'Kenji Watanabe',
        ja: '渡辺 健二'
      },
      'testimonials.manga.title': {
        en: 'CTO',
        ja: 'CTO'
      },
      'testimonials.manga.company': {
        en: 'MangaONE',
        ja: 'MangaONE'
      },
      'testimonials.manga.metrics': {
        en: 'Concurrent users +500%',
        ja: '同時ユーザー +500%'
      },
      'testimonials.manga.year': {
        en: '2023',
        ja: '2023年'
      },
      'testimonials.manga.industry': {
        en: 'Entertainment',
        ja: 'エンターテインメント'
      },
      'testimonials.cookpad.quote': {
        en: 'Keishin\'s contributions to Cookpad were invaluable. The React.js frontend he developed made our recipe discovery experience much more intuitive. The Ruby on Rails backend optimizations with PostgreSQL and Redis caching improved our search performance by 70%. The mobile responsiveness he implemented increased our mobile user engagement by 45%. His focus on user experience and performance optimization made our platform more enjoyable for millions of users.',
        ja: 'CookpadへのKeishinの貢献は非常に価値のあるものでした。彼が開発したReact.jsフロントエンドにより、レシピ発見体験がより直感的になりました。PostgreSQLとRedisキャッシュを活用したRuby on Railsバックエンドの最適化により、検索パフォーマンスが70%向上しました。彼が実装したモバイルレスポンシブネスにより、モバイルユーザーのエンゲージメントが45%増加しました。ユーザーエクスペリエンスとパフォーマンス最適化への焦点により、何百万人のユーザーにとってプラットフォームがより楽しいものになりました。'
      },
      'testimonials.cookpad.name': {
        en: 'Akiko Sato',
        ja: '佐藤 明子'
      },
      'testimonials.cookpad.title': {
        en: 'Engineering Manager',
        ja: 'エンジニアリングマネージャー'
      },
      'testimonials.cookpad.company': {
        en: 'Cookpad',
        ja: 'クックパッド'
      },
      'testimonials.cookpad.metrics': {
        en: 'Search performance +70%',
        ja: '検索パフォーマンス +70%'
      },
      'testimonials.cookpad.year': {
        en: '2022',
        ja: '2022年'
      },
      'testimonials.cookpad.industry': {
        en: 'Food & Lifestyle',
        ja: 'フード・ライフスタイル'
      },
      'testimonials.teamlab.quote': {
        en: 'Working with Keishin on our digital art platform was inspiring. His WebGL and Three.js expertise brought our interactive installations to life. The real-time responsiveness to user interactions created truly immersive experiences. The Next.js SSR implementation ensures fast loading even with complex 3D content. His passion for combining technology with art resulted in experiences that moved our visitors emotionally. The platform now supports thousands of concurrent users exploring our digital exhibitions.',
        ja: 'デジタルアートプラットフォームでKeishinと働くことは刺激的でした。彼のWebGLとThree.jsの専門知識により、インタラクティブなインスタレーションが命を吹き込まれました。ユーザーインタラクションへのリアルタイムレスポンスにより、真に没入感のある体験が生まれました。Next.js SSRの実装により、複雑な3Dコンテンツでも高速読み込みを実現しています。技術とアートを組み合わせる彼の情熱により、訪問者を感情的にも動かす体験が生まれました。プラットフォームは現在、デジタル展示を探索する数千の同時ユーザーをサポートしています。'
      },
      'testimonials.teamlab.name': {
        en: 'Dr. Toshiyuki Inoko',
        ja: '猪子 寿之 博士'
      },
      'testimonials.teamlab.title': {
        en: 'Founder & Director',
        ja: '創設者・ディレクター'
      },
      'testimonials.teamlab.company': {
        en: 'teamLab',
        ja: 'チームラボ'
      },
      'testimonials.teamlab.metrics': {
        en: 'User engagement +300%',
        ja: 'ユーザーエンゲージメント +300%'
      },
      'testimonials.teamlab.year': {
        en: '2023',
        ja: '2023年'
      },
      'testimonials.teamlab.industry': {
        en: 'Digital Art',
        ja: 'デジタルアート'
      },
      'testimonials.lifesciencedb.quote': {
        en: 'The BodyParts3D project with Keishin was groundbreaking. His WebGL expertise made complex 3D anatomical models accessible and interactive. The integration with FMA database ensures medical accuracy while maintaining smooth performance. The user interface he designed makes exploring human anatomy intuitive for both medical students and professionals. His attention to detail in 3D rendering and data visualization created a tool that\'s now used in medical education worldwide.',
        ja: 'KeishinとのBodyParts3Dプロジェクトは画期的でした。彼のWebGL専門知識により、複雑な3D解剖モデルがアクセス可能でインタラクティブになりました。FMAデータベースとの統合により、スムーズなパフォーマンスを維持しながら医学的精度を確保しています。彼が設計したユーザーインターフェースにより、医学部生と専門家の両方にとって人体解剖学の探索が直感的になりました。3Dレンダリングとデータ可視化における細部への注意により、現在世界中の医学教育で使用されているツールが生まれました。'
      },
      'testimonials.lifesciencedb.name': {
        en: 'Dr. Hiroshi Matsumoto',
        ja: '松本 博 博士'
      },
      'testimonials.lifesciencedb.title': {
        en: 'Professor of Anatomy',
        ja: '解剖学教授'
      },
      'testimonials.lifesciencedb.company': {
        en: 'Life Science Database',
        ja: 'ライフサイエンスデータベース'
      },
      'testimonials.lifesciencedb.metrics': {
        en: 'Medical education reach +200%',
        ja: '医学教育の到達範囲 +200%'
      },
      'testimonials.lifesciencedb.year': {
        en: '2022',
        ja: '2022年'
      },
      'testimonials.lifesciencedb.industry': {
        en: 'Healthcare',
        ja: 'ヘルスケア'
      },
      'testimonials.openai.quote': {
        en: 'Working with Keishin on OpenAI\'s platform was exceptional. His expertise in AI model integration and real-time processing helped us achieve 99.9% uptime for our API services. The scalable architecture he designed handles millions of requests daily without breaking a sweat. His understanding of both AI technologies and production systems was crucial to our success.',
        ja: 'OpenAIプラットフォームでのKeishinとの仕事は卓越していました。AIモデル統合とリアルタイム処理の専門知識により、APIサービスの99.9%アップタイムを実現しました。彼が設計したスケーラブルなアーキテクチャは、毎日数百万のリクエストを問題なく処理します。AI技術と本番システムの両方を理解する彼の能力は、私たちの成功に不可欠でした。'
      },
      'testimonials.openai.name': {
        en: 'Dr. Sarah Chen',
        ja: 'サラ・チェン 博士'
      },
      'testimonials.openai.title': {
        en: 'Senior AI Engineer',
        ja: 'シニアAIエンジニア'
      },
      'testimonials.openai.company': {
        en: 'OpenAI',
        ja: 'OpenAI'
      },
      'testimonials.openai.metrics': {
        en: 'API uptime 99.9%',
        ja: 'API稼働率 99.9%'
      },
      'testimonials.openai.year': {
        en: '2024',
        ja: '2024年'
      },
      'testimonials.openai.industry': {
        en: 'SaaS',
        ja: 'SaaS'
      },
      'testimonials.marvel.quote': {
        en: 'Keishin\'s work on Marvel\'s digital platform was outstanding. The React-based architecture he built supports millions of comic readers worldwide. The performance optimizations he implemented reduced page load times by 65%, and the mobile experience he created is seamless. His attention to user experience and technical excellence made our digital comics platform a huge success.',
        ja: 'MarvelのデジタルプラットフォームでのKeishinの仕事は素晴らしいものでした。彼が構築したReactベースのアーキテクチャは、世界中の何百万人のコミック読者をサポートしています。彼が実装したパフォーマンス最適化により、ページ読み込み時間が65%短縮され、彼が作成したモバイル体験はシームレスです。ユーザーエクスペリエンスと技術的卓越性への配慮により、私たちのデジタルコミックプラットフォームは大成功を収めました。'
      },
      'testimonials.marvel.name': {
        en: 'Alex Rodriguez',
        ja: 'アレックス・ロドリゲス'
      },
      'testimonials.marvel.title': {
        en: 'Digital Product Manager',
        ja: 'デジタルプロダクトマネージャー'
      },
      'testimonials.marvel.company': {
        en: 'Marvel Entertainment',
        ja: 'マーベル・エンターテインメント'
      },
      'testimonials.marvel.metrics': {
        en: 'Page load -65%',
        ja: 'ページ読み込み -65%'
      },
      'testimonials.marvel.year': {
        en: '2023',
        ja: '2023年'
      },
      'testimonials.marvel.industry': {
        en: 'Entertainment',
        ja: 'エンターテインメント'
      },
      'testimonials.untappd.quote': {
        en: 'The Untappd project with Keishin was a game-changer for our beer community. His React Native expertise created a smooth, responsive app that our users love. The real-time check-in system he built handles thousands of concurrent users, and the social features he implemented increased user engagement by 80%. His passion for both technology and craft beer culture made this project truly special.',
        ja: 'KeishinとのUntappdプロジェクトは、私たちのビールコミュニティにとってゲームチェンジャーでした。彼のReact Native専門知識により、ユーザーが愛するスムーズでレスポンシブなアプリが作成されました。彼が構築したリアルタイムチェックインシステムは数千の同時ユーザーを処理し、彼が実装したソーシャル機能によりユーザーエンゲージメントが80%向上しました。技術とクラフトビール文化の両方への情熱により、このプロジェクトは本当に特別なものになりました。'
      },
      'testimonials.untappd.name': {
        en: 'Mike Kiser',
        ja: 'マイク・カイザー'
      },
      'testimonials.untappd.title': {
        en: 'Co-Founder',
        ja: '共同創設者'
      },
      'testimonials.untappd.company': {
        en: 'Untappd',
        ja: 'Untappd'
      },
      'testimonials.untappd.metrics': {
        en: 'User engagement +80%',
        ja: 'ユーザーエンゲージメント +80%'
      },
      'testimonials.untappd.year': {
        en: '2022',
        ja: '2022年'
      },
      'testimonials.untappd.industry': {
        en: 'Consumer',
        ja: 'コンシューマー'
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