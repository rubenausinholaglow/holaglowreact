import { Clinic } from './clinic';

export interface Product {
  id: string;
  title: string;
  description: string;
  detail: string;
  price: number;
  isPack: boolean;
  zone: number;
  painsCategory: Pain[];
  clinic: Clinic[];
  flowwwId: number;
  durationMin: number;
  durationMax: number;
  beforeAndAfterImages: any;
}

export const emptyProduct: Product = {} as Product;

export interface CartItem extends Product {
  priceDiscount: string;
  percentageDiscount: string;
  quantity?: number;
  hasDiscount?: boolean;
  uniqueId: string;
}

export interface Pain {
  name: string;
  value: number;
}
