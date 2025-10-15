import React from 'react';
import { 
  Home, 
  FolderOpen, 
  User, 
  Mail, 
  MessageSquare, 
  X,
  Briefcase,
  Star,
  FileText,
  Globe,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const NavigationModal: React.FC<NavigationModalProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate, 
  currentPage 
}) => {
  const { user } = useAuth();

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      description: 'Portfolio overview',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderOpen,
      description: 'My work portfolio',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: Star,
      description: 'Technical expertise',
      color: 'from-yellow-500 to-yellow-600',
      hoverColor: 'hover:from-yellow-600 hover:to-yellow-700'
    },
    {
      id: 'about',
      label: 'About',
      icon: User,
      description: 'About me',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      id: 'services',
      label: 'Services',
      icon: Briefcase,
      description: 'What I offer',
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-700'
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: Star,
      description: 'Client reviews',
      color: 'from-pink-500 to-pink-600',
      hoverColor: 'hover:from-pink-600 hover:to-pink-700'
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: FileText,
      description: 'Latest articles',
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Mail,
      description: 'Get in touch',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700'
    }
  ];

  const handleNavigation = (item: typeof navigationItems[0]) => {
    onNavigate(item.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-container fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="nav-modal bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white leading-tight">Portfolio Navigation</h2>
              <p className="text-gray-400 text-sm mt-1">Choose a section to explore</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user.displayName?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg leading-tight">
                  Welcome back, {user.displayName || 'User'}!
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Explore different sections of my portfolio
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Currently in</p>
                <p className="text-blue-400 font-medium capitalize">{currentPage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Grid */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`group relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-br ${item.color} text-white shadow-lg shadow-blue-500/25`
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20' 
                        : `bg-gradient-to-br ${item.color} ${item.hoverColor}`
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isActive ? 'text-white' : 'text-white'
                      }`} />
                    </div>
                    <div className="text-center">
                      <p className={`font-semibold text-xs leading-tight ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {item.label}
                      </p>
                      <p className={`text-xs mt-1 leading-tight ${
                        isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-400'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Special Chat Section */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base leading-tight">Live Chat</h3>
                  <p className="text-gray-400 text-sm">Real-time messaging with other users</p>
                </div>
              </div>
              <button
                onClick={() => handleNavigation({ id: 'chat', label: 'Chat', icon: MessageSquare, description: 'Live chat', color: '', hoverColor: '' })}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                  currentPage === 'chat'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white'
                }`}
              >
                {currentPage === 'chat' ? 'Current' : 'Enter Chat'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open('#', '_blank')}
                className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Website</span>
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Navigate through my portfolio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
