'use client';

import { useEffect, useState } from 'react';
import ROUTES from '@utils/routes';
import DermaStepBar from 'app/(web)/(derma)/components/DermaStepBar';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow, SvgMoon, SvgSun } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DERMA_COMPLEMENTS, PAINS_AND_SYMPTOMS } from '../../multistepConfig';

export default function RoutineFeedback() {
  const { pain } = useDermaStore(state => state);
  const router = useRouter();
  const [painName, setPainName] = useState('');

  useEffect(() => {
    const painName =
      pain && PAINS_AND_SYMPTOMS.filter(item => item.value === pain).length > 0
        ? PAINS_AND_SYMPTOMS.filter(item => item.value === pain)[0].name
        : '';
    setPainName(painName);
  }, []);
  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary500 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      <div className="relative">
        <DermaStepBar steps={22} step={15} />

        <Container>
          <Flex layout="col-left" className="md:flex-row w-full md:gap-16">
            <div className="relative rounded-3xl md:rounded-2xl w-full md:w-1/2 md:mt-12">
              <Image
                alt="Dra. Sonsoles Espí"
                src="/images/derma/multistep/Sonsoles.png"
                height={192}
                width={192}
                className="mx-auto w-24 mb-4 md:ml-0"
              />
              <Text className="text-xl md:text-3xl text-derma-primary font-light font-gtUltra mb-4">
                Estas cremas serán el complemento perfecto para tu crema
                personalizada
              </Text>
            </div>
            <div className="w-full md:w-1/2">
              <Flex layout="col-left" className="w-full gap-4 mb-12">
                {DERMA_COMPLEMENTS.map((complement, index) => {
                  return (
                    <Flex
                      key={complement.name}
                      layout="row-left"
                      className="bg-white p-4 rounded-2xl gap-4 items-start w-full"
                    >
                      <Image
                        src={complement.imgSrc}
                        height={248}
                        width={184}
                        alt={complement.name}
                        className="w-1/4 md:w-1/5 mx-auto mb-4 shrink-0"
                      />
                      <Flex layout="col-left" className="w-full gap-2">
                        <Flex layout="row-between" className="w-full text-xs">
                          <Text className="text-hg-black500">
                            Paso {index + 1}
                          </Text>
                          <Flex className="gap-1 py-1 px-2 rounded-full bg-derma-primary300/20 text-derma-primary">
                            <SvgSun className="w-4 h-4" />
                            <span>Día</span>
                            {complement.isNightRoutine && (
                              <>
                                <span>/</span>
                                <span>Noche</span>
                                <SvgMoon className="w-4 h-4" />
                              </>
                            )}
                          </Flex>
                        </Flex>
                        <Text className="font-semibold text-sm md:text-md">
                          {complement.name}
                          {index === 1 && painName.toLowerCase()}
                        </Text>
                        <Text className="text-sm md:text-md">
                          {complement.smallDescription}
                        </Text>
                      </Flex>
                    </Flex>
                  );
                })}
              </Flex>

              <Flex className="justify-between w-full mb-8">
                <Button
                  type="whiteDerma"
                  customStyles="bg-transparent border-none"
                  onClick={() => router.back()}
                  size="lg"
                >
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  type="derma"
                  size="lg"
                  href={ROUTES.derma.multistep.allergy}
                >
                  Continuar
                </Button>
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
