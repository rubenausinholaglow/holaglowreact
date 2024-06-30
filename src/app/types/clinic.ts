export interface ProductClinics {
  clinic: Clinic;
}

export interface Clinic {
  id: string;
  city: string;
  address: string;
  internalName: string;
  professionals: Professional[];
  flowwwId: string;
  phone: string;
  addressExtraInfo: string;
  district?: string;
  province?: string;
  zipCode?: string;
  lat: number;
  long: number;
}
export interface ClinicReview {
  rating: number;
  comment: string;
  authorName: string;
  authorPicture: string;
  clinic: Clinic;
}

export interface Professional {
  description: string;
  id: string;
  collegiateNumber: string;
  title: string;
  tittleAbbreviation: string;
  urlPhoto: string;
  name: string;
  professionalType: ProfessionalType;
  flowwwId: string;
  authorDescription: string;
  city?: string;
  active: boolean;
}

export enum ProfessionalType {
  All = 0,
  Medical = 1,
  BeautyAdvisor = 2,
  Others = 3,
}
