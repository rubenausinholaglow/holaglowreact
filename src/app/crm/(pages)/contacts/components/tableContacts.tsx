'use client';
import { useEffect, useRef, useState } from 'react';
import { gql } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import { GraphQLQueryBuilder } from '@interface/queryType';
import DataTable from 'app/crm/components/table/DataTable';
import { useSessionStore } from 'app/stores/globalStore';
import { createApolloClient } from 'lib/client';

export default function TableContacts() {
  const { userLoginResponse } = useSessionStore(state => state);
  const [users, setUsers] = useState<any[] | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [itemsPerPage, setItemsPerPage] = useState<number | 0>(10);
  const [totalCount, setTotalCount] = useState<number | 0>(0);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [startCursor, setStartCursor] = useState<string>('');
  const [previousCursor, setPreviousCursor] = useState<string>('');
  const [endCursor, setEndCursor] = useState<string>('');
  const wasAlreadyRequested = useRef(false);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'firstName' },
    { label: 'Apellido', key: 'lastName' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'Email', key: 'email' },
  ];
  const columnKeys = columns.map(column => column.key);

  useEffect(() => {
    const client = createApolloClient(
      process.env.NEXT_PUBLIC_CONTACTS_API || '',
      userLoginResponse?.token || ''
    );

    const queryBuilder = new GraphQLQueryBuilder(
      columnKeys,
      '',
      '',
      itemsPerPage
    );
    const queryString = queryBuilder.buildQuery('users');
    const queryBuilders = gql(queryString);
    const fetchContacts = async () => {
      try {
        const { data } = await client.query({ query: queryBuilders });
        if (data.users.edges) {
          setUsers(data.users.edges.map((edge: any) => edge.node));
          if (startCursor == '')
            setStartCursor(data.users.pageInfo.hasNextPage);
          setHasPreviousPage(data.users.pageInfo.hasPreviousPage);
          setHasNextPage(data.users.pageInfo.hasNextPage);
          setEndCursor(data.users.pageInfo.endCursor);
          const totalCountPages = Math.ceil(
            data.users.totalCount / itemsPerPage
          );
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

    if (!wasAlreadyRequested.current) {
      fetchContacts();
      wasAlreadyRequested.current = true;
    }
  }, []);

  const handleNextPage = async () => {
    const client = createApolloClient(
      process.env.NEXT_PUBLIC_CONTACTS_API || '',
      userLoginResponse?.token || ''
    );

    const queryBuilder = new GraphQLQueryBuilder(
      columnKeys,
      endCursor,
      '',
      itemsPerPage
    );
    const queryString = queryBuilder.buildQuery('users');
    const queryBuilders = gql(queryString);

    try {
      const { data } = await client.query({ query: queryBuilders });
      if (data.users.edges) {
        setPreviousCursor(endCursor);
        setUsers(data.users.edges.map((edge: any) => edge.node));
        setHasPreviousPage(data.users.pageInfo.hasPreviousPage);
        setHasNextPage(data.users.pageInfo.hasNextPage);
        setEndCursor(data.users.pageInfo.endCursor);
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

  const handlePreviousPage = async () => {
    if (!hasPreviousPage) return;
    const client = createApolloClient(
      process.env.NEXT_PUBLIC_CONTACTS_API || '',
      userLoginResponse?.token || ''
    );

    const queryBuilder = new GraphQLQueryBuilder(
      columnKeys,
      endCursor,
      '',
      itemsPerPage
    );
    const queryString = queryBuilder.buildQuery('users');
    const queryBuilders = gql(queryString);

    try {
      const { data } = await client.query({ query: queryBuilders });
      if (data.users.edges) {
        setUsers(data.users.edges.map((edge: any) => edge.node));
        setHasNextPage(data.users.pageInfo.hasNextPage);
        setEndCursor(data.users.pageInfo.endCursor);
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

  const handleItemsPerPageChange = async (value: number) => {
    if (startCursor == endCursor) return;

    setItemsPerPage(value);

    const client = createApolloClient(
      process.env.NEXT_PUBLIC_CONTACTS_API || '',
      userLoginResponse?.token || ''
    );

    const queryBuilder = new GraphQLQueryBuilder(
      columnKeys,
      previousCursor,
      '',
      value
    );
    const queryString = queryBuilder.buildQuery('users');
    const queryBuilders = gql(queryString);

    try {
      const { data } = await client.query({ query: queryBuilders });
      if (data.users.edges) {
        const totalCountPages = Math.ceil(data.users.totalCount / value);
        setTotalCount(totalCountPages);
        setUsers(data.users.edges.map((edge: any) => edge.node));
        setHasNextPage(data.users.pageInfo.hasNextPage);
        setEndCursor(data.users.pageInfo.endCursor);
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
        />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>Cargando Usuarios...</p>
      )}
    </div>
  );
}
