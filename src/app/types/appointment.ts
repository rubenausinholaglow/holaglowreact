import { ClinicProfessional } from 'app/(web)/user/types';

import { ProductType } from './product';

export interface Appointment {
  id: string;
  startTime?: string;
  endTime?: string;
  flowwwId?: string;
  status?: Status;
  lead?: Lead;
  clinicProfessional?: ClinicProfessional;
  box?: string;
  clientToken?: string;
  treatment?: string;
  treatmentText?: string;
  isPast?: boolean;
  isCancelled?: boolean;
  clinicId?: string;
  professionalName?: string;
  clientId: string;
  comment: string;
  referralId: string;
  externalReference: string;
  paymentId: string;
  paid: boolean;
  appointmentEvents? : AppointmentEvents[];
}


export enum AppointmentEventType {
  NoShow,
  Checkin,
  Start,
  Finished,
}
export interface AppointmentEvents {
  id :string;
  date : Date;
  appointmentEventType : AppointmentEventType;
}

export enum Status {
  Open,
  Canceled,
  NoShow,
  Moved,
  Confirmed,
  Finished,
  InProgress,
  CheckIn,
}

export interface Lead {
  user?: User;
}

export interface User {
  clinicToken: string;
  firstName: string;
  flowwwToken: string;
  email: string;
  id: string;
  dni?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  birthday?: string;
  phone?: string;
  country?: string;
  lastName?: string;
  secondLastName?: string;
  [key: string]: any;
}

export interface RescheduleAppointmentRequest {
  previous: Appointment;
  next: Appointment;
}

export interface UserCheckin {
  id? : string;
  name: string;
  hour: string;
  professional: string;
}


export interface AppointmentNextResponse {
  id : string;
  flowwwId: string;
  clinicFlowwwId: string;
  clinicId: string;
  clinicProfessionalId : string;
  clinicProfessionalName : string;
  userId : string;
  firstName : string;
  boxId: string;  
  startTime: string;
}

export interface AppointmentsPerClinicResponse
{
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    flowwwToken: string;
    appointmentStatus: Status;
    appointmentEvents: AppointmentEvents[];
    startTime: string;
    email: string;
    boxId: string; 
    clinicFlowwwId: string
    productType : ProductType;
    product : string;
}