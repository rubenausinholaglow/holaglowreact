enum AppointmentStatusEnum {
  AGENDADA = 0,
  CANCELADA = 1,
  NOSHOW = 2,
  REAGENDA = 3,
  CONFIRMADA = 4,
  FINALIZADA = 5,
  EN_CURSO = 6,
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
      return { text: 'Agendada', color: 'blue' };
    case AppointmentStatusEnum.CANCELADA:
      return { text: 'Cancelada', color: 'red' };
    case AppointmentStatusEnum.NOSHOW:
      return { text: 'Noshow', color: 'yellow' };
    case AppointmentStatusEnum.REAGENDA:
      return { text: 'Reagenda', color: 'yellow' };
    case AppointmentStatusEnum.CONFIRMADA:
      return { text: 'Confirmada', color: 'green' };
    case AppointmentStatusEnum.FINALIZADA:
      return { text: 'Finalizada', color: 'green' };
    case AppointmentStatusEnum.EN_CURSO:
      return { text: 'En curso', color: 'grey' };
    default:
      return { text: 'Desconocido', color: 'white' };
  }
}
