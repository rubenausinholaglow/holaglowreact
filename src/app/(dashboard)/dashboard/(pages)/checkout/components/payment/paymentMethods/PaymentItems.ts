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
    key: 'frakmenta',
    label: 'Financiación Frakmenta',
    paymentBank: PaymentBank.Frakmenta,
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
    label: 'Tarjeta (Datáfono)',
    paymentBank: PaymentBank.CreditCard,
    paymentMethod: PaymentMethod.CreditCard,
  },
  {
    key: 'stripe',
    label: 'Tarjeta (Online)',
    paymentBank: PaymentBank.Stripe,
    paymentMethod: PaymentMethod.CreditCard,
  },
];

export const checkoutPaymentItems = [
  {
    key: 'creditCard',
    label: 'Pago único {0}€ con Tarjeta de crédito/debito',
    paymentBank: PaymentBank.Stripe,
    paymentMethod: PaymentMethod.CreditCard,
  },
  {
    key: 'alma',
    label: 'Paga en 3 meses, 33€/mes, sin intereses',
    paymentBank: PaymentBank.Alma,
    paymentMethod: PaymentMethod.Financing,
  },
  {
    key: 'almadeferred',
    label: 'Pago aplazado 15 días, tras consulta y diagnóstico',
    paymentBank: PaymentBank.Alma,
    paymentMethod: PaymentMethod.Financing,
  },
];

export const financialTimes = [
  {
    key: '2',
    label: 'Paga en 2 plazos',
  },
  {
    key: '3',
    label: 'Paga en 3 plazos',
  },
];
