import Home from 'app/(web)/components/home/Home';
import { headers } from 'next/headers';

import DermaHome from './components/dermahome/DermaHome';

export default function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const host = headers().get('host');
  const isDerma =
    (host && host.startsWith('derma')) || searchParams.isDerma === 'true';

  if (isDerma) {
    return (
      <>
        <DermaHome />
      </>
    );
  }

  return (
    <>
      <Home />
    </>
  );
}
