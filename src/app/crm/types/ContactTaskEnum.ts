enum TaskStatus {
  Pending = "Pending",
  Cancelled = "Cancelled",
  Finished = "Finished",
}

interface GetTaskStatusProps {
  text: string;
  color: string;
}

export default function getTaskStatusText(
  status: TaskStatus
): GetTaskStatusProps {
  switch (status) {
    case TaskStatus.Pending:
      return { text: 'PENDIENTE', color: 'blue' };
    case TaskStatus.Cancelled:
      return { text: 'CANCELADA', color: 'red' };
    case TaskStatus.Finished:
      return { text: 'FINALIZADA', color: 'green' };
    default:
      return { text: 'DESCONOCIDO', color: 'white' };
  }
}
