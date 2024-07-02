import { PaymentBank, PaymentMethod } from 'app/types/payment';

export interface PaymentItems {
  key: string;
  label: string;
  paymentBank: PaymentBank;
  paymentMethod: PaymentMethod;
}

export const paymentItems: PaymentItems[] = [
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
  /*{
    key: 'frakmenta',
    label: 'Financiación Frakmenta',
    paymentBank: PaymentBank.Frakmenta,
    paymentMethod: PaymentMethod.Financing,
  },*/
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
  {
    key: 'frakmentaOnline',
    label: 'Frakmenta (Offline)',
    paymentBank: PaymentBank.Frakmenta,
    paymentMethod: PaymentMethod.CreditCard,
  },
  {
    key: 'anticipo',
    label: 'Anticipo Web',
    paymentBank: PaymentBank.CreditCard,
    paymentMethod: PaymentMethod.AdvancedPayment,
  },
  {
    key: 'wallet',
    label: 'Saldo Monedero',
    paymentBank: PaymentBank.Points,
    paymentMethod: PaymentMethod.Wallet,
  },
];

export const checkoutPaymentItems = [
  {
    key: 'creditCard',
    label: '',
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
