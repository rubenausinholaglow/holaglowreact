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
  type: ProductType;
}

export const emptyProduct: Product = {} as Product;

export interface CartItem extends Product {
  priceDiscount: number;
  percentageDiscount: number;
  uniqueId: string;
  priceWithDiscount: number;
  quantity: number;
}

export interface Pain {
  name: string;
  value: number;
}

export enum ProductType {
  Others,
  Esthetic,
  Medical,
  Product,
  Voucher,
}
