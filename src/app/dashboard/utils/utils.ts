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
  const percentageDiscountValue =
    discountType === '%' ? value : cartItem.percentageDiscount;
  const priceDiscountValue =
    discountType === '€' ? value : cartItem.priceDiscount;

  let price = cartItem.price;

  //si value 0 i cartItem.priceWithDiscount === 0
  if (value === 0 && cartItem.priceWithDiscount === cartItem.price) {
    return price;
  }
  price = price - price * (Number(percentageDiscountValue) / 100);
  price = price - Number(priceDiscountValue);

  return price;
};
