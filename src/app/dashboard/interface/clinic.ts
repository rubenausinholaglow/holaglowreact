export interface Clinic {
  id: string;
  city: string;
  address: string;
  internalName: string;
  professionals: Professional[];
}

export interface Professional {
  description: string;
  id: string;
  collegiateNumber: string;
  title: string;
  urlPhoto: string;
  name: string;
  professionalType: ProfessionalType;
}

export enum ProfessionalType {
  All = 0,
  Medical = 1,
  BeautyAdvisor = 2,
  Others = 3,
}
