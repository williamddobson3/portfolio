import React, { useState, useEffect } from 'react';
import { ChatSidebar } from './chat/ChatSidebar';
import { ChatMain } from './chat/ChatMain';
import { ChatAuth } from './chat/ChatAuth';
import { Navigation } from './Navigation';
import { LoadingAnimation } from './LoadingAnimation';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';

export const ChatPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { createGeneralChat, conversations } = useChat();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('chat');

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    // Update the URL hash
    window.location.hash = page === 'chat' ? '#chat' : `#${page}`;
  };

  // Auto-select general chat if available
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversationId) {
      const generalChat = conversations.find(conv => conv.id === 'general_chat');
      if (generalChat) {
        setSelectedConversationId('general_chat');
      }
    }
  }, [conversations, selectedConversationId]);

  // Auto-open general chat when user first logs in
  useEffect(() => {
    if (user && !selectedConversationId) {
      const initializeGeneralChat = async () => {
        try {
          const generalChat = await createGeneralChat();
          if (generalChat) {
            setSelectedConversationId(generalChat.id);
          } else {
            // Fallback: try to set the general chat ID directly
            setSelectedConversationId('general_chat');
          }
        } catch (error) {
          // Fallback: try to set the general chat ID directly
          setSelectedConversationId('general_chat');
        }
      };
      
      // Create general chat immediately, no delay
      initializeGeneralChat();
    }
  }, [user, selectedConversationId, createGeneralChat]);

  // Show loading animation while authenticating
  if (authLoading) {
    return <LoadingAnimation />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Navigation currentPage="chat" />
        <ChatAuth />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="flex h-screen">
        {/* Mobile menu button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-black/30 backdrop-blur-md border border-white/20 rounded-full p-3 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Sidebar */}
        <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-40 w-80 h-full bg-black/20 backdrop-blur-md border-r border-white/10 transition-transform duration-300 ease-in-out`}>
            <ChatSidebar
              selectedConversationId={selectedConversationId}
              onSelectConversation={setSelectedConversationId}
              onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
              onNavigate={handleNavigation}
              currentPage={currentPage}
            />
        </div>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {selectedConversationId ? (
            <ChatMain
              conversationId={selectedConversationId}
              onBack={() => setSelectedConversationId(null)}
              onSelectConversation={setSelectedConversationId}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to Chat</h2>
                <p className="text-gray-300 mb-6">Select a conversation to start messaging</p>
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors"
                >
                  Browse Conversations
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
