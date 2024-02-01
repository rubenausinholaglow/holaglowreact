enum TaskStatusEnum {
  PENDIENTE = 0,
  CANCELADA = 1,
  FINALIZADA = 2,
}

interface GetTaskStatusProps {
  text: string;
  color: string;
}

export default function getTaskStatusText(
  status: TaskStatusEnum
): GetTaskStatusProps {
  switch (status) {
    case TaskStatusEnum.PENDIENTE:
      return { text: 'PENDIENTE', color: 'blue' };
    case TaskStatusEnum.CANCELADA:
      return { text: 'CANCELADA', color: 'red' };
    case TaskStatusEnum.FINALIZADA:
      return { text: 'FINALIZADA', color: 'green' };
    default:
      return { text: 'DESCONOCIDO', color: 'white' };
  }
}
