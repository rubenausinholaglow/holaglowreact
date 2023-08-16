import { State } from '@interface/cart';
import { Product, ProductType } from '@interface/product';

const emptyProduct: Product = {
  id: '',
  title: '',
  description: '',
  detail: '',
  price: 0,
  isPack: false,
  zone: 0,
  category: [],
  clinic: [],
  flowwwId: 0,
  durationMin: 0,
  durationMax: 0,
  beforeAndAfterImages: [],
  type: ProductType.Others,
};

export const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  priceDiscount: 0,
  percentageDiscount: 0,
  manualPrice: 0,
  productHighlighted: emptyProduct,
  professionals: [],
};
