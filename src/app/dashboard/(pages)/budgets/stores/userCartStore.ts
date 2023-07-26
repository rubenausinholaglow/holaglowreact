import { Actions, State } from '@interface/cart';
import { Professional } from '@interface/clinic';
import { CartItem, Product } from '@interface/product';
import { INITIAL_STATE } from '@utils/constants';
import { v4 as createUniqueId } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function calculateUpdatedCart(cart: CartItem[], product: Product): CartItem[] {
  return [
    ...cart,
    {
      ...product,
      quantity: 1,
      percentageDiscount: '0',
      priceDiscount: '0',
      hasDiscount: false,
      uniqueId: createUniqueId(),
    },
  ];
}

function calculateDiscountedCart(
  cart: CartItem[],
  cartUniqueId: string,
  value: number,
  discountType: string
) {
  const cartItem = cart.find(item => item.uniqueId === cartUniqueId);

  console.log(value);

  if (cartItem) {
    const updatedCartItem = {
      ...cartItem,
      [discountType === '%' ? 'percentageDiscount' : 'priceDiscount']: value,
      hasDiscount: true,
    };

    return cart.map(item =>
      item.uniqueId === cartUniqueId ? updatedCartItem : item
    );
  } else {
    return cart;
  }
}

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      productHighlighted: INITIAL_STATE.productHighlighted,
      professionals: INITIAL_STATE.professionals,
      addItemToCart: (product: Product) => {
        const cart = get().cart;
        const updatedCart = calculateUpdatedCart(cart, product);
        set(state => ({
          cart: updatedCart,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        }));
      },
      applyItemDiscount: (
        cartUniqueId: string,
        value: number,
        discountType: '%' | '€'
      ) => {
        const cart = get().cart;
        const updatedCart = calculateDiscountedCart(
          cart,
          cartUniqueId,
          value,
          discountType
        );

        console.log(cart);
        console.log(cartUniqueId, value, discountType);
        console.log(updatedCart);

        set(state => ({ cart: updatedCart }));
      },
      removeFromCart: (product: Product) => {
        console.log(product);

        set(state => ({
          cart: state.cart.filter(item => item.uniqueId !== product.uniqueId),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.price,
        }));
      },
      setHighlightProduct: (product: Product) => {
        set(() => ({
          productHighlighted: product,
        }));
      },
      setProfessionals: (professionals: Professional[]) => {
        set(() => ({
          professionals: professionals,
        }));
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
