import CheckHydration from '@utils/CheckHydration';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgCheckCircle } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
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
          <Container className="px-0 md:px-4">
            <Flex
              layout="col-left"
              className="md:flex-row w-full md:gap-12 xl:gap-16"
            >
              <Image
                src="/images/derma/home/sonsolesStart.jpg"
                alt="Holaglow"
                width={780}
                height={752}
                className="rounded-t-2xl md:rounded-2xl w-full md:w-1/2 md:mt-12"
              />
              <Container id="tm_derma_step0" className="md:w-1/2 md:px-0">
                <Flex
                  layout="col-left"
                  className="items-center relative md:justify-center md:flex-row md:mt-12"
                >
                  <Flex layout="col-left" className="relative z-10 py-4">
                    <Text className="text-xl md:text-3xl text-derma-primary font-light font-gtUltra">
                      Dra. Sonsoles Espí
                    </Text>
                    <Text className="text-sm text-hg-black500">
                      Directora médica en Holaglow
                    </Text>
                    <Text className="text-sm mb-4 text-hg-black500">
                      Médico estético y especialista en dermocosmética
                    </Text>

                    <Text className="mb-2">
                      ¡Hola! Vamos a encontrar la mejor rutina para tu piel.
                    </Text>

                    <Text className="mb-8">
                      Ahora te haremos algunas preguntas para que tu médico
                      pueda diseñar una rutina específica para ti.
                    </Text>

                    <StartButton />
                  </Flex>
                </Flex>
              </Container>
            </Flex>
          </Container>
        </DermaLayout>
      </div>
    </>
  );
}
