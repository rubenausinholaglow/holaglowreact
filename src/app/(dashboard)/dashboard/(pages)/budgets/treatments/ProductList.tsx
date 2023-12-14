import React from 'react';
import { ProductTableProps } from '@utils/props';
import { CartItem } from 'app/types/product';

import ProductCard from './ProductCard';

export default function ProductList({
  products,
  showFilters,
}: ProductTableProps) {
  return (
    <>
      <div
        className={`grid gap-4 pb-[200px] ${
          showFilters ? 'grid-cols-2' : 'grid-cols-3'
        } `}
      >
        {products?.map(product => (
          <ProductCard key={product.id} product={product as CartItem} />
        ))}
      </div>
    </>
  );
}
