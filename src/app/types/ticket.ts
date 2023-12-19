import { Budget } from 'app/types/budget';

import { PaymentProductRequest } from './payment';

export interface Ticket {
  promoCode: string;
  reference: string;
  userId: string;
  clientFlowwwToken: string;
  clinicFlowwwId: string;
  professional: string;
  appointmentId: string;
  budget: Budget | null;
  paymentProductRequest: PaymentProductRequest[];
}
