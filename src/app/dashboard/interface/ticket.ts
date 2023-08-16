import { Budget } from '@interface/budget';

import { PaymentProductRequest } from './payment';

export interface Ticket {
  promoCode: string;
  reference: string;
  userId: string;
  clientFlowwwToken: string;
  clinicFlowwwId: string;
  professional: string;
  budget: Budget;
  paymentProductRequest: PaymentProductRequest[];
}
