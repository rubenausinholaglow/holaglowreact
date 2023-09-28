'use client';

import { useEffect, useState } from 'react';
import {
  applyFilters,
  filterCount,
  toggleFilter,
} from 'app/productos/utils/filters';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';

export default function CategorySelector({
  className,
  isStacked,
}: {
  className?: string;
  isStacked?: boolean;
}) {
  const { stateProducts } = useGlobalPersistedStore(state => state);

  const {
    filteredProducts,
    setFilteredProducts,
    productFilters,
    setProductFilters,
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
      className={`flex overflow-scroll md:overflow-auto ${
        className ? className : ''
      }
      ${isStacked ? 'flex-wrap' : ''}
      `}
    >
      {productCategories.map((category, i) => {
        return (
          <li
            key={category}
            className={`transition-all cursor-pointer flex rounded-full p-1 pr-4 mr-3 ${
              productFilters.category.includes(category)
                ? 'bg-hg-primary500'
                : isStacked
                ? 'bg-hg-black50'
                : 'bg-white hover:bg-hg-secondary100'
            } ${isStacked ? ' mb-2' : ''}
            ${i == 0 && !isStacked ? 'ml-4 md:ml-0' : ''}
            `}
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
              <SvgDiamond
                height={32}
                width={32}
                fill={HOLAGLOW_COLORS['secondary']}
                className="mr-2 border rounded-full p-1 bg-white"
                style={{
                  borderColor: `${HOLAGLOW_COLORS['secondary']}`,
                }}
              />
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
