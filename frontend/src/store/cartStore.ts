import { create } from 'zustand';

type Item = {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

type CartState = {
  cart: Item[];
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getTotalPrice: () => number;
  isItemInCart: (itemId: string) => boolean;
};

const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 } // Increment quantity by 1
              : cartItem
          ),
        };
      } else {
        return {
          cart: [...state.cart, { ...item, quantity: 1 }], // New item with quantity 1
        };
      }
    }),
  removeItem: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId), // Remove item completely
    })),
  clearCart: () => set({ cart: [] }),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
  getTotalPrice: () => {
    const state = get();
    return state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
  isItemInCart: (itemId) => {
    const state = get();
    return state.cart.some((item) => item.id === itemId);
  },
}));

export { useCartStore };
