'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Task } from '@interface/task';
import TaskService from '@services/TaskService';
import DataTable from 'app/crm/components/table/DataTable';
import { useSessionStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';

export default function TableTasks() {
  const { userLoginResponse } = useSessionStore(state => state);
  const [tasks, setTasks] = useState<any[] | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const columns = [
    { label: 'Fecha', key: 'creationDate' },
    { label: 'Nombre', key: 'name' },
    { label: 'Contacto', key: 'userName' },
    { label: 'Estado', key: 'status' },
    { label: 'Agente', key: 'agentName' },
    { label: 'Fecha finalización', key: 'completedTime' },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      await TaskService.getAllTasks(userLoginResponse!.token).then(
        taskResponse => {
          if (taskResponse) {
            taskResponse.forEach(x => {
              const date = new Date(x.creationDate);
              x.creationDate = dayjs(date).format('DD-MM-YYYY HH:mm:ss');
              const date2 = new Date(x.completedTime);
              x.completedTime = dayjs(date2).format('DD-MM-YYYY HH:mm:ss');
              if (x.completedTime == '01-01-0001 00:00:00')
                x.completedTime = '';
              x.name = x.taskTemplate.name;
              setStatusTasks(x);
              x.userName = x.user.firstName + ' ' + x.user.lastName;
              setAgentName(x);
            });
            setTasks(taskResponse);
          } else {
            setErrorMessage(
              'Error cargando usuarios - Contacte con el administrador'
            );
            Bugsnag.notify('Error getting users CRM');
          }
        }
      );
    };
    if (!tasks) {
      fetchTasks();
    }
  }, []);

  function setStatusTasks(x: any) {
    switch (x.status) {
      case 0:
        x.status = <label>Pendiente</label>;
        break;
      case 1:
        x.status = <label>Cancelada</label>;
        break;
      case 2:
        x.status = <label>Finalizada</label>;
        break;
    }
  }

  function setAgentName(x: any) {
    x.executions.forEach((y: any) => {
      if (!x.agentName) {
        x.agentName = y.agent.username;
      }
    });
  }

  if (!tasks)
    return (
      <>
        {errorMessage ? (
          <p className="text-red-500"> {errorMessage}</p>
        ) : (
          <p>Cargando Tareas...</p>
        )}
      </>
    );
  else return <DataTable data={tasks} columns={columns} />;
}
