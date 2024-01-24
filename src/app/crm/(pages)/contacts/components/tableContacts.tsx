'use client';

import { useEffect, useState } from 'react';
import { User } from '@interface/appointment';
import UserService from '@services/UserService';
import DataTable from 'app/crm/components/table/DataTable';
import { useSessionStore } from 'app/stores/globalStore';

export default function TableContacts() {
  const { userLoginResponse } = useSessionStore(state => state);
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'firstName' },
    { label: 'Apellido', key: 'lastName' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'Email', key: 'email' },
  ];

  const fetchContacts = async () => {
    await UserService.getAllUsers(userLoginResponse!.token).then(
      usersResponse => {
        if (usersResponse) setUsers(usersResponse);
      }
    );
  };

  useEffect(() => {
    fetchContacts();
  }, []);
  if (!users) return <>Cargando Usuarios...</>;
  else return <DataTable data={users} columns={columns} />;
}
