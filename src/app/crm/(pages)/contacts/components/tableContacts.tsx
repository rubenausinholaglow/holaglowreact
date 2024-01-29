'use client';

import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import { User } from '@interface/appointment';
import UserService from '@services/UserService';
import DataTable from 'app/crm/components/table/DataTable';
import { useSessionStore } from 'app/stores/globalStore';
import createApolloClient from 'lib/client';

export default function TableContacts() {
  const { userLoginResponse } = useSessionStore(state => state);
  const [users, setUsers] = useState<any[] | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'firstName' },
    { label: 'Apellido', key: 'lastName' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'Email', key: 'email' },
  ];

  useEffect(() => {
    const client = createApolloClient(
      process.env.NEXT_PUBLIC_CONTACTS_API || ''
    );

    const QUERY_USERS = gql`
      query {
        users {
          id
          firstName
          lastName
          phone
          email
        }
      }
    `;

    const fetchContacts = async () => {
      const { data } = await client.query({ query: QUERY_USERS });
      if (data.users) {
        setUsers(data.users);
      } else {
        setErrorMessage(
          'Error cargando usuarios - Contacte con el administrador'
        );
        Bugsnag.notify('Error getting users CRM');
      }
    };

    if (!users) {
      fetchContacts();
    }
  }, []);

  if (!users)
    return (
      <>
        {errorMessage ? (
          <p className="text-red-500"> {errorMessage}</p>
        ) : (
          <p>Cargando Usuarios...</p>
        )}
      </>
    );
  else return <DataTable data={users} columns={columns} />;
}
