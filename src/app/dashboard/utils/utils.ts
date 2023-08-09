import { PaymentBank, PaymentMethod } from '@interface/payment';
import { CartItem } from '@interface/product';

export const handleGoBack = () => {
  window.history.back();
};

export const applyDiscountToCart = (
  percentageDiscount: number,
  priceDiscount: number,
  manualPrice: number,
  price: number
) => {
  let finalValue = price;

  if (manualPrice > 0) {
    finalValue = manualPrice;
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

export function getPaymentMethodText(method: PaymentMethod): string {
  switch (method) {
    case PaymentMethod.Cash:
      return 'Efectivo';
    case PaymentMethod.CreditCard:
      return 'Tarjeta de Crédito';
    case PaymentMethod.Financing:
      return 'Financiación';
    case PaymentMethod.Others:
      return 'Otros';
    default:
      return 'Unknown';
  }
}

export function getPaymentBankText(bank: PaymentBank): string {
  switch (bank) {
    case PaymentBank.None:
      return 'Ninguna';
    case PaymentBank.Alma:
      return 'Alma';
    case PaymentBank.Pepper:
      return 'Pepper';
    default:
      return 'Unknown';
  }
}
