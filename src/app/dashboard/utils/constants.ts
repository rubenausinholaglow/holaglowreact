import { State } from '@interface/cart';

export const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  priceDiscount: 0,
  percentageDiscount: 0,
  manualPrice: 0,
  productHighlighted: null,
  professionals: [],
};
