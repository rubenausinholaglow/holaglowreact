import { State } from 'app/types/cart';

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

export const HEADER_HEIGHT_MOBILE = 56;
export const HEADER_HEIGHT_DESKTOP = 72;

export const DERMA_HEADER_HEIGHT_MOBILE = 68;
export const DERMA_HEADER_HEIGHT_DESKTOP = 80;
