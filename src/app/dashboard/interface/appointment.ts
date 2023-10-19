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
  clientId: string;
  comment: string;
  referralId: string;
  externalReference: string;
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
  phone: string;
  id: string;
}

export interface RescheduleAppointmentRequest {
  previous: Appointment;
  next: Appointment;
}
