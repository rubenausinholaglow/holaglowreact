enum TaskStatusEnum {
  Pendiente = 0,
  Cancelada = 1,
  Finalizada = 2,
}

interface GetTaskStatusProps {
  text: string;
  color: string;
}

export default function getTaskStatusText(
  status: TaskStatusEnum
): GetTaskStatusProps {
  switch (status) {
    case TaskStatusEnum.Pendiente:
      return { text: 'Pendiente', color: 'blue' };
    case TaskStatusEnum.Cancelada:
      return { text: 'Cancelada', color: 'red' };
    case TaskStatusEnum.Finalizada:
      return { text: 'Finalizada', color: 'green' };
    default:
      return { text: 'Desconocido', color: 'white' };
  }
}
