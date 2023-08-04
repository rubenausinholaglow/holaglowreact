import { Budget } from '@interface/budget';

export interface Ticket {
  promoCode: string;
  reference: string;
  clientFlowwwId: string;
  clinicFlowwwId: string;
  professional: string;
  budget: Budget;
}

export interface PaymentRequest {
  amount: number;
  method: PaymentMethod;
  bank: PaymentBank;
  paymentReference: string;
}

export enum PaymentMethod {
  Cash,
  CreditCard,
  Financing,
  Others,
}

export enum PaymentBank {
  None,
  Alma,
  Pepper,
}
