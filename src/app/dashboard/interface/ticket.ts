import { Budget } from '@interface/budget';

export interface Ticket {
  promoCode: string;
  reference: string;
  clientFlowwwId: string;
  clinicFlowwwId: string;
  professional: string;
  budget: Budget;
  paymentRequest: PaymentRequest[];
}
