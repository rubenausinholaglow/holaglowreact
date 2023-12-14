import { ProductClinics } from './clinic';

export interface Product {
  id: string;
  title: string;
  description: string;
  detail: string;
  price: number;
  isPack: boolean;
  zone: number;
  order: number;
  upgrades: Upgrade[];
  category: Category[];
  appliedProducts: AppliedProduct[];
  clinicDetail: ProductClinics[];
  cardBackgroundColor: string;
  extraInformation: ExtraInformation;
  preTreatmentInfo: PreTips;
  postTreatmentInfo: PostTips;
  packUnities: [];
  discounts: Discount[];
  tags: Tag[];
  packMoreInformation: string;
  relatedProducts: RelatedProduct[];
  flowwwId: number;
  durationMin: number;
  durationMax: number;
  beforeAndAfterImages: BeforeAndAfterImages[];
  applicationTimeMinutes: number;
  type: ProductType;
  visibility: boolean;
  sessions: number;
  productCardImagePosition: string;
  longDescription: string;
}

export interface BeforeAndAfterImages {
  id?: string;
  urlAfter?: string;
  urlBefore?: string;
}

export interface ExtraInformation {
  slug: string;
  resultDescription: string;
  procedimentDescription: string;
  benefitsInformation: {
    title: string;
    description: string;
    benefitDetails: BenefitDetails[];
  };
  applicationZoneInfo: {
    description: string;
    applicationZoneDetail: ApplicationZoneDetail[];
  };
}
export interface BenefitDetails {
  title: string;
  order: number;
  id: string;
}

export interface AppliedProduct {
  titlte: string;
  icon: string;
}

export interface ApplicationZoneDetail {
  title: string;
  description: string;
  order: number;
  id: string;
}

export interface PreTips {
  info: string;
  icon: string;
  tips: TipsDetails[];
}

export interface PostTips {
  info: string;
  icon: string;
  first24hTips: TipsDetails[];
  after24hTips: TipsDetails[];
  possibleComplications: TipsDetails[];
  postTreatmentTips?: TipsDetails[];
}

export interface TipsDetails {
  details: string;
  priority: number;
  icon?: string;
}

export interface Upgrade {
  product: Product;
  order: number;
}

export interface Discount {
  totalDiscount: number;
  percentageDiscount: number;
  startDate: string;
  endDate: string;
  id: string;
  creationDate: string;
  active: boolean;
}

export interface Tag {
  tag: string;
  startDate: string;
  endDate: string;
  id: string;
  creationDate: string;
  active: boolean;
}

export interface RelatedProduct {
  product: Product;
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
  Dashboard,
  GiftCard,
  GlowBox,
  GlowGifts,
}
