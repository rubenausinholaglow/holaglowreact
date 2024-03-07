'use client';

import { useEffect, useState } from 'react';
import { ProductFilters } from '@interface/filters';
import { Product } from '@interface/product';
import AnimateOnViewport from 'app/(web)/components/common/AnimateOnViewport';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import {
  applyFilters,
  INITIAL_FILTERS,
} from 'app/(web)/tratamientos/utils/filters';
import { Container } from 'designSystem/Layouts/Layouts';

import CategorySelectorSSR from './CategorySelectorSSR';

export default function ProductList({ products }: { products: Product[] }) {
  const [productFilters, setProductFilters] =
    useState<ProductFilters>(INITIAL_FILTERS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    applyFilters({ products: products, filters: productFilters })
  );

  useEffect(() => {
    setFilteredProducts(
      applyFilters({ products: filteredProducts, filters: productFilters })
    );
  }, [productFilters]);

  return (
    <>
      <Container className="px-0 mb-8 md:px-4">
        <AnimateOnViewport origin="right">
          <CategorySelectorSSR
            products={products}
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
  );
}
