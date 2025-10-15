import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';
import { Conversation } from '../../firebase/types';

interface ChatMainProps {
  conversationId: string;
  onBack: () => void;
}

export const ChatMain: React.FC<ChatMainProps> = ({ conversationId, onBack }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { 
    conversations, 
    messages, 
    typingUsers,
    listenToMessages,
    listenToTyping,
    sendMessageToConversation,
    markAsRead,
    setTyping
  } = useChat();

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find the current conversation
  useEffect(() => {
    const currentConversation = conversations.find(conv => conv.id === conversationId);
    setConversation(currentConversation || null);
  }, [conversations, conversationId]);

  // Set up message and typing listeners
  useEffect(() => {
    if (conversationId && user) {
      const unsubscribeMessages = listenToMessages(conversationId);
      const unsubscribeTyping = listenToTyping(conversationId);

      return () => {
        unsubscribeMessages();
        unsubscribeTyping();
      };
    }
  }, [conversationId, user, listenToMessages, listenToTyping]);

  // Mark messages as read when conversation is opened
  useEffect(() => {
    if (conversationId && user) {
      markAsRead(conversationId, user.uid);
    }
  }, [conversationId, user, markAsRead]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages[conversationId]]);

  const handleSendMessage = async (text: string) => {
    if (!user || !text.trim()) return;

    try {
      await sendMessageToConversation(conversationId, user.uid, text);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTyping = (isTyping: boolean) => {
    if (!user) return;

    if (isTyping) {
      setTyping(conversationId, user.uid, true);
      
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(conversationId, user.uid, false);
      }, 3000);
    } else {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setTyping(conversationId, user.uid, false);
    }
  };

  const getOtherParticipant = () => {
    if (!conversation || !user) return null;
    return conversation.participants.find(uid => uid !== user.uid);
  };

  const getDisplayName = () => {
    if (!conversation) return 'Chat';
    if (conversation.type === 'group') {
      return conversation.metadata?.title || 'Group Chat';
    }
    return 'Direct Message';
  };

  const getTypingText = () => {
    const typingUserIds = typingUsers[conversationId] || [];
    if (typingUserIds.length === 0) return '';
    
    if (typingUserIds.length === 1) {
      return 'Someone is typing...';
    } else {
      return `${typingUserIds.length} people are typing...`;
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {getDisplayName().charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-white font-medium">{getDisplayName()}</h2>
                <p className="text-gray-400 text-sm">
                  {conversation.type === 'dm' ? 'Direct Message' : `${conversation.participants.length} members`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Video className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Info className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList
          messages={messages[conversationId] || []}
          currentUserId={user?.uid || ''}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      {getTypingText() && (
        <div className="px-4 py-2 bg-black/10 border-t border-white/10">
          <p className="text-gray-400 text-sm italic">{getTypingText()}</p>
        </div>
      )}

      {/* Message composer */}
      <div className="bg-black/20 backdrop-blur-md border-t border-white/10 p-4">
        <MessageComposer
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
        />
      </div>
    </div>
  );
};
