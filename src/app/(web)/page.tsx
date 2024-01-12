import type { Metadata } from 'next';

import HomeBlocks from './components/home/HomeBlocks';
import MainLayout from './components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
  openGraph: {
    url: 'https://www.holaglow.com/',
    type: 'website',
    title: 'Holaglow - La nueva cara de la medicina estética',
    description:
      'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
    images: ['/images/home/OGimagen_Holaglow.jpg'],
  },
};

export default function Home() {
  return (
    <MainLayout>
      <HomeBlocks />
    </MainLayout>
  );
}
