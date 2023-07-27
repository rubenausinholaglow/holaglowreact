import { Actions, State } from '@interface/cart';
import { Professional } from '@interface/clinic';
import { CartItem, Product } from '@interface/product';
import { INITIAL_STATE } from '@utils/constants';
import { priceFormat } from 'utils/priceFormat';
import { v4 as createUniqueId } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function productDiscountedPrice(cartItem, value, discountType) {
  console.log(cartItem);
  console.log(value);
  console.log(discountType);

  const percentageDiscountValue =
    discountType === '%' ? value : cartItem.percentageDiscount;
  const priceDiscountValue =
    discountType === '€' ? value : cartItem.priceDiscount;

  console.log(percentageDiscountValue);
  console.log(priceDiscountValue);

  let price = cartItem.price;

  //si value 0 i cartItem.priceWithDiscount === 0
  if (value === '0' && cartItem.priceWithDiscount === cartItem.price) {
    console.log('no hi ha cap descompte');
    return price;
  }

  // he d'aplicar sempre els dos descomptes, si el valor arriba 0, fotem 0, si no, mirar si hi ha descompte al cartItem

  price = price - price * (Number(percentageDiscountValue) / 100);
  console.log(price);
  price = price - Number(priceDiscountValue);

  console.log(price);

  return price;

  //aplicar descomptes

  /*

  if (cartItem.percentageDiscount !== '0') {
    price = price - price * (Number(cartItem.percentageDiscount) / 100);
    console.log(price);
  }

  if (cartItem.priceDiscount !== '0') {
    price = price - Number(cartItem.priceDiscount);
    console.log(price);
  }
  
  console.log(price); 
  */
}

function calculateUpdatedCart(cart: CartItem[], product: Product): CartItem[] {
  return [
    ...cart,
    {
      ...product,
      quantity: 1,
      percentageDiscount: '0',
      priceDiscount: '0',
      priceWithDiscount: product.price,
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
  console.log(cartUniqueId, value, discountType);

  const cartItem = cart.find(item => item.uniqueId === cartUniqueId);
  console.log(cartItem);

  if (!cartItem) {
    console.log('no hi ha item');
    return cart;
  }

  const updatedCartItem = {
    ...cartItem,
    priceWithDiscount: productDiscountedPrice(cartItem, value, discountType),
    [discountType === '%' ? 'percentageDiscount' : 'priceDiscount']: value,
  };

  console.log(cartItem.price);
  console.log(cartItem.priceDiscount);
  console.log(cartItem.percentageDiscount);

  console.log(productDiscountedPrice(cartItem, value, discountType));
  return cart.map(item =>
    item.uniqueId === cartUniqueId ? updatedCartItem : item
  );
  /* 
  return cart;

  console.log(cart);
  console.log(cartUniqueId);
  //console.log(cartItem.uniqueId);


  const updatedCartItem = {
    ...cartItem,
    priceWithDiscount: productDiscountedPrice(cartItem),
    [discountType === '%' ? 'percentageDiscount' : 'priceDiscount']: value,
  };

  console.log(updatedCartItem);

  //return cart;
  return cart.map(item =>
    item.uniqueId === cartUniqueId ? updatedCartItem : item
  ); */
}

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
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

        console.log(updatedCart);

        set(state => ({ cart: updatedCart }));
      },
      removeFromCart: (product: CartItem) => {
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
