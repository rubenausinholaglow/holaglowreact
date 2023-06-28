'use client';
import React, {useEffect,useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {

  const [username, setUserName] = useState("")

  useEffect(() => {
    let value
    // Get the value from local storage if it exists
    value = localStorage.getItem("username") || ""
    setUserName(value)
  }, [])


  return (
    //<section className='bg-hg-500 w-full h-screen  flex flex-col justify-center items-center'>
    <section className='bg-hg-200 w-full flex flex-col p-10 justify-center items-center'>
        <p className='text-3xl'> Hola {username}! </p>
        <p className='text-3xl'>Bienvenid@ a Holaglow</p>
      <div className='grid grid-cols-3 p-5'>
        <Link href='/dashboard/simulator3d'>
          <div className='p-5'>
            <Image className='mx-auto' src='/images/dashboard/menu-icons/3d_simulator.png' height='50' width='190' alt='3D Simulator' />
            <p className='text-center text-lg'>Simulador 3D</p>
          </div>
        </Link>
        <div className='p-5'>
          <Image className='mx-auto' src='/images/dashboard/menu-icons/budgets.png' height='50' width='190' alt='Pressupuestos' />
          <p className='text-center text-lg'>Presupuestos</p>
        </div>
        <div className='p-5'>
          <Image className='mx-auto' src='/images/dashboard/menu-icons/financiar.png' height='50' width='190' alt='Financiar' />
          <p className='text-center text-lg'>Financiación</p>
        </div>
        <div className='p-5'>
          <Image className='mx-auto' src='/images/dashboard/menu-icons/checkout.png' height='50' width='190' alt='Pagar' />
          <p className='text-center text-lg'>Pagar</p>
        </div>
        <div className='p-5'>
          <Image className='mx-auto' src='/images/dashboard/menu-icons/agenda.png' height='50' width='190' alt='Agenda' />
          <p className='text-center text-lg'>Agendar Cita</p>
        </div>
        <div className='p-5'>
          <Image className='mx-auto' src='/images/dashboard/menu-icons/3d_simulator.png' height='50' width='190' alt='paciente' />
          <p className='text-center text-lg'>Paciente</p>
        </div>
        <div className='p-5'>
          <Image className='mx-auto' src='/images/dashboard/menu-icons/3d_simulator.png' height='50' width='190' alt='validar' />
          <p className='text-center text-lg'>Validar</p>
        </div>
        <Link href='/dashboard'>
          <div className='p-5'>
            <Image className='mx-auto' src='/images/dashboard/menu-icons/3d_simulator.png' height='50' width='190' alt='volver' />
            <p className='text-center text-lg'>Logout</p>
          </div>
        </Link>
      </div>
    </section>
 
  );
};

export default Page;