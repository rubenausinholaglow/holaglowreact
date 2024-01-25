'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { User } from '@interface/appointment';
import DataTable from 'app/crm/components/table/DataTable';
import ContactService from 'app/crm/services/ContactService';
import { useSessionStore } from 'app/stores/globalStore';

export default function TableContacts() {
  const { userLoginResponse } = useSessionStore(state => state);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
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

  const fetchContacts = async () => {
    await ContactService.ContactsAll(userLoginResponse?.token ?? '').then(
      usersResponse => {
        if (usersResponse) {
          setUsers(usersResponse);
        } else {
          setErrorMessage(
            'Error cargando usuarios - Contacte con el administrador'
          );
          Bugsnag.notify('Error getting users CRM');
        }
      }
    );
  };

  useEffect(() => {
    fetchContacts();
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
