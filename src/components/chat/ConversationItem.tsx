import React from 'react';
import { MessageCircle, Users, Globe } from 'lucide-react';
import { Conversation } from '../../firebase/types';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  currentUserId: string;
  onClick: () => void;
  userNames?: Record<string, string>;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  currentUserId,
  onClick,
  userNames = {}
}) => {
  const getOtherParticipant = () => {
    return conversation.participants.find(uid => uid !== currentUserId);
  };

  const getDisplayName = () => {
    if (conversation.id === 'general_chat') {
      return 'General Chat';
    }
    if (conversation.type === 'group') {
      return conversation.metadata?.title || 'Group Chat';
    }
    // For DM, show the other participant's name
    if (conversation.type === 'dm') {
      const otherParticipant = getOtherParticipant();
      if (otherParticipant && userNames[otherParticipant]) {
        return userNames[otherParticipant];
      }
      return 'Direct Message';
    }
    return 'Direct Message';
  };

  const getLastMessagePreview = () => {
    if (conversation.lastMessage) {
      const isFromCurrentUser = conversation.lastMessage.senderUid === currentUserId;
      const prefix = isFromCurrentUser ? 'You: ' : '';
      return prefix + conversation.lastMessage.textPreview;
    }
    return 'No messages yet';
  };

  const getUnreadCount = () => {
    return conversation.unreadCounts[currentUserId] || 0;
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const unreadCount = getUnreadCount();
  const otherParticipant = getOtherParticipant();

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-blue-500/30 border border-blue-500/50'
          : 'hover:bg-white/10 border border-transparent'
      }`}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            {conversation.id === 'general_chat' ? (
              <Globe className="w-6 h-6 text-white" />
            ) : conversation.type === 'group' ? (
              <Users className="w-6 h-6 text-white" />
            ) : (
              <MessageCircle className="w-6 h-6 text-white" />
            )}
          </div>
          {/* Online indicator for DM */}
          {conversation.type === 'dm' && otherParticipant && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white font-medium text-sm truncate">
              {getDisplayName()}
            </h3>
            {conversation.lastMessage && (
              <span className="text-gray-400 text-xs">
                {formatLastMessageTime(conversation.lastMessage.createdAt)}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-300 text-sm truncate">
              {getLastMessagePreview()}
            </p>
            {unreadCount > 0 && (
              <div className="ml-2 bg-blue-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-2">
                {unreadCount > 99 ? '99+' : unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
