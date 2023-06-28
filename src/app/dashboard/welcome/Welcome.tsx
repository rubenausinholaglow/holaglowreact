import Image from 'next/image';

import { Client } from '../types';

export default function Header({ client }: { client: Client }) {
  return (
  //  <p className='text-2xl'>¡Hola {client.name}!</p> 
    <p className='text-4xl'>¡Hola X!</p> 
  );
}
