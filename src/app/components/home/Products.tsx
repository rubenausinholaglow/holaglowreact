'use client';

import { useEffect, useMemo, useState } from 'react';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import ProductCarousel from 'app/components/product/ProductCarousel';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';
import { isEmpty } from 'lodash';

export default function HomeProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await ProductService.getAllProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const memoizedProducts = useMemo(() => products, [products]);

  useEffect(() => {
    const allCategoryNames: string[] = memoizedProducts.reduce(
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
  }, [products]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const filteredProducts = products.filter(product => {
        return product.category.some(category =>
          selectedCategories.includes(category.name)
        );
      });

      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategories]);

  if (isEmpty(products)) {
    return <></>;
  }

  return (
    <div className="bg-[#EFE8E2]/50 overflow-hidden">
      <Container className="pt-12">
        <Title size="2xl" className="font-bold mb-12 lg:max-w-[75%]">
          Resultados irresistibles{' '}
          <Underlined color={HOLAGLOW_COLORS['lime']}>sin cirugía</Underlined>
        </Title>
      </Container>
      <Container className="pr-0 md:pr-4">
        <ul className="flex gap-3 mb-12 overflow-scroll md:overflow-auto pr-4 md:pr-0">
          {productCategories.map(category => {
            return (
              <li
                key={category}
                className={`inline-block rounded-full p-1 pr-4  ${
                  selectedCategories.includes(category) ? 'bg-red' : 'bg-white'
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
                    fill={HOLAGLOW_COLORS['purple']}
                    className="mr-2 border rounded-full p-1"
                    style={{ borderColor: `${HOLAGLOW_COLORS['purple']}` }}
                  />
                  <Text size="sm">{category}</Text>
                </Flex>
              </li>
            );
          })}
        </ul>
      </Container>
      <Container>
        <ProductCarousel className="pb-8" treatments={filteredProducts} />
      </Container>
    </div>
  );
}
