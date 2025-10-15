import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';
import { UsersList } from './UsersList';
import { DeleteConversationModal } from './DeleteConversationModal';
import { PermissionDeniedModal } from './PermissionDeniedModal';
import { ErrorModal } from './ErrorModal';
import { Conversation } from '../../firebase/types';

interface ChatMainProps {
  conversationId: string;
  onBack: () => void;
  onSelectConversation?: (conversationId: string) => void;
}

export const ChatMain: React.FC<ChatMainProps> = ({ conversationId, onBack, onSelectConversation }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { 
    conversations, 
    messages, 
    typingUsers,
    listenToConversations,
    listenToMessages,
    listenToTyping,
    sendMessageToConversation,
    markAsRead,
    setTyping,
    deleteConversation,
    editMessage,
    deleteMessage
  } = useChat();

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPermissionDeniedModal, setShowPermissionDeniedModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find the current conversation
  useEffect(() => {
    console.log('Looking for conversation:', conversationId);
    console.log('Available conversations:', conversations);
    const currentConversation = conversations.find(conv => conv.id === conversationId);
    console.log('Found conversation:', currentConversation);
    setConversation(currentConversation || null);
  }, [conversations, conversationId]);

  // Set up conversation listener
  useEffect(() => {
    if (user) {
      console.log('Setting up conversation listener in ChatMain for user:', user.uid);
      const unsubscribeConversations = listenToConversations(user.uid);
      return () => unsubscribeConversations();
    }
  }, [user, listenToConversations]);

  // Set up message and typing listeners
  useEffect(() => {
    if (conversationId && user) {
      console.log('Setting up message listener for conversation:', conversationId);
      const unsubscribeMessages = listenToMessages(conversationId);
      const unsubscribeTyping = listenToTyping(conversationId);

      return () => {
        unsubscribeMessages();
        unsubscribeTyping();
      };
    }
  }, [conversationId, user, listenToMessages, listenToTyping]);

  // Debug messages
  useEffect(() => {
    console.log('Messages for conversation', conversationId, ':', messages[conversationId]);
  }, [messages, conversationId]);

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
      // If conversation is not found, try to create it first
      if (!conversation && conversationId === 'general_chat') {
        console.log('Conversation not found, attempting to create general chat...');
        // The general chat should be created by the ChatPage, but we can try to send anyway
        // Firebase will handle the case where the conversation doesn't exist
      }
      
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

  const handleDeleteConversation = () => {
    if (!user || !conversation) return;
    
    // Only allow deletion of DM conversations by the creator
    if (conversation.type !== 'dm') {
      setShowPermissionDeniedModal(true);
      return;
    }
    
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!user || !conversation) return;
    
    setIsDeleting(true);
    
    try {
      console.log('Deleting conversation:', conversationId);
      const result = await deleteConversation(conversationId, user.uid);
      
      if (result.success) {
        console.log('Conversation deleted successfully');
        setShowDeleteModal(false);
        // Go back to the conversation list
        onBack();
      } else {
        console.error('Failed to delete conversation:', result.error);
        setErrorMessage(result.error || 'An unknown error occurred');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      setErrorMessage('An error occurred while deleting the conversation');
      setShowErrorModal(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
    }
  };

  const handleEditMessage = async (messageId: string, newText: string) => {
    if (!user) return;
    
    try {
      console.log('Editing message:', messageId, 'with new text:', newText);
      const result = await editMessage(conversationId, messageId, newText, user.uid);
      
      if (result.success) {
        console.log('Message edited successfully');
      } else {
        console.error('Failed to edit message:', result.error);
        alert(`Failed to edit message: ${result.error}`);
      }
    } catch (error) {
      console.error('Error editing message:', error);
      alert('An error occurred while editing the message');
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!user) return;
    
    try {
      console.log('Deleting message:', messageId);
      const result = await deleteMessage(conversationId, messageId, user.uid);
      
      if (result.success) {
        console.log('Message deleted successfully');
      } else {
        console.error('Failed to delete message:', result.error);
        alert(`Failed to delete message: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('An error occurred while deleting the message');
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
      <div className="flex-1 flex h-full">
        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
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
                    <span className="text-white font-medium text-sm">?</span>
                  </div>
                  <div>
                    <h2 className="text-white font-medium">Loading...</h2>
                    <p className="text-gray-400 text-sm">
                      Looking for: {conversationId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading content */}
          <div className="flex-1 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-lg">Loading conversation...</p>
              <p className="text-sm text-gray-400 mt-2">
                Available: {conversations.length} conversations
              </p>
            </div>
          </div>

          {/* Message composer - always visible */}
          <div className="bg-black/20 backdrop-blur-md border-t border-white/10 p-4">
            <MessageComposer
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
            />
          </div>
        </div>

        {/* Users list */}
        <UsersList conversationId={conversationId} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex h-full">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
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
              {/* Delete button - only show for DM conversations */}
              {conversation.type === 'dm' && (
                <button
                  onClick={handleDeleteConversation}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                  title="Delete conversation"
                >
                  <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
            <MessageList
              messages={messages[conversationId] || []}
              currentUserId={user?.uid || ''}
              onEditMessage={handleEditMessage}
              onDeleteMessage={handleDeleteMessage}
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

      {/* Users list */}
      <UsersList 
        conversationId={conversationId} 
        onSelectConversation={onSelectConversation}
      />

      {/* Delete conversation modal */}
      <DeleteConversationModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        conversationName={getDisplayName()}
        isLoading={isDeleting}
      />

      {/* Permission denied modal */}
      <PermissionDeniedModal
        isOpen={showPermissionDeniedModal}
        onClose={() => setShowPermissionDeniedModal(false)}
        title="Cannot Delete Conversation"
        message="Only DM conversations can be deleted by their creator."
      />

      {/* Error modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Delete Failed"
        message={errorMessage}
        type="error"
      />
    </div>
  );
};
