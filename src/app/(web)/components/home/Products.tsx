'use client';

import { useEffect } from 'react';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

import AnimateOnViewport from '../common/AnimateOnViewport';
import CategorySelector from '../filters/CategorySelector';

export default function Products({
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
          Tratamientos para conseguir resultados naturales
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
