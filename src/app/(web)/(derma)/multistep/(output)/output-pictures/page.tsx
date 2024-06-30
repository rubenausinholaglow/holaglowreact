'use client';

import { isMobile } from 'react-device-detect';
import ROUTES from '@utils/routes';
import DermaStepBar from 'app/(web)/(derma)/components/DermaStepBar';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow, SvgShieldTick } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LastStepFeedback() {
  const router = useRouter();

  const photoObject = {
    url: isMobile
      ? '/images/derma/multistep/feedback/foto.jpg'
      : '/images/derma/multistep/feedback/foto-desk.jpg',
    width: isMobile ? 716 : 1088,
    height: isMobile ? 528 : 824,
  };

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary500 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      <div className="relative">
        <DermaStepBar steps={22} step={20} />

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
              <Text className="text-xl md:text-3xl text-derma-primary font-light font-gtUltra mb-3">
                ¡Último paso! Una buena foto es fundamental para un buen
                diagnóstico
              </Text>
              <Text className="text-sm md:text-md mb-8">
                Te pediremos unas fotos que tu médico pueda tener en cuenta
                cualquier detalle adicional en tu piel
              </Text>
            </div>
            <div className="w-full md:w-1/2">
              <Flex layout="col-left" className="w-full gap-4 mb-12">
                <div className="relative rounded-2xl overflow-hidden w-full">
                  <Flex className="absolute top-2 right-2 md:top-4 md:right-4 bg-white rounded-xl p-2 gap-2">
                    <div className="bg-derma-primary500 p-1 rounded-full">
                      <SvgShieldTick className="h-4 w-4 text-white" />
                    </div>

                    <Text className="text-xs md:text-sm">
                      Solo tu médico podrá ver las fotos
                    </Text>
                  </Flex>
                  <Image
                    src={photoObject.url}
                    alt="foto"
                    width={photoObject.width}
                    height={photoObject.height}
                    className="w-full"
                  />
                </div>
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
                  href={ROUTES.derma.multistep.pictures}
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
