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
    imgUrl: '/images/derma/treatments/acne.svg',
  },
  {
    name: 'Pieles secas',
    imgUrl: '/images/derma/treatments/porosObstruidos.svg',
  },
  {
    name: 'Pieles grasas',
    imgUrl: '/images/derma/treatments/puntosNegros.svg',
  },
  {
    name: 'Líneas finas',
    imgUrl: '/images/derma/treatments/lineasFinas.svg',
  },
  {
    name: 'Flacidez',
    imgUrl: '/images/derma/treatments/firmeza.svg',
  },
  {
    name: 'Rosácea',
    imgUrl: '/images/derma/treatments/rosacea.svg',
  },
  {
    name: 'Melasma',
    imgUrl: '/images/derma/treatments/rosacea.svg',
  },
  {
    name: 'Manchas',
    imgUrl: '/images/derma/treatments/rosacea.svg',
  },
  {
    name: 'Fotoenvejecimiento',
    imgUrl: '/images/derma/treatments/rosacea.svg',
  },
];

export default function TreatmentsDerma() {
  const { deviceSize } = useSessionStore(state => state);

  return (
    <div className="bg-[#F7F3F0B2]">
      <Container className="pt-12 pb-4 overflow-hidden">
        <TitleDerma size="xl" className="mb-4">
          Soluciones para cada tipo de piel
        </TitleDerma>
      </Container>

      <FullWidthCarousel
        visibleSlides={deviceSize.isMobile ? 2.25 : 8}
        className="pb-8"
        hasControls={false}
      >
        {TREATMENTS.map((item: DermaTreatment) => {
          return (
            <Flex
              layout="col-center"
              key={item.name}
              className="bg-derma-secondary400 aspect-square shrink-0 rounded-[50px] mr-4 justify-center py-4 gap-4"
            >
              <Image src={item.imgUrl} alt={item.name} height={64} width={64} />
              <Text className="text-md font-semibold text-derma-primary500 px-4 text-center">
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </FullWidthCarousel>
    </div>
  );
}
