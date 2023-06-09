export interface treatment {
  product: {
    title: string;
    description: string;
    durationMin: number;
    durationMsx: number;
  };
  quantity: number;
  lotReference: number;
}

export interface clinic {
  address: string;
}

export interface clinicProfessional {
  name: string;
}
