export interface Budget {
  userId: string;
  statusBudget: number;
  discountCode: string;
  priceDiscount: string;
  percentageDiscount: string;
  totalPrice: number;
  clinicInfoId: string;
  referenceId: string;
  products: BudgetProduct[];
}

export interface BudgetProduct {
  productId: string;
  price: number;
  quantity: number;
  priceDiscount: string;
  percentageDiscount: string;
}
