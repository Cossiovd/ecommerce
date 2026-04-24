import { create } from "zustand"

export const useCartStore = create((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      // Check if product already exists, if so just update quantity
      const existingProduct = state.cart.find(p => p.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map(p => 
            p.id === product.id 
              ? { ...p, quantity: (p.quantity || 1) + (product.quantity || 1) } 
              : p
          )
        };
      }
      return { cart: [...state.cart, { ...product, quantity: product.quantity || 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter(p => p.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map(p =>
        p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p
      ),
    })),
}))