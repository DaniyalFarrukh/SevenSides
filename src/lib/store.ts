import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Branch, MenuItem, MenuItemVariant, DeliveryRegion } from './mockData';

export type CartItem = {
  id: string; // unique cart item id
  menuItem: MenuItem;
  variant?: MenuItemVariant;
  quantity: number;
  notes?: string;
};

type AppState = {
  // App Config
  isUrdu: boolean;
  toggleLanguage: () => void;

  // Branch Selection
  orderType: "delivery" | "pickup";
  setOrderType: (type: "delivery" | "pickup") => void;
  selectedBranch: Branch | null;
  setBranch: (branch: Branch) => void;
  selectedRegion: DeliveryRegion | null;
  setRegion: (region: DeliveryRegion | null) => void;
  isBranchModalOpen: boolean;
  setBranchModalOpen: (open: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;

  // Auth / User (Mock)
  user: { name: string; phone: string; points: number } | null;
  login: (phone: string) => void;
  logout: () => void;

  // Custom Uploaded Images
  customMenuBoard: string | null;
  customDeliveryPoster: string | null;
  setMenuImages: (menuBoard?: string | null, deliveryPoster?: string | null) => void;
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isUrdu: false,
      toggleLanguage: () => set((state) => ({ isUrdu: !state.isUrdu })),

      orderType: "delivery",
      setOrderType: (type) => set({ orderType: type }),
      selectedBranch: null,
      setBranch: (branch) => set({ selectedBranch: branch }),
      selectedRegion: null,
      setRegion: (region) => set({ selectedRegion: region }),
      isBranchModalOpen: false,
      setBranchModalOpen: (open) => set({ isBranchModalOpen: open }),

      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find(
            (c) =>
              c.menuItem.id === item.menuItem.id &&
              c.variant?.name === item.variant?.name &&
              c.notes === item.notes
          );
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.id === existing.id
                  ? { ...c, quantity: c.quantity + item.quantity }
                  : c
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((c) => (c.id === id ? { ...c, quantity } : c)),
        })),
      clearCart: () => set({ cart: [] }),

      user: null,
      login: (phone) =>
        set({ user: { name: "Ahmed", phone, points: 150 } }), // Mock user
      logout: () => set({ user: null }),

      customMenuBoard: null,
      customDeliveryPoster: null,
      setMenuImages: (menuBoard, deliveryPoster) => set((state) => ({
        customMenuBoard: menuBoard !== undefined ? menuBoard : state.customMenuBoard,
        customDeliveryPoster: deliveryPoster !== undefined ? deliveryPoster : state.customDeliveryPoster,
      })),
    }),
    {
      name: 'sevensides-storage',
    }
  )
);
