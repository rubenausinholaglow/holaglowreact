import { Professional } from './clinic';
import { CartItem, emptyProduct, Product } from './product';

export interface State {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  priceDiscount: number;
  percentageDiscount: number;
  totalDiscount: number;
  productHighlighted: typeof emptyProduct;
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
  setHighlightProduct: (Item: Product) => void;
  setProfessionals: (Item: Professional[]) => void;
}
