import { State } from '@interface/cart';
import { Product } from '@interface/product';

const emptyProduct: Product = {
  id: '',
  title: '',
  description: '',
  price: 0,
  isPack: false,
  zone: 0,
  pain: 0,
  clinic: [],
};

export const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  productHighlighted: emptyProduct,
};
