'use client';

import { useEffect, useState } from 'react';
import { DocumentNode } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import { TaskInstances } from '@interface/task';
import DataTable from 'app/crm/components/table/DataTable';
import {
  createQuery,
  Cursor,
  TableQuery,
} from 'app/crm/components/table/TableFunctions';
import { TaskQueryResponse } from 'app/GraphQL/TaskQueryResponse';
import { useSessionStore } from 'app/stores/globalStore';
import { createApolloClient } from 'lib/client';

export default function TableTasks() {
  const { userLoginResponse } = useSessionStore(state => state);
  const [tasks, setTasks] = useState<TaskInstances[] | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const [totalCount, setTotalCount] = useState<number | 0>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number | 0>(10);

  const columns: any[] = [
    { label: 'id', key: 'id', format: 'string' },

    { label: 'Tarea', key: 'taskTemplate.name', format: 'string' },
    { label: 'Estado', key: 'status', format: 'Statustype' },
    {
      label: 'Nombre',
      key: 'user.firstName',
      nestedField: 'user',
      format: 'string',
    },
    {
      label: 'Apellido',
      key: 'user.lastName',
      nestedField: 'user',
      format: 'string',
    },
    {
      label: 'Email',
      key: 'user.email',
      nestedField: 'user',
      format: 'string',
    },
    {
      label: 'Agente',
      key: 'executions.agent.username',
      nestedField: 'executions',
      format: 'string',
    },
    { label: 'Fecha Finzaliación', key: 'completedTime', format: 'date' },
    { label: 'Fecha Creación', key: 'creationDate', format: 'date' },
  ];
  const queryToExecute = [
    `
      id
        creationDate
        status
        completedTime
        user {
            firstName
            lastName
            email
        }
        taskTemplate
        {
            name
        }
        executions
        {
            agent
            {
                username
            }
        }
`,
  ];

  const entity = 'taskInstances';
  const client = createApolloClient(
    process.env.NEXT_PUBLIC_CONTACTS_API!,
    userLoginResponse?.token || ''
  );

  const fetchTasks = async (query: DocumentNode, nextPage?: boolean) => {
    try {
      const { data } = await client.query<TaskQueryResponse>({ query: query });
      if (data.taskInstances.edges) {
        updateState(data, nextPage);
        setTasks(data.taskInstances.edges.map((edge: any) => edge.node));
      } else {
        setErrorMessage(
          'Error cargando usuarios - Contacte con el administrador'
        );
        Bugsnag.notify('Error getting users CRM');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setErrorMessage(
        'Error cargando usuarios - Contacte con el administrador'
      );
      Bugsnag.notify('Error getting users CRM');
    }
  };

  const updateState = (taskData: TaskQueryResponse, nextPage = false) => {
    const createCursor = (): Cursor => {
      return {
        startCursor: taskData.taskInstances.pageInfo.startCursor,
        endCursor: taskData.taskInstances.pageInfo.endCursor,
        hasNextPage: taskData.taskInstances.pageInfo.hasNextPage,
        hasPreviousPage: taskData.taskInstances.pageInfo.hasPreviousPage,
      };
    };
    if (nextPage) {
      setCursors(prev => [...prev, createCursor()]);
    }
    const totalCountPages = Math.ceil(
      taskData.taskInstances.totalCount / itemsPerPage
    );
    setTotalCount(totalCountPages);
  };

  const executeQuery = async (
    nextPage: boolean,
    stringFilter?: string,
    numberPerPage?: number,
    sortedBy?: string
  ) => {
    if (!nextPage) {
      setCursors(prev => prev.slice(0, -1));
    }
    const lastCursor = cursors[cursors.length - 2]?.endCursor || '';
    const nextCursor = cursors[cursors.length - 1]?.endCursor || '';
    const params: TableQuery = {
      nextPage,
      queryToExecute,
      entity,
      stringFilter,
      numberPerPage,
      sortedBy,
      lastCursor,
      nextCursor,
    };
    const queryBuilders = createQuery(params);
    await fetchTasks(queryBuilders, nextPage);
  };

  useEffect(() => {
    executeQuery(true);
  }, []);

  return (
    <div>
      {tasks ? (
        <DataTable
          data={tasks}
          columns={columns}
          hasNextPage={cursors[cursors.length - 1]?.hasNextPage || false}
          totalPages={totalCount}
          showActionsColumn={false}
          executeQuery={executeQuery}
        />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>Cargando Tareas...</p>
      )}
    </div>
  );
}
