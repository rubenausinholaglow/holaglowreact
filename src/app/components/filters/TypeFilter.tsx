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

export default function TypeFilter({
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

  const TYPE = [
    {
      name: 'Cuerpo',
      id: 1,
      icon: '/images/filters/tercioInferior.svg',
    },
    {
      name: 'Pelo',
      id: 2,
      icon: '/images/filters/tercioMedio.svg',
    },
    {
      name: 'Piel',
      id: 5,
      icon: '/images/filters/tercioSuperior.svg',
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
      {TYPE.map(type => (
        <li
          key={type.name}
          className={`transition-all p-2 aspect-square flex flex-col grow rounded-lg justify-between items-center cursor-pointer ${
            isDesktop ? 'w-[120px]' : ''
          } ${
            productFilters.type.includes(type.id)
              ? 'bg-hg-primary500'
              : 'bg-hg-black50'
          }`}
          onClick={() =>
            setProductFilters(
              toggleFilter({
                filter: 'type',
                value: type.id,
                filters: productFilters,
              })
            )
          }
        >
          {productFilters.type.includes(type.id) ? (
            <SvgCheckSquareActive className="ml-auto" />
          ) : (
            <SvgCheckSquare className="ml-auto" />
          )}
          <Image height={40} width={40} src={type.icon} alt={type.name} />
          <Text size="xs">{type.name}</Text>
        </li>
      ))}
    </ul>
  );
}
