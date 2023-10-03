import { PaymentMethod } from './payment';

export interface InitializePayment {
  userId: string;
  installments: number;
  amount: number;
  paymentBank: number;
}

export interface CreatePayment {
  userId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  referenceId: string;
}
