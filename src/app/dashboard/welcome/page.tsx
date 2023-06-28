import React, { useEffect } from 'react';
import Image from 'next/image';
import Welcome from './Welcome';
import Link from 'next/link';
import { useRouter } from 'next/router';

const fetchBudgetData = async (id: number) => {
  try {
    const budgetResponse = await fetch(`https://holaglowcontactsapi.azurewebsites.net/budget?id=${id}`, {
      cache: 'no-store',
    });

    if (!budgetResponse) {
      throw new Error('Network response was not OK');
    }

    const budgetData = await budgetResponse.json();
    return budgetData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};


export default async function Budget({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const budgetID = Number(searchParams.id);
  const budgetData = await fetchBudgetData(budgetID);

  const {
    clientInfo = null,
  } = budgetData ? budgetData : {};

  return (
    <section className='bg-hg-200 h-screen flex flex-col justify-center items-center'>
      <div className='grid grid-cols-1 p-5'>
        <Welcome client={clientInfo} />
      </div>
      <div className='grid grid-cols-1'>
        <p className='text-4xl'>Bienvenid@ a
        <Image className='mx-auto' src='/images/dashboard/holaglow_white.png' height='150' width='190' alt='Holaglow' />
        </p>
      </div>
      <div className='grid grid-cols-1 p-5'>
        <p className='text-4xl text-center py-5'>Preparad@ para ver<br/>tu glow?</p>
      </div>
      <br/>
        <Link href='/dashboard/menu'>menu</Link>
    </section>
  );
};
