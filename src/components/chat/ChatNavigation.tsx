import React from 'react';
import { 
  Home, 
  FolderOpen, 
  User, 
  Mail, 
  MessageSquare, 
  Settings, 
  LogOut,
  Briefcase,
  Star,
  FileText,
  Globe
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface ChatNavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const ChatNavigation: React.FC<ChatNavigationProps> = ({ onNavigate, currentPage }) => {
  const { user } = useAuth();

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '#home',
      description: 'Portfolio overview'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderOpen,
      path: '#projects',
      description: 'My work portfolio'
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: Star,
      path: '#skills',
      description: 'Technical expertise'
    },
    {
      id: 'about',
      label: 'About',
      icon: User,
      path: '#about',
      description: 'About me'
    },
    {
      id: 'services',
      label: 'Services',
      icon: Briefcase,
      path: '#services',
      description: 'What I offer'
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: Star,
      path: '#testimonials',
      description: 'Client reviews'
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: FileText,
      path: '#blog',
      description: 'Latest articles'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Mail,
      path: '#contact',
      description: 'Get in touch'
    }
  ];

  const handleNavigation = (item: typeof navigationItems[0]) => {
    // Update the URL hash
    window.location.hash = item.path;
    // Call the navigation handler
    onNavigate(item.id);
  };

  const handleLogout = () => {
    // This would typically call a logout function
    window.location.reload();
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900/50 to-gray-800/30 backdrop-blur-md border-t border-white/10">
      {/* User Info */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user?.displayName?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {user?.displayName || 'User'}
            </p>
            <p className="text-gray-400 text-xs truncate">
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Navigation
          </h3>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                  }`} />
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-blue-400' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Chat Section */}
        <div className="p-4 border-t border-white/10">
          <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Chat
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => handleNavigation({ id: 'chat', label: 'Chat', icon: MessageSquare, path: '#chat', description: 'Live chat' })}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                currentPage === 'chat'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <MessageSquare className={`w-5 h-5 flex-shrink-0 ${
                currentPage === 'chat' ? 'text-green-400' : 'text-gray-400 group-hover:text-white'
              }`} />
              <div className="flex-1 text-left">
                <p className={`text-sm font-medium ${
                  currentPage === 'chat' ? 'text-green-400' : 'text-gray-300 group-hover:text-white'
                }`}>
                  Live Chat
                </p>
                <p className="text-xs text-gray-500 group-hover:text-gray-400">
                  Real-time messaging
                </p>
              </div>
              {currentPage === 'chat' && (
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10">
        <div className="space-y-2">
          <button
            onClick={() => window.open('#', '_blank')}
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200 group"
          >
            <Globe className="w-5 h-5 text-gray-400 group-hover:text-white" />
            <span className="text-sm">Visit Website</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
