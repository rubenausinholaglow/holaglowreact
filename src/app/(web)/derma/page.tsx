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
      <div className="bg-gradient-15deg from-10% from-hg-secondary300 to-hg-pink">
        <DermaHeader />
        <HeroDerma />
      </div>
      <Container>
        <Flex layout="row-between">
          <Flex className="gap-2 items-center">
            <SvgStar className="-mt-1" />
            <span>4,7</span>
            <SvgGoogle />
          </Flex>
          <Text className="text-hg-black400 text-xs">Powered by Holaglow</Text>
        </Flex>
      </Container>
      <HomeBlocksDerma />
      <DermaFooter />
      <Analytics />
    </main>
  );
}
