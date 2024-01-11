import type { Metadata } from 'next';

import HomeBlocks from './components/home/HomeBlocks';

export const metadata: Metadata = {
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
};

export default function Home() {
  return <HomeBlocks />;
}
