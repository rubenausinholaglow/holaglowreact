'use client';

import { useState } from 'react';
import { useSessionStore } from 'app/stores/globalStore';
import {
  DERMA_HEADER_HEIGHT_DESKTOP,
  DERMA_HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroDerma() {
  const { deviceSize } = useSessionStore(state => state);
  const routinesArray = ['acné', 'melasma', 'rosácea', 'antiaging'];
  const [routineIndex, setRoutineIndex] = useState(0);

  const startTimer = () => {
    setTimeout(() => {
      setRoutineIndex(routineIndex < 3 ? routineIndex + 1 : 0);
    }, 1000);
  };

  startTimer();

  const HEADER_HEIGHT = deviceSize.isMobile
    ? DERMA_HEADER_HEIGHT_MOBILE
    : DERMA_HEADER_HEIGHT_DESKTOP;
  const HEADER_HEIGHT_CLASS = `-${HEADER_HEIGHT}px`;

  return (
    <div
      className="bg-derma-secondary100 pt-[72px] md:pt-0 overflow-hidden relative"
      style={{ marginTop: HEADER_HEIGHT_CLASS }}
    >
      <Flex layout="col-left" className="md:flex-row md:items-end mx-auto">
        <div className="w-full md:order-2 aspect-square relative md:w-1/2 xl:w-2/5">
          <Image
            src="/images/derma/home/homeDerma.jpg"
            alt="Holaglow"
            className="object-cover"
            priority
            fill
          />
        </div>
        <Flex
          layout="col-center"
          className="bg-derma-secondary100 md:bg-transparent relative w-full self-stretch md:justify-end md:w-1/2 xl:w-3/5"
        >
          <Container className="pb-12 md:p-0 overflow-hidden md:pr-8 lg:pr-12">
            <Flex layout="col-left" className="md:ml-8 md:mr-4 2xl:pl-16">
              <Flex
                layout="row-left"
                className="mb-4 md:order-2 w-full md:justify-start gap-4 py-3"
              >
                <Image
                  src="/images/derma/home/GoogleReviews.png"
                  alt="Holaglow reviews"
                  height={200}
                  width={deviceSize.isMobile ? 150 : 175}
                  className="mr-auto"
                />
                <Text className="text-hg-black400 text-xs">
                  Impulsado por Holaglow
                </Text>
              </Flex>
              <Flex
                layout="col-left"
                className="gap-4 items-center relative md:justify-center md:flex-row"
              >
                <Flex layout="col-left" className="relative z-10">
                  <Title
                    size="2xl"
                    className="text-derma-primary text-left mb-4"
                  >
                    Tu rutina facial de 3 meses para{' '}
                    {routinesArray[routineIndex]}
                  </Title>
                  <Text
                    isAnimated
                    className="text-hg-black500 md:w-full xl:text-lg mb-8 lg:mb-12"
                  >
                    Te enviamos a casa{' '}
                    <span className="font-semibold">
                      tu rutina facial personalizada
                    </span>{' '}
                    por 99€ y te devolvemos el dinero si no ves una mejora al
                    finalizar el tratamiento
                  </Text>

                  <Flex layout="row-center" className="w-full md:justify-start">
                    <Button
                      type="derma"
                      size="xl"
                      className="md:mb-8 lg:mb-12"
                      href="/multistep/start"
                      id="tmevent_derma_multistep_start"
                    >
                      Descubre tu rutina
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </div>
  );
}
