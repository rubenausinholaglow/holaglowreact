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
  totalprice: number;
  user: BudgetUserReponse;
  products: BudgetProductsReponse[];
};

export type BudgetProductsReponse = {
  product: BudgetProductResponse2;
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
