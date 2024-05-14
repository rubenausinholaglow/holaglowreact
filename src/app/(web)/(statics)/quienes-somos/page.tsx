import SharedWrapper from 'app/(web)/components/layout/SharedWrapper';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import AboutUs from './AboutUs';

export const metadata: Metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Sobre nosotros - Holaglow',
  description:
    'Queremos cambiar el significado de la medicina estética como una opción más de autocuidado y de la expresión personal.',
  openGraph: {
    url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
    type: 'website',
    title: 'Sobre nosotros - Holaglow',
    description:
      'Queremos cambiar el significado de la medicina estética como una opción más de autocuidado y de la expresión personal.',
    images: ['/images/home/OGimagen_Holaglow.jpg'],
  },
};

export default function StaticAboutUs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const host = headers().get('host');
  const isDerma =
    (host && host.startsWith('derma')) || searchParams.isDerma === 'true';
  return (
    <SharedWrapper isDerma={isDerma}>
      {isDerma && <meta name="robots" content="noindex,follow" />}
      <AboutUs isDerma={isDerma} />
    </SharedWrapper>
  );
}
