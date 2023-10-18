import { PaymentBank, PaymentMethod } from '@interface/payment';

export const paymentItems = [
  {
    key: 'alma',
    label: 'Alma',
    paymentBank: PaymentBank.Alma,
    paymentMethod: PaymentMethod.Financing,
  },
  {
    key: 'pepper',
    label: 'Pepper',
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
