import React, { useState, useEffect } from 'react';
import { Search, Plus, MessageCircle, Users, Settings, LogOut, Navigation } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { ConversationItem } from './ConversationItem';
import { UserSearch } from './UserSearch';
import { NavigationModal } from './NavigationModal';
import { signOutUser } from '../../firebase/auth';
import { Conversation } from '../../firebase/types';

interface ChatSidebarProps {
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onCloseMobileMenu: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  selectedConversationId,
  onSelectConversation,
  onCloseMobileMenu,
  onNavigate,
  currentPage = 'chat'
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { 
    conversations, 
    searchResults, 
    isSearching, 
    searchForUsers, 
    createDMConversation,
    createGeneralChat,
    listenToConversations,
    listenToOnlineUsers
  } = useChat();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showNavigationModal, setShowNavigationModal] = useState(false);
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);
  const [userNames, setUserNames] = useState<Record<string, string>>({});
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

  // Try to create general chat if it doesn't exist
  useEffect(() => {
    if (user && conversations.length === 0) {
        const createGeneralChatIfNeeded = async () => {
          try {
            const generalChat = await createGeneralChat();
          } catch (error) {
            console.error('Error creating general chat from ChatSidebar:', error);
          }
        };
      
      // Wait a bit for the conversation listener to set up, then try to create general chat
      setTimeout(createGeneralChatIfNeeded, 2000);
    }
  }, [user, conversations, createGeneralChat]);


  // Fetch user names when conversations change
  useEffect(() => {
    if (conversations.length > 0 && user) {
      fetchUserNames(conversations);
    }
  }, [conversations, user]);

  // Filter conversations based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(conv => {
        const searchLower = searchQuery.toLowerCase();
        
        // Search in conversation metadata title
        const title = conv.metadata?.title || '';
        if (title.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // For general chat, search for "general" or "chat"
        if (conv.id === 'general_chat' && 
            (searchLower.includes('general') || searchLower.includes('chat'))) {
          return true;
        }
        
        // For DM conversations, search by participant names
        if (conv.type === 'dm') {
          const otherParticipants = conv.participants.filter(uid => uid !== user?.uid);
          for (const uid of otherParticipants) {
            const userName = userNames[uid];
            if (userName && userName.toLowerCase().includes(searchLower)) {
              return true;
            }
          }
        }
        
        return false;
      });
      setFilteredConversations(filtered);
    }
  }, [conversations, searchQuery, userNames, user]);

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

  // Fetch user names for DM participants
  const fetchUserNames = async (conversations: Conversation[]) => {
    const userIds = new Set<string>();
    
    conversations.forEach(conv => {
      if (conv.type === 'dm') {
        conv.participants.forEach(uid => {
          if (uid !== user?.uid) {
            userIds.add(uid);
          }
        });
      }
    });

    if (userIds.size > 0) {
      try {
        const { getAllUsers } = await import('../../firebase/firestore');
        const allUsers = await getAllUsers(user?.uid || '');
        const nameMap: Record<string, string> = {};
        
        allUsers.forEach(u => {
          if (userIds.has(u.uid)) {
            nameMap[u.uid] = u.displayName || u.email || 'Unknown User';
          }
        });
        
        setUserNames(nameMap);
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-md">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Chat</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowUserSearch(!showUserSearch)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="New Message"
            >
              <Plus className="w-5 h-5 text-gray-800" />
            </button>
            {onNavigate && (
              <button
                onClick={() => setShowNavigationModal(true)}
                className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors group"
                title="Navigate to other pages"
              >
                <Navigation className="w-5 h-5 text-blue-400 group-hover:text-blue-300 group-hover:rotate-12 transition-all duration-300" />
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5 text-gray-800" />
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
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/20 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            {searchQuery.trim() ? (
              <>
                <Search className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                <p className="text-sm">No conversations found</p>
                <p className="text-xs text-gray-500 mt-1">Try a different search term</p>
              </>
            ) : (
              <>
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                <p className="text-sm">No conversations yet</p>
                <p className="text-xs text-gray-500 mt-1">Start a new chat to begin</p>
              </>
            )}
          </div>
        ) : (
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversationId === conversation.id}
                currentUserId={user?.uid || ''}
                userNames={userNames}
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-gray-800 font-medium text-sm">
                {user.displayName?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 font-medium text-sm truncate">
                {user.displayName || 'User'}
              </p>
              <p className="text-gray-400 text-xs truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Modal */}
      {onNavigate && (
        <NavigationModal
          isOpen={showNavigationModal}
          onClose={() => setShowNavigationModal(false)}
          onNavigate={onNavigate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};
