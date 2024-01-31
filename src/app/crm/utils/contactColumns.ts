export const TaskColumns = [
  { name: 'Fecha', key: 'creationDate' },
  { name: 'Nombre', key: 'name' },
  { name: 'Estado', key: 'status' },
  { name: 'Fecha finalización', key: 'endDateTask' },
];

export const CommentsColumns = [
  { name: 'Fecha de Creación', key: 'creationDate' },
  { name: 'Texto', key: 'text' },
  { name: 'Agente', key: 'agent' },
];

export const CallsColumns = [
  { name: 'Fecha inicio', key: 'startTimeCalls' },
  { name: 'Estado', key: 'status' },
  { name: 'Fecha finalización', key: 'endTimeCalls' },
];

export const AppointmentsColumns = [
  { name: 'Fecha', key: 'dateAppointment' },
  { name: 'Hora', key: 'startTimeAppointment' },
  { name: 'Ciudad', key: 'city' },
  { name: 'Tratamientos', key: 'treatments' },
  { name: 'Estado', key: 'status' },
];

export const BudgetColumns = [
  { name: 'Fecha', key: 'date' },
  { name: 'Productos', key: 'productsText' },
  { name: 'Precio', key: 'totalPrice' },
  { name: 'Estado', key: 'statusBudget' },
  { name: 'Acciones', key: 'actions' },
];
