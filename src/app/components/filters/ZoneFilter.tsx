'use client';

import { useEffect } from 'react';
import {
  applyFilters,
  filterCount,
  toggleZone,
} from 'app/products/utils/filters';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCheckSquare, SvgCheckSquareActive, SvgCross } from 'icons/IconsDs';

export default function ZoneFilter({ className }: { className?: string }) {
  const { stateProducts } = useGlobalPersistedStore(state => state);
  const {
    productFilters,
    setProductFilters,
    filteredProducts,
    setFilteredProducts,
  } = useGlobalStore(state => state);

  const ZONES = [
    {
      name: 'Tercio inferior',
      id: 4,
    },
    {
      name: 'Tercio medio',
      id: 2,
    },
    {
      name: 'Tercio superior',
      id: 5,
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
    <ul className={`flex gap-5 w-full ${className ? className : ''}`}>
      {ZONES.map(zone => (
        <li
          key={zone.name}
          className={`transition-all p-2 aspect-square flex flex-col grow rounded-lg justify-between items-center cursor-pointer ${
            productFilters.zone.includes(zone.id)
              ? 'bg-hg-primary500'
              : 'bg-hg-black50'
          }`}
          onClick={() =>
            setProductFilters(
              toggleZone({ zone: zone.id, filters: productFilters })
            )
          }
        >
          {productFilters.zone.includes(zone.id) ? (
            <SvgCheckSquareActive className="ml-auto" />
          ) : (
            <SvgCheckSquare className="ml-auto" />
          )}
          <SvgCross height={24} width={24} />
          <Text size="xs">{zone.name}</Text>
        </li>
      ))}
    </ul>
  );
}
