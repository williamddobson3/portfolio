import { useState, useEffect } from 'react';
import { onAuthStateChange, getUserDocument } from '../firebase/auth';
import { User } from '../firebase/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
            // Try to get the user document first, fallback to basic user info
            try {
              const userDoc = await getUserDocument(firebaseUser.uid);
              if (userDoc) {
                setUser(userDoc);
                setIsLoading(false);
              } else {
            // Fallback to basic user info if document doesn't exist
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
          }
            } catch (error) {
              // Fallback to basic user info
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
