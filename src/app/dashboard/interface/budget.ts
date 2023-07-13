export interface Budget {
  UserId: string;
  StatusBudget: number;
  DiscountCode: string;
  DiscountAmount: string;
  TotalPrice: number;
  ClinicInfoId: string;
  ReferenceId: string;
  Products: BudgetProduct[];
}

export interface BudgetProduct {
  title: string;
  description: string;
  price: number;
  quantity: number;
}
