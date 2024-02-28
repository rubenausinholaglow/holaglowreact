import { PaymentBank, PaymentMethod } from './payment';

export interface InitializePayment {
  userId: string;
  installments: number;
  paymentBank: PaymentBank;
  amount: number;
  productPaymentRequest?: ProductPaymentRequest[];
  originPayment: OriginPayment;
  deferred_Days: number | undefined;
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

export interface ProductPaymentRequest {
  name: string;
  price: string;
  quantity: string;
  id: string;
}
