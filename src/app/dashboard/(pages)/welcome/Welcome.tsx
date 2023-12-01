import { useGlobalPersistedStore } from 'app/stores/globalStore';

import { Client } from '../../interface/client';

export default function Header({ client }: { client: Client }) {
  const { user } = useGlobalPersistedStore(state => state);
  const username = typeof window !== 'undefined' ? user?.firstName : null;
  return <p className="text-3xl">¡Hola {username}!</p>;
}
