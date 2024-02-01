enum AppointmentStatusEnum {
  AGENDADA = 0,
  CANCELADA = 1,
  NOSHOW = 2,
  REAGENDA = 3,
  CONFIRMADA = 4,
  FINALIZADA = 5,
  EN_CURSO = 6,
  CHECKIN = 7,
  AUTOMATICCANCEL = 8,
}

interface GetAppointmentStatusProps {
  text: string;
  color: string;
}

export default function getAppointmentStatusText(
  status: AppointmentStatusEnum
): GetAppointmentStatusProps {
  switch (status) {
    case AppointmentStatusEnum.AGENDADA:
      return { text: 'AGENDADA', color: 'blue' };
    case AppointmentStatusEnum.CANCELADA:
      return { text: 'CANCELADA', color: 'red' };
    case AppointmentStatusEnum.NOSHOW:
      return { text: 'NOSHOW', color: 'yellow' };
    case AppointmentStatusEnum.REAGENDA:
      return { text: 'REAGENDA', color: 'yellow' };
    case AppointmentStatusEnum.CONFIRMADA:
      return { text: 'CONFIRMADA', color: 'green' };
    case AppointmentStatusEnum.FINALIZADA:
      return { text: 'FINALIZADA', color: 'green' };
    case AppointmentStatusEnum.EN_CURSO:
      return { text: 'EN CURSO', color: 'grey' };
    case AppointmentStatusEnum.CHECKIN:
      return { text: 'CHECK IN', color: 'green' };
    case AppointmentStatusEnum.AUTOMATICCANCEL:
      return { text: 'CANCELADO AUTOMATICAMENTE', color: 'yellow' };
    default:
      return { text: 'Desconocido', color: 'white' };
  }
}
