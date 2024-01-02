import { Analytics } from '@vercel/analytics/react';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text,Title } from 'designSystem/Texts/Texts';
import type { Metadata } from 'next';

import HomeBlocksDerma from '../../../components/dermahome/HomeBlocksDerma';
import { DermaFooter } from '../../../components/layout/DermaFooter';
import DermaHeader from '../../../components/layout/DermaHeader';

export const metadata: Metadata = {
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
};

export default function Home() {
  return (
    <main>
      <DermaHeader />
      <Container className="py-12 overflow-hidden">
        <Flex
          layout="col-left"
          className="gap-4 items-center relative md:justify-center md:flex-row"
        >
          <Flex layout="col-left" className="relative z-10 md:w-1/2">
            <Title
              isAnimated
              size="2xl"
              className="text-hg-secondary font-bold mb-12 md:mb-6 lg:pr-[20%]"
            >
              Tu camino hacia una piel más saludable y feliz comienza aquí
            </Title>
            <Text isAnimated className="text-hg-black500 md:w-full md:text-lg">
              Conectamos a personas con médicos experimentados para un
              descubrimiento personalizado de productos y tratamientos para el
              acné hasta el envejecimiento.
            </Text>
          </Flex>
        </Flex>
      </Container>

      <Button
        isAnimated
        type="secondary"
        size="xl"
        className="mx-auto md:mx-0 mb-10"
        href="https://derma.holaglow.com/derma/multistep/steps"
        id={'tmevent_multistep_module'}
      >
        Empezar
        <SvgArrow className="ml-4" height={24} width={24} />
      </Button>
      <DermaFooter />
      <Analytics />
    </main>
  );
}
