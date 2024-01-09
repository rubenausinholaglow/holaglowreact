'use client';

import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function DescriptionDerma() {
  return (
    <Container className="pt-4 pb-12 overflow-hidden">
      <Flex
        layout="col-left"
        className="gap-4 items-center relative md:justify-center md:flex-row"
      >
        <Flex layout="col-left" className="relative z-10 md:w-1/2">
          <Text
            isAnimated
            className="font-gtUltraBold text-35xl text-hg-secondary font-normal mb-4 md:mb-6 lg:pr-[20%]"
          >
            Cuidado de la piel personalizado
          </Text>
          <Text
            isAnimated
            className="text-hg-black500 md:w-full md:text-lg mb-8"
          >
            Conectamos a personas con médicos experimentados para un
            descubrimiento personalizado de productos y tratamientos para el
            acné hasta el envejecimiento.
          </Text>

          <Flex layout="row-center" className="w-full">
            <Button
              isAnimated
              type="tertiary"
              size="xl"
              className="mx-auto"
              customStyles="border-none bg-hg-secondary text-hg-secondary300"
              href="/derma/multistep/start"
              id={'tmevent_multistep_module'}
            >
              Reserva tu cita online
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
