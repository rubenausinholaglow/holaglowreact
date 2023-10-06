import { ClinicProfessional } from 'app/user/types';

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
  firstName: string;
  flowwwToken: string;
  email: string;
  id: string;
  dni: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  birthday: string;
  country: string;
  lastName: string;
  secondLastName: string;
  phone: string;
}
