'use client';
import { useEffect, useState } from 'react';
import { DocumentNode } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import { User } from '@interface/appointment';
import DataTable from 'app/crm/components/table/DataTable';
import {
  createQuery,
  Cursor,
  TableQuery,
} from 'app/crm/components/table/TableFunctions';
import { PageInfo } from 'app/GraphQL/PageInfo';
import {
  UserQueryResponse,
  UsersResponse,
  UsersResponseNode,
} from 'app/GraphQL/UserQueryResponse';
import { useSessionStore } from 'app/stores/globalStore';
import { createApolloClient } from 'lib/client';

export default function TableContacts() {
  const { userLoginResponse } = useSessionStore(state => state);
  const [users, setUsers] = useState<UsersResponseNode[] | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [cursors, setCursors] = useState<Cursor[]>([]);

  const columns = [
    { label: 'ID', key: 'id', format: 'string' },
    { label: 'Nombre', key: 'firstName', format: 'string' },
    { label: 'Apellido', key: 'lastName', format: 'string' },
    { label: 'Teléfono', key: 'phone', format: 'string' },
    { label: 'Email', key: 'email', format: 'string' },
    { label: 'Fecha Creación', key: 'creationDate', format: 'date' },
    {
      label: 'Agente',
      key: 'agent.username',
      nestedField: 'executions',
      format: 'string',
    },
  ];
  const queryToExecute = [
    `
      id
      creationDate
      firstName
      lastName
      phone
      email
      agent {
          username
      }
    `,
  ];

  const entity = 'users';
  const client = createApolloClient(
    process.env.NEXT_PUBLIC_CONTACTS_API!,
    userLoginResponse?.token || ''
  );

  const fetchContacts = async (query: DocumentNode, nextPage?: boolean) => {
    try {
      const { data } = await client.query<UserQueryResponse>({ query: query });
      if (data.users.edges) {
        updateCursor(data.users, nextPage);
        setPageInfo(data.users.pageInfo);
        setTotalCount(data.users.totalCount);
        const users = data.users.edges.map(edge => edge.node);
        setUsers(users);
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

  const updateCursor = (userData: UsersResponse, nextPage = false) => {
    const createCursor = (): Cursor => {
      return {
        startCursor: userData.pageInfo.startCursor,
        endCursor: userData.pageInfo.endCursor,
        hasNextPage: userData.pageInfo.hasNextPage,
        hasPreviousPage: userData.pageInfo.hasPreviousPage,
      };
    };
    if (nextPage) {
      setCursors(prev => [...prev, createCursor()]);
    }
  };

  useEffect(() => {
    executeQuery(true);
  }, []);

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
    await fetchContacts(queryBuilders, nextPage);
  };

  return (
    <div>
      {users ? (
        <DataTable
          data={users}
          columns={columns}
          showActionsColumn={false}
          executeQuery={executeQuery}
          pageInfo={pageInfo!}
          totalCount={totalCount}
        />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>Cargando Usuarios...</p>
      )}
    </div>
  );
}
