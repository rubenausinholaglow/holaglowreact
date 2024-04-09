import { isMobileSSR } from '@utils/isMobileSSR';
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
  const routinesArray = ['acné', 'melasma', 'rosácea', 'antiaging'];

  const HEADER_HEIGHT = isMobileSSR()
    ? DERMA_HEADER_HEIGHT_MOBILE
    : DERMA_HEADER_HEIGHT_DESKTOP;
  const HEADER_HEIGHT_CLASS = `${HEADER_HEIGHT}px`;

  return (
    <div style={{ marginTop: `-${HEADER_HEIGHT_CLASS}` }}>
      <div className="bg-gradient-30deg from-derma-primary500/20 to-white">
        <Container>
          <Flex className="md:gap-12">
            {!isMobileSSR() && (
              <Flex layout="col-left" className="hidden md:flex md:w-1/2">
                <Title size="3xl" className="text-derma-primary mb-4">
                  Tu rutina facial para {routinesArray[0]}
                </Title>
                <Text className="text-hg-black500 mb-8">
                  Analizamos tu piel y te enviamos a casa una rutina facial
                  diseñada para ti por un médico
                </Text>
                <Button size="xl" type="derma" className="mb-24">
                  Empezar análisis
                </Button>
                <ReviewScore className="bg-[rgba(255,255,255,.5)] p-4 w-full rounded-xl" />
              </Flex>
            )}
            <Image
              alt="Precios de las rutinas"
              height={1288}
              width={1088}
              src="/images/derma/landingPrecios/header.png"
              className="pt-24 md:pt-36 px-4 md:w-1/2 md:ml-auto"
            />
          </Flex>
        </Container>
      </div>
      {isMobileSSR() && (
        <div className="bg-derma-secondary300">
          <div className="bg-[rgba(255,255,255,.5)]">
            <Container>
              <ReviewScore />
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}
