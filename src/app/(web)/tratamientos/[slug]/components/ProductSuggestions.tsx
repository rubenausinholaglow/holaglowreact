'use client';

import { useState } from 'react';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { isMobile, isTablet } from 'app/(web)/components/layout/Breakpoint';
import { Product } from 'app/types/product';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function ProductSuggestions({ product }: { product: Product }) {
  const visibleSuggestions = isMobile() ? 1 : isTablet() ? 2 : 3;

  const postTreatmentTips = product.postTreatmentInfo?.first24hTips?.concat(
    product.postTreatmentInfo.after24hTips
  );

  const [activeSlider, setActiveSlider] = useState(
    !isEmpty(product.preTreatmentInfo?.tips) || postTreatmentTips?.length == 0
      ? 'pre'
      : 'post'
  );

  if (isEmpty(product.preTreatmentInfo?.tips) && isEmpty(postTreatmentTips)) {
    return <></>;
  }

  return (
    <div className="bg-derma-secondary300 pt-12 pb-8 md:py-16">
      <Container>
        <Title isAnimated size="2xl" className="text-center mb-8 md:mb-12">
          Recomendaciones médicas
        </Title>

        {!isEmpty(product.preTreatmentInfo?.tips) &&
          !isEmpty(postTreatmentTips) && (
            <Flex layout="col-center" className="mb-10">
              <ul className="inline-flex bg-derma-secondary500 p-1 rounded-full">
                <li
                  id={'tmevent_click_treatment_info'}
                  className={`transition-all text-xs font-medium py-3 px-4 rounded-full grow-0 cursor-pointer text-hg-secondary ${
                    activeSlider === 'pre'
                      ? 'bg-hg-secondary text-hg-secondary100'
                      : ''
                  }`}
                  onClick={() => setActiveSlider('pre')}
                >
                  Pretratamiento
                </li>
                <li
                  id={'tmevent_click_treatment_info'}
                  className={`transition-all text-xs font-medium py-3 px-4 rounded-full grow-0 cursor-pointer ${
                    activeSlider === 'post'
                      ? 'bg-hg-secondary text-hg-secondary100'
                      : ''
                  }`}
                  onClick={() => setActiveSlider('post')}
                >
                  Postratamiento
                </li>
              </ul>
            </Flex>
          )}
      </Container>

      <Container className="px-0">
        <Carousel
          hasDots={isMobile()}
          hasControls={!isMobile()}
          controlStyles="px-4"
          className="relative"
          isIntrinsicHeight
          visibleSlides={visibleSuggestions}
          infinite={false}
          sliderStyles="md:gap-10"
        >
          {product.preTreatmentInfo?.tips &&
            activeSlider === 'pre' &&
            product.preTreatmentInfo?.tips
              .sort((a, b) => a.priority - b.priority)
              .map(tip => {
                return (
                  <Flex
                    key={tip.priority}
                    layout="col-center"
                    className="bg-derma-secondary400 p-8 rounded-2xl h-full mr-4 ml-4"
                  >
                    <DynamicIcon
                      className="h-12 w-12 mb-6 text-hg-secondary"
                      name={`Svg${tip.icon}`}
                      family="suggestion"
                    />
                    <Text className="text-center">{tip.details}</Text>
                  </Flex>
                );
              })}

          {postTreatmentTips &&
            activeSlider === 'post' &&
            postTreatmentTips
              .sort((a, b) => a.priority - b.priority)
              .map(tip => {
                return (
                  <Flex
                    key={tip.priority}
                    layout="col-center"
                    className="bg-derma-secondary400 p-8 rounded-2xl h-full mr-4 ml-4"
                  >
                    <DynamicIcon
                      className="h-12 w-12 mb-6 text-hg-secondary"
                      name={`Svg${tip.icon}`}
                      family="suggestion"
                    />
                    <Text className="text-center">{tip.details}</Text>
                  </Flex>
                );
              })}
        </Carousel>
      </Container>
    </div>
  );
}
