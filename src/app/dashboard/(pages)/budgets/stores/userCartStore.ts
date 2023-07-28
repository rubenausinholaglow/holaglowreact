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
      percentageDiscount: '0',
      priceDiscount: '0',
      priceWithDiscount: product.price,
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
  console.log(cart);
  console.log(cartUniqueId, value, discountType);

  const cartItem = cart.find(item => item.uniqueId === cartUniqueId);
  console.log(cartItem);

  if (!cartItem) {
    console.log('no hi ha item');
    return cart;
  }

  const updatedCartItem = {
    ...cartItem,
    priceWithDiscount: applyDiscountToItem(value, discountType, cartItem),
    [discountType === '%' ? 'percentageDiscount' : 'priceDiscount']: value,
  };

  console.log(cartItem.price);
  console.log(cartItem.priceDiscount);
  console.log(cartItem.percentageDiscount);

  console.log(applyDiscountToItem(value, discountType, cartItem));
  return cart.map(item =>
    item.uniqueId === cartUniqueId ? updatedCartItem : item
  );
}

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      priceDiscount: INITIAL_STATE.priceDiscount,
      percentageDiscount: INITIAL_STATE.percentageDiscount,
      productHighlighted: INITIAL_STATE.productHighlighted,
      professionals: INITIAL_STATE.professionals,
      addItemToCart: (product: CartItem) => {
        const cart = get().cart;
        const totalPrice = get().totalPrice;

        console.log(totalPrice, product.priceWithDiscount);

        const updatedCart = calculateUpdatedCart(cart, product);
        set(state => ({
          cart: updatedCart,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        }));

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
        discountType: '%' | '€'
      ) => {
        console.log(cartUniqueId, value, discountType);

        const cart = get().cart;
        const updatedCart = calculateCartItemDiscount(
          cart,
          cartUniqueId,
          value,
          discountType
        );

        console.log(updatedCart);

        set(() => ({ cart: updatedCart }));
      },
      applyCartDiscount: (value: number, discountType: '%' | '€') => {
        console.log(value, discountType);
        const priceDiscount = get().priceDiscount;
        const percentageDiscount = get().percentageDiscount;

        console.log(priceDiscount, percentageDiscount);

        set(() => ({
          [discountType === '€' ? 'priceDiscount' : 'percentageDiscount']:
            value,
        }));

        console.log(priceDiscount, percentageDiscount);
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
