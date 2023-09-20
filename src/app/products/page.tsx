'use client';

import { useEffect, useState } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import CategorySelector from 'app/components/filters/CategorySelector';
import PackTypeFilter from 'app/components/filters/PackTypeFilter';
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

import DesktopFilters from './components/DesktopFilters';
import LookingFor from './components/LookingFor';
import MobileFilters from './components/MobileFilters';
import { applyFilters, filterCount } from './utils/filters';
import { SvgSpinner } from 'icons/Icons';

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
      setFilteredProducts(stateProducts);
    }
  }, [stateProducts]);

  useEffect(() => {
    setFilteredProducts(
      applyFilters({ products: filteredProducts, filters: productFilters })
    );

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

      <div className="bg-[#F3EDE9] rounded-t-3xl pt-8 pb-4 lg:bg-[url('/images/products/productsBg.png')] bg-right-top bg-no-repeat bg-contain">
        <Container>
          <Title size="3xl" className="font-bold mb-12 lg:w-2/5">
            Loren ipsum{' '}
            <Underlined color={HOLAGLOW_COLORS['secondary700']}>
              sita
            </Underlined>
          </Title>
        </Container>
        <Container className="pr-0 md:pr-4">
          <Flex layout="col-left" className="lg:flex-row lg:justify-between">
            <CategorySelector className="mb-4" />
            <PackTypeFilter />
          </Flex>
        </Container>
      </div>
      {isEmpty(filteredProducts) && (
        <Flex layout="row-left" className="justify-center">
          <SvgSpinner
            fill={HOLAGLOW_COLORS['secondary']}
            height={50}
            width={50}
          />
        </Flex>
      )}
      {!isEmpty(filteredProducts) && (
        <div className="bg-[#f7f3f0] pb-32">
          <Flex
            layout="row-left"
            className="justify-between py-8 md:py-0 md:mt-8 md:absolute w-full"
          >
            <Container>
              <Flex layout="row-left" className="w-full justify-between">
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
                  className={`text-hg-secondary transition-opacity underline cursor-pointer mr-auto ${
                    filterCount(productFilters) === 0
                      ? 'opacity-0'
                      : 'opacity-100'
                  }`}
                  onClick={() => {
                    setProductFilters({
                      isPack: false,
                      category: [],
                      zone: [],
                      clinic: [],
                    });
                  }}
                >
                  Borrar filtros ({filterCount(productFilters)})
                </Text>
                <Text size="xs">
                  {
                    filteredProducts.filter(product => product.visibility)
                      .length
                  }{' '}
                  productos
                </Text>
              </Flex>
            </Container>
          </Flex>

          <AccordionPrimitive.Root
            type="single"
            className="w-full bg-white"
            collapsible
            value={showDesktopFilters}
            onValueChange={setShowDesktopFilters}
          >
            <AccordionPrimitive.Item value={true.toString()} className="w-full">
              <AccordionPrimitive.Content className="overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <Container className="pt-24 px-8 pb-12">
                  <DesktopFilters
                    showDesktopFilters={showDesktopFilters}
                    setShowDesktopFilters={setShowDesktopFilters}
                  />
                </Container>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          </AccordionPrimitive.Root>

          <Container>
            <ul
              className={`transition-all grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col gap-6  ${
                showDesktopFilters === true.toString() ? 'md:pt-12' : 'md:pt-24'
              }   pb-6`}
            >
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

      <LookingFor />
    </MainLayout>
  );
}
