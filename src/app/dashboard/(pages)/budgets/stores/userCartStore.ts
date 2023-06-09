import { CartItem, Product } from '@interface/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addItemToCart: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

function calculateUpdatedCart(cart: CartItem[], product: Product): CartItem[] {
  const cartItem = cart.find(item => item.id === product.id);

  if (cartItem) {
    return cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: (item.quantity as number) + 1 }
        : item
    );
  } else {
    return [...cart, { ...product, quantity: 1 }];
  }
}

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addItemToCart: (product: Product) => {
        const cart = get().cart;
        const updatedCart = calculateUpdatedCart(cart, product);
        set(state => ({
          cart: updatedCart,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        }));
      },
      removeFromCart: (product: Product) => {
        set(state => ({
          cart: state.cart.filter(item => item.id !== product.id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.price,
        }));
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
