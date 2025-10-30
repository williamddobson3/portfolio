import React, { useState, useRef, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Clock, Search, Filter, ArrowRight, BookOpen, User, Eye, Heart, ChevronLeft, ChevronRight, Edit3, Save, X, Upload } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  featured: boolean;
}

const BlogPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postsPerPage = 6;
  const blogPosts = useMemo(() => [
    {
      id: '1',
      title: t('blog.post1.title'),
      excerpt: t('blog.post1.excerpt'),
      content: t('blog.post1.content'),
      author: 'Keishin',
      date: '2024-01-15',
      readTime: language === 'ja' ? '8分' : '8 min',
      category: 'Web Development',
      tags: language === 'ja' ? ['React', 'Next.js', 'パフォーマンス', 'Web開発'] : ['React', 'Next.js', 'Performance', 'Web Development'],
      image: '/projects/buzzfeed/1.jpg',
      views: 1247,
      likes: 89,
      featured: true
    },
    {
      id: '2',
      title: t('blog.post2.title'),
      excerpt: t('blog.post2.excerpt'),
      content: t('blog.post2.content'),
      author: 'Keishin',
      date: '2024-01-10',
      readTime: language === 'ja' ? '12分' : '12 min',
      category: 'Mobile Development',
      tags: language === 'ja' ? ['Android', 'Jetpack Compose', 'モバイル開発', 'Kotlin'] : ['Android', 'Jetpack Compose', 'Mobile Development', 'Kotlin'],
      image: '/projects/ameba/1.png',
      views: 892,
      likes: 67,
      featured: true
    },
    {
      id: '3',
      title: t('blog.post3.title'),
      excerpt: t('blog.post3.excerpt'),
      content: t('blog.post3.content'),
      author: 'Keishin',
      date: '2024-01-05',
      readTime: language === 'ja' ? '15分' : '15 min',
      category: 'AI/ML',
      tags: language === 'ja' ? ['AI', 'MLOps', '機械学習', '本番環境'] : ['AI', 'MLOps', 'Machine Learning', 'Production'],
      image: '/projects/OpenAI/1.png',
      views: 1563,
      likes: 124,
      featured: true
    },
    {
      id: '4',
      title: t('blog.post4.title'),
      excerpt: t('blog.post4.excerpt'),
      content: t('blog.post4.content'),
      author: 'Keishin',
      date: '2024-01-01',
      readTime: language === 'ja' ? '10分' : '10 min',
      category: 'Frontend',
      tags: language === 'ja' ? ['CSS', 'フロントエンド', 'UI/UX', 'Web開発'] : ['CSS', 'Frontend', 'UI/UX', 'Web Development'],
      image: '/projects/muji/1.png',
      views: 743,
      likes: 56,
      featured: false
    },
    {
      id: '5',
      title: t('blog.post5.title'),
      excerpt: t('blog.post5.excerpt'),
      content: t('blog.post5.content'),
      author: 'Keishin',
      date: '2023-12-28',
      readTime: language === 'ja' ? '14分' : '14 min',
      category: 'Backend',
      tags: language === 'ja' ? ['Node.js', 'バックエンド', 'アーキテクチャ', 'スケーラビリティ'] : ['Node.js', 'Backend', 'Architecture', 'Scalability'],
      image: '/projects/cookpad/1.jpg',
      views: 1089,
      likes: 78,
      featured: false
    },
    {
      id: '6',
      title: t('blog.post6.title'),
      excerpt: t('blog.post6.excerpt'),
      content: t('blog.post6.content'),
      author: 'Keishin',
      date: '2023-12-20',
      readTime: language === 'ja' ? '11分' : '11 min',
      category: 'Technology',
      tags: language === 'ja' ? ['未来', 'テクノロジー', 'Web開発', 'トレンド'] : ['Future', 'Technology', 'Web Development', 'Trends'],
      image: '/projects/teamlab/1.jpg',
      views: 934,
      likes: 72,
      featured: false
    }
  ], [t, language]);

  // Note: Editing functions removed as blog posts are now dynamic based on language

  // Note: Create function removed as blog posts are now dynamic based on language

  const handleSavePost = () => {
    if (!editingPost) return;
    
    // Basic validation
    if (!editingPost.title.trim()) {
      alert('Please enter a title for the article');
      return;
    }
    if (!editingPost.content.trim()) {
      alert('Please enter content for the article');
      return;
    }
    
    // Note: Blog posts are now dynamic based on language
    // Editing functionality is disabled for language-consistent content
    alert('Blog posts are managed through the translation system. Changes are not saved.');
    
    setIsEditing(false);
    setIsCreating(false);
    setEditingPost(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false);
    setEditingPost(null);
  };

  // Note: Delete function removed as blog posts are now dynamic based on language

  // Image upload functionality
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editingPost) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      // Convert to base64 for demo purposes
      // In a real app, you'd upload to a server/cloud storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditingPost({...editingPost, image: result});
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      setUploadingImage(false);
    }
  };

  const handleImageUrlChange = (url: string) => {
    if (!editingPost) return;
    setEditingPost({...editingPost, image: url});
  };

  const categories = ['all', 'Web Development', 'Mobile Development', 'AI/ML', 'Frontend', 'Backend', 'Technology'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Note: Share function removed as it's not used in the current implementation

  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-coral-600/20"></div>
        <div className="absolute inset-0 bg-[url('/projects/teamlab/1.jpg')] bg-cover bg-center opacity-10"></div>
        
        <div className="pt-10 relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-white/80 text-sm font-medium">{t('blog.title')}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('blog.hero.title')}
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            {t('blog.hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>{t('blog.hero.browse')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('blog.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="text-white/60 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800">
                      {category === 'all' ? t('blog.categories.all') : category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Quick Add Button */}
              
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">{t('blog.featured')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {blogPosts.filter(post => post.featured).map(post => (
                <article
                  key={post.id}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-gray-800 text-sm font-medium rounded-full">
                        {t('blog.featured.badge')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-800/60 mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-white mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-white" />
                        <span className="text-white text-sm">{post.author}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                            likedPosts.has(post.id) 
                              ? 'bg-red-500/20 text-red-400' 
                              : 'bg-white/10 text-gray-800/60 hover:bg-white/20'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                          <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section id="blog-posts" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory === 'all' ? t('blog.all_articles') : `${selectedCategory} Articles`}
            </h2>
            <span className="text-white/60">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map(post => (
              <article
                key={post.id}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-white/60 mb-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/80 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-white/60" />
                      <span className="text-white/80 text-sm">{post.author}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                          likedPosts.has(post.id) 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                      </button>
                      
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-colors"
                      >
                        <span className="text-sm">{t('blog.read')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white/10 text-gray-800/60 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    page === currentPage
                      ? 'bg-blue-600 text-gray-800'
                      : 'bg-white/10 text-gray-800/60 hover:bg-white/20'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white/10 text-gray-800/60 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pt-20">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="relative p-8 border-b border-white/10">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-800 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-coral-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-gray-800" />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedPost.title}
                  </h2>
                  <p className="text-gray-800/80 text-lg leading-relaxed">
                    {selectedPost.excerpt}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-800/90 leading-relaxed">
                  {selectedPost.content}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent">
                  <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-gray-800 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                      {t('blog.close')}
                </button>
               
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Create Article Modal */}
      {isEditing && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pt-20">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="relative p-8 border-b border-white/10">
              <button
                onClick={handleCancelEdit}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors group"
              >
                <X className="w-5 h-5 text-gray-800 group-hover:rotate-90 transition-transform" />
              </button>
              
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Edit3 className="w-8 h-8 text-gray-800" />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {isCreating ? 'Create New Article' : 'Edit Article'}
                  </h2>
                  <p className="text-gray-800/80 text-lg leading-relaxed">
                    {isCreating ? 'Fill in the details to create a new blog post' : 'Modify the article details below'}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-800 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter article title..."
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Excerpt</label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-800 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    placeholder="Enter article excerpt..."
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Content</label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-800 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 h-48 resize-none"
                    placeholder="Enter article content (supports markdown)..."
                  />
                </div>

                {/* Category and Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-800 font-semibold mb-2">Category</label>
                    <select
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Web Development" className="bg-slate-800">Web Development</option>
                      <option value="Mobile Development" className="bg-slate-800">Mobile Development</option>
                      <option value="AI/ML" className="bg-slate-800">AI/ML</option>
                      <option value="Frontend" className="bg-slate-800">Frontend</option>
                      <option value="Backend" className="bg-slate-800">Backend</option>
                      <option value="Technology" className="bg-slate-800">Technology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-800 font-semibold mb-2">Read Time</label>
                    <input
                      type="text"
                      value={editingPost.readTime}
                      onChange={(e) => setEditingPost({...editingPost, readTime: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-800 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 5 min"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={editingPost.tags.join(', ')}
                    onChange={(e) => setEditingPost({...editingPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-800 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., React, Next.js, Performance"
                  />
                </div>

                {/* Featured and Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-800 font-semibold mb-2">Featured Article</label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={editingPost.featured}
                        onChange={(e) => setEditingPost({...editingPost, featured: e.target.checked})}
                        className="w-5 h-5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-800/80">Mark as featured</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-gray-800 font-semibold mb-2">Article Image</label>
                    
                    {/* Image Preview */}
                    {editingPost.image && (
                      <div className="mb-4">
                        <img
                          src={editingPost.image}
                          alt="Article preview"
                          className="w-full h-32 object-cover rounded-lg border border-white/20"
                        />
                      </div>
                    )}
                    
                    {/* Upload Options */}
                    <div className="space-y-3">
                      {/* File Upload */}
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-gray-800 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                        >
                          {uploadingImage ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5" />
                              <span>Upload Image</span>
                            </>
                          )}
                        </button>
                        <p className="text-xs text-gray-800/60 mt-1">Max 5MB, JPG/PNG/GIF</p>
                      </div>
                      
                      {/* URL Input */}
                      <div>
                        <input
                          type="text"
                          value={editingPost.image}
                          onChange={(e) => handleImageUrlChange(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-800 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Or enter image URL (e.g., /projects/example/1.jpg)"
                        />
                      </div>
                      
                      {/* Project Images Quick Select */}
                      <div>
                        <label className="block text-gray-800/80 text-sm mb-2">Quick Select from Projects:</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['/projects/teamlab/1.jpg', '/projects/buzzfeed/1.jpg', '/projects/ameba/1.png', '/projects/OpenAI/1.png', '/projects/muji/1.png', '/projects/cookpad/1.jpg'].map((imgPath) => (
                            <button
                              key={imgPath}
                              onClick={() => handleImageUrlChange(imgPath)}
                              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-xs text-gray-800/80"
                            >
                              {imgPath.split('/').pop()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleSavePost}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-gray-800 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{isCreating ? 'Create Article' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-8 py-3 border border-white/20 hover:border-white/40 text-gray-800 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;