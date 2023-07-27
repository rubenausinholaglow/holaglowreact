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
  applyItemDiscount: (Item: CartItem) => void;
  applyCartDiscount: (Item: CartItem) => void;
  setHighlightProduct: (Item: Product) => void;
  setProfessionals: (Item: Professional[]) => void;
}
