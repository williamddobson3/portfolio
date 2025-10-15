import React, { useState, useEffect } from 'react';
import { Users, User as UserIcon, Circle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { User } from '../../firebase/types';

interface UsersListProps {
  conversationId: string;
  onSelectConversation?: (conversationId: string) => void;
}

export const UsersList: React.FC<UsersListProps> = ({ conversationId, onSelectConversation }) => {
  const { user: currentUser } = useAuth();
  const { onlineUsers, getAllUsersList, listenToOnlineUsers, createDMConversation } = useChat();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get all users
  useEffect(() => {
    const fetchUsers = async () => {
      if (currentUser) {
        try {
          setIsLoading(true);
          const users = await getAllUsersList(currentUser.uid);
          setAllUsers(users);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUsers();
  }, [currentUser, getAllUsersList]);

  // Listen to online users
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = listenToOnlineUsers([currentUser.uid]);
      return unsubscribe;
    }
  }, [currentUser, listenToOnlineUsers]);

  const getOnlineStatus = (userId: string) => {
    return onlineUsers.includes(userId);
  };

  const formatLastSeen = (lastSeenAt: Date) => {
    const now = new Date();
    const diff = now.getTime() - lastSeenAt.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Online';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return lastSeenAt.toLocaleDateString();
  };

  const handleUserClick = async (user: User) => {
    if (!currentUser || user.uid === currentUser.uid) return;
    
    try {
      console.log('Creating DM with user:', user.displayName);
      const dmConversation = await createDMConversation(currentUser.uid, user.uid);
      if (dmConversation && onSelectConversation) {
        console.log('DM created, selecting conversation:', dmConversation.id);
        onSelectConversation(dmConversation.id);
      }
    } catch (error) {
      console.error('Error creating DM conversation:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-80 bg-black/20 backdrop-blur-md border-l border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-white" />
            <h3 className="text-white font-medium">Users</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
            <p className="text-sm">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-black/20 backdrop-blur-md border-l border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-white" />
          <h3 className="text-white font-medium">Users</h3>
          <span className="text-gray-400 text-sm">({allUsers.length})</span>
        </div>
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto">
        {allUsers.length === 0 ? (
          <div className="p-4 text-center">
            <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No users found</p>
          </div>
        ) : (
          <div className="p-2">
            {allUsers.map((user) => {
              const isOnline = getOnlineStatus(user.uid);
              const isCurrentUser = user.uid === currentUser?.uid;
              
              return (
                <div
                  key={user.uid}
                  onClick={() => !isCurrentUser && handleUserClick(user)}
                  className={`p-3 rounded-lg transition-colors ${
                    isCurrentUser 
                      ? 'bg-blue-500/20 border border-blue-500/50 cursor-not-allowed' 
                      : 'hover:bg-white/10 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.displayName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      {/* Online indicator */}
                      {isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                      )}
                    </div>

                    {/* User info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-white font-medium text-sm truncate">
                          {user.displayName || 'Unknown User'}
                          {isCurrentUser && (
                            <span className="text-blue-400 text-xs ml-1">(You)</span>
                          )}
                        </p>
                        {isOnline && (
                          <Circle className="w-2 h-2 text-green-500 fill-current" />
                        )}
                      </div>
                      <p className="text-gray-400 text-xs truncate">
                        {isOnline ? 'Online' : formatLastSeen(user.lastSeenAt)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-gray-400 text-xs">
            {onlineUsers.length} user{onlineUsers.length !== 1 ? 's' : ''} online
          </p>
        </div>
      </div>
    </div>
  );
};
