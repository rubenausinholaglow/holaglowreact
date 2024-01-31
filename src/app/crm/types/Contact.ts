export interface ClientDetails {
  id: string;
  phone: string;
  phonePrefix: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  flowwwToken: string;
  creationDate: Date;
  country: string;
  dni: string;
  city: string;
  address: string;
  birthday: string;
  province: string;
  privacyCheck: boolean;
  taskInstances: Task[];
  agent: Agent;
  comments: Comment[];
  calls: Call[];
  appointments: Appointment[];
  budgets: Budget[];
}

export interface TaskDataTableContact {
  creationDate: string;
  name: string;
  status: number; //Enum
  endDateTask: string;
}

export interface CommentDataTableContact {
  creationDate: string;
  text: string;
  agent: string;
}

export interface CallDataTableContact {
  startTime: string;
  status: number;
  endTime: string;
}

export interface AppointmentsDataTableContact {
  dateAppointment: string;
  startTimeAppointment: string;
  city: string;
  treatments: string;
  status: number;
}

export interface BudgetsDataTableContact {
  date: string;
  productsText: string;
  totalPrice: string;
  statusBudget: string;
  actions: string;
}

export interface Comment {
  active: boolean;
  agent: Agent;
  creationDate: string;
  id: string;
  text: string;
  time: string;
}

export interface Task {
  active: boolean;
  completedTime: string;
  name: string;
  creationDate: string;
  id: string;
  reason: string;
  status: number;
  taskTemplate: TaskTemplate;
  executions: Execution[];
}

export interface Call {
  startTime: string;
  status: number;
  endTime: string;
}

export interface Appointment {
  active: boolean;
  agent: Agent | null;
  appointmentProducts: ProductAppointment[];
  boxId: string;
  cancelDate: string;
  clinic: Clinic;  
  creationDate: string;
  date: string;
  endTime: string;
  flowwwId: string;
  id: string;
  startTime: string;
  status: number;
  treatments: any[];
}

export interface Budget {
  date: string;
  productsText: string;
  totalPrice: string;
  statusBudget: string;
  actions: string;
}

interface Agent {
  active: boolean;
  creationDate: string;
  id: string;
  skills: string;
  vacations: boolean;
  username: string;
}

interface TaskTemplate {
  active: boolean;
  agentPolicy: number;
  cancellationPolicy: number;
  creationDate: string;
  description: string;
  id: string;
  identifier: string;
  name: string;
  order: number;
}

interface Execution {
  active: true;
  creationDate: string;
  endTime: string;
  id: string;
  startTime: string;
  status: number;
}

interface Clinic {
  city: string;
}

interface ProductAppointment {
  product: {
    title: string;
  };
}
