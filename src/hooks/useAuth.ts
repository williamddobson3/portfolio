import { useState, useEffect } from 'react';
import { onAuthStateChange, getUserDocument } from '../firebase/auth';
import { User } from '../firebase/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        // Create a basic user object first
        const basicUser = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          avatarUrl: firebaseUser.photoURL || '',
          createdAt: new Date(),
          lastSeenAt: new Date(),
          isOnline: true,
          publicFlags: {}
        };
        
        setUser(basicUser);
        setIsLoading(false);
        
        // Then try to get the full user document
        try {
          const userDoc = await getUserDocument(firebaseUser.uid);
          if (userDoc) {
            setUser(userDoc);
          }
        } catch (error) {
          console.log('Could not fetch user document, using basic user info');
        }
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading };
};
