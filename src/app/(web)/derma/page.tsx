import { Analytics } from '@vercel/analytics/react';
import { SvgGoogle, SvgStar } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import type { Metadata } from 'next';

import HeroDerma from '../components/dermahome/HeroDerma';
import { DermaFooter } from '../components/layout/DermaFooter';
import DermaHeader from '../components/layout/DermaHeader';
import HomeBlocksDerma from './../components/dermahome/HomeBlocksDerma';

export const metadata: Metadata = {
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
};

export default function Home() {
  return (
    <main>
      <DermaHeader />
      <HeroDerma />
      <HomeBlocksDerma />
      <DermaFooter />
      <Analytics />
    </main>
  );
}
