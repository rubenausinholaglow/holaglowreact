'use client';

import { useEffect, useState } from 'react';
import { ProductFilters } from '@interface/filters';
import { Product } from '@interface/product';
import { fetchProducts } from '@utils/fetch';
import { AnimateOnViewport } from 'app/(web)/components/common/AnimateOnViewport';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import {
  applyFilters,
  filterCount,
  INITIAL_FILTERS,
} from 'app/(web)/tratamientos/utils/filters';
import { SvgArrow } from 'app/icons/IconsDs';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

import CategorySelectorSSR from './CategorySelectorSSR';

export default function HomeProducts() {
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [productFilters, setProductFilters] =
    useState<ProductFilters>(INITIAL_FILTERS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function initProducts() {
      const products = await fetchProducts();
      setInitialProducts(products);
      setFilteredProducts(products);
    }

    if (isEmpty(initialProducts)) {
      initProducts();
    }
  }, []);

  useEffect(() => {
    setFilteredProducts(
      applyFilters({ products: filteredProducts, filters: productFilters })
    );

    if (filterCount(productFilters) === 0) {
      setFilteredProducts(initialProducts);
    }
  }, [productFilters]);

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
      {!isEmpty(initialProducts) && (
        <>
          <Container className="px-0 mb-8 md:px-4">
            <AnimateOnViewport origin="right">
              <CategorySelectorSSR
                products={initialProducts}
                productFilters={productFilters}
                setProductFilters={setProductFilters}
              />
            </AnimateOnViewport>
          </Container>
          <FullWidthCarousel
            className="pb-8"
            type="products"
            items={filteredProducts}
          />
        </>
      )}
    </div>
  );
}
