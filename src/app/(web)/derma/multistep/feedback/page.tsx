'use client';

import React from 'react';
import { isMobile } from 'react-device-detect';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow, SvgStethoscope, SvgVerify } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import router from 'next/router';

export default function Feedback() {
  return (
    <div className="bg-derma-secondary500 min-h-screen">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />

      <DermaLayout hideButton hideFooter>
        <Container>
          <Flex
            layout="col-left"
            className="md:flex-row w-full md:gap-12 xl:gap-16"
          >
            <div className="relative rounded-3xl md:rounded-2xl w-full md:w-1/2 md:mt-12">
              <Image
                alt="Dra. Sonsoles Espí"
                src="/images/derma/multistep/Sonsoles.png"
                height={192}
                width={192}
                className="mx-auto w-24 mb-4 md:ml-0"
              />
              <Text className="text-xl md:text-3xl text-derma-primary font-light font-gtUltra mb-4">
                ¡Entendido! Una crema efectiva para{' '}
                <span className="font-semibold">melasma</span> contiene:
              </Text>
            </div>

            <div id="tm_derma_step0" className="md:w-1/2">
              <Flex
                layout="col-left"
                className="items-center relative md:justify-center md:flex-row md:mt-12"
              >
                <Flex layout="col-left" className="relative z-10 py-4">
                  <Flex className="justify-center w-full">
                    <Image
                      src="/images/derma/multistep/ingredients/acidoRetinoico.png"
                      alt="Ácido retinoico"
                      width={144}
                      height={144}
                      className="-mr-8"
                    />
                    <Image
                      src="/images/derma/multistep/ingredients/hidroquinona.png"
                      alt="Hidroquinona"
                      width={144}
                      height={144}
                      className="-ml-8"
                    />
                  </Flex>

                  <ul className="flex flex-col gap-4 md:gap-6 w-full mb-8 md:mb-16 text-sm md:text-lg">
                    <li className="flex items-start gap-3 w-full">
                      <SvgVerify className="text-derma-primary500 shrink-0" />
                      <div>
                        <Text className="font-semibold mb-1">
                          Ácido retinoico
                        </Text>
                        <Text>0,015% - 0,05% Despigmentante y regenerador</Text>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 w-full">
                      <SvgVerify className="text-derma-primary500 shrink-0" />
                      <div>
                        <Text className="font-semibold mb-1">
                          Hidroquinona *
                        </Text>
                        <Text>4% Despigmentante</Text>
                        <Text className="text-xs md:text-md text-hg-black500">
                          *En verano sustituimos la Hidroquinona por una
                          combinación de Ácido kójico (4%) y Ácido glicólico
                          (8%)
                        </Text>
                      </div>
                    </li>
                  </ul>

                  <Flex className="bg-derma-secondary300 rounded-xl p-3 w-full gap-4 mb-12">
                    <div className="bg-derma-primary500 rounded-full p-2">
                      <SvgStethoscope className="text-white h-4 w-4" />
                    </div>
                    <Text className="text-xs md:text-sm text-hg-black500">
                      Un médico valorará tu caso y ajustará tu crema
                      personalizada
                    </Text>
                  </Flex>

                  <Flex className="justify-between w-full">
                    <Button
                      type="white"
                      customStyles="bg-transparent border-none"
                      onClick={() => router.back()}
                      size={isMobile ? 'md' : 'lg'}
                    >
                      <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                      <Text className="text-derma-tertiary">Atrás</Text>
                    </Button>
                    <Button
                      type="derma"
                      size={isMobile ? 'md' : 'lg'}
                      href={ROUTES.derma.multistep.skinType}
                    >
                      continuar
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
