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
  city?: string;
}

export enum ProfessionalType {
  All = 0,
  Medical = 1,
  BeautyAdvisor = 2,
  Others = 3,
}
