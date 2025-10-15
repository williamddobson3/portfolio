import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCcsdbQdinX653JiXXtWEm56usV-m0dM5g",
  authDomain: "portfolio-200334.firebaseapp.com",
  projectId: "portfolio-200334",
  storageBucket: "portfolio-200334.firebasestorage.app",
  messagingSenderId: "301294789803",
  appId: "1:301294789803:web:8c5a99225ee521505f43ee",
  measurementId: "G-S345ZH831X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

// Initialize Analytics (only in production)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
