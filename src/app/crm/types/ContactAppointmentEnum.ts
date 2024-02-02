enum AppointmentStatus {
  Open = 0,
  ManualCanceled = 1,
  NoShow = 2,
  Moved = 3,
  Confirmed = 4,
  Finished = 5,
  InProgress = 6,
  CheckIn = 7,
  AutomaticCancel = 8,
}

interface GetAppointmentStatusProps {
  text: string;
  color: string;
}

export default function getAppointmentStatusText(
  status: AppointmentStatus
): GetAppointmentStatusProps {
  switch (status) {
    case AppointmentStatus.Open:
      return { text: 'AGENDADA', color: 'blue' };
    case AppointmentStatus.ManualCanceled:
      return { text: 'CANCELADA', color: 'red' };
    case AppointmentStatus.NoShow:
      return { text: 'NOSHOW', color: 'yellow' };
    case AppointmentStatus.Moved:
      return { text: 'REAGENDA', color: 'yellow' };
    case AppointmentStatus.Confirmed:
      return { text: 'CONFIRMADA', color: 'green' };
    case AppointmentStatus.Finished:
      return { text: 'FINALIZADA', color: 'green' };
    case AppointmentStatus.InProgress:
      return { text: 'EN CURSO', color: 'grey' };
    case AppointmentStatus.CheckIn:
      return { text: 'CHECK IN', color: 'green' };
    case AppointmentStatus.AutomaticCancel:
      return { text: 'CANCELADO AUTOMATICAMENTE', color: 'yellow' };
    default:
      return { text: 'Desconocido', color: 'white' };
  }
}
