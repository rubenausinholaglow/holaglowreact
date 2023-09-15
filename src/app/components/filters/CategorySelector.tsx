import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';
import { isEmpty } from 'lodash';

export default function CategorySelector({
  products,
  setProducts,
}: {
  products: Product[];
  setProducts: (products: Product[]) => void;
}) {
  const { stateProducts } = useGlobalPersistedStore(state => state);

  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

    const uniqueCategoryNames: string[] = [...new Set(allCategoryNames)];

    setProductCategories(uniqueCategoryNames);
  }, []);

  useEffect(() => {
    let updatedProducts = products;

    if (!isEmpty(selectedCategories)) {
      updatedProducts = products.map(product => {
        return {
          ...product,
          visibility: product.category.some(category =>
            selectedCategories.includes(category.name)
          ),
        };
      });
    } else {
      updatedProducts = stateProducts;
    }

    setProducts(updatedProducts);
  }, [selectedCategories]);

  return (
    <ul className="flex gap-3 mb-12 overflow-scroll md:overflow-auto pr-4 md:pr-0">
      {productCategories.map(category => {
        return (
          <li
            key={category}
            className={`transition-all cursor-pointer flex rounded-full p-1 pr-4 hover:bg-hg-primary500 hover:textopacity-80 ${
              selectedCategories.includes(category)
                ? 'bg-hg-primary500'
                : 'bg-white'
            }`}
            onClick={() => {
              if (selectedCategories.includes(category)) {
                setSelectedCategories(
                  selectedCategories.filter(item => item !== category)
                );
              } else {
                setSelectedCategories([...selectedCategories, category]);
              }
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
