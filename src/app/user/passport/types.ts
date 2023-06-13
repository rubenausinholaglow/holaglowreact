export interface treatments {
  treatment: treatment;
}
[];
export interface treatment {
  product: {
    title: string;
    description: string;
    durationMin: number;
    durationMsx: number;
    postTreatmentInfo: any;
  };
  quantity: number;
  lotReference: number;
}
[];

export interface issue {
  details: string;
}

export interface clinic {
  address: string;
}

export interface clinicProfessional {
  name: string;
}
