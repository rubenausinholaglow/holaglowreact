import { isMobile } from 'react-device-detect';
import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgByGoogle, SvgStar } from 'app/icons/IconsDs';
import {
  DERMA_HEADER_HEIGHT_DESKTOP,
  DERMA_HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HeroDermaPrices() {
  const HEADER_HEIGHT = isMobile
    ? DERMA_HEADER_HEIGHT_MOBILE
    : DERMA_HEADER_HEIGHT_DESKTOP;

  const HEADER_HEIGHT_CLASS = `${HEADER_HEIGHT}px`;

  return (
    <div style={{ marginTop: `-${HEADER_HEIGHT_CLASS}` }}>
      <div className="bg-gradient-30deg from-derma-primary500/20 to-white">
        <Container>
          <Image
            alt="Precios de las rutinas"
            height={1288}
            width={1088}
            src="/images/derma/landingPrecios/header.png"
            className="pt-20 px-4"
          />
        </Container>
      </div>
      <Container>
        <Flex layout="row-left" className="gap-4 py-4">
          <Flex layout="col-center" className="gap-1">
            <SvgHolaglowHand className="h-10 w-10 p-1.5 bg-derma-tertiary text-derma-primary rounded-full" />
            <Text className="font-semibold text-lg">4.8</Text>
          </Flex>
          <Flex layout="col-left" className="gap-1 mr-auto">
            <Text className="font-semibold">Holaglow clinics</Text>
            <Text className="text-hg-black500 text-xs mb-1">
              + de 1.000 pecientes atendidos
            </Text>
            <ul className="flex gap-2">
              <li>
                <SvgStar className="text-derma-primary h-4 w-4" />
              </li>
              <li>
                <SvgStar className="text-derma-primary h-4 w-4" />
              </li>
              <li>
                <SvgStar className="text-derma-primary h-4 w-4" />
              </li>
              <li>
                <SvgStar className="text-derma-primary h-4 w-4" />
              </li>
              <li>
                <SvgStar className="text-derma-primary h-4 w-4" />
              </li>
            </ul>
          </Flex>
          <SvgByGoogle className="self-end" />
        </Flex>
      </Container>
      <div className="bg-derma-secondary300 py-4">
        <Container>
          <Title size="2xl" className="text-derma-primary mb-4">
            Precios de las rutinas
          </Title>
          <Text className="text-hg-black500">
            Una piel sana requiere compromiso y constancia, por eso hemos
            diseñado dos tipos de tratamiento para que elijas el que se adapta a
            ti.
          </Text>
        </Container>
      </div>
    </div>
  );
}
