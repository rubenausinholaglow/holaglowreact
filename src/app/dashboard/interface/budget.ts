export interface Budget {
  userId: string;
  statusBudget: number;
  discountCode: string;
  priceDiscount: string;
  percentageDiscount: string;
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
  priceDiscount: string;
  percentageDiscount: string;
}
