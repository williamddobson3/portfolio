import { 
  collection, 
  doc, 
  addDoc, 
  setDoc,
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

// Create or get general chat conversation
export const createOrGetGeneralChat = async (): Promise<Conversation | null> => {
  try {
    const conversationId = 'general_chat';
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
          Object.entries(data.lastReadAt || {}).map(([key, value]) => [
            key, 
            value && (value as Timestamp).toDate ? (value as Timestamp).toDate() : new Date()
          ])
        ),
        metadata: data.metadata || { archived: false, pinned: false }
      };
    } else {
      // Create new general chat conversation
      const newConversation = {
        participants: [], // Empty array means everyone can join
        type: 'group',
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
        unreadCounts: {},
        lastReadAt: {},
        metadata: { 
          archived: false, 
          pinned: true,
          title: 'General Chat'
        }
      };

      await setDoc(conversationRef, newConversation);
      
      return {
        id: conversationId,
        participants: [],
        type: 'group',
        createdAt: new Date(),
        lastMessageAt: new Date(),
        unreadCounts: {},
        lastReadAt: {},
        metadata: { 
          archived: false, 
          pinned: true,
          title: 'General Chat'
        }
      };
    }
  } catch (error) {
    console.error('Error creating/getting general chat:', error);
    return null;
  }
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
          Object.entries(data.lastReadAt || {}).map(([key, value]) => [
            key, 
            value && (value as Timestamp).toDate ? (value as Timestamp).toDate() : new Date()
          ])
        ),
        metadata: data.metadata || { archived: false, pinned: false }
      };
    } else {
      // Create new conversation
      const newConversation = {
        participants: [uid1, uid2],
        type: 'dm',
        createdBy: uid1, // Set the creator
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
        unreadCounts: { [uid1]: 0, [uid2]: 0 },
        lastReadAt: { [uid1]: serverTimestamp(), [uid2]: serverTimestamp() },
        metadata: { archived: false, pinned: false }
      };

      await setDoc(conversationRef, newConversation);
      
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
  
  // Query for user's personal conversations
  const userConversationsQuery = query(
    conversationsRef,
    where('participants', 'array-contains', uid)
  );

  let userConversations: Conversation[] = [];
  let generalChat: Conversation | null = null;

  const unsubscribeUser = onSnapshot(userConversationsQuery, (snapshot) => {
    userConversations = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      userConversations.push({
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
          Object.entries(data.lastReadAt || {}).map(([key, value]) => [
            key, 
            value && (value as Timestamp).toDate ? (value as Timestamp).toDate() : new Date()
          ])
        ),
        metadata: data.metadata || { archived: false, pinned: false }
      });
    });
    updateConversations();
  });

  // Get general chat by document ID
  const generalChatRef = doc(db, CONVERSATIONS_COLLECTION, 'general_chat');
  const unsubscribeGeneral = onSnapshot(generalChatRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      generalChat = {
        id: snapshot.id,
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
          Object.entries(data.lastReadAt || {}).map(([key, value]) => [
            key, 
            value && (value as Timestamp).toDate ? (value as Timestamp).toDate() : new Date()
          ])
        ),
        metadata: data.metadata || { archived: false, pinned: false }
      };
        } else {
          generalChat = null;
        }
    updateConversations();
  });

  const updateConversations = () => {
    let allConversations = [...userConversations];
    if (generalChat) {
      allConversations.unshift(generalChat); // Put general chat at the top
    }

    // Sort conversations by lastMessageAt on the client side
    allConversations.sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
    callback(allConversations);
  };

  return () => {
    unsubscribeUser();
    unsubscribeGeneral();
  };
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
    if (snapshot.empty) {
      callback([]);
      return;
    }
    
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
        editedAt: data.editedAt?.toDate() || null,
        metadata: data.metadata || {}
      });
    });
    // Reverse to show oldest first
    callback(messages.reverse());
  }, (error) => {
    console.error('Error in getConversationMessages:', error);
    callback([]);
  });
};

// Check if messages exist for a conversation
export const checkMessagesExist = async (conversationId: string): Promise<boolean> => {
  try {
    const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION);
    const q = query(messagesRef, limit(1));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking messages existence:', error);
    return false;
  }
};

// Delete a conversation (only by creator or admin)
export const deleteConversation = async (conversationId: string, uid: string): Promise<{ success: boolean; error?: string }> => {
  try {
    
    // First, get the conversation to check permissions
    const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
    const conversationSnap = await getDoc(conversationRef);
    
    if (!conversationSnap.exists()) {
      return { success: false, error: 'Conversation not found' };
    }
    
    const conversationData = conversationSnap.data();
    
    // Check if user is the creator (for DM) or has admin rights
    const isCreator = conversationData.createdBy === uid;
    const isAdmin = conversationData.metadata?.admins?.includes(uid);
    
    if (!isCreator && !isAdmin) {
      return { success: false, error: 'You do not have permission to delete this conversation' };
    }
    
    // Delete all messages in the conversation
    const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION);
    const messagesSnapshot = await getDocs(messagesRef);
    
    const batch = writeBatch(db);
    
    // Delete all messages
    messagesSnapshot.forEach((messageDoc) => {
      batch.delete(messageDoc.ref);
    });
    
    // Delete the conversation document
    batch.delete(conversationRef);
    
    await batch.commit();
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting conversation:', error);
    return { success: false, error: error.message };
  }
};

// Edit a message
export const editMessage = async (
  conversationId: string, 
  messageId: string, 
  newText: string, 
  uid: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    
    const messageRef = doc(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION, messageId);
    
    // First, get the message to check if user is the sender
    const messageSnap = await getDoc(messageRef);
    if (!messageSnap.exists()) {
      return { success: false, error: 'Message not found' };
    }
    
    const messageData = messageSnap.data();
    if (messageData.senderUid !== uid) {
      return { success: false, error: 'You can only edit your own messages' };
    }
    
    // Update the message
    await updateDoc(messageRef, {
      text: newText.trim(),
      editedAt: serverTimestamp(),
      status: 'edited'
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Error editing message:', error);
    return { success: false, error: error.message };
  }
};

// Delete a message
export const deleteMessage = async (
  conversationId: string, 
  messageId: string, 
  uid: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    
    const messageRef = doc(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION, messageId);
    
    // First, get the message to check if user is the sender
    const messageSnap = await getDoc(messageRef);
    if (!messageSnap.exists()) {
      return { success: false, error: 'Message not found' };
    }
    
    const messageData = messageSnap.data();
    if (messageData.senderUid !== uid) {
      return { success: false, error: 'You can only delete your own messages' };
    }
    
    // Soft delete the message
    await updateDoc(messageRef, {
      deleted: true,
      text: '[Message deleted]',
      deletedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting message:', error);
    return { success: false, error: error.message };
  }
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

// Get all users
export const getAllUsers = async (currentUid: string): Promise<User[]> => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, limit(50)); // Limit to 50 users for performance

    const snapshot = await getDocs(q);
    const users: User[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
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
    });

    // Sort by online status first, then by last seen
    users.sort((a, b) => {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return b.lastSeenAt.getTime() - a.lastSeenAt.getTime();
    });

    return users;
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
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

