import React, { useState, useEffect } from 'react';
import { Client } from '../types';


export default function Header({ client }: { client: Client }) {

  
  let username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

  console.log("user" + username);

  return (
  //  <p className='text-2xl'>¡Hola {client.name}!</p> 
    <p className='text-4xl'>¡Hola {username}!</p> 
  );
}
