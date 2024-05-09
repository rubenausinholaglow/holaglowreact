import DermaLayout from 'app/(web)/components/layout/DermaLayout';
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
                  src="/images/derma/home/sonsolesStart.jpg"
                  alt="Holaglow"
                  width={780}
                  height={752}
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
                    <Text className="text-xl md:text-3xl text-derma-primary font-light font-gtUltra">
                      <span className="font-semibold">¡Hola!</span> Vamos a
                      encontrar la mejor rutina para ti
                    </Text>
                    <Text className="text-sm mb-4 text-hg-black500">
                      Analizar tu piel es el primer paso para:
                    </Text>

                    <ul className="flex flex-col gap-2 w-full">
                      <li className="flex bg-derma-secondary400">
                        Elaborar tu crema personalizada
                      </li>
                      <li className="flex bg-derma-secondary400">
                        Diseñar tu rutina completa
                      </li>
                    </ul>

                    <StartButton />
                  </Flex>
                </Flex>
              </div>
            </Flex>
          </Container>
        </DermaLayout>
      </div>
    </>
  );
}
