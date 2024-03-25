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
    <CheckHydration>
      <meta name="robots" content="noindex,follow" />
      <div className="bg-derma-secondary100 min-h-screen">
        <DermaLayout hideButton hideFooter>
          <Container className="px-0 md:px-4">
            <Image
              src="/images/derma/home/dermaStart.jpg"
              alt="Holaglow"
              width={780}
              height={752}
              className="rounded-t-2xl w-full"
            />
          </Container>
          <Container id="tm_derma_step0">
            <Flex
              layout="col-left"
              className="items-center relative md:justify-center md:flex-row md:mt-12"
            >
              <Flex layout="col-left" className="relative z-10 md:w-1/2 py-4">
                <Title
                  size="xldr"
                  className="text-derma-primary font-light mb-4"
                >
                  Tu rutina facial personalizada por 99€
                </Title>
                <Flex
                  layout="col-left"
                  className="gap-2 w-full text-hg-black500 mb-8"
                >
                  <Text className="md:text-lg mb-2">
                    Videollamada de diagnóstico con el médico. Te enviamos a
                    casa tu rutina personalizada:
                  </Text>

                  {[
                    'Espuma limpiadora',
                    'Crema hidratante de día para tu afección',
                    'Protector solar',
                    'Receta de la crema personalizada de noche <span className="text-xs">(a pedir en farmacia por 25-40€)</span>',
                  ].map(item => (
                    <Flex key={item}>
                      <SvgCheckCircle className="shrink-0 mr-2" />
                      <p dangerouslySetInnerHTML={{ __html: item }} />
                    </Flex>
                  ))}
                </Flex>
                <StartButton />
              </Flex>
            </Flex>
          </Container>
        </DermaLayout>
      </div>
    </CheckHydration>
  );
}
