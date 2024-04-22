'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import CategoryIcon from 'app/(web)/components/common/CategoryIcon';
import { toggleFilter } from 'app/(web)/tratamientos/utils/filters';
import { useGlobalStore } from 'app/stores/globalStore';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { twMerge } from 'tailwind-merge';

export default function CategorySelectorSSR({
  className,
  products,
  isStacked,
  isDashboard,
}: {
  className?: string;
  products: Product[];
  isStacked?: boolean;
  isDashboard?: boolean;
}) {
  const { productFilters, setProductFilters } = useGlobalStore(state => state);
  const [productCategories, setProductCategories] = useState<string[]>([]);

  useEffect(() => {
    const allCategoryNames: string[] = products.reduce(
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

    const packsIndex = filteredCategoryNames.indexOf('Packs');

    if (packsIndex !== -1) {
      const packsItem = filteredCategoryNames.splice(packsIndex, 1)[0];
      filteredCategoryNames.unshift(packsItem);
    }

    const uniqueCategoryNames: string[] = [...new Set(filteredCategoryNames)];

    setProductCategories(uniqueCategoryNames);
  }, [products]);

  return (
    <ul
      id="categorySelector"
      className={`flex overflow-x-scroll overflow-y-hidden md:overflow-auto${
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
            className={twMerge(`shrink-0 transition-all cursor-pointer rounded-full p-1 pr-4 mr-3 ${
              productFilters.category.includes(category)
                ? 'bg-hg-primary500'
                : isStacked
                ? 'bg-hg-black100'
                : 'bg-white hover:bg-hg-secondary100'
            }
            ${i == 0 && !isStacked ? 'ml-4 md:ml-0' : ''}
            ${isDashboard ? 'py-2 px-4' : ''}
            ${isStacked ? 'mb-2' : ''}
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
            <Flex layout="row-left" className="pointer-events-none">
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
