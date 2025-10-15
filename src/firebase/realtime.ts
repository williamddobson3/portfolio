import { 
  ref, 
  set, 
  onValue, 
  onDisconnect, 
  serverTimestamp,
  remove
} from 'firebase/database';
import { realtimeDb } from './config';

// Presence management
export const setUserPresence = (uid: string, isOnline: boolean) => {
  const presenceRef = ref(realtimeDb, `status/${uid}`);
  
  if (isOnline) {
    set(presenceRef, {
      isOnline: true,
      lastSeenAt: serverTimestamp()
    });

    // Set offline when user disconnects
    onDisconnect(presenceRef).set({
      isOnline: false,
      lastSeenAt: serverTimestamp()
    });
  } else {
    set(presenceRef, {
      isOnline: false,
      lastSeenAt: serverTimestamp()
    });
  }
};

// Listen to user presence
export const listenToUserPresence = (uid: string, callback: (isOnline: boolean, lastSeenAt: Date) => void) => {
  const presenceRef = ref(realtimeDb, `status/${uid}`);
  
  const unsubscribe = onValue(presenceRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data.isOnline, data.lastSeenAt ? new Date(data.lastSeenAt) : new Date());
    }
  });

  return unsubscribe;
};

// Listen to multiple users' presence
export const listenToUsersPresence = (uids: string[], callback: (presence: Record<string, { isOnline: boolean; lastSeenAt: Date }>) => void) => {
  const unsubscribes: (() => void)[] = [];
  const presence: Record<string, { isOnline: boolean; lastSeenAt: Date }> = {};

  uids.forEach(uid => {
    const presenceRef = ref(realtimeDb, `status/${uid}`);
    const unsubscribe = onValue(presenceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        presence[uid] = {
          isOnline: data.isOnline,
          lastSeenAt: data.lastSeenAt ? new Date(data.lastSeenAt) : new Date()
        };
        callback({ ...presence });
      }
    });
    unsubscribes.push(unsubscribe);
  });

  return () => {
    unsubscribes.forEach(unsubscribe => unsubscribe());
  };
};

// Typing indicators
export const setTypingIndicator = (conversationId: string, uid: string, isTyping: boolean) => {
  const typingRef = ref(realtimeDb, `typing/${conversationId}/${uid}`);
  
  if (isTyping) {
    set(typingRef, {
      isTyping: true,
      timestamp: serverTimestamp()
    });

    // Auto-remove typing indicator after 3 seconds
    setTimeout(() => {
      remove(typingRef);
    }, 3000);
  } else {
    remove(typingRef);
  }
};

// Listen to typing indicators for a conversation
export const listenToTypingIndicators = (conversationId: string, callback: (typingUsers: string[]) => void) => {
  const typingRef = ref(realtimeDb, `typing/${conversationId}`);
  
  const unsubscribe = onValue(typingRef, (snapshot) => {
    const data = snapshot.val();
    const typingUsers: string[] = [];
    
    if (data) {
      Object.keys(data).forEach(uid => {
        if (data[uid] && data[uid].isTyping) {
          typingUsers.push(uid);
        }
      });
    }
    
    callback(typingUsers);
  });

  return unsubscribe;
};

// Get online users count
export const getOnlineUsersCount = (callback: (count: number) => void) => {
  const statusRef = ref(realtimeDb, 'status');
  
  const unsubscribe = onValue(statusRef, (snapshot) => {
    const data = snapshot.val();
    let count = 0;
    
    if (data) {
      Object.values(data).forEach((user: any) => {
        if (user.isOnline) {
          count++;
        }
      });
    }
    
    callback(count);
  });

  return unsubscribe;
};

// Clean up presence on app close
export const cleanupPresence = (uid: string) => {
  const presenceRef = ref(realtimeDb, `status/${uid}`);
  set(presenceRef, {
    isOnline: false,
    lastSeenAt: serverTimestamp()
  });
};
