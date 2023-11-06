'use client';
import React, { useEffect, useState } from 'react';
import Notification from '@components/ui/Notification';
import MainLayout from 'app/components/layout/MainLayout';
import { Flex } from 'designSystem/Layouts/Layouts';

import DashboardMenuItem from '../menu/DashboardMenuItem';
import { menuItems } from './MenuItems';
import ValidateComment from './validate';

export default function RemoteControl({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [flowwwToken, setFlowwwToken] = useState('');
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );
  const [username, setUserName] = useState('');

  useEffect(() => {
    setFlowwwToken('');
    localStorage.removeItem('BudgetId');
    const storedUsername = localStorage.getItem('username') || '';
    setUserName(storedUsername);
  }, []);

  return (
    <React.StrictMode>
      <MainLayout isDashboard>
        <Flex layout="col-center">
          <p className="text-4xl mb-2">Paciente: {username}</p>
          <div className="grid grid-cols-3">
            {menuItems.map(item => (
              <DashboardMenuItem
                key={item.title}
                iconSrc={item.iconSrc}
                altText={item.altText}
                title={item.title}
                link={
                  item.link.includes('flowwwToken')
                    ? item.link.replace('flowwwToken', flowwwToken)
                    : item.link
                }
                target={item.target}
              />
            ))}
          </div>
          <ValidateComment></ValidateComment>
          {messageNotification ? (
            <Notification message={messageNotification} />
          ) : (
            <></>
          )}
        </Flex>
      </MainLayout>
    </React.StrictMode>
  );
}
