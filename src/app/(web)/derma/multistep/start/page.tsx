import CheckHydration from '@utils/CheckHydration';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
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
          <Container>
            <Flex
              layout="col-left"
              className="gap-12 items-center relative md:justify-center md:flex-row md:mt-12"
            >
              <Flex layout="row-center" className="w-[130px] md:w-1/2">
                <Image
                  src="/images/derma/home/cream.png"
                  alt="Holaglow"
                  width={200}
                  height={444}
                  className="w-full shrink-0 md:w-1/2"
                />
              </Flex>
              <Flex layout="col-left" className="relative z-10 md:w-1/2">
                <Text
                  isAnimated
                  className="font-gtUltraThin text-derma-primary mb-6 md:mb-6 text-xl md:text-5xl md:font-gtUltraBold"
                >
                  Tu camino hacia una piel más saludable y feliz comienza aquí
                </Text>
                <Text
                  isAnimated
                  className="text-hg-black500 md:w-full md:text-lg mb-8"
                >
                  Conectamos a personas con médicos experimentados para un
                  descubrimiento personalizado de productos y tratamientos para
                  el acné hasta el envejecimiento.
                </Text>
                <Button
                  isAnimated
                  type="tertiary"
                  size="xl"
                  className="mx-auto md:mx-0 mb-10"
                  href="/derma/multistep/steps"
                  id={'tmevent_multistep_module'}
                  customStyles="border-derma-primary bg-derma-secondary300 text-derma-primary"
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
