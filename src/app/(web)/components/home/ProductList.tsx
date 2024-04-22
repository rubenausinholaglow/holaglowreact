'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import AnimateOnViewport from 'app/(web)/components/common/AnimateOnViewport';
import CategorySelectorSSR from 'app/(web)/components/common/CategorySelectorSSR';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { applyFilters } from 'app/(web)/tratamientos/utils/filters';
import { useGlobalStore } from 'app/stores/globalStore';
import { Container } from 'designSystem/Layouts/Layouts';

export default function ProductList({ products }: { products: Product[] }) {
  const { productFilters } = useGlobalStore(state => state);

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
      <Container className="px-0 mb-2 md:px-4">
        <AnimateOnViewport origin="right">
          <CategorySelectorSSR products={products} />
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
