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

export const mappingTasks = (contactDetailTasks: any) => {
  const model: TaskDataTableContact[] = [];
  contactDetailTasks.forEach((task: Task) => {
    const newModel: TaskDataTableContact = {
      creationDate: dayjs(task.creationDate).format('DD-MM-YYYY HH:mm:ss'),
      name: task.taskTemplate.name,
      status: task.executions[0].status,
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
      creationDate: comment.creationDate,
      text: comment.text,
    };
    model.push(newModel);
  });
  return model;
};

export const mappingCalls = (contactDetailCalls: any) => {
  const model: CallDataTableContact[] = [];
  contactDetailCalls.forEach((call: Call) => {
    model.push(call);
  });
  return model;
};

export const mappingAppointments = (contactDetailAppointments: any) => {
  const model: AppointmentsDataTableContact[] = [];
  contactDetailAppointments.forEach((appointment: Appointment) => {
    const newModel: AppointmentsDataTableContact = {
      status: appointment.status,
      city: appointment.clinic.city,
      dateAppointment: appointment.date,
      treatments: appointment.appointmentProducts[0].product.title,
      startTimeAppointment: appointment.startTime,
    };
    model.push(newModel);
  });
  return model;
};

export const mappingBudgets = (contactDetailBudgets: any) => {
  const model: BudgetsDataTableContact[] = [];
  contactDetailBudgets.forEach((budget: Budget) => {
    model.push(budget);
  });
  return model;
};
