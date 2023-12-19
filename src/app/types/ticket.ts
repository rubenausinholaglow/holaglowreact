import { Budget } from 'app/types/budget';

import { PaymentTicketRequest, ProductTicketRequest } from './payment';

export interface Ticket {
  promoCode: string;
  reference: string;
  userId: string;
  clientFlowwwToken: string;
  clinicFlowwwId: string;
  professional: string;
  appointmentId: string;
  budget: Budget | null;
  paymentTicketRequest: PaymentTicketRequest[];
  productTicketRequest: ProductTicketRequest[];
}
