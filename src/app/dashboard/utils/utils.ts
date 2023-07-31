import { CartItem } from '@interface/product';

export const handleGoBack = () => {
  window.history.back();
};

export const applyDiscountToCart = (
  percentageDiscount: number,
  priceDiscount: number,
  totalDiscount: number,
  price: number
) => {
  let finalValue = price;

  if (totalDiscount > 0) {
    finalValue = totalDiscount;
  }

  finalValue = finalValue - priceDiscount;
  finalValue = finalValue - finalValue * (percentageDiscount / 100);

  return finalValue;
};

export const applyDiscountToItem = (
  value: number,
  discountType: string,
  cartItem: CartItem
) => {
  const percentageDiscountValue =
    discountType === '%' ? value : cartItem.percentageDiscount;

  let initialPrice = cartItem.priceDiscount;

  if (discountType === '€' && value === 0) {
    initialPrice = cartItem.price;
  }

  if (discountType === '€' && value > 0) {
    initialPrice = value;
  }

  if (discountType === '%' && value > 0) {
    initialPrice =
      cartItem.priceDiscount === 0 ? cartItem.price : cartItem.priceDiscount;
  }

  let price = initialPrice;

  if ((discountType === '%' && value > 0) || cartItem.percentageDiscount > 0) {
    price = price - (price * percentageDiscountValue) / 100;
  }

  if (Number(price) === 0) {
    price = cartItem.price;
  }

  return price;
};
