'use client';

import React, { useEffect, useState } from 'react';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrowSmallLeft } from 'icons/Icons';
import Link from 'next/link';
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
            <p className="font-bold text-xl mb-8">
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
