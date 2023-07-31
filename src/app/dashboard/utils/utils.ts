import { CartItem } from '@interface/product';
import { initial } from 'lodash';

export const handleGoBack = () => {
  window.history.back();
};

export const applyDiscountToCart = (
  percentageDiscount: string,
  priceDiscount: string,
  price: number
) => {
  let finalValue = price;

  finalValue = finalValue - Number(priceDiscount);
  finalValue = finalValue - finalValue * (Number(percentageDiscount) / 100);

  return finalValue;
};

export const applyDiscountToItem = (
  value: string,
  discountType: string,
  cartItem: CartItem
) => {
  const percentageDiscountValue =
    discountType === '%' ? value : cartItem.percentageDiscount;

  let initialPrice = Number(cartItem.priceDiscount);

  if (discountType === '€' && Number(value) === 0) {
    initialPrice = cartItem.price;
  }

  if (discountType === '€' && Number(value) > 0) {
    initialPrice = Number(value);
  }

  if (discountType === '%' && Number(value) > 0) {
    initialPrice =
      Number(cartItem.priceDiscount) === 0
        ? Number(cartItem.price)
        : Number(cartItem.priceDiscount);
  }

  let price = initialPrice;

  if (
    (discountType === '%' && Number(value) > 0) ||
    Number(cartItem.percentageDiscount) > 0
  ) {
    price = price - price * (Number(percentageDiscountValue) / 100);
  }

  if (price === 0) {
    price = cartItem.price;
  }

  return price;
};
