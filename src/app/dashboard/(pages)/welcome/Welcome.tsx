import { Client } from '../../interface/client';

export default function Header({ client }: { client: Client }) {
  const username =
    typeof window !== 'undefined' ? localStorage.getItem('username') : null;
  return <p className="text-3xl">¡Hola {username}!</p>;
}
