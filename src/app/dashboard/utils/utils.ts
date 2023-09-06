import { PaymentBank, PaymentMethod } from '@interface/payment';
import { INITIAL_STATE_PAYMENT } from '@interface/paymentList';
import { CartItem } from '@interface/product';

import { useCartStore } from '../(pages)/budgets/stores/userCartStore';
import { usePaymentList } from '../(pages)/checkout/components/payment/payments/usePaymentList';
import { INITIAL_STATE } from './constants';

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

export function clearLocalStorage(allLocalStorage: boolean) {
  localStorage.removeItem('appointmentFlowwwId');
  localStorage.removeItem('appointmentId');
  localStorage.removeItem('ClinicProfessionalId');
  localStorage.removeItem('username');
  localStorage.removeItem('flowwwToken');
  localStorage.removeItem('id');
  localStorage.removeItem('BudgetId');
  if (allLocalStorage) {
    localStorage.removeItem('ClinicFlowwwId');
    localStorage.removeItem('boxId');
    localStorage.removeItem('ClinicId');
    localStorage.removeItem('ClinicProfessionalId');
  }
  usePaymentList.setState(INITIAL_STATE_PAYMENT);
  useCartStore.setState(INITIAL_STATE);
}
