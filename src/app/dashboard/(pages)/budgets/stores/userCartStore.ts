import { Actions, State } from '@interface/cart';
import { Professional } from '@interface/clinic';
import { CartItem, Product } from '@interface/product';
import { INITIAL_STATE } from '@utils/constants';
import { applyDiscountToItem } from '@utils/utils';
import { v4 as createUniqueId } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function calculateUpdatedCart(cart: CartItem[], product: Product): CartItem[] {
  return [
    ...cart,
    {
      ...product,
      percentageDiscount: 0,
      priceDiscount: 0,
      priceWithDiscount: Number(product.price),
      uniqueId: createUniqueId(),
    },
  ];
}

function calculateCartItemDiscount(
  cart: CartItem[],
  cartUniqueId: string,
  value: number,
  discountType: string
) {
  const cartItem = cart.find(item => item.uniqueId === cartUniqueId);

  if (!cartItem) {
    return cart;
  }

  const updatedCartItem = {
    ...cartItem,
    priceWithDiscount: applyDiscountToItem(value, discountType, cartItem),
    [discountType === '%' ? 'percentageDiscount' : 'priceDiscount']:
      Number(value),
  };

  return cart.map(item => {
    return item.uniqueId === cartUniqueId ? updatedCartItem : item;
  });
}

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      priceDiscount: INITIAL_STATE.priceDiscount,
      percentageDiscount: INITIAL_STATE.percentageDiscount,
      manualPrice: INITIAL_STATE.manualPrice,
      productHighlighted: INITIAL_STATE.productHighlighted,
      professionals: INITIAL_STATE.professionals,
      addItemToCart: (product: CartItem) => {
        const cart = get().cart;
        const updatedCart = calculateUpdatedCart(cart, product);

        set(state => ({
          cart: updatedCart,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        }));
      },
      removeFromCart: (product: CartItem) => {
        set(state => ({
          cart: state.cart.filter(item => item.uniqueId !== product.uniqueId),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.priceWithDiscount,
        }));
      },
      applyItemDiscount: (
        cartUniqueId: string,
        value: number,
        discountType: '%' | '€' | 'total'
      ) => {
        const cart = get().cart;
        const updatedCart = calculateCartItemDiscount(
          cart,
          cartUniqueId,
          value,
          discountType
        );

        set(() => ({ cart: updatedCart }));
      },
      applyCartDiscount: (value: number, discountType: '%' | '€' | 'total') => {
        set(state => ({
          priceDiscount:
            discountType === '€' ? Number(value) : state.priceDiscount,
          percentageDiscount:
            discountType === '%' ? Number(value) : state.percentageDiscount,
          manualPrice:
            discountType === 'total' ? Number(value) : state.manualPrice,
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
