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
import {
  UserQueryResponse,
  UsersResponse,
} from 'app/GraphQL/UserQueryResponse';
import { useSessionStore } from 'app/stores/globalStore';
import { createApolloClient } from 'lib/client';

export default function TableContacts() {
  const { userLoginResponse } = useSessionStore(state => state);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [cursors, setCursors] = useState<Cursor[]>([]);

  const columns = [
    { label: 'ID', key: 'id', format: 'string' },
    { label: 'Nombre', key: 'firstName', format: 'string' },
    { label: 'Apellido', key: 'lastName', format: 'string' },
    { label: 'Teléfono', key: 'phone', format: 'string' },
    { label: 'Email', key: 'email', format: 'string' },
  ];
  const queryToExecute = columns.map(column => column.key);
  const entity = 'users';
  const client = createApolloClient(
    process.env.NEXT_PUBLIC_CONTACTS_API!,
    userLoginResponse?.token || ''
  );

  const fetchContacts = async (query: DocumentNode, nextPage?: boolean) => {
    try {
      const { data } = await client.query<UserQueryResponse>({ query: query });
      if (data.users.edges) {
        updateState(data.users, nextPage);
        setUsers(data.users.edges.map((edge: any) => edge.node));
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

  const updateState = (userData: UsersResponse, nextPage = false) => {
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
    const totalCountPages = Math.ceil(userData.totalCount / itemsPerPage);
    setTotalCount(totalCountPages);
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
    if (numberPerPage || 0 > 0) setItemsPerPage(numberPerPage!);
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
          hasNextPage={cursors[cursors.length - 1]?.hasNextPage || false}
          totalPages={totalCount}
          showActionsColumn={false}
          executeQuery={executeQuery}
        />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>Cargando Usuarios...</p>
      )}
    </div>
  );
}
