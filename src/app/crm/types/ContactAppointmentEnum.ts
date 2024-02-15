enum AppointmentStatus {
  Open = 'Open',
  ManualCanceled = 'ManualCanceled',
  NoShow = 'NoShow',
  Moved = 'Moved',
  Confirmed = 'Confirmed',
  Finished = 'Finished',
  InProgress = 'InProgress',
  CheckIn = 'CheckIn',
  AutomaticCancel = 'AutomaticCancel',
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
