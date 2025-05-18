
import React, { createContext, useState, useContext, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import axios from 'axios';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD5OViCdBZYrLq2axu-2s_ryKos4YfJuE8",
  authDomain: "studyflow-spark.firebaseapp.com",
  projectId: "studyflow-spark",
  storageBucket: "studyflow-spark.appspot.com",
  messagingSenderId: "395281622509",
  appId: "1:395281622509:web:76f3425eb34a3a939dfc4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// API base URL
const API_URL = 'http://localhost:5000/api';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: any;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          await refreshUserProfile();
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Get Firebase ID token
  const getIdToken = async (): Promise<string | null> => {
    if (!currentUser) return null;
    return await currentUser.getIdToken();
  };

  // Fetch user profile from our backend
  const refreshUserProfile = async (): Promise<void> => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserProfile({...response.data.user, isNewUser: response.data.isNewUser});
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      // Register user in our backend
      const response = await axios.post(`${API_URL}/auth/register`, {
        token,
        displayName
      });
      
      // Set isNewUser flag
      setUserProfile({...response.data.user, isNewUser: response.data.isNewUser});
    } catch (error) {
      console.error('Error during sign up:', error);
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await refreshUserProfile();
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      
      // Register user in our backend
      const response = await axios.post(`${API_URL}/auth/register`, {
        token,
        displayName: result.user.displayName
      });
      
      // Set isNewUser flag
      setUserProfile({...response.data.user, isNewUser: response.data.isNewUser});
    } catch (error) {
      console.error('Error during Google sign in:', error);
      throw error;
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    getIdToken,
    refreshUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
