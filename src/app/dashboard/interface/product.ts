import { Clinic } from './clinic'

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    isPack : boolean;
    zone : string;
    pain : string;
    clinic : Clinic;
  }