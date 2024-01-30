'use client';

import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import DataTable from 'app/crm/components/table/DataTable';
import { useSessionStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { createApolloClient } from 'lib/client';

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

  const QUERY_TASKS = gql`
    query TaskInstances($offset: Int, $limit: Int) {
      taskInstances(offset: $offset, limit: $limit) {
        id
        creationDate
        completedTime
        user {
          firstName
          lastName
        }
        taskTemplate {
          name
        }
        executions {
          agent {
            username
          }
        }
      }
    }
  `;

  useEffect(() => {
    const client = createApolloClient(
      process.env.NEXT_PUBLIC_CONTACTS_API || '',
      userLoginResponse?.token || ''
    );

    const fetchTasks = async () => {
      try {
        const { data } = await client.query({
          query: QUERY_TASKS,
          variables: {
            offset: 0,
            limit: 10,
          },
        });
        if (data.taskInstances) {
          const modifiedTasks = data.taskInstances.map((task: any) => ({
            ...task,
            creationDate: dayjs(task.creationDate).format(
              'DD-MM-YYYY HH:mm:ss'
            ),
            completedTime:
              task.completedTime === '01-01-0001 00:00:00'
                ? ''
                : dayjs(task.completedTime).format('DD-MM-YYYY HH:mm:ss'),
            name: task.taskTemplate.name,
            userName: `${task.user.firstName} ${task.user.lastName}`,
            status: getStatusLabel(task.status),
          }));
          setAgentName(modifiedTasks);
          setTasks(modifiedTasks);
        } else {
          setErrorMessage(
            'Error cargando usuarios - Contacte con el administrador'
          );
          Bugsnag.notify('Error getting users CRM');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (!tasks) {
      fetchTasks();
    }
  }, []);

  function getStatusLabel(status: number) {
    switch (status) {
      case 0:
        return <label>Pendiente</label>;
      case 1:
        return <label>Cancelada</label>;
      case 2:
        return <label>Finalizada</label>;
      default:
        return null;
    }
  }

  function setAgentName(tasks: any[]) {
    tasks.forEach(task => {
      task.executions.forEach((execution: any) => {
        if (!task.agentName) {
          task.agentName = execution.agent.username;
        }
      });
    });
  }
}
