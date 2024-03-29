import CheckHydration from '@utils/CheckHydration';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
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
                  width={204}
                  height={253}
                />
              </Flex>
              <Flex layout="col-left" className="relative z-10 md:w-1/2">
                <Title size="2xl" className="text-derma-primary mb-6 md:mb-6">
                  Tu rutina facial personalizada por 99€
                </Title>
                <Text className="font-gtUltra md:w-full md:text-lg mb-2">
                  Videollamada de diagnóstico con el médico
                </Text>
                <Text className="font-gtUltra md:w-full md:text-lg mb-8">
                  Te enviamos a casa tu rutina personalizada:
                </Text>
                <Text className="text-hg-black500 md:w-full md:text-lg mb-2">
                  - Espuma limpiadora
                </Text>
                <Text className="text-hg-black500 md:w-full md:text-lg mb-2">
                  - Crema hidratante de día para tu afección
                </Text>
                <Text className="text-hg-black500 md:w-full md:text-lg mb-2">
                  - Protector solar
                </Text>
                <Text className="text-hg-black500 md:w-full md:text-lg mb-8">
                  - Receta de la crema personalizada de noche (a pedir en
                  farmacia por 25-40€)
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
