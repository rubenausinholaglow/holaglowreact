import { User } from './appointment';

import {
  BudgetProfessionalReponse,
  BudgetUserReponse,
} from 'app/GraphQL/BudgetsQueryResponse';


import { Product } from './product';

export interface Budget {
  id?: string;
  userId: string;
  statusBudget: StatusBudget;
  discountCode: string;
  discountAmount: string;
  FlowwwId: string;
  priceDiscount: number;
  percentageDiscount: number;
  totalPrice: number;
  totalPriceWithIva: number;
  clinicInfoId: string;
  referenceId: string;
  professionalId: string;
  manualPrice: number;
  creationDate?: Date;
  products: BudgetProduct[];
  user?: BudgetUserReponse;
  professional?: BudgetProfessionalReponse;
  budgetComments?: BudgetCommentsReponse[];
}

export interface BudgetProduct {
  id?: string;
  productId: string;
  price: number;
  priceDiscount: number;
  percentageDiscount: number;
  product?: Product;
}

export interface BudgetCommentsReponse {
  comment: string;
  id: string;
  creationDate: Date;
}

export interface TicketBudget extends Budget {
  id: string;
}

export enum StatusBudget {
  Open = 1,
  Finish = 2,
  Rejected = 3,
  Paid = 4,
}
