'use client';

import React, { useEffect, useState } from 'react';
import ButtonMessage from '@components/ui/ButtonMessage';
import { Container, Flex } from 'components/Layouts/Layouts';
import { useRouter } from 'next/navigation';

import DashboardMenuItem from './DashboardMenuItem';
import { menuItems } from './MenuItems';

const Page = () => {
  menuItems;
  const [username, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUserName(storedUsername);

    if (!storedUsername) {
      router.push('/dashboard');
    }
  }, []);

  return (
    <>
      {username && (
        <Container>
          <Flex layout="col-center">
            <p className="font-bold text-2xl mb-8">
              Hola {username} ¿Qué deseas hacer?
            </p>
            <div className="grid grid-cols-3">
              {menuItems.map(item => (
                <DashboardMenuItem
                  key={item.title}
                  iconSrc={item.iconSrc}
                  altText={item.altText}
                  title={item.title}
                  link={item.link}
                />
              ))}
            </div>
          </Flex>
        </Container>
      )}
    </>
  );
};
export default Page;
