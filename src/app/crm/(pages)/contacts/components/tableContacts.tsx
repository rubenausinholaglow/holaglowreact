'use client';

import { useEffect, useState } from 'react';
import { User } from '@interface/appointment';
import { Card, Typography } from '@material-tailwind/react';
import UserService from '@services/UserService';
import { useSessionStore } from 'app/stores/globalStore';

const TABLE_HEAD = ['Nombre', 'Apellido', 'Apellido', ''];

const TableData = ({ usersData }: { usersData: User[] | undefined }) => {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map(head => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usersData?.map(({ firstName, lastName, secondLastName }, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {firstName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {lastName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {secondLastName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  Edit
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default function TableContacts() {
  const { userLoginResponse } = useSessionStore(state => state);
  const [users, setUsers] = useState<User[] | undefined>(undefined);

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
  else
    return (
      <div>
        <TableData usersData={users} />
      </div>
    );
}
