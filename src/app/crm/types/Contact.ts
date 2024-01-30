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
}

export interface TaskDataTableContact {
  creationDate: string;
  name: string;
  status: number; //Enum
  endDateTask: string;
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
