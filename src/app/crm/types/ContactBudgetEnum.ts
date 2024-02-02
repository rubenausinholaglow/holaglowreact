enum BudgetStatus {
  Open = 1,
  Finish = 2,
  Rejected = 3,
  Paid = 4,
}

interface GetBudgetStatusProps {
  text: string;
  color: string;
}

export default function getBudgetStatusText(
  status: BudgetStatus
): GetBudgetStatusProps {
  switch (status) {
    case BudgetStatus.Open:
      return { text: 'PENDIENTE', color: 'blue' };
    case BudgetStatus.Finish:
      return { text: 'ACEPTADO', color: 'green' };
    case BudgetStatus.Rejected:
      return { text: 'RECHAZADO', color: 'red' };
    case BudgetStatus.Paid:
      return { text: 'PAGADO', color: 'green' };
    default:
      return { text: 'DESCONOCIDO', color: 'white' };
  }
}
