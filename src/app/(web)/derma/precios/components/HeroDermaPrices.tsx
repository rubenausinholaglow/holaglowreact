import isMobileSSR from '@utils/isMobileSSR';
import {
  DERMA_HEADER_HEIGHT_DESKTOP,
  DERMA_HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import ReviewScore from './ReviewScore';

export default function HeroDermaPrices() {
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
                  Precios de las rutinas
                </Title>
                <Text className="text-hg-black500 mb-24">
                  Una piel sana requiere compromiso y constancia, por eso hemos
                  diseñado dos tipos de tratamiento para que elijas el que se
                  adapta a ti.
                </Text>
                <ReviewScore className="bg-[rgba(255,255,255,.5)] p-4 w-full rounded-xl mt-auto" />
              </Flex>
            )}
            <Image
              alt="Precios de las rutinas"
              height={1288}
              width={1088}
              src="/images/derma/landingPrecios/header.png"
              className="pt-20 px-4 md:w-1/2 md:ml-auto"
            />
          </Flex>
        </Container>
      </div>
      {isMobileSSR() && (
        <>
          <Container>
            <ReviewScore />
          </Container>
          <div className="bg-derma-secondary300 py-4">
            <Container>
              <Title size="2xl" className="text-derma-primary mb-4">
                Precios de las rutinas
              </Title>
              <Text className="text-hg-black500">
                Una piel sana requiere compromiso y constancia, por eso hemos
                diseñado dos tipos de tratamiento para que elijas el que se
                adapta a ti.
              </Text>
            </Container>
          </div>
        </>
      )}
    </div>
  );
}
