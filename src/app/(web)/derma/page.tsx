import type { Metadata } from 'next';

import HomeBlocksDerma from './../components/dermahome/HomeBlocksDerma';
import MainLayout from './../components/layout/MainLayout';
import { Analytics } from '@vercel/analytics/react';
import DermaHeader from '../components/layout/DermaHeader';
import { DermaFooter } from '../components/layout/DermaFooter';

export const metadata: Metadata = {
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
};

export default function Home() {
  return (
    <main>
      <DermaHeader />
      <HomeBlocksDerma />
      <DermaFooter />
      <Analytics />
    </main>
  );
}
