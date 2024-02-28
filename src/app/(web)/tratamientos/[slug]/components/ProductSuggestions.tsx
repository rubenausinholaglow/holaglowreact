'use client';

import { useState } from 'react';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { useSessionStore } from 'app/stores/globalStore';
import { Product } from 'app/types/product';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function ProductSuggestions({ product }: { product: Product }) {
  const deviceSize = useSessionStore(state => state.deviceSize);
  const visibleSuggestions = () => {
    if (deviceSize.isMobile) {
      return 1;
    }

    if (deviceSize.isTablet) {
      return 2;
    }

    return 3;
  };

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
    <div className="bg-hg-secondary300 pt-12 pb-8 md:py-16">
      <Container>
        <Title
          isAnimated
          size="2xl"
          className="font-bold text-center mb-8 md:mb-12"
        >
          Sugerencias
        </Title>

        {!isEmpty(product.preTreatmentInfo?.tips) &&
          !isEmpty(postTreatmentTips) && (
            <Flex layout="col-center" className="mb-10">
              <ul className="inline-flex bg-hg-secondary500 p-1 rounded-full">
                <li
                  id={'tmevent_click_treatment_info'}
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
                  id={'tmevent_click_treatment_info'}
                  className={`transition-all text-xs font-medium py-3 px-4 rounded-full grow-0 cursor-pointer ${
                    activeSlider === 'post'
                      ? 'bg-hg-primary text-hg-black'
                      : 'text-hg-secondary'
                  }`}
                  onClick={() => setActiveSlider('post')}
                >
                  Postratamiento
                </li>
              </ul>
            </Flex>
          )}

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
                return (
                  <Flex
                    key={tip.priority}
                    layout="col-center"
                    className="bg-white/30 p-8 rounded-2xl h-full mr-4 ml-4"
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
                    className="bg-white/30 p-8 rounded-2xl h-full mr-4 ml-4"
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
