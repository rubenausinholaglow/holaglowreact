import { Professional } from './clinic';
import { CartItem, emptyProduct, Product } from './product';

export interface State {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  priceDiscount: string;
  percentageDiscount: string;
  productHighlighted: typeof emptyProduct;
  professionals: Professional[];
}

export interface Actions {
  addItemToCart: (Item: CartItem) => void;
  removeFromCart: (Item: CartItem) => void;
  applyItemDiscount: (
    cartUniqueId: string,
    value: number,
    discountType: '%' | '€'
  ) => void;
  applyCartDiscount: (value: number, discountType: '%' | '€') => void;
  setHighlightProduct: (Item: Product) => void;
  setProfessionals: (Item: Professional[]) => void;
}
