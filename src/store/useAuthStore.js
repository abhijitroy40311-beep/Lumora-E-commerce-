import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, isFirebaseInitialized } from '../lib/firebase';
import { useStore } from './useStore';

const googleProvider = new GoogleAuthProvider();

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,
  
  initAuth: () => {
    if (!isFirebaseInitialized) {
      set({ user: null, loading: false, error: 'Firebase is not initialized. Please configure API keys.' });
      return () => {};
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
    return unsubscribe;
  },

  signInWithGoogle: async () => {
    if (!isFirebaseInitialized) throw new Error('Firebase not initialized');
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      set({ user: userCredential.user, loading: false });
      return userCredential.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  signUp: async (email, password) => {
    if (!isFirebaseInitialized) throw new Error('Firebase not initialized');
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, loading: false });
      return userCredential.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  signIn: async (email, password) => {
    if (!isFirebaseInitialized) throw new Error('Firebase not initialized');
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, loading: false });
      return userCredential.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    if (!isFirebaseInitialized) return;
    set({ loading: true, error: null });
    try {
      await signOut(auth);
      set({ user: null, loading: false });
      useStore.getState().clearAllData();
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));
