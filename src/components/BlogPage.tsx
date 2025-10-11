import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Clock, Search, Filter, ArrowRight, BookOpen, User, Eye, Heart, ChevronLeft, ChevronRight, Edit3, Save, X, Plus, Upload } from 'lucide-react';

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
  const { t } = useLanguage();
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
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Building High-Performance Web Applications with React and Next.js',
      excerpt: 'Learn how to create lightning-fast web applications using modern React patterns, Next.js optimization techniques, and performance best practices.',
      content: `In today's competitive digital landscape, web application performance is crucial for user engagement and business success. This comprehensive guide covers everything you need to know about building high-performance web applications using React and Next.js.

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

## Real-World Results

In my recent projects, implementing these techniques has resulted in:
- **40% faster page load times**
- **60% improvement in Core Web Vitals**
- **2x better user engagement metrics**

The key is understanding your users' needs and optimizing accordingly.`,
      author: 'Keishin',
      date: '2024-01-15',
      readTime: '8 min',
      category: 'Web Development',
      tags: ['React', 'Next.js', 'Performance', 'Web Development'],
      image: '/projects/buzzfeed/1.jpg',
      views: 1247,
      likes: 89,
      featured: true
    },
    {
      id: '2',
      title: 'Android App Development with Jetpack Compose: A Complete Guide',
      excerpt: 'Discover the power of Jetpack Compose for creating modern, responsive Android applications with less code and better performance.',
      content: `Jetpack Compose has revolutionized Android development by providing a declarative UI framework that's both powerful and intuitive. This guide covers everything from basic concepts to advanced patterns.

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

In my recent Android project, Jetpack Compose reduced development time by 30% while improving code maintainability significantly.`,
      author: 'Keishin',
      date: '2024-01-10',
      readTime: '12 min',
      category: 'Mobile Development',
      tags: ['Android', 'Jetpack Compose', 'Mobile Development', 'Kotlin'],
      image: '/projects/ameba/1.png',
      views: 892,
      likes: 67,
      featured: true
    },
    {
      id: '3',
      title: 'AI Model Development: From Prototype to Production',
      excerpt: 'A comprehensive guide to building, training, and deploying AI models in production environments with MLOps best practices.',
      content: `The journey from AI prototype to production-ready system involves numerous challenges. This guide covers the complete MLOps pipeline for successful AI deployment.

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

In my recent AI projects, implementing proper MLOps practices has resulted in:
- **50% faster model deployment**
- **90% reduction in production issues**
- **3x better model performance monitoring**

The key is treating AI models as production software, not just research experiments.`,
      author: 'Keishin',
      date: '2024-01-05',
      readTime: '15 min',
      category: 'AI/ML',
      tags: ['AI', 'MLOps', 'Machine Learning', 'Production'],
      image: '/projects/OpenAI/1.png',
      views: 1563,
      likes: 124,
      featured: true
    },
    {
      id: '4',
      title: 'Modern CSS Techniques for Stunning User Interfaces',
      excerpt: 'Explore advanced CSS techniques including Grid, Flexbox, animations, and modern layout patterns for creating beautiful user interfaces.',
      content: `CSS has evolved significantly, offering powerful tools for creating sophisticated user interfaces. This guide covers modern CSS techniques that every developer should know.

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

Implementing modern CSS techniques in my projects has resulted in:
- **25% faster rendering**
- **40% better user experience**
- **60% reduction in JavaScript bundle size**

The key is understanding when to use each technique and how they work together.`,
      author: 'Keishin',
      date: '2024-01-01',
      readTime: '10 min',
      category: 'Frontend',
      tags: ['CSS', 'Frontend', 'UI/UX', 'Web Development'],
      image: '/projects/muji/1.png',
      views: 743,
      likes: 56,
      featured: false
    },
    {
      id: '5',
      title: 'Building Scalable Backend Systems with Node.js',
      excerpt: 'Learn how to design and implement robust, scalable backend systems using Node.js, Express, and modern architectural patterns.',
      content: `Backend development requires careful consideration of scalability, performance, and maintainability. This guide covers building production-ready backend systems with Node.js.

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

Implementing these patterns in my backend projects has resulted in:
- **70% better scalability**
- **50% faster response times**
- **90% reduction in downtime**

The key is choosing the right architecture for your specific use case.`,
      author: 'Keishin',
      date: '2023-12-28',
      readTime: '14 min',
      category: 'Backend',
      tags: ['Node.js', 'Backend', 'Architecture', 'Scalability'],
      image: '/projects/cookpad/1.jpg',
      views: 1089,
      likes: 78,
      featured: false
    },
    {
      id: '6',
      title: 'The Future of Web Development: Trends and Predictions',
      excerpt: 'Explore emerging trends in web development, from WebAssembly to edge computing, and how they will shape the future of the web.',
      content: `The web development landscape is constantly evolving. This article explores current trends and future predictions for web development.

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

Staying ahead of trends in my development work has resulted in:
- **30% faster adoption of new technologies**
- **50% better client satisfaction**
- **40% increased project success rates**

The key is balancing innovation with practical application.`,
      author: 'Keishin',
      date: '2023-12-20',
      readTime: '11 min',
      category: 'Technology',
      tags: ['Future', 'Technology', 'Web Development', 'Trends'],
      image: '/projects/teamlab/1.jpg',
      views: 934,
      likes: 72,
      featured: false
    }
  ]);

  // Editing functions
  const handleEditPost = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsEditing(true);
    setSelectedPost(null);
  };

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: 'New Article Title',
      excerpt: 'Write a compelling excerpt that summarizes your article...',
      content: `# Your Article Title

Write your article content here. You can use markdown formatting:

## Section Headers
Use ## for section headers

### Subsection Headers
Use ### for subsection headers

**Bold text** and *italic text* are supported.

- Bullet points
- Work great for lists
- And organizing content

## Code Examples
\`\`\`javascript
// Code blocks are supported
const example = "Hello World";
console.log(example);
\`\`\`

## Conclusion
Wrap up your article with key takeaways and next steps.`,
      author: 'Keishin',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min',
      category: 'Web Development',
      tags: ['New Article', 'Technology'],
      image: '/projects/teamlab/1.jpg',
      views: 0,
      likes: 0,
      featured: false
    };
    setEditingPost(newPost);
    setIsCreating(true);
    setIsEditing(true);
    setSelectedPost(null); // Close any open article modal
  };

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
    
    if (isCreating) {
      // Add new article to the beginning of the list
      setBlogPosts(prev => [editingPost, ...prev]);
      alert('Article created successfully!');
    } else {
      setBlogPosts(prev => prev.map(post => 
        post.id === editingPost.id ? editingPost : post
      ));
      alert('Article updated successfully!');
    }
    
    setIsEditing(false);
    setIsCreating(false);
    setEditingPost(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setBlogPosts(prev => prev.filter(post => post.id !== postId));
      setSelectedPost(null);
    }
  };

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

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-coral-600/20"></div>
        <div className="absolute inset-0 bg-[url('/projects/teamlab/1.jpg')] bg-cover bg-center opacity-10"></div>
        
        <div className="pt-10 relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-white/80 text-sm font-medium">Technical Blog</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-coral-400">Knowledge</span>
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Deep dives into web development, mobile apps, AI/ML, and the latest technology trends. 
            Real-world experiences and practical insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse Articles</span>
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
                  placeholder="Search articles..."
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
                      {category === 'all' ? 'All Categories' : category}
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
            <h2 className="text-2xl font-bold text-white mb-8">Featured Articles</h2>
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
                      <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                        Featured
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
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-white/80 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
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
              {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory} Articles`}
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
                        <span className="text-sm">Read</span>
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
                className="p-2 bg-white/10 text-white/60 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white/10 text-white/60 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                <svg className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-coral-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {selectedPost.title}
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {selectedPost.excerpt}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-white/90 leading-relaxed">
                  {selectedPost.content}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Close
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
                <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
              </button>
              
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Edit3 className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {isCreating ? 'Create New Article' : 'Edit Article'}
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed">
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
                  <label className="block text-white font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter article title..."
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-white font-semibold mb-2">Excerpt</label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    placeholder="Enter article excerpt..."
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-white font-semibold mb-2">Content</label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 h-48 resize-none"
                    placeholder="Enter article content (supports markdown)..."
                  />
                </div>

                {/* Category and Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Category</label>
                    <select
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <label className="block text-white font-semibold mb-2">Read Time</label>
                    <input
                      type="text"
                      value={editingPost.readTime}
                      onChange={(e) => setEditingPost({...editingPost, readTime: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 5 min"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-white font-semibold mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={editingPost.tags.join(', ')}
                    onChange={(e) => setEditingPost({...editingPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., React, Next.js, Performance"
                  />
                </div>

                {/* Featured and Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Featured Article</label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={editingPost.featured}
                        onChange={(e) => setEditingPost({...editingPost, featured: e.target.checked})}
                        className="w-5 h-5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                      />
                      <span className="text-white/80">Mark as featured</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Article Image</label>
                    
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
                          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
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
                        <p className="text-xs text-white/60 mt-1">Max 5MB, JPG/PNG/GIF</p>
                      </div>
                      
                      {/* URL Input */}
                      <div>
                        <input
                          type="text"
                          value={editingPost.image}
                          onChange={(e) => handleImageUrlChange(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Or enter image URL (e.g., /projects/example/1.jpg)"
                        />
                      </div>
                      
                      {/* Project Images Quick Select */}
                      <div>
                        <label className="block text-white/80 text-sm mb-2">Quick Select from Projects:</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['/projects/teamlab/1.jpg', '/projects/buzzfeed/1.jpg', '/projects/ameba/1.png', '/projects/OpenAI/1.png', '/projects/muji/1.png', '/projects/cookpad/1.jpg'].map((imgPath) => (
                            <button
                              key={imgPath}
                              onClick={() => handleImageUrlChange(imgPath)}
                              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-xs text-white/80"
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
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{isCreating ? 'Create Article' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-8 py-3 border border-white/20 hover:border-white/40 text-white rounded-xl font-semibold transition-colors"
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