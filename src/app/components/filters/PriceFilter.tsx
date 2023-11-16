'use client';

import { useEffect } from 'react';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import {
  applyFilters,
  filterCount,
  toggleFilter,
} from 'app/tratamientos/utils/filters';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCheckSquare, SvgCheckSquareActive } from 'icons/IconsDs';
import Image from 'next/image';

export default function PriceFilter({
  className,
  isDesktop,
}: {
  className?: string;
  isDesktop?: boolean;
}) {
  const { stateProducts } = useGlobalPersistedStore(state => state);
  const {
    productFilters,
    setProductFilters,
    filteredProducts,
    setFilteredProducts,
  } = useGlobalStore(state => state);

  const PRICES = [
    {
      name: '0 € - 250 €',
      id: 4,
    },
    {
      name: '250 € - 500 €',
      id: 3,
    },
    {
      name: 'Más de 500 €',
      id: 2,
    },
  ];

  useEffect(() => {
    setFilteredProducts(
      applyFilters({ products: filteredProducts, filters: productFilters })
    );

    if (filterCount(productFilters) === 0) {
      setFilteredProducts(stateProducts);
    }
  }, [productFilters]);

  return (
    <ul className={`flex gap-5 w-full flex-col ${className ? className : ''}`}>
      {PRICES.map(price => (
        <li
          key={price.name}
          onClick={() =>
            setProductFilters(
              toggleFilter({
                filter: 'price',
                value: price.id,
                filters: productFilters,
              })
            )
          }
          className="w-full flex"
        >
          {productFilters.price.includes('1') ? (
            <SvgCheckSquareActive className="ml-auto" />
          ) : (
            <SvgCheckSquare className="ml-auto" />
          )}
          <Text size="xs">{price.name}</Text>
        </li>
      ))}
    </ul>
  );
}
