import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter, 
  onSnapshot, 
  writeBatch, 
  serverTimestamp,
  Timestamp,
  DocumentSnapshot,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './config';
import { Conversation, Message, User, Report } from './types';

// Collections
const CONVERSATIONS_COLLECTION = 'conversations';
const MESSAGES_COLLECTION = 'messages';
const USERS_COLLECTION = 'users';
const REPORTS_COLLECTION = 'reports';

// Generate deterministic conversation ID for DMs
export const generateConversationId = (uid1: string, uid2: string): string => {
  const sorted = [uid1, uid2].sort();
  return `dm_${sorted[0]}_${sorted[1]}`;
};

// Create or get DM conversation
export const createOrGetDMConversation = async (uid1: string, uid2: string): Promise<Conversation | null> => {
  try {
    const conversationId = generateConversationId(uid1, uid2);
    const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
    const conversationSnap = await getDoc(conversationRef);

    if (conversationSnap.exists()) {
      const data = conversationSnap.data();
      return {
        id: conversationId,
        participants: data.participants,
        type: data.type,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastMessage: data.lastMessage ? {
          textPreview: data.lastMessage.textPreview,
          senderUid: data.lastMessage.senderUid,
          createdAt: data.lastMessage.createdAt?.toDate() || new Date()
        } : undefined,
        lastMessageAt: data.lastMessageAt?.toDate() || new Date(),
        unreadCounts: data.unreadCounts || {},
        lastReadAt: Object.fromEntries(
          Object.entries(data.lastReadAt || {}).map(([key, value]) => [key, (value as Timestamp).toDate()])
        ),
        metadata: data.metadata || { archived: false, pinned: false }
      };
    } else {
      // Create new conversation
      const newConversation = {
        participants: [uid1, uid2],
        type: 'dm',
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
        unreadCounts: { [uid1]: 0, [uid2]: 0 },
        lastReadAt: { [uid1]: serverTimestamp(), [uid2]: serverTimestamp() },
        metadata: { archived: false, pinned: false }
      };

      await updateDoc(conversationRef, newConversation);
      
      return {
        id: conversationId,
        participants: [uid1, uid2],
        type: 'dm',
        createdAt: new Date(),
        lastMessageAt: new Date(),
        unreadCounts: { [uid1]: 0, [uid2]: 0 },
        lastReadAt: { [uid1]: new Date(), [uid2]: new Date() },
        metadata: { archived: false, pinned: false }
      };
    }
  } catch (error) {
    console.error('Error creating/getting DM conversation:', error);
    return null;
  }
};

// Get user's conversations
export const getUserConversations = (uid: string, callback: (conversations: Conversation[]) => void) => {
  const conversationsRef = collection(db, CONVERSATIONS_COLLECTION);
  
  // First try with the composite index, if it fails, use a simpler query
  const q = query(
    conversationsRef,
    where('participants', 'array-contains', uid)
  );

  return onSnapshot(q, (snapshot) => {
    const conversations: Conversation[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      conversations.push({
        id: doc.id,
        participants: data.participants,
        type: data.type,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastMessage: data.lastMessage ? {
          textPreview: data.lastMessage.textPreview,
          senderUid: data.lastMessage.senderUid,
          createdAt: data.lastMessage.createdAt?.toDate() || new Date()
        } : undefined,
        lastMessageAt: data.lastMessageAt?.toDate() || new Date(),
        unreadCounts: data.unreadCounts || {},
        lastReadAt: Object.fromEntries(
          Object.entries(data.lastReadAt || {}).map(([key, value]) => [key, (value as Timestamp).toDate()])
        ),
        metadata: data.metadata || { archived: false, pinned: false }
      });
    });
    
    // Sort conversations by lastMessageAt on the client side
    conversations.sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
    callback(conversations);
  });
};

// Send message
export const sendMessage = async (
  conversationId: string, 
  senderUid: string, 
  text: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION);
    const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);

    const batch = writeBatch(db);

    // Add message
    const messageData = {
      senderUid,
      text: text.trim(),
      createdAt: serverTimestamp(),
      status: 'sent',
      deleted: false
    };

    const messageRef = doc(messagesRef);
    batch.set(messageRef, messageData);

    // Update conversation metadata
    const conversationUpdate = {
      lastMessage: {
        textPreview: text.trim().substring(0, 100),
        senderUid,
        createdAt: serverTimestamp()
      },
      lastMessageAt: serverTimestamp()
    };

    batch.update(conversationRef, conversationUpdate);

    await batch.commit();

    return { success: true, messageId: messageRef.id };
  } catch (error: any) {
    console.error('Error sending message:', error);
    return { success: false, error: error.message };
  }
};

// Get messages for a conversation
export const getConversationMessages = (
  conversationId: string, 
  callback: (messages: Message[]) => void,
  pageSize: number = 50
) => {
  const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION);
  const q = query(
    messagesRef,
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  );

  return onSnapshot(q, (snapshot) => {
    const messages: Message[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        senderUid: data.senderUid,
        text: data.text,
        createdAt: data.createdAt?.toDate() || new Date(),
        status: data.status || 'sent',
        deleted: data.deleted || false,
        editedAt: data.editedAt?.toDate(),
        metadata: data.metadata || {}
      });
    });
    // Reverse to show oldest first
    callback(messages.reverse());
  });
};

// Mark messages as read
export const markMessagesAsRead = async (conversationId: string, uid: string) => {
  try {
    const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
    await updateDoc(conversationRef, {
      [`unreadCounts.${uid}`]: 0,
      [`lastReadAt.${uid}`]: serverTimestamp()
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error marking messages as read:', error);
    return { success: false, error: error.message };
  }
};

// Search users
export const searchUsers = async (searchQuery: string, currentUid: string): Promise<User[]> => {
  try {
    if (!searchQuery.trim()) {
      return [];
    }

    const usersRef = collection(db, USERS_COLLECTION);
    const searchQueryLower = searchQuery.toLowerCase();
    
    // Create a query that searches for displayName starting with the search term
    const q = query(
      usersRef,
      where('displayName', '>=', searchQuery),
      where('displayName', '<=', searchQuery + '\uf8ff'),
      limit(10)
    );

    const snapshot = await getDocs(q);
    const users: User[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (doc.id !== currentUid) { // Exclude current user
        users.push({
          uid: doc.id,
          displayName: data.displayName || '',
          email: data.email || '',
          avatarUrl: data.avatarUrl,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastSeenAt: data.lastSeenAt?.toDate() || new Date(),
          isOnline: data.isOnline || false,
          publicFlags: data.publicFlags || {}
        });
      }
    });

    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};

// Report message
export const reportMessage = async (
  messageId: string,
  conversationId: string,
  reporterUid: string,
  reason: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const reportsRef = collection(db, REPORTS_COLLECTION);
    await addDoc(reportsRef, {
      messageRef: `${CONVERSATIONS_COLLECTION}/${conversationId}/${MESSAGES_COLLECTION}/${messageId}`,
      reporterUid,
      reason,
      createdAt: serverTimestamp(),
      status: 'pending'
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error reporting message:', error);
    return { success: false, error: error.message };
  }
};

// Delete message (soft delete)
export const deleteMessage = async (conversationId: string, messageId: string, uid: string) => {
  try {
    const messageRef = doc(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION, messageId);
    await updateDoc(messageRef, {
      deleted: true,
      deletedAt: serverTimestamp(),
      deletedBy: uid
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting message:', error);
    return { success: false, error: error.message };
  }
};
