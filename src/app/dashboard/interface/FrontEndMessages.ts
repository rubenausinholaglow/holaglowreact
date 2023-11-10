import { PaymentBank, PaymentMethod } from './payment';

interface BaseDataMessage {
  clinicId: string;
  boxId: string;
}

export type PatientArrivedData = BaseDataMessage;

export interface StartAppointmentData extends BaseDataMessage {
  flowwwToken: string;
}

export interface CrisalixUserData extends BaseDataMessage {
  id: string;
  playerId: string;
  playerToken: string;
}

export interface PaymentCreatedData extends BaseDataMessage {
  id: string;
  amount: number;
  paymentBank: PaymentBank;
  paymentMethod: PaymentMethod;
  referenceId: string;
  remoteControl: boolean;
  budgetId: string;
}

export interface GoToPageData extends BaseDataMessage {
  page: string;
}

export enum EventTypes {
  PatientArrived = 'PatientArrived',
  StartAppointment = 'StartAppointment',
  CrisalixUser = 'CrisalixUser',
  PaymentCreate = 'PaymentCreate',
  GoToPage = 'GoToPage',
}
