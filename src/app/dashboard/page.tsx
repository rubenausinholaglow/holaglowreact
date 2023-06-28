'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import API_URLS from './config';

export default function Page () {

  

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

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
        setError('Error al llamar a la API');
      }
		} catch (err) {
      localStorage.clear();
      console.log(err);
      setError('Error de conexión');
      setEmail('');
		}
	};

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <section className='bg-hg-200 h-screen flex flex-col justify-center items-center'>
        <Image className='mx-auto p-10' src='/images/dashboard/holaglow_white.png' height='200' width='950' alt='Holaglow'/>
        <div className="bg-gray-50 p-5">
            <div className="mt-4">
              <label htmlFor="email" className="text-2xl text-black">Email</label>
                <div className="flex flex-col items-start">
                    <input onChange={handleInputChange} type="email" value={email} name="email" className="block w-full mt-1 border-gray-400 rounded-md shadow-sm focus:border-indigo-300  text-black"/>
                </div>
            </div>
            <button onClick={handleCheckUser} type="submit" className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false">Register</button>
            {error && <p className="text-red-500">{error}</p>} {/* Mostrar el mensaje de error */}
        </div>
    </section>
 
  );
};