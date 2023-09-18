'use client';

import { useEffect, useState } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import CategorySelector from 'app/components/filters/CategorySelector';
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
import { SvgFilters } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import { fetchProducts } from 'utils/fetch';

import MobileFilters from './components/MobileFilters';
import { applyFilters, filterCount } from './utils/filters';

export default function ProductsPage() {
  const { stateProducts, setStateProducts, deviceSize } =
    useGlobalPersistedStore(state => state);

  const {
    filteredProducts,
    setFilteredProducts,
    productFilters,
    setProductFilters,
    isModalOpen,
  } = useGlobalStore(state => state);

  const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState('false');

  useEffect(() => {
    async function initProducts() {
      const products = await fetchProducts();
      setStateProducts(products);
    }

    if (isEmpty(stateProducts)) {
      initProducts();
    }

    if (isEmpty(filteredProducts)) {
      setStateProducts(stateProducts);
    }
  }, [stateProducts]);

  useEffect(() => {
    applyFilters({ products: filteredProducts, filters: productFilters });

    if (filterCount(productFilters) === 0) {
      setFilteredProducts(stateProducts);
    }
  }, [productFilters]);

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
          <CategorySelector />
        </Container>
      </div>

      {!isEmpty(filteredProducts) && (
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
                    filterCount(productFilters) === 0
                      ? 'opacity-0'
                      : 'opacity-100'
                  }`}
                  onClick={() => setProductFilters({})}
                >
                  Borrar filtros ({filterCount(productFilters)})
                </Text>
              </Flex>

              <Text size="xs">
                {filteredProducts.filter(product => product.visibility).length}{' '}
                productos
              </Text>
            </Flex>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col gap-6 pb-6">
              {filteredProducts.map(product => {
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
