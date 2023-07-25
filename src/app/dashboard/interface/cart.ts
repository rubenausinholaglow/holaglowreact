import { Professional } from './clinic';
import { CartItem, emptyProduct, Product } from './product';

export interface State {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  productHighlighted: typeof emptyProduct;
  professionals: Professional[];
}

export interface Actions {
  addItemToCart: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
  setHighlightProduct: (Item: Product) => void;
  setProfessionals: (Item: Professional[]) => void;
}
