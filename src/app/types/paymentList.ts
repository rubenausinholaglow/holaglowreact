import { PaymentTicketRequest } from './payment';

export interface PaymentList {
  paymentRequest: PaymentTicketRequest[];
  totalAmount: number;
}

export interface PaymentActions {
  addPaymentToList: (Item: PaymentTicketRequest) => void;
  removePayment: (Item: PaymentTicketRequest) => void;
}

export const INITIAL_STATE_PAYMENT: PaymentList = {
  paymentRequest: [],
  totalAmount: 0,
};
