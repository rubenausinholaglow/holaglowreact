import { useEffect, useState } from 'react';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import {
  applyFilters,
  filterCount,
  toggleFilter,
} from 'app/tratamientos/utils/filters';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { twMerge } from 'tailwind-merge';

import CategoryIcon from '../common/CategoryIcon';

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
    const allCategoryNames: string[] = stateProducts.reduce(
      (categoryNames: string[], product) => {
        const productCategories = product.category.map(
          category => category.name
        );
        return [...categoryNames, ...productCategories];
      },
      []
    );

    const uniqueCategoryNames: string[] = [...new Set(allCategoryNames)];

    setProductCategories(uniqueCategoryNames);
  }, [stateProducts]);

  useEffect(() => {
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
      className={`flex overflow-x-scroll overflow-y-hidden md:overflow-auto ${
        className ? className : ''
      }
      ${isStacked ? 'flex-wrap' : ''}
      `}
    >
      {productCategories.map((category, i) => {
        return (
          <li
            key={category}
            className={twMerge(`transition-all cursor-pointer rounded-full p-1 pr-4 mr-3 ${
              productFilters.category.includes(category)
                ? 'bg-hg-primary500'
                : isStacked
                ? 'bg-hg-black100 mb-2'
                : 'bg-white hover:bg-hg-secondary100'
            }
            ${i == 0 && !isStacked ? 'ml-4 md:ml-0' : ''}
            ${isDashboard ? 'py-2 px-4' : ''}
            `)}
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
            <Flex layout="row-left">
              {!isDashboard && (
                <CategoryIcon category={category} className="mr-2" />
              )}
              <Text size="xs" className="whitespace-nowrap font-medium">
                {category}
              </Text>
            </Flex>
          </li>
        );
      })}
    </ul>
  );
}
