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
      postTreatmentInfo: {
        first24hTips: Array<Tip>;
        after24hTips: Array<Tip>;
        possibleComplications: Array<Issue>;
      };
      zone: number;
    };
    quantity: number;
    lotReference: string;
    creationDate: Date;
  };
}

export interface Appointment {
  date: Date;
  treatments: Array<Treatment>;
  clinicProfessional: ClinicProfessional;
  clinic: Clinic;
  appointmentProducts: Array<{
    product: {
      title: string;
    };
  }>;
}
export interface Tip {
  details: string;
  priority: number;
  id: string;
  creationDate: Date;
}

export interface Issue {
  risk: number;
  details: string;
  priority: number;
  id: string;
  creationDate: Date;
}

export interface Voucher {
  name: string;
  quantity: number;
  id: string;
  creationDate: Date;
}
