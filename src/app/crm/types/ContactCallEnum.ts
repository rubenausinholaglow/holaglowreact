enum CallStatus {
  NotAnswered = 0,
  Answered = 1,
  Busy = 2,
  Pending = 3,
  Completed = 4,
}

interface GetCallStatusProps {
  text: string;
  color: string;
}

export default function getCallStatusText(
  status: CallStatus
): GetCallStatusProps {
  switch (status) {
    case CallStatus.NotAnswered:
      return { text: 'NO CONTESTADO', color: 'blue' };
    case CallStatus.Answered:
      return { text: 'CONTESTADA', color: 'blue' };
    case CallStatus.Busy:
      return { text: 'OCUPADO', color: 'red' };
    case CallStatus.Pending:
      return { text: 'PENDIENTE', color: 'blue' };
    case CallStatus.Completed:
      return { text: 'COMPLETADA', color: 'green' };
    default:
      return { text: 'Desconocido', color: 'white' };
  }
}
