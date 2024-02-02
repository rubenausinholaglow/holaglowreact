enum AppointmentStatusEnum {
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
  status: AppointmentStatusEnum
): GetAppointmentStatusProps {
  switch (status) {
    case AppointmentStatusEnum.Open:
      return { text: 'AGENDADA', color: 'blue' };
    case AppointmentStatusEnum.ManualCanceled:
      return { text: 'CANCELADA', color: 'red' };
    case AppointmentStatusEnum.NoShow:
      return { text: 'NOSHOW', color: 'yellow' };
    case AppointmentStatusEnum.Moved:
      return { text: 'REAGENDA', color: 'yellow' };
    case AppointmentStatusEnum.Confirmed:
      return { text: 'CONFIRMADA', color: 'green' };
    case AppointmentStatusEnum.Finished:
      return { text: 'FINALIZADA', color: 'green' };
    case AppointmentStatusEnum.InProgress:
      return { text: 'EN CURSO', color: 'grey' };
    case AppointmentStatusEnum.CheckIn:
      return { text: 'CHECK IN', color: 'green' };
    case AppointmentStatusEnum.AutomaticCancel:
      return { text: 'CANCELADO AUTOMATICAMENTE', color: 'yellow' };
    default:
      return { text: 'Desconocido', color: 'white' };
  }
}
