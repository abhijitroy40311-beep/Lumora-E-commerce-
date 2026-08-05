import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      isCartOpen: false,

      // UI Actions
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      // Cart Actions
      addToCart: (product, quantity = 1, color = null) => set((state) => {
        const existingItemIndex = state.cart.findIndex(
          (item) => item.id === product.id && item.color === color
        );

        if (existingItemIndex > -1) {
          const newCart = [...state.cart];
          newCart[existingItemIndex].quantity += quantity;
          return { cart: newCart };
        };
        
        return { 
          cart: [...state.cart, { ...product, quantity, color: color || (product.colors ? product.colors[0] : null) }] 
        };
      }),

      removeFromCart: (productId, color) => set((state) => ({
        cart: state.cart.filter((item) => !(item.id === productId && item.color === color))
      })),

      updateQuantity: (productId, color, quantity) => set((state) => ({
        cart: state.cart.map((item) => {
          if (item.id === productId && item.color === color) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        })
      })),

      clearCart: () => set({ cart: [] }),
      clearWishlist: () => set({ wishlist: [] }),
      clearAllData: () => set({ cart: [], wishlist: [] }),
      setCartAndWishlist: (cart, wishlist) => set({ cart, wishlist }),

      // Wishlist Actions
      toggleWishlist: (product) => set((state) => {
        const isWishlisted = state.wishlist.some(item => item.id === product.id);
        if (isWishlisted) {
          return { wishlist: state.wishlist.filter(item => item.id !== product.id) };
        }
        return { wishlist: [...state.wishlist, product] };
      }),

      // Getters
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getCartCount: () => {
         const { cart } = get();
         return cart.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'lumora-storage',
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    }
  )
);
