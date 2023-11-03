interface FrontEndMessage<T> {
  Event: string;
  data: T;
}

interface StartAppointmentMessage
  extends FrontEndMessage<StartAppointmentData> {
  Event: 'Startappointment';
}

interface PatientArrivedMessage extends FrontEndMessage<PatientArrivedData> {
  Event: 'PatientArrived';
}

interface StartAppointmentData {
  ClinicId: string;
  BoxId: string;
  Token: string;
}

interface PatientArrivedData {
  ClinicId: string;
  BoxId: string;
}

export type {
  FrontEndMessage,
  PatientArrivedData,
  PatientArrivedMessage,
  StartAppointmentData,
  StartAppointmentMessage,
};
