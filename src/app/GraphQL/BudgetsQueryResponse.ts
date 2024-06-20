import { PageInfo } from './PageInfo';

export type BudgetsQueryResponse = {
  budgets: BudgetsResponse;
};

export type BudgetsResponse = {
  edges: BudgetsResponsesEdges[];
  pageInfo: PageInfo;
  totalCount: number;
};
export type BudgetsResponsesEdges = {
  node: BudgetsResponseNode;
};

export type BudgetsResponseNode = {
  id: string;
  creationDate: string;
  totalPriceWithIVA: number;
  user: BudgetUserReponse;
  products: BudgetProductsReponse[];
  priceDiscount: number;
  percentageDiscount: number;
  manualPrice: number;
};

export type BudgetProductsReponse = {
  product: BudgetProductResponse2;
  price: number;
  priceDiscount: number;
  percentageDiscount: number;
  productId: string;
};

export type BudgetProductResponse2 = {
  title: string;
};

export type BudgetUserReponse = {
  firstName: string;
  lastName: string;
  secondLastName: string;
  phone: string;
};

export type BudgetProfessionalReponse = {
  name: string;
};
