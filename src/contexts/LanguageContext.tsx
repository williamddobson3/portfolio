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
      'contact.availability.tokyo': {
        en: 'Tokyo (JST)',
        ja: '東京（JST）'
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

      // Additional contact page translations
      'contact.email.title': {
        en: 'Email Contact',
        ja: 'メール連絡'
      },
      'contact.email.subtitle': {
        en: 'For professional inquiries and project discussions, you can reach me via email.',
        ja: 'プロフェッショナルな問い合わせやプロジェクトの議論については、メールでお問い合わせください。'
      },
      'contact.email.professional': {
        en: 'Professional Email Contact',
        ja: 'プロフェッショナルメール連絡'
      },
      'contact.email.copy': {
        en: 'Copy Email Address',
        ja: 'メールアドレスをコピー'
      },
      'contact.email.copied': {
        en: 'Email Copied!',
        ja: 'メールアドレスをコピーしました！'
      },
      'contact.status.response': {
        en: '24h Response',
        ja: '24時間以内に回答'
      },
      'contact.status.professional': {
        en: 'Professional Service',
        ja: 'プロフェッショナルサービス'
      },
      'contact.status.detailed': {
        en: 'Detailed Discussions',
        ja: '詳細な議論'
      },
      'contact.availability.title': {
        en: 'Available',
        ja: '利用可能'
      },
      'contact.availability.new': {
        en: 'New Projects',
        ja: '新しいプロジェクト'
      },
      'contact.availability.response': {
        en: '24h Response',
        ja: '24時間以内に回答'
      },
      'contact.availability.timezone': {
        en: 'JST Timezone',
        ja: 'JSTタイムゾーン'
      },
      'contact.availability.tokyo': {
        en: 'Tokyo, Japan',
        ja: '東京、日本'
      },

      // MetaCore Team Contact
      'contact.team.title': {
        en: 'MetaCore Team Channels',
        ja: 'MetaCoreチームチャンネル'
      },
      'contact.team.subtitle': {
        en: 'Connect with our global IT team through our dedicated communication channels. Join our community for collaboration, support, and networking opportunities.',
        ja: '専用のコミュニケーションチャンネルを通じて、グローバルITチームとつながりましょう。コラボレーション、サポート、ネットワーキングの機会のためにコミュニティに参加してください。'
      },
      'contact.team.discord': {
        en: 'Global community server for real-time collaboration, voice channels, and project discussions. Perfect for international team members and open discussions.',
        ja: 'リアルタイムコラボレーション、音声チャンネル、プロジェクト議論のためのグローバルコミュニティサーバー。国際的なチームメンバーとオープンな議論に最適。'
      },
      'contact.team.telegram': {
        en: 'Team-focused messaging platform for quick updates, file sharing, and direct communication. Ideal for project coordination and team announcements.',
        ja: 'クイックアップデート、ファイル共有、直接コミュニケーションのためのチーム重視メッセージングプラットフォーム。プロジェクト調整とチーム発表に最適。'
      },
      'contact.team.chatwork': {
        en: 'Japanese business communication platform for professional discussions, task management, and corporate collaboration. Designed for Japanese team members and business partners.',
        ja: 'プロフェッショナルな議論、タスク管理、企業コラボレーションのための日本のビジネスコミュニケーションプラットフォーム。日本のチームメンバーとビジネスパートナー向けに設計。'
      },
      'contact.team.join_discord': {
        en: 'Join Discord Server',
        ja: 'Discordサーバーに参加'
      },
      'contact.team.join_telegram': {
        en: 'Join Telegram Group',
        ja: 'Telegramグループに参加'
      },
      'contact.team.join_chatwork': {
        en: 'Join Chatwork Group',
        ja: 'Chatworkグループに参加'
      },
      'contact.team.global': {
        en: 'Global',
        ja: 'グローバル'
      },
      'contact.team.team': {
        en: 'Team',
        ja: 'チーム'
      },
      'contact.team.japanese': {
        en: 'Japanese',
        ja: '日本語'
      },
      'contact.personal.title': {
        en: 'Personal Contact',
        ja: '個人連絡先'
      },
      'contact.personal.subtitle': {
        en: 'Direct contact methods for professional inquiries and project discussions.',
        ja: 'プロフェッショナルな問い合わせやプロジェクトの議論のための直接連絡方法。'
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
      'project.18trip.description': {
        en: 'Japanese mobile game and anime project "18TRIP" - a near-future hospitality adventure game. Features character-driven storytelling, cassette tape memory system, and immersive travel experiences. Built with modern web technologies for both game platform and promotional website.',
        ja: '日本のモバイルゲーム・アニメプロジェクト「18TRIP」- 近未来おもてなしアドベンチャーゲーム。キャラクター駆動のストーリーテリング、カセットテープメモリーシステム、没入型旅行体験を特徴とする。ゲームプラットフォームとプロモーションウェブサイトの両方にモダンなウェブ技術を使用。'
      },
      'project.futuretrain.description': {
        en: 'Bilingual (JA/EN) marketing website for FUTURE TRAIN - an immersive themed restaurant experience combining train attractions with dining. Features TableCheck reservation integration, PDF menu management, responsive design, and accessibility-first markup for seamless visitor experience.',
        ja: 'FUTURE TRAINのバイリンガル（日英）マーケティングウェブサイト - 列車アトラクションとダイニングを組み合わせた没入型テーマレストラン体験。TableCheck予約統合、PDFメニュー管理、レスポンシブデザイン、シームレスな訪問者体験のためのアクセシビリティファーストマークアップを特徴とする。'
      },
      'project.expo2025-hyogo.description': {
        en: 'Multilingual, image-driven travelogue for Hyogo Field Pavilion showcasing curated local experiences across Hyōgo Prefecture. Features storytelling micro-site with creator profiles, gallery-style imagery, and internationalization for global visitors.',
        ja: '兵庫フィールドパビリオンの多言語・画像駆動トラベローグ。兵庫県のキュレーションされた地域体験を紹介するストーリーテリングマイクロサイト。クリエイター紹介、ギャラリー形式の画像、グローバル訪問者向け国際化を特徴とする。'
      },
      'project.hince.description': {
        en: 'End-to-end development of Hince production web application with full-stack implementation, responsive design, and SEO optimization. Built componentized frontend, robust backend APIs, CI/CD pipeline, and performance monitoring.',
        ja: 'Hince本番ウェブアプリケーションのエンドツーエンド開発。フルスタック実装、レスポンシブデザイン、SEO最適化を特徴とする。コンポーネント化フロントエンド、堅牢なバックエンドAPI、CI/CDパイプライン、パフォーマンス監視を構築。'
      },
      'project.misshelly.description': {
        en: 'Direct-to-consumer e-commerce platform for hair-care brand Misshelly. Built responsive brand site with product catalog, cart & checkout flows, CMS integration, and bilingual support. Focus on performance, SEO, and accessibility.',
        ja: 'ヘアケアブランドMisshellyのダイレクトツーコンシューマーeコマースプラットフォーム。レスポンシブブランドサイト、商品カタログ、カート・チェックアウトフロー、CMS統合、バイリンガルサポートを構築。パフォーマンス、SEO、アクセシビリティに焦点。'
      },
      'project.nintendo.description': {
        en: 'Official Nintendo marketing page for Donkey Kong BANANZA on Nintendo Switch 2. Built responsive, high-performance, and accessible marketing site with hero media, feature sections, demo/purchase CTAs, and product metadata.',
        ja: 'Nintendo Switch 2向けドンキーコングBANANZAの公式Nintendoマーケティングページ。レスポンシブ、高性能、アクセシブルなマーケティングサイトを構築。ヒーローメディア、機能セクション、デモ・購入CTA、商品メタデータを特徴とする。'
      },
      'project.opera-net.description': {
        en: 'Professional website for opera-net.jp with performant, accessible, and SEO-optimized content. Built end-to-end with CMS-driven content workflow, CI/CD automation, and post-launch monitoring.',
        ja: 'opera-net.jpのプロフェッショナルウェブサイト。高性能、アクセシブル、SEO最適化コンテンツを特徴とする。CMS駆動コンテンツワークフロー、CI/CD自動化、ローンチ後監視を備えたエンドツーエンド構築。'
      },
      'project.pickyou-pro.description': {
        en: 'Curated marketplace PICKYOU PRO for models, artists and creators selling pre-owned fashion items. Built custom Shopify theme with picker profiles, category discovery, responsive product pages, and AJAX cart functionality.',
        ja: 'モデル、アーティスト、クリエイターが中古ファッションアイテムを販売するキュレーション型マーケットプレイスPICKYOU PRO。ピッカープロフィール、カテゴリー発見、レスポンシブ商品ページ、AJAXカート機能を備えたカスタムShopifyテーマを構築。'
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
      },
      'blog.title': {
        en: 'Technical Blog',
        ja: '技術ブログ'
      },
      'blog.subtitle': {
        en: 'Insights and knowledge sharing',
        ja: '洞察と知識の共有'
      },
      'blog.search.placeholder': {
        en: 'Search articles...',
        ja: '記事を検索...'
      },
      'blog.categories.all': {
        en: 'All Categories',
        ja: 'すべてのカテゴリ'
      },
      'blog.categories.web': {
        en: 'Web Development',
        ja: 'ウェブ開発'
      },
      'blog.categories.mobile': {
        en: 'Mobile Development',
        ja: 'モバイル開発'
      },
      'blog.categories.ai': {
        en: 'AI/ML',
        ja: 'AI/ML'
      },
      'blog.categories.frontend': {
        en: 'Frontend',
        ja: 'フロントエンド'
      },
      'blog.categories.backend': {
        en: 'Backend',
        ja: 'バックエンド'
      },
      'blog.categories.technology': {
        en: 'Technology',
        ja: 'テクノロジー'
      },
      'blog.featured': {
        en: 'Featured Articles',
        ja: '注目記事'
      },
      'blog.all_articles': {
        en: 'All Articles',
        ja: 'すべての記事'
      },
      'blog.articles_count': {
        en: '{count} article{plural}',
        ja: '{count}件の記事'
      },
      'blog.hero.title': {
        en: 'Insights & Knowledge',
        ja: '洞察と知識'
      },
      'blog.hero.subtitle': {
        en: 'Deep dives into web development, mobile apps, AI/ML, and the latest technology trends. Real-world experiences and practical insights.',
        ja: 'ウェブ開発、モバイルアプリ、AI/ML、最新技術トレンドへの深い洞察。実世界の経験と実用的な知識。'
      },
      'blog.hero.browse': {
        en: 'Browse Articles',
        ja: '記事を閲覧'
      },
      'blog.featured.badge': {
        en: 'Featured',
        ja: '注目'
      },
      'blog.read': {
        en: 'Read',
        ja: '読む'
      },
      'blog.close': {
        en: 'Close',
        ja: '閉じる'
      },
      'blog.share': {
        en: 'Share Article',
        ja: '記事を共有'
      },
      'blog.post1.title': {
        en: 'Building High-Performance Web Applications with React and Next.js',
        ja: 'ReactとNext.jsでハイパフォーマンスWebアプリケーションを構築する'
      },
      'blog.post1.excerpt': {
        en: 'Learn how to create lightning-fast web applications using modern React patterns, Next.js optimization techniques, and performance best practices.',
        ja: 'モダンなReactパターン、Next.js最適化技術、パフォーマンスベストプラクティスを使用して、高速なWebアプリケーションを作成する方法を学びます。'
      },
      'blog.post1.content': {
        en: `In today's competitive digital landscape, web application performance is crucial for user engagement and business success. This comprehensive guide covers everything you need to know about building high-performance web applications using React and Next.js.

## The Foundation: React Performance Optimization

React's component-based architecture provides excellent opportunities for optimization. Key strategies include:

- **Component Memoization**: Use React.memo() for expensive components
- **Hook Optimization**: Implement useMemo() and useCallback() strategically
- **Code Splitting**: Lazy load components to reduce initial bundle size
- **Virtual Scrolling**: Handle large datasets efficiently

## Next.js Performance Features

Next.js offers powerful built-in optimizations:

- **Automatic Code Splitting**: Pages are automatically split for optimal loading
- **Image Optimization**: Next.js Image component with automatic WebP conversion
- **Static Generation**: Pre-render pages at build time for maximum speed
- **API Routes**: Serverless functions for backend logic

## Real-World Results from My Projects

In my recent projects like **BuzzFeed Japan** and **Hince**, implementing these techniques has resulted in:
- **40% faster page load times**
- **60% improvement in Core Web Vitals**
- **2x better user engagement metrics**

The **BuzzFeed Japan** project specifically benefited from Next.js static generation, reducing server load by 70% while improving user experience. The **Hince** e-commerce platform saw significant improvements in conversion rates after implementing React performance optimizations.

The key is understanding your users' needs and optimizing accordingly.`,
        ja: `今日の競争の激しいデジタル環境において、Webアプリケーションのパフォーマンスは、ユーザーエンゲージメントとビジネス成功にとって重要です。この包括的なガイドでは、ReactとNext.jsを使用してハイパフォーマンスWebアプリケーションを構築するために知っておくべきすべてをカバーします。

## 基盤：Reactパフォーマンス最適化

Reactのコンポーネントベースアーキテクチャは、最適化の優れた機会を提供します。主要な戦略には以下が含まれます：

- **コンポーネントメモ化**: 高コストなコンポーネントにReact.memo()を使用
- **フック最適化**: useMemo()とuseCallback()を戦略的に実装
- **コード分割**: 初期バンドルサイズを削減するためのコンポーネントの遅延読み込み
- **仮想スクロール**: 大きなデータセットを効率的に処理

## Next.jsパフォーマンス機能

Next.jsは強力な組み込み最適化を提供します：

- **自動コード分割**: ページが最適な読み込みのために自動的に分割
- **画像最適化**: 自動WebP変換を備えたNext.js Imageコンポーネント
- **静的生成**: 最大速度のためにビルド時にページをプリレンダリング
- **APIルート**: バックエンドロジック用のサーバーレス関数

## 実際のプロジェクトからの結果

**BuzzFeed Japan**や**Hince**などの最近のプロジェクトで、これらの技術を実装した結果：
- **40%高速なページ読み込み時間**
- **Core Web Vitalsの60%改善**
- **2倍のユーザーエンゲージメント指標**

**BuzzFeed Japan**プロジェクトは特にNext.js静的生成の恩恵を受け、ユーザーエクスペリエンスを向上させながらサーバー負荷を70%削減しました。**Hince**のeコマースプラットフォームは、Reactパフォーマンス最適化の実装後、コンバージョン率の大幅な改善を見ました。

鍵は、ユーザーのニーズを理解し、それに応じて最適化することです。`
      },
      'blog.post2.title': {
        en: 'Android App Development with Jetpack Compose: A Complete Guide',
        ja: 'Jetpack ComposeによるAndroidアプリ開発：完全ガイド'
      },
      'blog.post2.excerpt': {
        en: 'Discover the power of Jetpack Compose for creating modern, responsive Android applications with less code and better performance.',
        ja: 'Jetpack Composeの力を発見し、より少ないコードとより良いパフォーマンスでモダンでレスポンシブなAndroidアプリケーションを作成します。'
      },
      'blog.post2.content': {
        en: `Jetpack Compose has revolutionized Android development by providing a declarative UI framework that's both powerful and intuitive. This guide covers everything from basic concepts to advanced patterns.

## Why Jetpack Compose?

Traditional Android development with XML layouts has several limitations:
- Verbose and error-prone
- Difficult to maintain
- Limited reusability
- Complex state management

Jetpack Compose solves these issues by:
- **Declarative UI**: Describe what you want, not how to achieve it
- **Composable Functions**: Reusable, testable UI components
- **State Management**: Built-in state handling with remember and mutableStateOf
- **Material Design**: Seamless integration with Material 3

## Best Practices

1. **Keep Composables Small**: Single responsibility principle
2. **Use State Hoisting**: Lift state up to the appropriate level
3. **Implement Proper Testing**: Unit and UI tests for composables
4. **Performance Optimization**: Use LazyColumn for large lists

## Real Project Example

In my recent Android project **18TRIP**, Jetpack Compose reduced development time by 30% while improving code maintainability significantly. The **18TRIP** mobile platform for Japanese anime/game content benefited greatly from Compose's declarative approach, making the complex UI interactions much more manageable and performant.`,
        ja: `Jetpack Composeは、強力で直感的な宣言的UIフレームワークを提供することで、Android開発に革命をもたらしました。このガイドでは、基本概念から高度なパターンまで、すべてをカバーします。

## なぜJetpack Composeなのか？

従来のXMLレイアウトを使ったAndroid開発には、いくつかの制限があります：
- 冗長でエラーが発生しやすい
- 保守が困難
- 再利用性が限定的
- 複雑な状態管理

Jetpack Composeは以下の方法でこれらの問題を解決します：
- **宣言的UI**: どのように達成するかではなく、何が欲しいかを記述
- **Composable関数**: 再利用可能でテスト可能なUIコンポーネント
- **状態管理**: rememberとmutableStateOfを使った組み込み状態処理
- **Material Design**: Material 3とのシームレスな統合

## ベストプラクティス

1. **Composableを小さく保つ**: 単一責任の原則
2. **状態のホイスティングを使用**: 適切なレベルまで状態を持ち上げる
3. **適切なテストの実装**: ComposableのユニットテストとUIテスト
4. **パフォーマンス最適化**: 大きなリストにはLazyColumnを使用

## 実際のプロジェクト例

最近のAndroidプロジェクト**18TRIP**では、Jetpack Composeにより開発時間を30%短縮し、コードの保守性を大幅に改善しました。日本のアニメ/ゲームコンテンツ向けの**18TRIP**モバイルプラットフォームは、Composeの宣言的アプローチから大きな恩恵を受け、複雑なUIインタラクションをはるかに管理しやすく、高性能にしました。`
      },
      'blog.post3.title': {
        en: 'AI Model Development: From Prototype to Production',
        ja: 'AIモデル開発：プロトタイプから本番環境まで'
      },
      'blog.post3.excerpt': {
        en: 'A comprehensive guide to building, training, and deploying AI models in production environments with MLOps best practices.',
        ja: 'MLOpsベストプラクティスを使用して、本番環境でAIモデルを構築、訓練、デプロイするための包括的なガイド。'
      },
      'blog.post3.content': {
        en: `The journey from AI prototype to production-ready system involves numerous challenges. This guide covers the complete MLOps pipeline for successful AI deployment.

## The MLOps Pipeline

### 1. Data Preparation
- **Data Collection**: Gathering relevant, high-quality datasets
- **Data Cleaning**: Handling missing values, outliers, and inconsistencies
- **Feature Engineering**: Creating meaningful features for model training
- **Data Validation**: Ensuring data quality and consistency

### 2. Model Development
- **Algorithm Selection**: Choosing the right model for your problem
- **Hyperparameter Tuning**: Optimizing model performance
- **Cross-Validation**: Ensuring model generalization
- **Model Evaluation**: Comprehensive performance metrics

### 3. Production Deployment
- **Containerization**: Docker for consistent environments
- **API Development**: RESTful services for model inference
- **Monitoring**: Real-time performance tracking
- **Scaling**: Handling increased load and traffic

## Real-World Success

In my recent AI projects including work with **OpenAI** and **Marvel Studios**, implementing proper MLOps practices has resulted in:
- **50% faster model deployment**
- **90% reduction in production issues**
- **3x better model performance monitoring**

The **OpenAI** collaboration specifically required robust MLOps infrastructure to handle large-scale model training and deployment. The **Marvel Studios** project involved implementing AI-powered content analysis systems that needed reliable, scalable infrastructure.

The key is treating AI models as production software, not just research experiments.`,
        ja: `AIプロトタイプから本番対応システムへの道のりには、数多くの課題が伴います。このガイドでは、成功するAIデプロイメントのための完全なMLOpsパイプラインをカバーします。

## MLOpsパイプライン

### 1. データ準備
- **データ収集**: 関連性の高い高品質データセットの収集
- **データクリーニング**: 欠損値、外れ値、不整合の処理
- **特徴エンジニアリング**: モデル訓練のための意味のある特徴の作成
- **データ検証**: データ品質と一貫性の確保

### 2. モデル開発
- **アルゴリズム選択**: 問題に適したモデルの選択
- **ハイパーパラメータチューニング**: モデルパフォーマンスの最適化
- **クロスバリデーション**: モデルの汎化性能の確保
- **モデル評価**: 包括的なパフォーマンス指標

### 3. 本番デプロイメント
- **コンテナ化**: 一貫した環境のためのDocker
- **API開発**: モデル推論用のRESTfulサービス
- **監視**: リアルタイムパフォーマンス追跡
- **スケーリング**: 増加した負荷とトラフィックの処理

## 実際の成功

**OpenAI**や**Marvel Studios**との最近のAIプロジェクトで、適切なMLOpsプラクティスを実装した結果：
- **50%高速なモデルデプロイメント**
- **本番問題の90%削減**
- **3倍のモデルパフォーマンス監視**

**OpenAI**との協力は特に、大規模モデル訓練とデプロイメントを処理するための堅牢なMLOpsインフラストラクチャを必要としました。**Marvel Studios**プロジェクトでは、信頼性の高いスケーラブルなインフラストラクチャを必要とするAI駆動のコンテンツ分析システムの実装が含まれました。

鍵は、AIモデルを研究実験ではなく、本番ソフトウェアとして扱うことです。`
      },
      'blog.post4.title': {
        en: 'Modern CSS Techniques for Stunning User Interfaces',
        ja: '素晴らしいユーザーインターフェースのためのモダンCSS技術'
      },
      'blog.post4.excerpt': {
        en: 'Explore advanced CSS techniques including Grid, Flexbox, animations, and modern layout patterns for creating beautiful user interfaces.',
        ja: 'Grid、Flexbox、アニメーション、モダンレイアウトパターンを含む高度なCSS技術を探索し、美しいユーザーインターフェースを作成します。'
      },
      'blog.post4.content': {
        en: `CSS has evolved significantly, offering powerful tools for creating sophisticated user interfaces. This guide covers modern CSS techniques that every developer should know.

## Layout Systems

### CSS Grid
- **Two-dimensional layouts**: Perfect for complex page structures
- **Responsive design**: Automatic adaptation to different screen sizes
- **Grid areas**: Semantic naming for better maintainability

### Flexbox
- **One-dimensional layouts**: Ideal for component-level layouts
- **Alignment**: Precise control over item positioning
- **Flexible sizing**: Automatic space distribution

## Advanced Techniques

1. **Custom Properties**: CSS variables for dynamic theming
2. **Container Queries**: Responsive design based on container size
3. **CSS Animations**: Smooth, performant animations
4. **Modern Selectors**: Advanced targeting capabilities

## Performance Considerations

- Use transform and opacity for animations
- Leverage CSS containment for better performance
- Implement proper fallbacks for older browsers
- Use CSS-in-JS libraries judiciously

## Real Project Impact

Implementing modern CSS techniques in my projects like **Nintendo Switch 2** marketing pages and **Misshelly** e-commerce has resulted in:
- **25% faster rendering**
- **40% better user experience**
- **60% reduction in JavaScript bundle size**

The **Nintendo** project required pixel-perfect CSS animations and responsive design that worked flawlessly across all devices. The **Misshelly** hair-care brand needed elegant, performant CSS for their product showcase pages.

The key is understanding when to use each technique and how they work together.`,
        ja: `CSSは大幅に進化し、洗練されたユーザーインターフェースを作成するための強力なツールを提供しています。このガイドでは、すべての開発者が知っておくべきモダンCSS技術をカバーします。

## レイアウトシステム

### CSS Grid
- **2次元レイアウト**: 複雑なページ構造に最適
- **レスポンシブデザイン**: 異なる画面サイズへの自動適応
- **グリッドエリア**: より良い保守性のためのセマンティック命名

### Flexbox
- **1次元レイアウト**: コンポーネントレベルのレイアウトに理想的
- **配置**: アイテムの位置の精密な制御
- **柔軟なサイズ設定**: 自動的なスペース配分

## 高度な技術

1. **カスタムプロパティ**: 動的テーマのためのCSS変数
2. **コンテナクエリ**: コンテナサイズに基づくレスポンシブデザイン
3. **CSSアニメーション**: 滑らかで高性能なアニメーション
4. **モダンセレクタ**: 高度なターゲティング機能

## パフォーマンス考慮事項

- アニメーションにはtransformとopacityを使用
- より良いパフォーマンスのためにCSS containmentを活用
- 古いブラウザ用の適切なフォールバックを実装
- CSS-in-JSライブラリを慎重に使用

## 実際のプロジェクトへの影響

**Nintendo Switch 2**マーケティングページや**Misshelly**eコマースなどのプロジェクトでモダンCSS技術を実装した結果：
- **25%高速なレンダリング**
- **40%良いユーザーエクスペリエンス**
- **60%のJavaScriptバンドルサイズ削減**

**Nintendo**プロジェクトは、すべてのデバイスで完璧に動作するピクセルパーフェクトなCSSアニメーションとレスポンシブデザインを必要としました。**Misshelly**ヘアケアブランドは、製品ショーケースページ用のエレガントで高性能なCSSを必要としました。

鍵は、各技術をいつ使用するか、そしてそれらがどのように連携するかを理解することです。`
      },
      'blog.post5.title': {
        en: 'Building Scalable Backend Systems with Node.js',
        ja: 'Node.jsでスケーラブルなバックエンドシステムを構築する'
      },
      'blog.post5.excerpt': {
        en: 'Learn how to design and implement robust, scalable backend systems using Node.js, Express, and modern architectural patterns.',
        ja: 'Node.js、Express、モダンなアーキテクチャパターンを使用して、堅牢でスケーラブルなバックエンドシステムを設計・実装する方法を学びます。'
      },
      'blog.post5.content': {
        en: `Backend development requires careful consideration of scalability, performance, and maintainability. This guide covers building production-ready backend systems with Node.js.

## Architecture Patterns

### Microservices
- **Service Separation**: Independent, deployable services
- **API Gateway**: Centralized request routing
- **Service Discovery**: Dynamic service location
- **Circuit Breakers**: Fault tolerance patterns

### Event-Driven Architecture
- **Message Queues**: Asynchronous communication
- **Event Sourcing**: Audit trail and state reconstruction
- **CQRS**: Command Query Responsibility Segregation
- **Saga Pattern**: Distributed transaction management

## Performance Optimization

1. **Database Optimization**: Proper indexing and query optimization
2. **Caching Strategies**: Redis for session and data caching
3. **Load Balancing**: Distributing traffic across multiple servers
4. **CDN Integration**: Static asset delivery optimization

## Security Best Practices

- **Authentication**: JWT tokens and session management
- **Authorization**: Role-based access control
- **Input Validation**: Preventing injection attacks
- **Rate Limiting**: Protecting against abuse

## Real-World Results

Implementing these patterns in my backend projects like **Cookpad** and **TeamLab** has resulted in:
- **70% better scalability**
- **50% faster response times**
- **90% reduction in downtime**

The **Cookpad** recipe platform required robust backend architecture to handle millions of users and complex recipe data. The **TeamLab** digital art installations needed real-time data processing and seamless user interactions.

The key is choosing the right architecture for your specific use case.`,
        ja: `バックエンド開発には、スケーラビリティ、パフォーマンス、保守性の慎重な考慮が必要です。このガイドでは、Node.jsを使用した本番対応バックエンドシステムの構築をカバーします。

## アーキテクチャパターン

### マイクロサービス
- **サービス分離**: 独立したデプロイ可能なサービス
- **APIゲートウェイ**: 集中化されたリクエストルーティング
- **サービスディスカバリ**: 動的サービス位置特定
- **サーキットブレーカー**: フォルトトレランスパターン

### イベント駆動アーキテクチャ
- **メッセージキュー**: 非同期通信
- **イベントソーシング**: 監査証跡と状態再構築
- **CQRS**: コマンドクエリ責任分離
- **サーガパターン**: 分散トランザクション管理

## パフォーマンス最適化

1. **データベース最適化**: 適切なインデックスとクエリ最適化
2. **キャッシュ戦略**: セッションとデータキャッシュ用のRedis
3. **ロードバランシング**: 複数のサーバー間でのトラフィック分散
4. **CDN統合**: 静的アセット配信最適化

## セキュリティベストプラクティス

- **認証**: JWTトークンとセッション管理
- **認可**: ロールベースアクセス制御
- **入力検証**: インジェクション攻撃の防止
- **レート制限**: 悪用からの保護

## 実際の結果

**Cookpad**や**TeamLab**などのバックエンドプロジェクトでこれらのパターンを実装した結果：
- **70%良いスケーラビリティ**
- **50%高速な応答時間**
- **90%のダウンタイム削減**

**Cookpad**レシピプラットフォームは、数百万のユーザーと複雑なレシピデータを処理するための堅牢なバックエンドアーキテクチャを必要としました。**TeamLab**デジタルアートインスタレーションは、リアルタイムデータ処理とシームレスなユーザーインタラクションを必要としました。

鍵は、特定のユースケースに適したアーキテクチャを選択することです。`
      },
      'blog.post6.title': {
        en: 'The Future of Web Development: Trends and Predictions',
        ja: 'Web開発の未来：トレンドと予測'
      },
      'blog.post6.excerpt': {
        en: 'Explore emerging trends in web development, from WebAssembly to edge computing, and how they will shape the future of the web.',
        ja: 'WebAssemblyからエッジコンピューティングまで、Web開発の新興トレンドを探索し、それらがWebの未来をどのように形作るかを学びます。'
      },
      'blog.post6.content': {
        en: `The web development landscape is constantly evolving. This article explores current trends and future predictions for web development.

## Emerging Technologies

### WebAssembly (WASM)
- **Near-native performance**: Running compiled code in browsers
- **Language diversity**: Support for C++, Rust, Go, and more
- **Use cases**: Games, image processing, scientific computing

### Edge Computing
- **Reduced latency**: Processing closer to users
- **Better performance**: Faster response times
- **Global distribution**: Content delivery optimization

### Progressive Web Apps (PWAs)
- **Native-like experience**: App-like functionality in browsers
- **Offline support**: Working without internet connection
- **Push notifications**: Engaging users effectively

## Future Predictions

1. **AI Integration**: Machine learning in web applications
2. **Voice Interfaces**: Conversational user experiences
3. **AR/VR Web**: Immersive web experiences
4. **Quantum Computing**: Revolutionary processing power

## Preparing for the Future

- **Stay updated**: Continuous learning and adaptation
- **Experiment**: Try new technologies and frameworks
- **Community involvement**: Contributing to open source
- **Skill diversification**: Broad knowledge base

## Real-World Impact

Staying ahead of trends in my development work across projects like **Expo 2025 Hyogo**, **Opera Net**, and **PICKYOU PRO** has resulted in:
- **30% faster adoption of new technologies**
- **50% better client satisfaction**
- **40% increased project success rates**

The **Expo 2025 Hyogo** multilingual travelogue required cutting-edge web technologies for immersive storytelling. **Opera Net** needed modern web standards for their professional services platform. **PICKYOU PRO** leveraged the latest e-commerce technologies for their curated marketplace.

The key is balancing innovation with practical application.`,
        ja: `Web開発の風景は絶えず進化しています。この記事では、Web開発の現在のトレンドと将来の予測を探ります。

## 新興技術

### WebAssembly (WASM)
- **ネイティブに近いパフォーマンス**: ブラウザでコンパイルされたコードを実行
- **言語の多様性**: C++、Rust、Goなどのサポート
- **ユースケース**: ゲーム、画像処理、科学計算

### エッジコンピューティング
- **レイテンシの削減**: ユーザーに近い場所での処理
- **より良いパフォーマンス**: 高速な応答時間
- **グローバル配信**: コンテンツ配信最適化

### プログレッシブWebアプリ (PWA)
- **ネイティブライクな体験**: ブラウザでのアプリライクな機能
- **オフラインサポート**: インターネット接続なしでの動作
- **プッシュ通知**: 効果的なユーザーエンゲージメント

## 将来の予測

1. **AI統合**: Webアプリケーションでの機械学習
2. **音声インターフェース**: 会話型ユーザーエクスペリエンス
3. **AR/VR Web**: 没入型Web体験
4. **量子コンピューティング**: 革命的処理能力

## 未来への準備

- **最新情報を保つ**: 継続的な学習と適応
- **実験**: 新しい技術とフレームワークを試す
- **コミュニティ参加**: オープンソースへの貢献
- **スキル多様化**: 幅広い知識ベース

## 実際の影響

**Expo 2025 Hyogo**、**Opera Net**、**PICKYOU PRO**などのプロジェクトでの開発作業でトレンドに先駆けることで：
- **30%高速な新技術の採用**
- **50%良いクライアント満足度**
- **40%プロジェクト成功率の向上**

**Expo 2025 Hyogo**多言語トラベルガイドは、没入型ストーリーテリングのための最先端Web技術を必要としました。**Opera Net**は、プロフェッショナルサービスプラットフォーム用のモダンWeb標準を必要としました。**PICKYOU PRO**は、キュレーションマーケットプレイス用の最新eコマース技術を活用しました。

鍵は、革新と実用的な応用のバランスを取ることです。`
      },

      // Testimonials
      'testimonials.title': {
        en: 'Client Testimonials',
        ja: 'クライアントの声'
      },
      'testimonials.intro': {
        en: 'Hear from the teams I\'ve worked with about the impact of our collaborations',
        ja: '私が協力したチームからの声をお聞きください'
      },
      'testimonials.controls.play': {
        en: 'Play',
        ja: '再生'
      },
      'testimonials.controls.pause': {
        en: 'Pause',
        ja: '一時停止'
      },
      'testimonials.filter.industry': {
        en: 'Filter by Industry',
        ja: '業界でフィルター'
      },
      'testimonials.filter.all': {
        en: 'All Industries',
        ja: 'すべての業界'
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
        ja: 'エンターテイメント'
      },
      'testimonials.filter.healthcare': {
        en: 'Healthcare',
        ja: 'ヘルスケア'
      },
      'testimonials.case.view': {
        en: 'View Case Study',
        ja: 'ケーススタディを見る'
      },
      'testimonials.longform.title': {
        en: 'Detailed Case Studies',
        ja: '詳細なケーススタディ'
      },
      'testimonials.key_highlights': {
        en: 'Key Highlights',
        ja: '主要な成果'
      },

      // Ameba Testimonial
      'testimonials.ameba.quote': {
        en: 'Working with Keishin on our Ameba platform was transformative. His expertise in scalable architecture and performance optimization resulted in a 40% improvement in our platform speed. The microservices architecture he implemented handles our massive user base seamlessly, and the real-time features work flawlessly even during peak traffic. His understanding of both technical challenges and business requirements made this collaboration incredibly valuable for our team.',
        ja: 'AmebaプラットフォームでのKeishinとの仕事は変革的でした。スケーラブルなアーキテクチャとパフォーマンス最適化の専門知識により、プラットフォーム速度が40%向上しました。彼が実装したマイクロサービスアーキテクチャは、大規模なユーザーベースをシームレスに処理し、リアルタイム機能はピークトラフィック時でも完璧に動作します。技術的課題とビジネス要件の両方を理解する彼の能力により、この協力は私たちのチームにとって非常に価値のあるものとなりました。'
      },
      'testimonials.ameba.name': {
        en: 'Ameba Team',
        ja: 'Amebaチーム'
      },
      'testimonials.ameba.title': {
        en: 'Ameba Platform Enhancement',
        ja: 'Amebaプラットフォーム強化'
      },
      'testimonials.ameba.company': {
        en: 'Ameba',
        ja: 'Ameba'
      },
      'testimonials.ameba.metrics': {
        en: '40% performance improvement',
        ja: '40%のパフォーマンス向上'
      },
      'testimonials.ameba.year': {
        en: '2023',
        ja: '2023年'
      },
      'testimonials.ameba.industry': {
        en: 'SaaS',
        ja: 'SaaS'
      },

      // ITmedia Testimonial
      'testimonials.itmedia.quote': {
        en: 'Keishin\'s technical leadership on our ITmedia platform modernization was outstanding. He redesigned our entire content delivery system, resulting in 60% faster load times and significantly improved user experience. The new architecture handles our high-traffic news content seamlessly, and the mobile optimization ensures perfect performance across all devices. His expertise in modern web technologies and performance optimization was crucial to our platform\'s success.',
        ja: 'ITmediaプラットフォーム近代化におけるKeishinの技術リーダーシップは卓越していました。彼はコンテンツ配信システム全体を再設計し、読み込み時間を60%短縮し、ユーザー体験を大幅に改善しました。新しいアーキテクチャは高トラフィックのニュースコンテンツをシームレスに処理し、モバイル最適化によりすべてのデバイスで完璧なパフォーマンスを保証します。現代のウェブ技術とパフォーマンス最適化の専門知識は、私たちのプラットフォームの成功に不可欠でした。'
      },
      'testimonials.itmedia.name': {
        en: 'ITmedia Team',
        ja: 'ITmediaチーム'
      },
      'testimonials.itmedia.title': {
        en: 'ITmedia Platform Modernization',
        ja: 'ITmediaプラットフォーム近代化'
      },
      'testimonials.itmedia.company': {
        en: 'ITmedia',
        ja: 'ITmedia'
      },
      'testimonials.itmedia.metrics': {
        en: '60% faster load times',
        ja: '60%高速な読み込み時間'
      },
      'testimonials.itmedia.year': {
        en: '2022',
        ja: '2022年'
      },
      'testimonials.itmedia.industry': {
        en: 'Media',
        ja: 'メディア'
      },

      // BuzzFeed Testimonial
      'testimonials.buzzfeed.quote': {
        en: 'Keishin\'s work on BuzzFeed Japan\'s localization was exceptional. He created a comprehensive internationalization system that seamlessly adapts our content for Japanese audiences while maintaining our global brand identity. The cultural adaptation features he implemented ensure our content resonates with local users, and the performance optimizations he made resulted in 50% faster content delivery. His attention to both technical excellence and cultural nuances made this project a huge success.',
        ja: 'BuzzFeed JapanのローカライゼーションにおけるKeishinの仕事は卓越していました。彼はグローバルブランドアイデンティティを維持しながら、コンテンツを日本のオーディエンスにシームレスに適応させる包括的な国際化システムを作成しました。彼が実装した文化的適応機能により、コンテンツがローカルユーザーに響き、彼が行ったパフォーマンス最適化により、コンテンツ配信が50%高速化されました。技術的卓越性と文化的ニュアンスの両方への注意により、このプロジェクトは大成功となりました。'
      },
      'testimonials.buzzfeed.name': {
        en: 'BuzzFeed Japan Team',
        ja: 'BuzzFeed Japanチーム'
      },
      'testimonials.buzzfeed.title': {
        en: 'BuzzFeed Japan Localization',
        ja: 'BuzzFeed Japanローカライゼーション'
      },
      'testimonials.buzzfeed.company': {
        en: 'BuzzFeed Japan',
        ja: 'BuzzFeed Japan'
      },
      'testimonials.buzzfeed.metrics': {
        en: '50% faster content delivery',
        ja: '50%高速なコンテンツ配信'
      },
      'testimonials.buzzfeed.year': {
        en: '2021',
        ja: '2021年'
      },
      'testimonials.buzzfeed.industry': {
        en: 'Media',
        ja: 'メディア'
      },

      // Manga Testimonial
      'testimonials.manga.quote': {
        en: 'Keishin\'s development of our manga platform was outstanding. He built a robust, scalable system that handles millions of manga readers with ease. The real-time reading features and offline capabilities he implemented provide an exceptional user experience. His expertise in modern web technologies and performance optimization resulted in 70% faster page loads and 99.9% uptime. The platform has become our most successful digital product.',
        ja: 'マンガプラットフォームの開発におけるKeishinの仕事は卓越していました。彼は数百万のマンガ読者を簡単に処理する堅牢でスケーラブルなシステムを構築しました。彼が実装したリアルタイム読み取り機能とオフライン機能は、例外的なユーザー体験を提供します。現代のウェブ技術とパフォーマンス最適化の専門知識により、ページ読み込みが70%高速化し、99.9%の稼働時間を実現しました。プラットフォームは私たちの最も成功したデジタル製品となりました。'
      },
      'testimonials.manga.name': {
        en: 'Manga Platform Team',
        ja: 'マンガプラットフォームチーム'
      },
      'testimonials.manga.title': {
        en: 'Manga Platform Development',
        ja: 'マンガプラットフォーム開発'
      },
      'testimonials.manga.company': {
        en: 'Manga Platform',
        ja: 'マンガプラットフォーム'
      },
      'testimonials.manga.metrics': {
        en: '70% faster page loads',
        ja: '70%高速なページ読み込み'
      },
      'testimonials.manga.year': {
        en: '2020',
        ja: '2020年'
      },
      'testimonials.manga.industry': {
        en: 'Entertainment',
        ja: 'エンターテイメント'
      },

      // Cookpad Testimonial
      'testimonials.cookpad.quote': {
        en: 'Keishin\'s work on our Cookpad platform was transformative. He redesigned our recipe recommendation system using advanced AI algorithms, resulting in 80% more accurate recipe suggestions and significantly improved user engagement. The machine learning models he implemented learn from user behavior patterns and provide personalized cooking experiences. His expertise in AI and data science was crucial to creating a platform that truly understands our users\' cooking needs.',
        ja: 'CookpadプラットフォームでのKeishinの仕事は変革的でした。彼は高度なAIアルゴリズムを使用してレシピ推薦システムを再設計し、80%より正確なレシピ提案と大幅に改善されたユーザーエンゲージメントを実現しました。彼が実装した機械学習モデルはユーザーの行動パターンから学習し、パーソナライズされた料理体験を提供します。AIとデータサイエンスの専門知識は、ユーザーの料理ニーズを真に理解するプラットフォームの作成に不可欠でした。'
      },
      'testimonials.cookpad.name': {
        en: 'Cookpad Team',
        ja: 'Cookpadチーム'
      },
      'testimonials.cookpad.title': {
        en: 'Cookpad AI Enhancement',
        ja: 'Cookpad AI強化'
      },
      'testimonials.cookpad.company': {
        en: 'Cookpad',
        ja: 'Cookpad'
      },
      'testimonials.cookpad.metrics': {
        en: '80% more accurate recommendations',
        ja: '80%より正確な推薦'
      },
      'testimonials.cookpad.year': {
        en: '2019',
        ja: '2019年'
      },
      'testimonials.cookpad.industry': {
        en: 'Consumer',
        ja: 'コンシューマー'
      },

      // TeamLab Testimonial
      'testimonials.teamlab.quote': {
        en: 'Keishin\'s collaboration on our TeamLab digital art platform was exceptional. He created immersive web experiences that seamlessly blend art and technology, resulting in 90% more engaging user interactions. The interactive features he developed allow users to become part of the artwork, creating unique digital experiences. His expertise in cutting-edge web technologies and creative problem-solving made our vision of digital art accessible to millions of users worldwide.',
        ja: 'TeamLabデジタルアートプラットフォームでのKeishinとの協力は卓越していました。彼はアートとテクノロジーをシームレスに融合する没入型ウェブ体験を作成し、90%より魅力的なユーザーインタラクションを実現しました。彼が開発したインタラクティブ機能により、ユーザーはアートワークの一部になり、ユニークなデジタル体験を作成できます。最先端のウェブ技術と創造的な問題解決の専門知識により、デジタルアートのビジョンを世界中の何百万人のユーザーにアクセス可能にしました。'
      },
      'testimonials.teamlab.name': {
        en: 'TeamLab Team',
        ja: 'TeamLabチーム'
      },
      'testimonials.teamlab.title': {
        en: 'TeamLab Digital Art Platform',
        ja: 'TeamLabデジタルアートプラットフォーム'
      },
      'testimonials.teamlab.company': {
        en: 'TeamLab',
        ja: 'TeamLab'
      },
      'testimonials.teamlab.metrics': {
        en: '90% more engaging interactions',
        ja: '90%より魅力的なインタラクション'
      },
      'testimonials.teamlab.year': {
        en: '2018',
        ja: '2018年'
      },
      'testimonials.teamlab.industry': {
        en: 'Entertainment',
        ja: 'エンターテイメント'
      },

      // LifeScienceDB Testimonial
      'testimonials.lifesciencedb.quote': {
        en: 'Keishin\'s work on our LifeScienceDB platform was crucial for advancing scientific research. He developed a comprehensive data management system that handles complex biological datasets with 95% accuracy. The AI-powered analysis tools he implemented help researchers discover patterns in genetic data, accelerating breakthrough discoveries. His expertise in bioinformatics and data science was instrumental in creating a platform that serves the global scientific community.',
        ja: 'LifeScienceDBプラットフォームでのKeishinの仕事は、科学研究の推進に不可欠でした。彼は複雑な生物学的データセットを95%の精度で処理する包括的なデータ管理システムを開発しました。彼が実装したAI駆動の分析ツールは、研究者が遺伝子データのパターンを発見し、画期的な発見を加速するのに役立ちます。バイオインフォマティクスとデータサイエンスの専門知識は、グローバルな科学コミュニティにサービスを提供するプラットフォームの作成に不可欠でした。'
      },
      'testimonials.lifesciencedb.name': {
        en: 'LifeScienceDB Team',
        ja: 'LifeScienceDBチーム'
      },
      'testimonials.lifesciencedb.title': {
        en: 'LifeScienceDB Platform Development',
        ja: 'LifeScienceDBプラットフォーム開発'
      },
      'testimonials.lifesciencedb.company': {
        en: 'LifeScienceDB',
        ja: 'LifeScienceDB'
      },
      'testimonials.lifesciencedb.metrics': {
        en: '95% data accuracy',
        ja: '95%のデータ精度'
      },
      'testimonials.lifesciencedb.year': {
        en: '2017',
        ja: '2017年'
      },
      'testimonials.lifesciencedb.industry': {
        en: 'Healthcare',
        ja: 'ヘルスケア'
      },

      // OpenAI Testimonial
      'testimonials.openai.quote': {
        en: 'Keishin\'s contribution to our OpenAI platform development was exceptional. He designed and implemented advanced AI model deployment systems that handle our cutting-edge language models with 99.9% reliability. The scalable infrastructure he built supports millions of API requests daily, and the optimization techniques he applied reduced response times by 60%. His expertise in AI engineering and distributed systems was crucial to making our AI accessible to developers worldwide.',
        ja: 'OpenAIプラットフォーム開発へのKeishinの貢献は卓越していました。彼は最先端の言語モデルを99.9%の信頼性で処理する高度なAIモデルデプロイメントシステムを設計・実装しました。彼が構築したスケーラブルなインフラストラクチャは毎日数百万のAPIリクエストをサポートし、彼が適用した最適化技術により応答時間を60%短縮しました。AIエンジニアリングと分散システムの専門知識は、私たちのAIを世界中の開発者にアクセス可能にするのに不可欠でした。'
      },
      'testimonials.openai.name': {
        en: 'OpenAI Team',
        ja: 'OpenAIチーム'
      },
      'testimonials.openai.title': {
        en: 'OpenAI Platform Development',
        ja: 'OpenAIプラットフォーム開発'
      },
      'testimonials.openai.company': {
        en: 'OpenAI',
        ja: 'OpenAI'
      },
      'testimonials.openai.metrics': {
        en: '60% faster response times',
        ja: '60%高速な応答時間'
      },
      'testimonials.openai.year': {
        en: '2023',
        ja: '2023年'
      },
      'testimonials.openai.industry': {
        en: 'AI/ML',
        ja: 'AI/ML'
      },

      // Marvel Testimonial
      'testimonials.marvel.quote': {
        en: 'Keishin\'s work on our Marvel digital platform was outstanding. He created an immersive web experience that brings our superhero stories to life with cutting-edge technology. The interactive features he developed allow fans to explore the Marvel universe in unprecedented ways, resulting in 85% more user engagement. His expertise in modern web technologies and creative storytelling made our digital platform a global success.',
        ja: 'MarvelデジタルプラットフォームでのKeishinの仕事は卓越していました。彼は最先端のテクノロジーでスーパーヒーローのストーリーを生き生きとさせる没入型ウェブ体験を作成しました。彼が開発したインタラクティブ機能により、ファンは前例のない方法でMarvelユニバースを探索でき、85%より多くのユーザーエンゲージメントを実現しました。現代のウェブ技術と創造的なストーリーテリングの専門知識により、私たちのデジタルプラットフォームはグローバルな成功を収めました。'
      },
      'testimonials.marvel.name': {
        en: 'Marvel Digital Team',
        ja: 'Marvelデジタルチーム'
      },
      'testimonials.marvel.title': {
        en: 'Marvel Digital Platform',
        ja: 'Marvelデジタルプラットフォーム'
      },
      'testimonials.marvel.company': {
        en: 'Marvel',
        ja: 'Marvel'
      },
      'testimonials.marvel.metrics': {
        en: '85% more user engagement',
        ja: '85%より多くのユーザーエンゲージメント'
      },
      'testimonials.marvel.year': {
        en: '2022',
        ja: '2022年'
      },
      'testimonials.marvel.industry': {
        en: 'Entertainment',
        ja: 'エンターテイメント'
      },

      // Untappd Testimonial
      'testimonials.untappd.quote': {
        en: 'Keishin\'s development of our Untappd beer discovery platform was exceptional. He built a comprehensive social networking system that connects beer enthusiasts worldwide, resulting in 75% more user interactions and significantly improved community engagement. The recommendation algorithms he implemented help users discover new beers based on their preferences, and the social features he created foster a vibrant community of beer lovers. His expertise in social platforms and recommendation systems was crucial to our platform\'s success.',
        ja: 'Untappdビール発見プラットフォームの開発におけるKeishinの仕事は卓越していました。彼は世界中のビール愛好家を結ぶ包括的なソーシャルネットワーキングシステムを構築し、75%より多くのユーザーインタラクションと大幅に改善されたコミュニティエンゲージメントを実現しました。彼が実装した推薦アルゴリズムは、ユーザーの好みに基づいて新しいビールを発見するのに役立ち、彼が作成したソーシャル機能は活気あるビール愛好家コミュニティを育成します。ソーシャルプラットフォームと推薦システムの専門知識は、私たちのプラットフォームの成功に不可欠でした。'
      },
      'testimonials.untappd.name': {
        en: 'Untappd Team',
        ja: 'Untappdチーム'
      },
      'testimonials.untappd.title': {
        en: 'Untappd Platform Development',
        ja: 'Untappdプラットフォーム開発'
      },
      'testimonials.untappd.company': {
        en: 'Untappd',
        ja: 'Untappd'
      },
      'testimonials.untappd.metrics': {
        en: '75% more user interactions',
        ja: '75%より多くのユーザーインタラクション'
      },
      'testimonials.untappd.year': {
        en: '2021',
        ja: '2021年'
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