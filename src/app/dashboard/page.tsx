import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <section className='bg-hg-200 h-screen flex flex-col justify-center items-center'>
        <Link href='/dashboard/welcome'>
        <Image className='mx-auto p-10' src='/images/dashboard/holaglow_white.png' height='200' width='950' alt='Holaglow' />
        </Link>
    </section>
 
  );
};

export default Page;