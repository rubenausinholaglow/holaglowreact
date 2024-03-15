import { useEffect, useState } from 'react';
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
import { Flex } from 'designSystem/Layouts/Layouts';
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
    const allCategoryNames: string[] = stateProducts.reduce(
      (categoryNames: string[], product) => {
        const productCategories = product.category.map(
          category => category.name
        );
        return [...categoryNames, ...productCategories];
      },
      []
    );
    let filteredCategoryNames;
    if (isDashboard) {
      filteredCategoryNames = allCategoryNames.filter(
        categoryName =>
          categoryName !== 'Calidad Piel' && categoryName !== 'Caida del pelo'
      );
    } else {
      filteredCategoryNames = allCategoryNames;
    }

    const uniqueCategoryNames: string[] = [...new Set(filteredCategoryNames)];

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
      className={`pl-4 md:pl-0 md:mt-4 xl:mt-0 flex overflow-x-scroll overflow-y-hidden md:overflow-auto gap-2 ${
        className ? className : ''
      }
      ${isStacked ? 'flex-wrap' : ''}
      `}
    >
      {productCategories.map((category, i) => {
        return (
          <li
            id={`tmevent_treatments_type_${category}`}
            key={category}
            className="shrink-0"
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
              className={className}
              type="white"
              customStyles={twMerge(`
              p-1 pr-4 border-none pointer-events-none ${
                productFilters.category.includes(category)
                  ? 'bg-hg-primary500'
                  : isStacked
                  ? 'bg-hg-black100'
                  : 'bg-white hover:bg-hg-secondary100'
              }`)}
              id="tmevent_treatments_type"
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
      <li className="shrink-0 mr-4">
        <PackTypeFilter className="" />
      </li>
    </ul>
  );
}
