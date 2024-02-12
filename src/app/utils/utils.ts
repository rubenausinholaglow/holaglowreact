import { useMessageSocket } from 'app/(dashboard)/dashboard/components/useMessageSocket';
import { entityStatusConfig } from 'app/crm/components/table/EntityStatusConfig';
import { INITIAL_STATE_CRISALIXUSERLIST } from 'app/types/crisalix';
import { INITIAL_STATE_MESSAGESOCKETLIST } from 'app/types/messageSocket';
import { PaymentBank, PaymentMethod } from 'app/types/payment';
import { INITIAL_STATE_PAYMENT } from 'app/types/paymentList';
import { CartItem } from 'app/types/product';

import { useCartStore } from '../(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { usePaymentList } from '../(dashboard)/dashboard/(pages)/checkout/components/payment/payments/usePaymentList';
import { useCrisalix } from '../(dashboard)/dashboard/(pages)/crisalix/useCrisalix';
import { INITIAL_STATE } from './constants';

export const handleGoBack = () => {
  window.history.back();
};

export const getTotalFromCart = (
  cart: CartItem[],
  percentageDiscount: number,
  priceDiscount: number,
  manualPrice: number
) => {
  let productsPriceTotal = 0;
  let productsPriceTotalWithDiscounts = 0;

  if (cart) {
    productsPriceTotal = cart.reduce((acc, product) => acc + product.price, 0);
    productsPriceTotalWithDiscounts = cart.reduce(
      (acc, product) => acc + Number(product.priceWithDiscount),
      0
    );
  }

  const cartTotalWithDiscount = applyDiscountToCart(
    percentageDiscount,
    priceDiscount,
    manualPrice,
    productsPriceTotalWithDiscounts
  );
  return cartTotalWithDiscount;
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

  return value % 1 === 0 ? price : Number(price.toFixed(2));
};

export const deleteDiscountToItem = (
  value: number,
  discountType: string,
  cartItem: CartItem
) => {
  let finalPrice = cartItem.priceWithDiscount;

  switch (discountType) {
    case '%':
      cartItem.percentageDiscount = 0;
      finalPrice =
        cartItem.price - (cartItem.price * cartItem.percentageDiscount) / 100;
      break;
    case '€':
      finalPrice = cartItem.price;
      cartItem.priceDiscount = 0;
      if (cartItem.percentageDiscount > 0) {
        finalPrice =
          finalPrice - (finalPrice * cartItem.percentageDiscount) / 100;
      }
      break;
    default:
      // Handle unexpected discountType (optional)
      break;
  }

  return finalPrice;
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
    case PaymentBank.Cash:
      return '';
    case PaymentBank.CreditCard:
      return '';
    default:
      return 'Unknown';
  }
}

export function clearLocalStorage(allLocalStorage: boolean) {
  localStorage.clear();
  useCrisalix.setState(INITIAL_STATE_CRISALIXUSERLIST);
  useMessageSocket.setState(INITIAL_STATE_MESSAGESOCKETLIST);
  usePaymentList.setState(INITIAL_STATE_PAYMENT);
  useCartStore.setState(INITIAL_STATE);
}

export function getStatusText(statusText: string, entity: string): string {
  const lowercaseStatus = statusText.toUpperCase();
  const config = entityStatusConfig[entity];
  if (config && lowercaseStatus in config.names) {
    return config.names[lowercaseStatus];
  }
  return statusText;
}

export const getStatusClassName = (status: string, entity: string): string => {
  const uppercaseStatus = status.toUpperCase();
  const config = entityStatusConfig[entity];
  if (config && uppercaseStatus in config.colors) {
    const style = config.colors[uppercaseStatus];
    return `text-white rounded-full py-1 px-2 text-sm ${style}`;
  }
  return '';
};
