'use client';

import { useState } from 'react';
import { Product } from '@interface/product';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCalendar } from 'icons/Icons';
import * as icon from 'icons/IconsDs';
import { isEmpty } from 'lodash';

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

  const postTreatmentTips = product.postTreatmentInfo.first24hTips.concat(
    product.postTreatmentInfo.after24hTips
  );

  if (
    isEmpty(product.preTreatmentInfo?.tips) &&
    isEmpty(product.postTreatmentInfo.postTreatmentTips)
  ) {
    return <></>;
  }

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
        {product.preTreatmentInfo?.tips &&
          activeSlider === 'pre' &&
          product.preTreatmentInfo?.tips
            .sort((a, b) => a.priority - b.priority)
            .map(tip => {
              const iconComponentName = `Svg${tip.icon}`;
              const IconComponent = (icon as any)[iconComponentName] || null;

              return (
                <Flex
                  key={tip.priority}
                  layout="col-center"
                  className="bg-white/30 p-8 rounded-2xl h-full"
                >
                  {IconComponent && <IconComponent />}
                  <Text className="text-center">{tip.details}</Text>
                </Flex>
              );
            })}

        {postTreatmentTips &&
          activeSlider === 'post' &&
          postTreatmentTips
            .sort((a, b) => a.priority - b.priority)
            .map(tip => {
              const iconComponentName = `Svg${tip.icon}`;
              const IconComponent = (icon as any)[iconComponentName] || null;

              return (
                <Flex
                  key={tip.priority}
                  layout="col-center"
                  className="bg-white/30 p-8 rounded-2xl h-full"
                >
                  {IconComponent && <IconComponent />}
                  <Text className="text-center">{tip.details}</Text>
                </Flex>
              );
            })}
      </Carousel>
    </Container>
  );
}
