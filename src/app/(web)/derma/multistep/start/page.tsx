import CheckHydration from '@utils/CheckHydration';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
};

export default function StartMultistep() {
  return (
    <CheckHydration>
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
                  className="w-2/3 md:w-auto md:max-h-[500px] shrink-0 md:ml-auto"
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
                <Button
                  type="tertiary"
                  size="xl"
                  className="mx-auto md:mx-0 mb-10"
                  href="/multistep/steps"
                  id="tmevent_derma_start"
                  customStyles="border-derma-primary bg-derma-secondary300 text-derma-primary hover:border-derma-primary500 hover:text-derma-primary500 hover:bg-transparent"
                >
                  Empezar
                  <SvgArrow className="ml-4" height={24} width={24} />
                </Button>
              </Flex>
            </Flex>
          </Container>
        </DermaLayout>
      </div>
    </CheckHydration>
  );
}
