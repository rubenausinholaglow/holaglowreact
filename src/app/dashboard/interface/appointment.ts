export interface Appointment {
  id: string;
  startTime: string;
  flowwwId: string;
  patientStatus: PatientStatus;
  lead: Lead;
}

export enum PatientStatus {
  Pending,
  Waiting,
  InProgress,
  Finished,
  NoShow,
}

export interface Lead {
  user: User;
}

export interface User {
  firstName: string;
  flowwwToken: string;
  email: string;
}
