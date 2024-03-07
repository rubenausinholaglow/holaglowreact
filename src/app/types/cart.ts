import { Professional } from './clinic';
import { CartItem, Product } from './product';

export interface State {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  priceDiscount: number;
  percentageDiscount: number;
  manualPrice: number;
  productHighlighted: null | Product;
  professionals: Professional[];
}

export interface Actions {
  addItemToCart: (Item: CartItem) => void;
  removeFromCart: (Item: CartItem) => void;
  applyItemDiscount: (
    cartUniqueId: string,
    value: number,
    discountType: '%' | '€' | 'total'
  ) => void;
  applyCartDiscount: (value: number, discountType: '%' | '€' | 'total') => void;
  setHighlightProduct: (Item: null | Product) => void;
  setProfessionals: (Item: Professional[]) => void;
  getQuantityOfProduct: (product: Product) => number;
  removeSingleProduct: (product: CartItem) => void;
  removeItemDiscount: (cartUniqueId: string, discountType: '%' | '€') => void;
  resetCart: () => void;
  updateIsScheduled: (isScheduled: boolean, uniqueIdCartItem : string) => void;
}
