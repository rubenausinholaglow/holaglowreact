import { useEffect, useState } from 'react';
import {
  applyFilters,
  filterCount,
  toggleCategory,
} from 'app/products/utils/filters';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';

export default function CategorySelector() {
  const { stateProducts } = useGlobalPersistedStore(state => state);

  const {
    filteredProducts,
    setFilteredProducts,
    productFilters,
    setProductFilters,
  } = useGlobalStore(state => state);

  const [productCategories, setProductCategories] = useState<string[]>([]);

  useEffect(() => {
    const allCategoryNames: string[] = filteredProducts.reduce(
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
  }, [filteredProducts]);

  useEffect(() => {
    setFilteredProducts(
      applyFilters({ products: filteredProducts, filters: productFilters })
    );

    if (filterCount(productFilters) === 0) {
      setFilteredProducts(stateProducts);
    }
  }, [productFilters]);

  return (
    <ul className="flex gap-3 overflow-scroll md:overflow-auto">
      {productCategories.map(category => {
        return (
          <li
            key={category}
            className={`transition-all cursor-pointer flex rounded-full p-1 pr-4 hover:bg-hg-primary500 hover:textopacity-80 ${
              productFilters.category &&
              productFilters.category.includes(category)
                ? 'bg-hg-primary500'
                : 'bg-white'
            }`}
            onClick={() => {
              setProductFilters(
                toggleCategory({ category, filters: productFilters })
              );
            }}
          >
            <Flex layout="row-left">
              <SvgDiamond
                height={35}
                width={35}
                fill={HOLAGLOW_COLORS['secondary']}
                className="mr-2 border rounded-full p-1 bg-white"
                style={{
                  borderColor: `${HOLAGLOW_COLORS['secondary']}`,
                }}
              />
              <Text size="sm" className="whitespace-nowrap">
                {category}
              </Text>
            </Flex>
          </li>
        );
      })}
    </ul>
  );
}
