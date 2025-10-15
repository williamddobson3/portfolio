import { useState, useEffect, useCallback } from 'react';
import { 
  getUserConversations, 
  getConversationMessages, 
  sendMessage, 
  markMessagesAsRead,
  searchUsers,
  createOrGetDMConversation
} from '../firebase/firestore';
import { 
  setUserPresence, 
  listenToTypingIndicators, 
  setTypingIndicator,
  listenToUsersPresence
} from '../firebase/realtime';
import { Conversation, Message, User } from '../firebase/types';

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [typingUsers, setTypingUsers] = useState<Record<string, string[]>>({});
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Set up presence when user logs in
  const setupPresence = useCallback((uid: string) => {
    setUserPresence(uid, true);
    
    // Clean up on page unload
    const handleBeforeUnload = () => {
      setUserPresence(uid, false);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      setUserPresence(uid, false);
    };
  }, []);

  // Listen to conversations
  const listenToConversations = useCallback((uid: string) => {
    return getUserConversations(uid, (conversations) => {
      setConversations(conversations);
    });
  }, []);

  // Listen to messages for a conversation
  const listenToMessages = useCallback((conversationId: string) => {
    return getConversationMessages(conversationId, (newMessages) => {
      setMessages(prev => ({
        ...prev,
        [conversationId]: newMessages
      }));
    });
  }, []);

  // Listen to typing indicators
  const listenToTyping = useCallback((conversationId: string) => {
    return listenToTypingIndicators(conversationId, (typingUserIds) => {
      setTypingUsers(prev => ({
        ...prev,
        [conversationId]: typingUserIds
      }));
    });
  }, []);

  // Send message
  const sendMessageToConversation = useCallback(async (
    conversationId: string,
    senderUid: string,
    text: string
  ) => {
    const result = await sendMessage(conversationId, senderUid, text);
    return result;
  }, []);

  // Mark messages as read
  const markAsRead = useCallback(async (conversationId: string, uid: string) => {
    await markMessagesAsRead(conversationId, uid);
  }, []);

  // Set typing indicator
  const setTyping = useCallback((conversationId: string, uid: string, isTyping: boolean) => {
    setTypingIndicator(conversationId, uid, isTyping);
  }, []);

  // Search users
  const searchForUsers = useCallback(async (query: string, currentUid: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchUsers(query, currentUid);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Create or get DM conversation
  const createDMConversation = useCallback(async (uid1: string, uid2: string) => {
    return await createOrGetDMConversation(uid1, uid2);
  }, []);

  // Listen to online users
  const listenToOnlineUsers = useCallback((userIds: string[]) => {
    return listenToUsersPresence(userIds, (presence) => {
      const online = Object.entries(presence)
        .filter(([_, data]) => data.isOnline)
        .map(([uid, _]) => uid);
      setOnlineUsers(online);
    });
  }, []);

  return {
    conversations,
    messages,
    typingUsers,
    onlineUsers,
    searchResults,
    isSearching,
    setupPresence,
    listenToConversations,
    listenToMessages,
    listenToTyping,
    sendMessageToConversation,
    markAsRead,
    setTyping,
    searchForUsers,
    createDMConversation,
    listenToOnlineUsers
  };
};
