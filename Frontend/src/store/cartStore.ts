import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: number
  name: string
  price: number // always known at add-to-cart time (base_price + adjustments)
  quantity: number
  modifications: Record<string, string>
  image: string
}

function itemKey(productId: number, modifications: Record<string, string>) {
  return `${productId}-${JSON.stringify(modifications)}`
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: number, modifications: Record<string, string>) => void
  updateQuantity: (productId: number, modifications: Record<string, string>, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const key = itemKey(item.productId, item.modifications)
          const exists = state.items.some((i) => itemKey(i.productId, i.modifications) === key)
          if (exists) {
            return {
              items: state.items.map((i) =>
                itemKey(i.productId, i.modifications) === key
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),

      removeItem: (productId, modifications) =>
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.modifications) !== itemKey(productId, modifications),
          ),
        })),

      updateQuantity: (productId, modifications, quantity) =>
        set((state) => {
          const key = itemKey(productId, modifications)
          if (quantity <= 0) {
            return { items: state.items.filter((i) => itemKey(i.productId, i.modifications) !== key) }
          }
          return {
            items: state.items.map((i) =>
              itemKey(i.productId, i.modifications) === key ? { ...i, quantity } : i,
            ),
          }
        }),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' },
  ),
)

export function useCartCount() {
  return useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))
}

export function useCartTotal() {
  return useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )
}
