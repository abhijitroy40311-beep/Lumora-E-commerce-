import { useEffect, useState } from 'react';
import { useAuthStore } from './useAuthStore';
import { useStore } from './useStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth, isFirebaseInitialized } from '../lib/firebase';

const handleFirestoreError = (error, operationType, path) => {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo, null, 2));
};

export function useSyncStore() {
  const { user, loading } = useAuthStore();
  const { cart, wishlist, setCartAndWishlist } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user data on auth change
  useEffect(() => {
    let isMounted = true;
    
    async function loadUserData() {
      if (!isFirebaseInitialized) return;
      if (!user) {
        if (isMounted) setIsLoaded(false);
        return;
      }
      
      const path = `users/${user.uid}`;
      console.log(`[Firestore Read] Reading user data for UID: ${user.uid} at path: ${path}`);
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          const mergedCart = [...cart];
          (data.cart || []).forEach(item => {
            if (!mergedCart.some(c => c.id === item.id && c.color === item.color)) {
              mergedCart.push(item);
            }
          });
          
          const mergedWishlist = [...wishlist];
          (data.wishlist || []).forEach(item => {
            if (!mergedWishlist.some(w => w.id === item.id)) {
              mergedWishlist.push(item);
            }
          });
          
          setCartAndWishlist(mergedCart, mergedWishlist);
        }
      } catch (error) {
        handleFirestoreError(error, 'get', path);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    }

    if (!loading) {
      loadUserData();
    }
    
    return () => {
      isMounted = false;
    };
  }, [user, loading, setCartAndWishlist]); // Note: cart and wishlist are captured from initial render but that's fine for merging

  // Save user data on cart/wishlist change
  useEffect(() => {
    if (!isFirebaseInitialized || !user || loading || !isLoaded) return;

    // Use a timeout to debounce saves slightly if many things happen
    const timeoutId = setTimeout(async () => {
      const path = `users/${user.uid}`;
      console.log(`[Firestore Write] Writing user data for UID: ${user.uid} at path: ${path}`);
      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { cart, wishlist }, { merge: true });
      } catch (error) {
        handleFirestoreError(error, 'write', path);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [cart, wishlist, user, loading, isLoaded]);
}