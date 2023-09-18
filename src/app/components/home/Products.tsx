'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import ProductCarousel from 'app/components/product/ProductCarousel';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgArrow } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import { fetchProducts } from 'utils/fetch';

import CategorySelector from '../filters/CategorySelector';

export default function HomeProducts() {
  const { stateProducts, setStateProducts } = useGlobalPersistedStore(
    state => state
  );

  const [products, setProducts] = useState<Product[]>(stateProducts);

  useEffect(() => {
    async function initProducts() {
      const products = await fetchProducts();

      setStateProducts(products);
    }

    if (isEmpty(stateProducts)) {
      initProducts();
    }

    if (isEmpty(products)) {
      setProducts(stateProducts);
    }
  }, [stateProducts]);

  if (isEmpty(products)) {
    return <></>;
  }

  return (
    <div className="bg-hg-cream500 overflow-hidden">
      <Container className="pt-12">
        <Title size="2xl" className="font-bold mb-6 md:mb-12">
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
      <Container className="pr-0 mb-12 md:pr-4">
        <CategorySelector products={products} setProducts={setProducts} />
      </Container>
      <Container>
        <ProductCarousel className="pb-8" products={products} />
      </Container>
    </div>
  );
}
