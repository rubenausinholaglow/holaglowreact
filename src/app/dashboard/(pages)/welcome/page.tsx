'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page () {

  const [username, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("username") || "")
  }, []);

  return (
    <section className='bg-hg-200 h-screen flex flex-col justify-center items-center'>
      <div className='grid grid-cols-1 p-5'>
        <p className='text-4xl'>¡Hola {username}!</p> 
      </div>
      <div className='grid grid-cols-1'>
        <p className='text-4xl'>Bienvenid@ a
        <Image className='mx-auto' src='/images/dashboard/holaglow_white.png' height='150' width='190' alt='Holaglow'/>
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
