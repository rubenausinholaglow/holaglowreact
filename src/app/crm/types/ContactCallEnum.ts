enum CallStatus {
  NotAnswered = 'NotAnswered',
  Answered = 'Answered',
  Busy = 'Busy',
  Pending = 'Pending',
  Completed = 'Completed',
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
