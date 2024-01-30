import dayjs from 'dayjs';

import { Task, TaskDataTableContact } from '../types/Contact';

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
