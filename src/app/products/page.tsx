'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import MainLayout from 'app/components/layout/MainLayout';
import ProductCard from 'app/components/product/ProductCard';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';
import { isEmpty } from 'lodash';

export default function ProductsPage() {
  const stateProducts = useGlobalPersistedStore(state => state.products);
  const setStateProducts = useGlobalPersistedStore(
    state => state.setStateProducts
  );

  const [products, setProducts] = useState<Product[]>(stateProducts);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await ProductService.getAllProducts();

        const productsWithVisibility = fetchedProducts.map(
          (product: Product) => ({
            ...product,
            visibility: true,
          })
        );

        setStateProducts(productsWithVisibility);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    if (isEmpty(stateProducts)) {
      fetchProducts();
    }
  }, []);

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
    let test = products;

    if (!isEmpty(selectedCategories)) {
      test = products.map(product => {
        return {
          ...product,
          visibility: product.category.some(category =>
            selectedCategories.includes(category.name)
          ),
        };
      });
    } else {
      test = stateProducts;
    }

    console.log(selectedCategories);
    console.log(test);

    setProducts(test);
  }, [selectedCategories]);

  if (isEmpty(stateProducts)) {
    return <></>;
  }

  return (
    <MainLayout>
      <div className="bg-[#F3EDE9] rounded-t-3xl pt-8">
        <Container>
          <Title size="3xl" className="font-bold mb-12 ">
            Loren ipsum{' '}
            <Underlined color={HOLAGLOW_COLORS['purple700']}>sita</Underlined>
          </Title>
        </Container>
        <Container className="pr-0 md:pr-4">
          <ul className="flex gap-3 mb-12 overflow-scroll md:overflow-auto pr-4 md:pr-0">
            {productCategories.map(category => {
              return (
                <li
                  key={category}
                  className={`inline-block rounded-full p-1 pr-4  ${
                    selectedCategories.includes(category)
                      ? 'bg-red'
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
          <ul className="flex flex-col gap-6 pb-6">
            {products.map(product => {
              if (product.visibility) {
                return (
                  <li key={product.id}>
                    <ProductCard
                      product={product}
                      className="h-full flex flex-col"
                    />
                  </li>
                );
              }
            })}
          </ul>
        </Container>
      </div>
    </MainLayout>
  );
}
