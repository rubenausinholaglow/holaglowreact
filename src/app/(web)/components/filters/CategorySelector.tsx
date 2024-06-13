import { useEffect, useState } from 'react';
import { getAllCategoryNames } from '@utils/utils';
import {
  applyFilters,
  filterCount,
  toggleFilter,
} from 'app/(web)/tratamientos/utils/filters';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Text } from 'designSystem/Texts/Texts';
import { twMerge } from 'tailwind-merge';

import CategoryIcon from '../common/CategoryIcon';
import PackTypeFilter from './PackTypeFilter';

export default function CategorySelector({
  className,
  isStacked,
  isDashboard,
}: {
  className?: string;
  isStacked?: boolean;
  isDashboard?: boolean;
}) {
  const { stateProducts } = useGlobalPersistedStore(state => state);

  const {
    productFilters,
    setProductFilters,
    filteredProducts,
    setFilteredProducts,
  } = useGlobalStore(state => state);

  const [productCategories, setProductCategories] = useState<string[]>([]);

  useEffect(() => {
    setProductCategories(
      getAllCategoryNames(stateProducts).sort((a, b) => {
        if (a === 'Packs') return -1;
        if (b === 'Packs') return 1;
        return 0;
      })
    );
  }, [stateProducts]);

  console.log(productFilters);

  useEffect(() => {
    console.log('hola!');

    setFilteredProducts(
      applyFilters({ products: filteredProducts, filters: productFilters })
    );

    if (filterCount(productFilters) === 0) {
      setFilteredProducts(stateProducts);
    }
  }, [productFilters]);

  return (
    <ul
      id="categorySelector"
      className={`md:pl-0 md:mt-4 xl:mt-0 flex overflow-x-scroll overflow-y-hidden md:overflow-auto gap-2 ${
        className ? className : ''
      }
      ${isStacked ? 'flex-wrap' : 'pl-4'}
      `}
    >
      {isDashboard && (
        <li className="shrink-0">
          <PackTypeFilter isDashboard={isDashboard} />
        </li>
      )}
      {productCategories.map((category, i) => {
        return (
          <li
            id={`tmevent_treatments_type_${category}`}
            key={category}
            className={`shrink-0 ${
              i === productCategories.length - 1 ? 'mr-4 md:mr-0' : ''
            }`}
            onClick={() => {
              setProductFilters(
                toggleFilter({
                  filter: 'category',
                  value: category,
                  filters: productFilters,
                })
              );
            }}
          >
            <Button
              className="pointer-events-none"
              type="white"
              customStyles={twMerge(`
              p-1 pr-4 border-none pointer-events-none ${
                isDashboard ? 'pl-4 bg-hg-black100' : ''
              } ${
                productFilters.category.includes(category)
                  ? 'bg-hg-primary500'
                  : isStacked
                  ? 'mb-0'
                  : ''
              }`)}
            >
              {!isDashboard && (
                <CategoryIcon category={category} className="mr-2" />
              )}
              <Text size="xs" className="whitespace-nowrap font-medium">
                {category}
              </Text>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
