import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import { User } from './types';

// Create user document in Firestore
const createUserDocument = async (firebaseUser: FirebaseUser, additionalData?: any) => {
  if (!firebaseUser) return;

  const userRef = doc(db, 'users', firebaseUser.uid);
  
  try {
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email, photoURL } = firebaseUser;
      const createdAt = serverTimestamp();

      await setDoc(userRef, {
        displayName,
        email,
        avatarUrl: photoURL,
        createdAt,
        lastSeenAt: serverTimestamp(),
        isOnline: true,
        publicFlags: {
          isBanned: false,
          isVerified: false
        },
        ...additionalData
      });
      
      console.log('User document created successfully');
    } else {
      console.log('User document already exists');
    }
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error; // Re-throw to handle in the calling function
  }

  return userRef;
};

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    console.log('Creating user account...');
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User account created:', user.uid);
    
    // Update the user's display name
    console.log('Updating user profile...');
    await updateProfile(user, { displayName });
    console.log('User profile updated');
    
    // Create user document
    console.log('Creating user document...');
    await createUserDocument(user);
    console.log('User document created');
    
    // Wait a moment for the document to be fully written
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { user, error: null };
  } catch (error: any) {
    console.error('Sign up error:', error);
    return { user: null, error: error.message };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Update user profile
export const updateUserProfile = async (updates: Partial<User>) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');

  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      ...updates,
      lastSeenAt: serverTimestamp()
    }, { merge: true });
    
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get user document from Firestore
export const getUserDocument = async (uid: string): Promise<User | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        uid: data.uid || uid,
        displayName: data.displayName || '',
        email: data.email || '',
        avatarUrl: data.avatarUrl,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastSeenAt: data.lastSeenAt?.toDate() || new Date(),
        isOnline: data.isOnline || false,
        publicFlags: data.publicFlags || {}
      };
    }
    
    // If document doesn't exist, wait a bit and try again (for race conditions)
    console.log('User document not found, waiting and retrying...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const retrySnap = await getDoc(userRef);
    if (retrySnap.exists()) {
      const data = retrySnap.data();
      return {
        uid: data.uid || uid,
        displayName: data.displayName || '',
        email: data.email || '',
        avatarUrl: data.avatarUrl,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastSeenAt: data.lastSeenAt?.toDate() || new Date(),
        isOnline: data.isOnline || false,
        publicFlags: data.publicFlags || {}
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user document:', error);
    return null;
  }
};
