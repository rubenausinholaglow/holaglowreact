import CheckHydration from '@utils/CheckHydration';
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
    <CheckHydration>
      <meta name="robots" content="noindex,follow" />
      <div className="bg-derma-secondary100 min-h-screen">
        <DermaLayout hideButton hideFooter>
          <Container id="tm_derma_step0">
            <Flex
              layout="col-left"
              className="gap-8 md:gap-16 items-center relative md:justify-center md:flex-row md:mt-12"
            >
              <Flex layout="row-center" className="w-4/5 md:w-1/2">
                <Image
                  src="/images/derma/home/dermaStart.png"
                  alt="Holaglow"
                  width={816}
                  height={1014}
                />
              </Flex>
              <Flex layout="col-left" className="relative z-10 md:w-1/2">
                <Text className="font-gtUltraThin text-derma-primary mb-6 md:mb-6 text-xl md:text-5xl md:font-gtUltraBold">
                  Tu camino hacia una piel más saludable comienza aquí
                </Text>
                <Text className="text-hg-black500 md:w-full md:text-lg mb-8">
                  El primer paso es identificar tus necesidades. Responde estas
                  preguntas para orientar tu consulta médica y obtener un
                  tratamiento personalizado.
                </Text>

                <StartButton />
              </Flex>
            </Flex>
          </Container>
        </DermaLayout>
      </div>
    </CheckHydration>
  );
}
