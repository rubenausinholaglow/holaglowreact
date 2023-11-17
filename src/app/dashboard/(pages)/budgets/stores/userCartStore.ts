import { Actions, State } from '@interface/cart';
import { Professional } from '@interface/clinic';
import { CartItem, Product } from '@interface/product';
import { INITIAL_STATE } from '@utils/constants';
import { applyDiscountToItem, deleteDiscountToItem } from '@utils/utils';
import { v4 as createUniqueId } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function calculateUpdatedCart(cart: CartItem[], product: Product): CartItem[] {
  const updatedCart: CartItem[] = [...cart];

  if (product.id.length == 0) {
    product.id = createUniqueId();
  }
  updatedCart.push({
    ...product,
    percentageDiscount: 0,
    priceDiscount: 0,
    priceWithDiscount: Number(product.price),
    uniqueId: createUniqueId(),
  });
  return updatedCart;
}

function recalculateCartItems(
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
    priceWithDiscount:
      value > 0
        ? applyDiscountToItem(value, discountType, cartItem)
        : deleteDiscountToItem(value, discountType, cartItem),
    [discountType === '%' ? 'percentageDiscount' : 'priceDiscount']:
      Number(value),
  };

  return cart.map(item => {
    return item.uniqueId === cartUniqueId ? updatedCartItem : item;
  });
}

export type Operation = 'decrease' | 'increase';

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
        if (discountType === '%' && value > 100) {
          value = 100;
        }
        const cart = get().cart;
        const updatedCart = recalculateCartItems(
          cart,
          cartUniqueId,
          value,
          discountType
        );
        set(() => ({ cart: updatedCart }));
      },
      applyCartDiscount: (value: number, discountType: '%' | '€' | 'total') => {
        set(state => ({
          manualPrice:
            discountType === '€' ? Number(value) : state.priceDiscount,
          percentageDiscount:
            discountType === '%' ? Number(value) : state.percentageDiscount,
          priceDiscount:
            discountType === 'total' ? Number(value) : state.manualPrice,
        }));
      },
      removeItemDiscount: (cartUniqueId: string, discountType: '%' | '€') => {
        const cart = get().cart;
        const updatedCart = recalculateCartItems(
          cart,
          cartUniqueId,
          0,
          discountType
        );
        set(() => ({ cart: updatedCart }));
      },
      setHighlightProduct: (product: null | Product) => {
        set(() => ({
          productHighlighted: product,
        }));
      },
      setProfessionals: (professionals: Professional[]) => {
        set(() => ({
          professionals: professionals,
        }));
      },
      getQuantityOfProduct: (product: Product) => {
        const cart = get().cart;
        const productCount = cart.reduce((total, cartItem) => {
          if (cartItem.id === product.id) {
            return total + 1;
          }
          return total;
        }, 0);

        return productCount;
      },
      removeSingleProduct: (product: CartItem) => {
        const cart = get().cart;
        const indexToRemove = cart.findIndex(item => item.id === product.id);

        if (indexToRemove !== -1) {
          const cartItem = cart[indexToRemove];
          const updatedCart = [
            ...cart.slice(0, indexToRemove),
            ...cart.slice(indexToRemove + 1),
          ];

          set(state => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - cartItem.priceWithDiscount,
          }));
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
