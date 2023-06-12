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
    postTreatmentInfo: postTreatment;
  };
  quantity: number;
  lotReference: number;
}
[];

export interface postTreatment {
  possibleComplications: complication[];
  first24hTips: tips[];
  after24hTips: tips[];
}

export interface complication {
  risk: number;
}

export interface tips {
  risk: number;
}

export interface issue {
  details: string;
}

export interface clinic {
  address: string;
}

export interface clinicProfessional {
  name: string;
}
