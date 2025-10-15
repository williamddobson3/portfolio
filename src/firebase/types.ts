// Firebase data types for the chat system

export interface User {
  uid: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
  lastSeenAt: Date;
  isOnline: boolean;
  publicFlags?: {
    isBanned?: boolean;
    isVerified?: boolean;
  };
}

export interface Conversation {
  id: string;
  participants: string[]; // Array of user UIDs
  type: 'dm' | 'group';
  createdAt: Date;
  lastMessage?: {
    textPreview: string;
    senderUid: string;
    createdAt: Date;
  };
  lastMessageAt: Date;
  unreadCounts: Record<string, number>; // uid -> unread count
  lastReadAt: Record<string, Date>; // uid -> last read timestamp
  metadata?: {
    archived: boolean;
    pinned: boolean;
    title?: string; // For group chats
  };
}

export interface Message {
  id: string;
  senderUid: string;
  text: string;
  createdAt: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  deleted: boolean;
  editedAt?: Date;
  metadata?: {
    replyTo?: string; // Message ID being replied to
    reactionCounts?: Record<string, number>; // emoji -> count
  };
}

export interface TypingIndicator {
  uid: string;
  isTyping: boolean;
  timestamp: Date;
}

export interface Presence {
  uid: string;
  isOnline: boolean;
  lastSeenAt: Date;
}

export interface Report {
  id: string;
  messageRef: string;
  reporterUid: string;
  reason: string;
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface Ban {
  uid: string;
  reason: string;
  until: Date;
  createdAt: Date;
  createdBy: string;
}

// Chat UI state types
export interface ChatState {
  currentConversationId: string | null;
  conversations: Conversation[];
  messages: Record<string, Message[]>; // conversationId -> messages
  typingUsers: Record<string, string[]>; // conversationId -> typing user UIDs
  onlineUsers: string[];
  searchQuery: string;
  isSearching: boolean;
}

// Authentication state
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Message status for optimistic updates
export interface OptimisticMessage extends Message {
  tempId: string;
  isOptimistic: boolean;
}
