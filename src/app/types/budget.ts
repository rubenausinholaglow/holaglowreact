import { Product } from './product';

export interface Budget {
  id?: string;
  userId: string;
  statusBudget: StatusBudget;
  discountCode: string;
  discountAmount: string;
  flowwwId: string;
  priceDiscount: number;
  percentageDiscount: number;
  totalPrice: number;
  totalPriceWithIva: number;
  clinicInfoId: string;
  referenceId: string;
  professionalId: string;
  manualPrice: number;
  products: BudgetProduct[];
  clinicFlowwwId: string;
  userFlowwwId: string;

}

export interface BudgetProduct {
  id?: string;
  productId: string;
  price: number;
  priceDiscount: number;
  percentageDiscount: number;
  product?: Product;
  productFlowwwId: number;
  isPack : boolean;
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


export interface ResponseBudget {
  id : string,
  flowwwId : string,
}