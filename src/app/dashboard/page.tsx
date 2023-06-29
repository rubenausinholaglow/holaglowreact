'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import API_URLS from './config';

export default function Page () {

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    localStorage.clear(); // Limpiar localStorage al iniciar la app
  }, []);

  const handleCheckUser = async () => {
		try {
			const res = await fetch(`${API_URLS.login}?search=${email}`);
		  if (res.ok) {
        const data = await res.json();
        console.log(data);
        setError('');
        localStorage.clear();
        localStorage.setItem('username', data.name)
        window.location.href = '/dashboard/welcome';
      } else {
        localStorage.clear();
        setError('Error autenticación');
      }
		} catch (err) {
      localStorage.clear();
      console.log(err);
      setError('Error autenticación');
      setEmail('');
		}
	};

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <section className='bg-hg-200 min-h-screen justify-center items-center'>
      <div className='flex flex-wrap justify-center items-center p-10'>
        
        <div className='w-full'>
          <Image className='mx-auto m-10' src='/images/dashboard/holaglow_white.png' height='200' width='950' alt='Holaglow'/>
        </div>

        <div id="buscar" className='w-3/4'>
          <div className="bg-gray-50 p-10 rounded-2xl flex">
            
            <div className="flex flex-col items-start flex-1">
                <input onChange={handleInputChange} type="email" value={email} name="email" 
                className="w-full h-full mt-1 border-2 border-gray rounded-md  text-black"
                placeholder="Introduce tu teléfono, email o DNI"/>
            </div>
            <div className='flex flex-col flex-1'>
            <button onClick={handleCheckUser} type="submit" className="inline-flex justify-center items-center w-full h-full px-5 py-3 ml-6 text-lg font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false">
              Buscar</button>
            </div>
          </div>
        </div>

        <div id="Registro" className={`w-3/4 ${error ? '' : 'hidden'}`}>
          <div className="flex justify-center items-center">
            <div className="container">
                <div className="w-full p-8 my-4 md:px-12 rounded-2xl shadow-2xl bg-white">
                  <div className="flex">
                      <h1 className="font-bold uppercase text-2xl text-black justify-center">¡Vaya! ¿Todavía no te conocemos?</h1>
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                      <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Nombre*" />
                      <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Primer Apellido*" />
                      <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Segundo Apellido*" />
                      <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="email" placeholder="Correo electrónico*" />
                      <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="number" placeholder="Número de teléfono*" />
                      
                        <button className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 mt-2 rounded-lg w-full 
                          focus:outline-none focus:shadow-outline">
                            Continuar
                        </button>
                    
                  </div>
                
                </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
 
  );
};