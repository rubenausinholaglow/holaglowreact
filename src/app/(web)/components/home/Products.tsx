'use client';

import { useEffect } from 'react';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgArrow } from 'icons/IconsDs';
import { isEmpty } from 'lodash';

import { AnimateOnViewport } from '../common/AnimateOnViewport';
import CategorySelector from '../filters/CategorySelector';

export default function HomeProducts({
  hideCategorySelector,
}: {
  hideCategorySelector?: boolean;
}) {
  const { stateProducts } = useGlobalPersistedStore(state => state);
  const { filteredProducts, setFilteredProducts } = useGlobalStore(
    state => state
  );

  useEffect(() => {
    if (isEmpty(filteredProducts)) {
      setFilteredProducts(stateProducts);
    }
  }, [stateProducts]);

  if (isEmpty(filteredProducts)) {
    return <></>;
  }

  return (
    <div className="bg-hg-cream500 overflow-hidden py-12">
      <Container>
        <Title isAnimated size="2xl" className="font-bold mb-6 md:mb-12">
          Tratamientos para conseguir resultados{' '}
          <Underlined color={HOLAGLOW_COLORS['primary']}>
            irresistibles
          </Underlined>
          <span className="inline-block ml-2 lg:ml-4 translate-y-1">
            <span className="inline-block bg-hg-black rounded-full h-[30px] w-[30px] lg:h-[44px] lg:w-[44px] p-[6px] lg:p-[10px]">
              <SvgArrow
                height={24}
                width={24}
                className="rotate-45 text-hg-primary h-[16px] w-[16px] lg:h-[24px] lg:w-[24px]"
              />
            </span>
          </span>
        </Title>
      </Container>
      {!hideCategorySelector && (
        <Container className="px-0 mb-8 md:px-4">
          <AnimateOnViewport origin="right">
            <CategorySelector />
          </AnimateOnViewport>
        </Container>
      )}
      <FullWidthCarousel
        className="pb-8"
        type="products"
        items={filteredProducts}
      />
    </div>
  );
}
