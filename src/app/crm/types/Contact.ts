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
  whatsapps: WhatsappMessages[];
  leads: Lead[];
}

export interface TaskDataTableContact {
  creationDate: string;
  name: string;
  status: string;
  endDateTask: string;
}

export interface CommentDataTableContact {
  creationDate: string;
  text: string;
  agent: string;
}

export interface CallDataTableContact {
  startTimeCalls: string;
  status: number;
  endTimeCalls: string;
}

export interface AppointmentsDataTableContact {
  dateAppointment: string;
  startTimeAppointment: string;
  city: string;
  treatments: string;
  status: number;
}

export interface BudgetsDataTableContact {
  creationDate: string;
  productsText: string;
  totalPrice: number;
  status: string;
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
  status: string;
  taskTemplate: TaskTemplate;
  executions: Execution[];
}

export interface Call {
  id: string;
  creationDate: string;
  startTime: string;
  endTime: string;
  status: number;
  active: boolean;
  agent: Agent;
}

export interface Appointment {
  active: boolean;
  agent: Agent | null;
  appointmentProducts: Product[];
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
  active: boolean;
  creationDate: string;
  discountAmount: number;
  discountCode: string;
  flowwwId: string;
  id: string;
  manualPrice: number;
  percentageDiscount: number;
  priceDiscount: number;
  products: Product[];
  referenceId: string;
  statusBudget: string;
  totalPrice: number;
  totalPriceWithIVA: number;
}

export interface WhatsappMessages {
  time: string;
  agent: Agent;
  text: string;
  id: string;
  creationDate: string;
  active: boolean;
  received: boolean;
}

export interface Lead {
  appointments: Appointment[];
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

export interface Execution {
  active: true;
  creationDate: string;
  endTime: string;
  id: string;
  startTime: string;
  status: string;
}

interface Clinic {
  city: string;
}

interface Product {
  product: {
    title: string;
  };
}
