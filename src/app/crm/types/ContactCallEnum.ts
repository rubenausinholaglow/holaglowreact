enum CallStatusEnum {
  NOCONTESTADO = 0,
  CONTESTADA = 1,
  OCUPADO = 2,
  PENDIENTE = 3,
  COMPLETADA = 4,
}

interface GetCallStatusProps {
  text: string;
  color: string;
}

export default function getCallStatusText(
  status: CallStatusEnum
): GetCallStatusProps {
  switch (status) {
    case CallStatusEnum.NOCONTESTADO:
      return { text: 'NO CONTESTADO', color: 'blue' };
    case CallStatusEnum.CONTESTADA:
      return { text: 'CONTESTADA', color: 'blue' };
    case CallStatusEnum.OCUPADO:
      return { text: 'OCUPADO', color: 'red' };
    case CallStatusEnum.PENDIENTE:
      return { text: 'PENDIENTE', color: 'blue' };
    case CallStatusEnum.COMPLETADA:
      return { text: 'COMPLETADA', color: 'green' };
    default:
      return { text: 'Desconocido', color: 'white' };
  }
}
