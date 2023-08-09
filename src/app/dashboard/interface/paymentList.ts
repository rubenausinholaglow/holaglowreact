import { PaymentProductRequest } from './payment';

export interface PaymentList {
  paymentRequest: PaymentProductRequest[];
  totalAmount: number;
}

export interface PaymentActions {
  addPaymentToList: (Item: PaymentProductRequest) => void;
  removePayment: (Item: PaymentProductRequest) => void;
  cleanPaymentList: () => void;
}

export const INITIAL_STATE_PAYMENT: PaymentList = {
  paymentRequest: [],
  totalAmount: 0,
};
