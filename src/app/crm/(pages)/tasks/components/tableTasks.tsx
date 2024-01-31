'use client';

import { useEffect, useState } from 'react';
import { DocumentNode } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import { TaskInstances } from '@interface/task';
import DataTable from 'app/crm/components/table/DataTable';
import {
  CreateQuery,
  createQuery,
  Cursor,
} from 'app/crm/components/table/TableFunctions';
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
  const columnKeys = [
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
      const { data } = await client.query({ query: query });
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

  const updateState = (taskData: any, nextPage = false) => {
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
    const params: CreateQuery = {
      nextPage,
      stringFilter,
      numberPerPage,
      sortedBy,
      columnKeys,
      entity,
    };
    const queryBuilders = createQuery(params, cursors);
    await fetchTasks(queryBuilders, nextPage);
  };

  useEffect(() => {
    executeQuery(true);
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

  const handleNextPage = async () => {
    executeQuery(true);
  };

  const handlePreviousPage = async () => {
    executeQuery(false);
  };

  const handleItemsPerPageChange = async (value: number) => {
    setItemsPerPage(value);
    executeQuery(true, '', value);
  };

  const handleOnFilterChange = async (stringFilter: string) => {
    if (stringFilter == '') return;
    executeQuery(true, stringFilter);
  };

  const handleSortChange = async (sortedBy: string) => {
    if (sortedBy == '') return;
    executeQuery(true, '', 10000, sortedBy);
  };

  return (
    <div>
      {tasks ? (
        <DataTable
          data={tasks}
          columns={columns}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          hasNextPage={cursors[cursors.length - 1]?.hasNextPage || false}
          totalPages={totalCount}
          onFilterChange={handleOnFilterChange}
          onSortedChange={handleSortChange}
          showActionsColumn={false}
        />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>Cargando Tareas...</p>
      )}
    </div>
  );
}
