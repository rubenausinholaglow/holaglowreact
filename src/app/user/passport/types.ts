/* export interface appointment {
  treatments: treatments;
}

export interface treatments {
  treatment: treatment;
}
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

export interface simulations {
  name: string;
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

interface ClinicProfessional {
  name: string;
  id: string;
  creationDate: string;
}

export interface first24hTip {
  details: string;
}

export interface after24hTip {
  details: string;
}

interface PossibleComplication {
  risk: number;
  details: string;
  priority: number;
  id: string;
  creationDate: string;
}

interface PostTreatmentInfo {
  info: string;
  first24hTips: First24hTip[];
  after24hTips: After24hTip[];
  possibleComplications: PossibleComplication[];
  id: string;
  creationDate: string;
}

interface Product {
  flowwwId: string;
  title: string;
  description: string;
  price: number;
  budgets: any[];
  durationMin: number;
  durationMax: number;
  postTreatmentInfo: PostTreatmentInfo;
  zone: number;
  id: string;
  creationDate: string;
}

interface Treatment {
  treatment: {
    product: Product;
    productUsed: string;
    quantity: number;
    lotReference: string;
    id: string;
    creationDate: string;
  };
  id: string;
  creationDate: string;
}

interface appointment {
  clinic: clinic;
  clinicProfessional: clinicProfessional;
  treatments: Treatment[];
  flowwwId: string;
  creationDate: string;
}

interface PreviousAppointment {
  date: string;
  clinic: Clinic;
  clinicProfessional: ClinicProfessional;
  appointmentProducts: any[];
  treatments: any[];
  flowwwId: string;
  id: string;
  creationDate: string;
}

interface PendingVoucher {
  name: string;
  quantity: number;
  id: string;
  creationDate: string;
}

interface LazyLoader {}

interface ExampleObject {
  appointment: Appointment;
  previousAppointments: PreviousAppointment[];
  pendingVouchers: PendingVoucher[];
  lazyLoader: LazyLoader;
  id: string;
  creationDate: string;
}
 */
