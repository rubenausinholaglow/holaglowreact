import { CartItem, Product } from './product';

export interface State {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface Actions {
  addItemToCart: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
  setHighlightProductId: (Id: number) => void;
}
