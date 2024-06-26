interface StatusConfig {
  names: Record<string, string>;
  colors: Record<string, string>;
}

export const entityStatusConfig: Record<string, StatusConfig> = {
  taskInstances: {
    names: {
      PENDING: 'Pendiente',
      CANCELLED: 'Cancelada',
      FINISHED: 'Finalizada',
    },
    colors: {
      PENDING: 'bg-hg-black500',
      CANCELLED: 'bg-hg-error',
      FINISHED: 'bg-hg-green',
    },
  },
  budgets: {
    names: {
      OPEN: 'Pendiente',
      PAID: 'Pagado',
      REJECTED: 'Rechazado',
      CONTACTED: 'En seguimiento',
    },
    colors: {
      OPEN: 'bg-hg-black500',
      PAID: 'bg-hg-green',
      REJECTED: 'bg-hg-error',
      CONTACTED: 'bg-hg-tertiary',
    },
  },
};
