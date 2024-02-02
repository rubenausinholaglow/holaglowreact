
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
};
