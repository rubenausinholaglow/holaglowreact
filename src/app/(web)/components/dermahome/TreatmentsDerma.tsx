'use client';

import { useSessionStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, TitleDerma } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import FullWidthCarousel from '../product/fullWidthCarousel';

interface DermaTreatment {
  name: string;
  imgUrl: string;
}

const TREATMENTS = [
  {
    name: 'Acné',
    imgUrl: 'images/derma/icons/acne.svg',
  },
  {
    name: 'Melasma',
    imgUrl: 'images/derma/icons/melasma.svg',
  },
  {
    name: 'Rosácea',
    imgUrl: 'images/derma/icons/rosacea.svg',
  },
  {
    name: 'Antiaging',
    imgUrl: 'images/derma/icons/antiaging.svg',
  },
  {
    name: 'Pieles secas',
    imgUrl: 'images/derma/icons/pielesSecas.svg',
  },
  {
    name: 'Pieles grasas',
    imgUrl: 'images/derma/icons/pielesGrasas.svg',
  },
  {
    name: 'Líneas finas',
    imgUrl: 'images/derma/icons/lineasFinas.svg',
  },
  {
    name: 'Firmeza',
    imgUrl: 'images/derma/icons/firmeza.svg',
  },
];

const repeatedTreatments = Array(4).fill(TREATMENTS).flat();

export default function TreatmentsDerma() {
  const { deviceSize } = useSessionStore(state => state);

  return (
    <div className="bg-derma-secondary300/70 pb-12 overflow-hidden">
      <Container className="pt-12 pb-4 overflow-hidden">
        <TitleDerma size="xl" className="mb-4">
          Soluciones para cada tipo de piel
        </TitleDerma>
      </Container>

      {deviceSize.isMobile && (
        <FullWidthCarousel
          visibleSlides={deviceSize.isMobile ? 2.25 : 8}
          hasControls={false}
        >
          {TREATMENTS.map((item: DermaTreatment) => {
            return (
              <Flex
                layout="col-center"
                key={item.name}
                className="bg-derma-secondary400 aspect-square shrink-0 rounded-[50px] mr-4 justify-center py-4 gap-4"
              >
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  height={64}
                  width={64}
                />
                <Text className="text-md text-derma-primary font-semibold px-4 text-center">
                  {item.name}
                </Text>
              </Flex>
            );
          })}
        </FullWidthCarousel>
      )}

      {!deviceSize.isMobile && (
        <div className="whitespace-nowrap overflow-hidden inline-block animate-horizontalScroll">
          <ul>
            {repeatedTreatments.map((item: DermaTreatment) => {
              return (
                <li
                  className="inline-block px-6 w-36 h-36 md:w-48 md:h-48 shrink-0 bg-derma-secondary400 rounded-[50px] mr-6"
                  key={item.name}
                >
                  <Flex
                    layout="col-center"
                    className="justify-center gap-4 h-full"
                  >
                    <Image
                      src={item.imgUrl}
                      alt={item.name}
                      height={64}
                      width={64}
                    />
                    <Text className="text-md font-semibold text-derma-primary px-4 text-center">
                      {item.name}
                    </Text>
                  </Flex>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}