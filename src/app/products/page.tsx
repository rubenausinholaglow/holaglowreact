'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Product } from '@interface/product';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import CategorySelector from 'app/components/filters/CategorySelector';
//import CategorySelector from 'app/components/filters/CategorySelector';
import MainLayout from 'app/components/layout/MainLayout';
import ProductCard from 'app/components/product/ProductCard';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';
import { SvgFilters } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import { fetchProducts } from 'utils/fetch';

import MobileFilters from './components/MobileFilters';
import {
  applyFilters,
  toggleCategory,
  updateFilterCount,
} from './utils/filters';

type ProductFilters = {
  [key: string]: string[];
};

export default function ProductsPage() {
  const { stateProducts, setStateProducts, deviceSize } =
    useGlobalPersistedStore(state => state);

  const [products, setProducts] = useState<Product[]>(stateProducts);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [filtersApplied, setFiltersApplied] = useState<number>(0);

  const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState('false');

  const { isModalOpen } = useGlobalStore(state => state);

  useEffect(() => {
    async function initProducts() {
      const products = await fetchProducts();
      setStateProducts(products);
    }

    if (isEmpty(stateProducts)) {
      initProducts();
    }

    if (isEmpty(products)) {
      setProducts(stateProducts);
    }
  }, [stateProducts]);

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
    setFiltersApplied(updateFilterCount(filters));

    applyFilters({ products, filters, setProducts });
  }, [filters]);

  useEffect(() => {
    if (filtersApplied === 0) {
      setProducts(stateProducts);
    }
  }, [filtersApplied]);

  useEffect(() => {
    if (!isModalOpen) {
      setIsMobileFiltersVisible(false);
    }
  }, [isModalOpen]);

  return (
    <MainLayout>
      <MobileFilters isVisible={isMobileFiltersVisible} />

      <div className="bg-[#F3EDE9] rounded-t-3xl py-8 lg:bg-[url('/images/products/productsBg.png')] bg-right-top bg-no-repeat bg-contain">
        <Container>
          <Title size="3xl" className="font-bold mb-12 lg:w-2/5">
            Loren ipsum{' '}
            <Underlined color={HOLAGLOW_COLORS['secondary700']}>
              sita
            </Underlined>
          </Title>
        </Container>
        <Container className="px-0 md:px-4">
          <CategorySelector products={products} setProducts={setProducts} />
        </Container>
      </div>

      {!isEmpty(products) && (
        <div className="bg-[#f7f3f0]">
          <AccordionPrimitive.Root
            type="single"
            className="w-full bg-white"
            collapsible
            value={showDesktopFilters}
            onValueChange={setShowDesktopFilters}
          >
            <AccordionPrimitive.Item value={true.toString()} className="w-full">
              <AccordionPrimitive.Content className="overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <Container className="py-8">
                  <p>Filters here</p>
                </Container>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          </AccordionPrimitive.Root>
          <Container className="pt-6">
            <Flex layout="row-left" className="justify-between mb-8">
              <Flex layout="row-left">
                <Button
                  type="tertiary"
                  size="sm"
                  className="mr-2"
                  onClick={() => {
                    deviceSize.isMobile
                      ? setIsMobileFiltersVisible(true)
                      : setShowDesktopFilters(
                          showDesktopFilters === 'true' ? 'false' : 'true'
                        );
                  }}
                >
                  <SvgFilters className="mr-2" />
                  <Flex layout="col-center">Filtrar</Flex>
                </Button>

                <Text
                  size="xs"
                  className={`transition-opacity text-hg-tertiary underline cursor-pointer  ${
                    filtersApplied === 0 ? 'opacity-0' : 'opacity-100'
                  }`}
                  onClick={() => setFilters({})}
                >
                  Borrar filtros ({filtersApplied})
                </Text>
              </Flex>

              <Text size="xs">
                {products.filter(product => product.visibility).length}{' '}
                productos
              </Text>
            </Flex>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col gap-6 pb-6">
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
      )}
    </MainLayout>
  );
}
