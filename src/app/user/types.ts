export interface Clinic {
  address: string;
  phone: string;
  id: number;
  creationDate: Date;
}

export interface Product {
  quantity: number;
  flowwwId: number;
  title: string;
  description: string;
  price: number;
  imgSrc: string;
}

export interface Simulation {
  imagesPrevious1: string;
  imagesPrevious2: string;
  imagesPrevious3: string;
  imagesAfter1: string;
  imagesAfter2: string;
  imagesAfter3: string;
}

export interface ClinicProfessional {
  name: string;
  id: string;
  creationDate: string;
}

export interface Treatment {
  treatment: {
    product: {
      title: string;
      description: string;
      durationMin: number;
      durationMax: number;
      postTreatmentInfo: any;
    };
    quantity: number;
    lotReference: string;
  };
}
export interface Appointment {
  date: Date;
  treatments: Array<Treatment>;
  clinicProfessional: ClinicProfessional;
  clinic: Clinic;
}
