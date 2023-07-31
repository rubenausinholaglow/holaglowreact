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
    console.log('no hi ha item');
    return cart;
  }

  const updatedCartItem = {
    ...cartItem,
    priceWithDiscount: applyDiscountToItem(value, discountType, cartItem),
    [discountType === '%' ? 'percentageDiscount' : 'priceDiscount']: value,
  };

  console.log(updatedCartItem);

  return cart.map(item => {
    console.log(item.uniqueId, cartUniqueId);
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
      totalDiscount: INITIAL_STATE.totalDiscount,
      productHighlighted: INITIAL_STATE.productHighlighted,
      professionals: INITIAL_STATE.professionals,
      addItemToCart: (product: CartItem) => {
        const cart = get().cart;
        const totalPrice = get().totalPrice;

        console.log(totalPrice, product.priceWithDiscount);

        const updatedCart = calculateUpdatedCart(cart, product);

        console.log(updatedCart[0]);

        console.log(cart);

        set(state => ({
          cart: updatedCart,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        }));

        console.log(cart);

        console.log(totalPrice);
      },
      removeFromCart: (product: CartItem) => {
        const totalPrice = get().totalPrice;

        console.log(totalPrice, product.priceWithDiscount);

        set(state => ({
          cart: state.cart.filter(item => item.uniqueId !== product.uniqueId),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.priceWithDiscount,
        }));

        console.log(totalPrice);
      },
      applyItemDiscount: (
        cartUniqueId: string,
        value: number,
        discountType: '%' | '€' | 'total'
      ) => {
        console.log(cartUniqueId, value, discountType);

        const cart = get().cart;
        const updatedCart = calculateCartItemDiscount(
          cart,
          cartUniqueId,
          value,
          discountType
        );

        set(() => ({ cart: updatedCart }));

        console.log(updatedCart);
      },
      applyCartDiscount: (value: number, discountType: '%' | '€' | 'total') => {
        console.log(typeof value, value);

        set(state => ({
          priceDiscount:
            discountType === '€' ? Number(value) : state.priceDiscount,
          percentageDiscount:
            discountType === '%' ? Number(value) : state.percentageDiscount,
          totalDiscount:
            discountType === 'total' ? Number(value) : state.totalDiscount,
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
