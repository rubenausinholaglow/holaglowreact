'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import ProductCarousel from 'app/components/product/ProductCarousel';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';
import { isEmpty } from 'lodash';
import { FetchProducts } from 'utils/fetch';

import CategorySelector from '../filters/CategorySelector';

export default function HomeProducts() {
  const { stateProducts, setStateProducts } = useGlobalPersistedStore(
    state => state
  );

  const [products, setProducts] = useState<Product[]>(stateProducts);

  console.log(products);

  useEffect(() => {
    if (isEmpty(stateProducts)) {
      FetchProducts(setStateProducts);
    }
    if (isEmpty(products)) {
      setProducts(stateProducts);
    }
  }, [stateProducts]);

  if (isEmpty(stateProducts)) {
    return <></>;
  }

  return (
    <div className="bg-[#F3EDE9] overflow-hidden">
      <Container className="pt-12">
        <Title size="2xl" className="font-bold mb-12">
          Tratamientos para conseguir resultados{' '}
          <Underlined color={HOLAGLOW_COLORS['primary']}>
            irresistibles
          </Underlined>
        </Title>
      </Container>
      <Container className="pr-0 md:pr-4">
        <CategorySelector products={products} setProducts={setProducts} />
      </Container>
      <Container>
        <ProductCarousel className="pb-8" products={products} />
      </Container>
    </div>
  );
}
