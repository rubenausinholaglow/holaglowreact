interface FrontEndMessage<T> {
  Event: string;
  data: T;
}

interface PatientArrivedMessage extends FrontEndMessage<PatientArrivedData> {
  Event: 'PatientArrived';
}

interface PatientArrivedData {
  ClinicId: string;
  BoxId: string;
}

export type { FrontEndMessage, PatientArrivedData, PatientArrivedMessage };
