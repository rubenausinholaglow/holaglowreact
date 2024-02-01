enum BudgetStatusEnum {
  PENDIENTE = 0,
  ACEPTADO = 1,
  RECHAZADO = 2,
  PAGADO = 3,
}

interface GetBudgetStatusProps {
  text: string;
  color: string;
}

export default function getBudgetStatusText(
  status: BudgetStatusEnum
): GetBudgetStatusProps {
  switch (status) {
    case BudgetStatusEnum.PENDIENTE:
      return { text: 'PENDIENTE', color: 'blue' };
    case BudgetStatusEnum.ACEPTADO:
      return { text: 'ACEPTADO', color: 'green' };
    case BudgetStatusEnum.RECHAZADO:
      return { text: 'RECHAZADO', color: 'red' };
    case BudgetStatusEnum.PAGADO:
      return { text: 'PAGADO', color: 'green' };
    default:
      return { text: 'DESCONOCIDO', color: 'white' };
  }
}
