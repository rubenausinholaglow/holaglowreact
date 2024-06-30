import { Budget, BudgetProduct } from '@interface/budget';

export const budgetTotalPriceWithDiscount = (
  budget: Budget,
  totalProductsPrice: number
) => {
  let total = totalProductsPrice;

  if (budget.manualPrice > 0) {
    total = budget.manualPrice;
  }

  if (budget.priceDiscount > 0) {
    total = total - budget.priceDiscount;
  }

  if (budget.percentageDiscount > 0) {
    total = total - total * budget.percentageDiscount;
  }

  return total;
};
export const getProductPrice = (product: BudgetProduct) => {
  let priceWithDiscount = product.price;

  if (product.priceDiscount > 0) {
    priceWithDiscount = product.priceDiscount;
  }

  if (product.percentageDiscount > 0) {
    priceWithDiscount =
      priceWithDiscount - priceWithDiscount * product.percentageDiscount;
  }
  return priceWithDiscount;
};
