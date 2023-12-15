import { PaymentBank, PaymentMethod } from 'app/types/payment';

export const paymentItems = [
  {
    key: 'alma',
    label: 'Financiación Alma',
    paymentBank: PaymentBank.Alma,
    paymentMethod: PaymentMethod.Financing,
  },
  {
    key: 'pepper',
    label: 'Financiación Pepper',
    paymentBank: PaymentBank.Pepper,
    paymentMethod: PaymentMethod.Financing,
  },
  {
    key: 'cash',
    label: 'Efectivo',
    paymentBank: PaymentBank.Cash,
    paymentMethod: PaymentMethod.Cash,
  },
  {
    key: 'creditCard',
    label: 'Tarjeta',
    paymentBank: PaymentBank.CreditCard,
    paymentMethod: PaymentMethod.CreditCard,
  },
];

export const checkoutPaymentItems = [
  {
    key: 'creditCard',
    label: 'Tarjeta',
    paymentBank: PaymentBank.CreditCard,
    paymentMethod: PaymentMethod.CreditCard,
  },
];
