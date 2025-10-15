import React, { useState, useEffect } from 'react';
import { Search, Plus, MessageCircle, Users, Settings, LogOut } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { ConversationItem } from './ConversationItem';
import { UserSearch } from './UserSearch';
import { signOutUser } from '../../firebase/auth';

interface ChatSidebarProps {
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onCloseMobileMenu: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  selectedConversationId,
  onSelectConversation,
  onCloseMobileMenu
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { 
    conversations, 
    searchResults, 
    isSearching, 
    searchForUsers, 
    createDMConversation,
    listenToConversations,
    listenToOnlineUsers
  } = useChat();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [unsubscribes, setUnsubscribes] = useState<(() => void)[]>([]);

  // Set up listeners when user is available
  useEffect(() => {
    if (user) {
      const unsubscribeConversations = listenToConversations(user.uid);
      setUnsubscribes(prev => [...prev, unsubscribeConversations]);
    }

    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, [user, listenToConversations]);

  // Listen to online status for conversation participants
  useEffect(() => {
    if (conversations.length > 0 && user) {
      const allParticipants = new Set<string>();
      conversations.forEach(conv => {
        conv.participants.forEach(uid => {
          if (uid !== user.uid) {
            allParticipants.add(uid);
          }
        });
      });

      if (allParticipants.size > 0) {
        const unsubscribeOnline = listenToOnlineUsers(Array.from(allParticipants));
        setUnsubscribes(prev => [...prev, unsubscribeOnline]);
      }
    }
  }, [conversations, user, listenToOnlineUsers]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (user && query.trim()) {
      searchForUsers(query, user.uid);
    }
  };

  const handleStartDM = async (targetUser: any) => {
    if (user) {
      const conversation = await createDMConversation(user.uid, targetUser.uid);
      if (conversation) {
        onSelectConversation(conversation.id);
        setShowUserSearch(false);
        setSearchQuery('');
      }
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-md">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Chat</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowUserSearch(!showUserSearch)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="New Message"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleSignOut}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* User Search */}
      {showUserSearch && (
        <div className="p-4 border-b border-white/10">
          <UserSearch
            onSelectUser={handleStartDM}
            onClose={() => setShowUserSearch(false)}
          />
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-500" />
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs text-gray-500 mt-1">Start a new chat to begin</p>
          </div>
        ) : (
          <div className="p-2">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversationId === conversation.id}
                currentUserId={user?.uid || ''}
                onClick={() => {
                  onSelectConversation(conversation.id);
                  onCloseMobileMenu();
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user.displayName?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {user.displayName || 'User'}
              </p>
              <p className="text-gray-400 text-xs truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
