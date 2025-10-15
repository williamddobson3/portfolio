import React, { useState, useEffect } from 'react';
import { Search, User, X } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';

interface UserSearchProps {
  onSelectUser: (user: any) => void;
  onClose: () => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ onSelectUser, onClose }) => {
  const { searchResults, isSearching, searchForUsers } = useChat();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery.trim() && user) {
      const timeoutId = setTimeout(() => {
        searchForUsers(searchQuery, user.uid);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, user, searchForUsers]);

  const handleUserSelect = (selectedUser: any) => {
    onSelectUser(selectedUser);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium">Start New Chat</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="max-h-60 overflow-y-auto">
        {isSearching ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
            <span className="ml-2 text-gray-400 text-sm">Searching...</span>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-2">
            {searchResults.map((user) => (
              <div
                key={user.uid}
                onClick={() => handleUserSelect(user)}
                className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user.displayName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {user.displayName || 'Unknown User'}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {user.email}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {user.isOnline && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  <User className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery.trim() ? (
          <div className="text-center py-4">
            <User className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No users found</p>
            <p className="text-gray-500 text-xs">Try a different search term</p>
          </div>
        ) : (
          <div className="text-center py-4">
            <Search className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Search for users to start a chat</p>
          </div>
        )}
      </div>
    </div>
  );
};
