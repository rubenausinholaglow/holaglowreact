import { Client } from '../../interface/client';

export default function Header({ client }: { client: Client }) {
  let username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
  return (
    <p className='text-4xl'>¡Hola {username}!</p> 
  );
}
