'use client';
import React, {useEffect,useState} from 'react';
import { useRouter } from 'next/navigation';
import DashboardMenuItem from './DashboardMenuItem';
import { menuItems } from './MenuItems';

const Page = () => {
  const [username, setUserName] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUserName(storedUsername);
    
    if (!storedUsername) {
      router.push('/dashboard');
    }
  }, [])

  return (
    <section className='bg-hg-200 w-full flex flex-col p-10 justify-center items-center'>
      <p className='text-3xl'> Hola {username}! </p>
      <p className='text-3xl'>Bienvenid@ a Holaglow</p>
      <div className='grid grid-cols-3 p-5'>
        {menuItems.map((item) => (
          <DashboardMenuItem
            key={item.title}
            iconSrc={item.iconSrc}
            altText={item.altText}
            title={item.title}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
};
export default Page;