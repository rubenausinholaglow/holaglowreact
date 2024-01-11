'use client';

import { SvgArrow } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import FullWidthCarousel from '../product/fullWidthCarousel';

interface DermaTreatment {
  name: string;
  imgUrl: string;
}

const TREATMENTS = [
  {
    name: 'Acné',
    imgUrl: '/images/derma/treatments/acne.svg',
  },
  {
    name: 'Poros obstruidos',
    imgUrl: '/images/derma/treatments/porosObstruidos.svg',
  },
  {
    name: 'Puntos negros',
    imgUrl: '/images/derma/treatments/puntosNegros.svg',
  },
  {
    name: 'Líneas finas',
    imgUrl: '/images/derma/treatments/lineasFinas.svg',
  },
  {
    name: 'Firmeza',
    imgUrl: '/images/derma/treatments/firmeza.svg',
  },
  {
    name: 'Rosácea',
    imgUrl: '/images/derma/treatments/rosacea.svg',
  },
];

export default function TreatmentsDerma() {
  const { deviceSize } = useSessionStore(state => state);

  return (
    <div className="bg-[#F7F3F0B2]">
      <Container className="pt-12 pb-4 overflow-hidden">
        <Text className="font-gtUltraThin mb-4 text-xl md:text-2xl">
          Nuestros expertos en dermatología pueden tratar
        </Text>
      </Container>

      {deviceSize.isMobile && (
        <FullWidthCarousel visibleSlides={2.25} className="pb-8">
          {TREATMENTS.map((item: DermaTreatment) => {
            return (
              <Flex
                layout="col-center"
                key={item.name}
                className="bg-[#F3EDE9] aspect-square shrink-0 rounded-3xl mr-4 justify-between py-4"
              >
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  height={64}
                  width={64}
                />
                <Text className="text-md font-semibold text-derma-primary500 px-4 text-center">
                  {item.name}
                </Text>
              </Flex>
            );
          })}
        </FullWidthCarousel>
      )}

      {!deviceSize.isMobile && (
        <Container className="overflow-hidden pb-12">
          <Flex layout="row-left" className="gap-4">
            {TREATMENTS.map((item: DermaTreatment) => {
              return (
                <Flex
                  layout="col-center"
                  key={item.name}
                  className="bg-[#F3EDE9] aspect-square shrink-0 rounded-[50px] justify-center py-4 w-[15%] gap-4"
                >
                  <Image
                    src={item.imgUrl}
                    alt={item.name}
                    height={48}
                    width={48}
                  />
                  <Text className="text-md font-semibold text-derma-primary500 px-4 text-center">
                    {item.name}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </Container>
      )}
    </div>
  );
}
