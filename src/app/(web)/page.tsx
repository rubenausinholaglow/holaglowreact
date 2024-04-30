import Home from 'app/(web)/components/home/Home';
import type { Metadata } from 'next';

import DermaHome from './components/dermahome/DermaHome';

export const metadata: Metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
  openGraph: {
    url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
    type: 'website',
    title: 'Holaglow - La nueva cara de la medicina estética',
    description:
      'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
    images: ['/images/home/OGimagen_Holaglow.jpg'],
  },
};

export default function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const isDerma = searchParams['isDerma'];

  if (isDerma) {
    return <DermaHome />;
  }

  return <Home />;
}
