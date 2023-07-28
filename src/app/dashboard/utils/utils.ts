import { CartItem } from '@interface/product';

export const handleGoBack = () => {
  window.history.back();
};

export const applyDiscountToCart = (
  percentageDiscount: string,
  priceDiscount: string,
  price: number
) => {
  let finalValue = price;

  finalValue = finalValue - finalValue * (Number(percentageDiscount) / 100);
  finalValue = finalValue - Number(priceDiscount);

  return finalValue;
};

export const applyDiscountToItem = (
  value: number,
  discountType: string,
  cartItem: CartItem
) => {
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
  if (value === 0 && cartItem.priceWithDiscount === cartItem.price) {
    console.log('no hi ha cap descompte');
    return price;
  }
  price = price - price * (Number(percentageDiscountValue) / 100);
  price = price - Number(priceDiscountValue);

  console.log(price);

  return price;
};
