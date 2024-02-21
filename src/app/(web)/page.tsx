import HomeSSR from 'app/(ssr)/homeSSR/page';
import type { Metadata } from 'next';

import AppWrapper from './components/layout/AppWrapper';

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

export default function Home() {
  return (
    <AppWrapper isSSR>
      <HomeSSR />
    </AppWrapper>
  );
}
