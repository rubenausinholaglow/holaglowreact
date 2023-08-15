export interface Budget {
  userId: string;
  statusBudget: number;
  discountCode: string;
  priceDiscount: number;
  percentageDiscount: number;
  totalPrice: number;
  clinicInfoId: string;
  referenceId: string;
  professionalId: string;
  manualPrice: number;
  products: BudgetProduct[];
}

export interface BudgetProduct {
  productId: string;
  price: number;
  priceDiscount: number;
  percentageDiscount: number;
  name: string;
}

export interface TicketBudget extends Budget {
  id: string;
  DiscountAmount: string;
}

export interface TicketBudget extends Budget {
  id: string;
  DiscountAmount: string;
}
