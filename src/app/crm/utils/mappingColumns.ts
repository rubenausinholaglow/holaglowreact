import dayjs from 'dayjs';

import {
  Appointment,
  AppointmentsDataTableContact,
  Budget,
  BudgetsDataTableContact,
  Call,
  CallDataTableContact,
  Comment,
  CommentDataTableContact,
  Task,
  TaskDataTableContact,
} from '../types/Contact';

const concatenateProductName = (array: any[]) => {
  const result = array.map(element => element.product.title).join(', ');
  return result;
};

const getLastTaskExecution = (executions: any) => {
  return executions.slice(-1)[0];
};

export const mappingTasks = (contactDetailTasks: any) => {
  const model: TaskDataTableContact[] = [];
  contactDetailTasks.forEach((task: Task) => {
    const newModel: TaskDataTableContact = {
      creationDate: dayjs(task.creationDate).format('DD-MM-YYYY HH:mm:ss'),
      name: task.taskTemplate.name,
      status: getLastTaskExecution(task.executions).status,
      endDateTask: dayjs(task.completedTime).format('DD-MM-YYYY HH:mm:ss'),
    };
    model.push(newModel);
  });
  return model;
};

export const mappingComments = (contactDetailComments: any) => {
  const model: CommentDataTableContact[] = [];
  contactDetailComments.forEach((comment: Comment) => {
    const newModel: CommentDataTableContact = {
      agent: comment.agent ? comment.agent.username : '',
      creationDate: dayjs(comment.creationDate).format('DD-MM-YYYY HH:mm:ss'),
      text: comment.text,
    };
    model.push(newModel);
  });
  return model;
};

export const mappingCalls = (contactDetailCalls: any) => {
  const model: CallDataTableContact[] = [];
  contactDetailCalls.forEach((call: Call) => {
    const newModel: CallDataTableContact = {
      startTimeCalls: dayjs(call.startTime).format('DD-MM-YYYY hh:mm'),
      endTimeCalls: dayjs(call.endTime).format('DD-MM-YYYY hh:mm'),
      status: call.status,
    };
    model.push(newModel);
  });
  return model;
};

export const mappingAppointments = (contactDetailAppointments: any) => {
  const model: AppointmentsDataTableContact[] = [];
  contactDetailAppointments.forEach((appointment: Appointment) => {
    const newModel: AppointmentsDataTableContact = {
      status: appointment.status,
      city: appointment.clinic.city,
      dateAppointment: dayjs(appointment.date).format('DD-MM-YYYY'),
      treatments: concatenateProductName(appointment.appointmentProducts),
      startTimeAppointment: appointment.startTime,
    };
    model.push(newModel);
  });
  return model;
};

export const mappingBudgets = (contactDetailBudgets: any) => {
  const model: BudgetsDataTableContact[] = [];
  contactDetailBudgets.forEach((budget: Budget) => {
    const newModel: BudgetsDataTableContact = {
      creationDate: dayjs(budget.creationDate).format('DD-MM-YYYY'),
      productsText: concatenateProductName(budget.products),
      actions: '>',
      status: budget.statusBudget,
      totalPrice: budget.totalPrice,
    };
    model.push(newModel);
  });
  return model;
};
