import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};

type CartState = {
  cartItems: CartItem[];
  orderNote: string;
  isGiftOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, delta: number) => void;
  setQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  setOrderNote: (note: string) => void;
  toggleGiftOpen: () => void;

  // Derived Helpers / Getters
  getTotalQuantity: () => number;
  getSubtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      orderNote: "",
      isGiftOpen: false,

      // Add Item to Store (or increment quantity if item + size exists)
      addItem: (newItem) => {
        const qtyToAdd = newItem.quantity ?? 1;
        set((state) => {
          const existingIndex = state.cartItems.findIndex(
            (item) => item.id === newItem.id && item.size === newItem.size
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.cartItems];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + qtyToAdd,
            };
            return { cartItems: updatedItems };
          }

          return {
            cartItems: [
              ...state.cartItems,
              { ...newItem, quantity: qtyToAdd },
            ],
          };
        });
      },

      // Remove specific item variant by ID & Size
      removeItem: (id, size) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        }));
      },

      // Update quantity by step delta (+1 / -1)
      updateQuantity: (id, size, delta) => {
        set((state) => ({
          cartItems: state.cartItems
            .map((item) => {
              if (item.id === id && item.size === size) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItem[],
        }));
      },

      // Set explicit quantity
      setQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      // Clear all cart items
      clearCart: () => set({ cartItems: [], orderNote: "" }),

      // Note & Gift state updates
      setOrderNote: (note) => set({ orderNote: note }),
      toggleGiftOpen: () => set((state) => ({ isGiftOpen: !state.isGiftOpen })),

      // Derived Getters
      getTotalQuantity: () => {
        return get().cartItems.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "kmbf-cart-storage", // localStorage key name
      storage: createJSONStorage(() => localStorage),
    }
  )
);