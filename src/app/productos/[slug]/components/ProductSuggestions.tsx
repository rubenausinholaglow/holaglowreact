'use client';

import { useState } from 'react';
import { Product } from '@interface/product';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCalendar } from 'icons/Icons';

export default function ProductSuggestions({ product }: { product: Product }) {
  const deviceSize = useGlobalPersistedStore(state => state.deviceSize);
  const [activeSlider, setActiveSlider] = useState('pre');

  const visibleSuggestions = () => {
    if (deviceSize.isMobile) {
      return 1;
    }

    if (deviceSize.isTablet) {
      return 2;
    }

    return 3;
  };

  return (
    <Container>
      <Title size="2xl" className="font-bold text-center mb-8 md:mb-12">
        Sugerencias
      </Title>

      <Flex layout="col-center" className="mb-10">
        <ul className="inline-flex bg-hg-secondary500 p-1 rounded-full">
          <li
            className={`transition-all text-xs font-medium py-3 px-4 rounded-full grow-0 cursor-pointer ${
              activeSlider === 'pre'
                ? 'bg-hg-primary text-hg-black'
                : 'text-hg-secondary'
            }`}
            onClick={() => setActiveSlider('pre')}
          >
            Pretratamiento
          </li>
          <li
            className={`transition-all text-xs font-medium py-3 px-4 rounded-full grow-0 cursor-pointer ${
              activeSlider === 'post'
                ? 'bg-hg-primary text-hg-black'
                : 'text-hg-secondary'
            }`}
            onClick={() => setActiveSlider('post')}
          >
            Posttratamiento
          </li>
        </ul>
      </Flex>

      <Carousel
        hasControls
        className="relative mb-12"
        isIntrinsicHeight
        visibleSlides={visibleSuggestions()}
        infinite={false}
        sliderStyles={`${deviceSize.isMobile ? '' : 'gap-16'}`}
      >
        <Flex layout="col-center" className="bg-white/30 p-8 rounded-2xl m-5">
          <SvgCalendar
            height={48}
            width={48}
            className="text-hg-secondary mb-6"
          />
          <Text className="text-center">
            Se recomienda evitar medicamentos AINE (aspirina, ibuprofeno,
            naproxeno...) durante 3 días antes del tratamiento.
          </Text>
        </Flex>
        <Flex
          layout="col-center"
          className="bg-white/30 p-8 rounded-2xl m-5 height"
        >
          <SvgCalendar
            height={48}
            width={48}
            className="text-hg-secondary mb-6"
          />
          <Text className="text-center">
            Ven a la cita sin maquillaje: Así podremos detectar más fácilmente
            las necesidades de tu piel y aplicar el tratamiento sin ningún
            impedimento.
          </Text>
        </Flex>
        <Flex layout="col-center" className="bg-white/30 p-8 rounded-2xl m-5">
          <SvgCalendar
            height={48}
            width={48}
            className="text-hg-secondary mb-6"
          />
          <Text className="text-center">
            Evita las bebidas alcohólicas durante las 12h anteriores al
            tratamiento.
          </Text>
        </Flex>
        <Flex layout="col-center" className="bg-white/30 p-8 rounded-2xl m-5">
          <SvgCalendar
            height={48}
            width={48}
            className="text-hg-secondary mb-6"
          />
          <Text className="text-center">
            Se recomienda evitar medicamentos AINE (aspirina, ibuprofeno,
            naproxeno...) durante 3 días antes del tratamiento.
          </Text>
        </Flex>
      </Carousel>
    </Container>
  );
}
