import { PaymentBank, PaymentMethod } from '@interface/payment';

export const paymentItems = [
  {
    key: 'alma',
    label: 'Alma',
    paymentBank: PaymentBank.Alma,
    paymentMethod: PaymentMethod.Financing,
  },
  {
    key: 'cash',
    label: 'Efectivo',
    paymentBank: PaymentBank.None,
    paymentMethod: PaymentMethod.Cash,
  },
  {
    key: 'creditCard',
    label: 'Tarjeta',
    paymentBank: PaymentBank.None,
    paymentMethod: PaymentMethod.CreditCard,
  },
];
