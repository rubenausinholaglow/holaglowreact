'use client';
import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { User } from '@interface/appointment';
import DataTable from 'app/crm/components/table/DataTable';
import {
  CreateQuery,
  createQuery,
  Cursor,
} from 'app/crm/components/table/TableFunctions';
import { useSessionStore } from 'app/stores/globalStore';
import { createApolloClient } from 'lib/client';

export default function TableContacts() {
  const { userLoginResponse } = useSessionStore(state => state);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [itemsPerPage, setItemsPerPage] = useState<number | 0>(10);
  const [totalCount, setTotalCount] = useState<number | 0>(0);
  const [cursors, setCursors] = useState<Cursor[]>([]);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'firstName' },
    { label: 'Apellido', key: 'lastName' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'Email', key: 'email' },
  ];
  const columnKeys = columns.map(column => column.key);
  const entity = 'users';
  const client = createApolloClient(
    process.env.NEXT_PUBLIC_CONTACTS_API || '',
    userLoginResponse?.token || ''
  );

  const fetchContacts = async (queryString: any, nextPage?: boolean) => {
    try {
      const { data } = await client.query({ query: queryString });
      if (data.users.edges) {
        updateState(data, nextPage);
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

  const updateState = (userData: any, nextPage = false) => {
    const createCursor = (): Cursor => {
      return {
        startCursor: userData.users.pageInfo.startCursor,
        endCursor: userData.users.pageInfo.endCursor,
        hasNextPage: userData.users.pageInfo.hasNextPage,
        hasPreviousPage: userData.users.pageInfo.hasPreviousPage,
      };
    };
    if (nextPage) {
      setCursors(prev => [...prev, createCursor()]);
    }
    const totalCountPages = Math.ceil(userData.users.totalCount / itemsPerPage);
    setTotalCount(totalCountPages);
  };

  useEffect(() => {
    executeQuery(true);
  }, []);

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
    await fetchContacts(queryBuilders, nextPage);
  };

  return (
    <div>
      {users ? (
        <DataTable
          data={users}
          columns={columns}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          hasNextPage={cursors[cursors.length - 1]?.hasNextPage || false}
          totalPages={totalCount}
          onFilterChange={handleOnFilterChange}
          onSortedChange={handleSortChange}
        />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>Cargando Usuarios...</p>
      )}
    </div>
  );
}
