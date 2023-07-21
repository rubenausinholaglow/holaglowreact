import { Clinic } from './clinic';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  isPack: boolean;
  zone: number;
  pain: number;
  clinic: Clinic[];
}

export const emptyProduct: Product = {} as Product;

export interface CartItem extends Product {
  priceDiscount: string;
  percentageDiscount: string;
  quantity?: number;
}
