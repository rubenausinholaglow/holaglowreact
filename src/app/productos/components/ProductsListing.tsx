'use client';

import { useEffect, useState } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import ProductCard from 'app/components/product/ProductCard';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgFilters } from 'icons/IconsDs';
import { isEmpty } from 'lodash';

import { applyFilters, filterCount } from '../utils/filters';
import DesktopFilters from './DesktopFilters';
import MobileFilters from './MobileFilters';

export default function ProductsListing() {
  const { stateProducts, deviceSize } = useGlobalPersistedStore(state => state);

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
    if (isEmpty(filteredProducts)) {
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
    <>
      <MobileFilters isVisible={isMobileFiltersVisible} />

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
                customStyles="group-hover:bg-hg-secondary100"
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
                {filteredProducts.filter(product => product.visibility).length}{' '}
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
    </>
  );
}
