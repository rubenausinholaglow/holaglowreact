'use client';

import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { AnimateOnViewport } from '../common/AnimateOnViewport';

export default function ValuesDescriptionDerma() {
  return (
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
            Cuidado de la piel personalizado
          </Title>
          <Text isAnimated className="text-hg-black500 md:w-full md:text-lg">
            Conectamos a personas con médicos experimentados para un
            descubrimiento personalizado de productos y tratamientos para el
            acné hasta el envejecimiento.
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
}
