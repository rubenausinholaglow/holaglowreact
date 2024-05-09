import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgLock } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import type { Metadata } from 'next';
import Image from 'next/image';

import StartButton from './StartButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Cuidado facial personalizado - Holaglow Derma',
  description:
    'Reserva tu consulta online con un dermatólogo estético y encuentra el mejor tratamiento para tu piel sin salir de casa.',
};
export default function StartMultistep() {
  return (
    <>
      <meta name="robots" content="noindex,follow" />
      <div className="bg-derma-secondary300 min-h-screen">
        <DermaLayout hideButton hideFooter>
          <Container>
            <Flex
              layout="col-left"
              className="md:flex-row w-full md:gap-12 xl:gap-16"
            >
              <div className="relative rounded-3xl md:rounded-2xl w-full md:w-1/2 md:mt-12">
                <Image
                  src="/images/derma/home/sonsolesStart.png"
                  alt="Holaglow"
                  width={528}
                  height={716}
                  className="rounded-2xl overflow-hidden"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/50 rounded-xl p-4 backdrop-blur-sm">
                  <Text className="font-semibold text-center text-sm">
                    Dra. Sonsoles Espí
                  </Text>
                  <Text className="text-center text-xs">
                    Directora médica en Holaglow
                  </Text>
                </div>
              </div>

              <div id="tm_derma_step0" className="md:w-1/2">
                <Flex
                  layout="col-left"
                  className="items-center relative md:justify-center md:flex-row md:mt-12"
                >
                  <Flex layout="col-left" className="relative z-10 py-4">
                    <Text className="text-xl md:text-4xl text-derma-primary font-light font-gtUltra mb-4">
                      <span className="font-semibold">¡Hola!</span> Vamos a
                      encontrar la mejor rutina para ti
                    </Text>
                    <Text className="mb-4">
                      Analizar tu piel es el primer paso para:
                    </Text>

                    <ul className="flex flex-col gap-4 w-full mb-8">
                      <li className="flex bg-derma-secondary400 rounded-2xl overflow-hidden items-center">
                        <Image
                          src="/images/derma/home/cremaFormuladaStart.png"
                          alt="Crema formulada"
                          width={128}
                          height={128}
                          className="w-16 h-16 md:w-24 md:h-24 mr-2 md:mr-4"
                        />
                        Elaborar tu crema personalizada
                      </li>
                      <li className="flex bg-derma-secondary400 rounded-2xl overflow-hidden items-center">
                        <Image
                          src="/images/derma/home/rutinaCompletaStart.png"
                          alt="Rutina completa"
                          width={128}
                          height={128}
                          className="w-16 h-16 md:w-24 md:h-24 mr-2 md:mr-4"
                        />
                        Diseñar tu rutina completa
                      </li>
                    </ul>

                    <Flex className="justify-center md:justify-start w-full">
                      <StartButton />
                    </Flex>
                  </Flex>
                </Flex>
              </div>
            </Flex>
          </Container>

          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl">
            <Container>
              <Flex className="text-hg-black500 text-xs py-4 w-full justify-start md:justify-center">
                <div className="bg-hg-black100 rounded-full p-2 mr-2">
                  <SvgLock className="h-4 w-4" />
                </div>
                Tus respuestas serán tratadas de forma confidencial
              </Flex>
            </Container>
          </div>
        </DermaLayout>
      </div>
    </>
  );
}
