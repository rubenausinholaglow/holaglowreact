import { PaymentBank, PaymentMethod } from './payment';

export interface InitializePayment {
  userId: string;
  installments: number;
  paymentBank: PaymentBank;
  amount: number;
}

export interface CreatePayment {
  userId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  referenceId: string;
  originOfPayment: OriginPayment;
  paymentBank: PaymentBank;
}

export enum OriginPayment {
  dashboard,
  web,
}
