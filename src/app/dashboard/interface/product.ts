import { ProductClinics } from './clinic';

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  detail: string;
  price: number;
  isPack: boolean;
  zone: number;
  category: Category[];
  clinicDetail: ProductClinics[];
  extraInformation: {
    slug: string;
    resultDescription: string;
  };
  flowwwId: number;
  durationMin: number;
  durationMax: number;
  beforeAndAfterImages: BeforeAndAfterImages[];
  applicationTimeMinutes: number;
  type: ProductType;
  visibility: boolean;
  sessions: number;
}

export interface BeforeAndAfterImages {
  urlAfter?: string;
  urlBefore?: string;
}

export const emptyProduct: Product = {} as Product;

export interface CartItem extends Product {
  priceDiscount: number;
  percentageDiscount: number;
  uniqueId: string;
  priceWithDiscount: number;
}

export interface Category {
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
