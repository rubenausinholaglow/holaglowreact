import { isMobileSSR } from '@utils/isMobileSSR';
import ROUTES from '@utils/routes';
import ReviewScore from 'app/(web)/derma/precios/components/ReviewScore';
import {
  DERMA_HEADER_HEIGHT_DESKTOP,
  DERMA_HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HeroDerma() {
  const HEADER_HEIGHT = isMobileSSR()
    ? DERMA_HEADER_HEIGHT_MOBILE
    : DERMA_HEADER_HEIGHT_DESKTOP;
  const HEADER_HEIGHT_CLASS = `${HEADER_HEIGHT}px`;

  return (
    <div style={{ marginTop: `-${HEADER_HEIGHT_CLASS}` }}>
      <div className="bg-gradient-30deg from-derma-primary500/20 to-white">
        <Container>
          <Flex className="pt-24 md:pt-36 pb-12">
            {!isMobileSSR() && (
              <Flex
                layout="col-left"
                className="hidden md:flex md:w-1/2 shrink-0"
              >
                <Title size="3xl" className="text-derma-primary">
                  Tu rutina facial para{' '}
                  <span className="inline-block md:h-[50px] md:relative md:top-1 lg:h-20 lg:top-0 overflow-hidden text-derma-tertiary">
                    <span className="block animate-pains">
                      <span className="block">acné</span>
                      <span className="block">melasma</span>
                      <span className="block">rosácea</span>
                      <span className="block">calidad de piel</span>
                    </span>
                  </span>
                </Title>
                <Text className="text-hg-black500 mb-8">
                  Analizamos tu piel y te enviamos a casa una rutina facial
                  diseñada para ti por un médico
                </Text>
                <Button
                  size="xl"
                  type="derma"
                  className="mb-16"
                  href={ROUTES.derma.multistep.start}
                >
                  Empezar análisis
                </Button>
                <ReviewScore className="bg-[rgba(255,255,255,.5)] p-4 w-full rounded-xl" />
              </Flex>
            )}
            <div className="px-4 md:px-0 md:w-1/2 md:ml-auto md:pl-16">
              <Image
                alt="Precios de las rutinas"
                height={1288}
                width={1088}
                src="/images/derma/landingPrecios/header.png"
                className="w-full "
              />
            </div>
          </Flex>
        </Container>
      </div>
      {isMobileSSR() && (
        <div className="bg-derma-secondary300">
          <div className="bg-[rgba(255,255,255,.5)]">
            <Container>
              <ReviewScore />
            </Container>
            <div className="bg-derma-secondary300 py-4">
              <Container>
                <Title size="2xl" className="text-derma-primary mb-4">
                  Tu rutina facial para{' '}
                  <span className="inline-block h-10 relative top-2 overflow-hidden text-derma-tertiary">
                    <span className="block animate-pains">
                      <span className="block">acné</span>
                      <span className="block">melasma</span>
                      <span className="block">rosácea</span>
                      <span className="block">calidad de piel</span>
                    </span>
                  </span>
                </Title>
                <Text className="text-hg-black500 mb-8">
                  Analizamos tu piel y te enviamos a casa una rutina facial
                  diseñada para ti por un médico
                </Text>
                <Flex className="w-full justify-center">
                  <Button
                    size="xl"
                    type="derma"
                    className="mb-4"
                    href={ROUTES.derma.multistep.start}
                  >
                    Empezar análisis
                  </Button>
                </Flex>
              </Container>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
