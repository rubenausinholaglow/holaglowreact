'use client';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import { User } from '@interface/appointment';
import { GraphQLQueryBuilder } from '@interface/queryType';
import DataTable from 'app/crm/components/table/DataTable';
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
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [startCursor, setStartCursor] = useState<string>('');
  const [endCursor, setEndCursor] = useState<string>('');
  const [previousCursor, setPreviousCursor] = useState<string>('');

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

  const fetchContacts = async (queryString: any) => {
    try {
      const { data } = await client.query({ query: queryString });
      if (data.users.edges) {
        setPreviousCursor(endCursor);
        setUsers(data.users.edges.map((edge: any) => edge.node));
        setStartCursor(data.users.pageInfo.startCursor);
        setHasPreviousPage(data.users.pageInfo.hasPreviousPage);
        setHasNextPage(data.users.pageInfo.hasNextPage);
        setEndCursor(data.users.pageInfo.endCursor);
        const totalCountPages = Math.ceil(data.users.totalCount / itemsPerPage);
        setTotalCount(totalCountPages);
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

  useEffect(() => {
    const queryBuilders = createQuery(true);
    fetchContacts(queryBuilders);
  }, []);

  const handleNextPage = async () => {
    const queryBuilders = createQuery(true);
    fetchContacts(queryBuilders);
  };

  const handlePreviousPage = async () => {
    if (!hasPreviousPage) return;
    const queryBuilders = createQuery(false);
    fetchContacts(queryBuilders);
  };

  const handleItemsPerPageChange = async (value: number) => {
    if (startCursor == endCursor) return;
    setItemsPerPage(value);
    const queryBuilders = createQuery(true, '', value);
    fetchContacts(queryBuilders);
  };

  const handleOnFilterChange = async (stringFilter: string) => {
    if (stringFilter == '') return;
    const queryBuilders = createQuery(true, stringFilter);
    fetchContacts(queryBuilders);
  };

  function createQuery(
    nextPage: boolean,
    stringFilter?: string,
    numberPerPage?: number
  ) {
    const queryBuilder = new GraphQLQueryBuilder(
      !nextPage ? false : true,
      columnKeys,
      nextPage ? endCursor : '',
      !nextPage ? previousCursor : '',
      numberPerPage ? numberPerPage : itemsPerPage
    );

    const queryString = queryBuilder.buildQuery(entity, stringFilter);

    return gql(queryString);
  }

  return (
    <div>
      {users ? (
        <DataTable
          data={users}
          columns={columns}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          pageInfo={{
            hasNextPage: hasNextPage,
            endCursor: endCursor,
          }}
          totalPages={totalCount}
          onFilterChange={handleOnFilterChange}
        />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>Cargando Usuarios...</p>
      )}
    </div>
  );
}
