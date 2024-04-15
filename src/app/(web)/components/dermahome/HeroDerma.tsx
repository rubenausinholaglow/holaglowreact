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
      <div className="bg-white pb-8 relative">
        <Container>
          <Flex layout="col-center" className="pt-24 md:pt-36 relative z-10">
            <Title size="2xl" className="text-derma-primary text-center">
              Tu rutina facial para
            </Title>
            <Title
              size="2xl"
              className="text-derma-primary500 text-center relative h-10 lg:h-16 overflow-hidden mb-6"
            >
              <span className="block animate-pains">
                <span className="block">acné</span>
                <span className="block">melasma</span>
                <span className="block">rosácea</span>
                <span className="block">calidad de piel</span>
              </span>
            </Title>
            <Text className="text-hg-black500 mb-8 md:text-lg max-w-[600px] text-center">
              Analizamos tu piel y te enviamos a casa una rutina facial diseñada
              para ti por un médico
            </Text>
            <Button size="xl" type="derma" href={ROUTES.derma.multistep.start}>
              Empezar análisis
            </Button>
          </Flex>
        </Container>

        <Image
          src="/images/derma/home/dermaHome.png"
          alt="analizamos tu piel"
          height={500}
          width={420}
          className="w-full -mt-20 md:hidden"
        />
        <Container>
          <Image
            src="/images/derma/home/dermaHomeLeft.png"
            alt="analizamos tu piel"
            height={306}
            width={538}
            className="absolute bottom-12 left-0 h-[62%] w-auto hidden md:block"
          />
          <Image
            src="/images/derma/home/dermaHomeRight.png"
            alt="cuidado facial personalizado"
            height={840}
            width={542}
            className="absolute bottom-5 right-0 h-[80%] w-auto hidden md:block"
          />
          <ReviewScore className="bg-hg-black50/90 p-4 w-full rounded-xl hidden md:flex md:w-1/2 relative" />
        </Container>
      </div>
      {isMobileSSR() && (
        <div className="bg-derma-secondary300">
          <div className="bg-[rgba(255,255,255,.5)]">
            <Container>
              <ReviewScore />
            </Container>
            {/* <div className="bg-derma-secondary300 py-4">
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
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
