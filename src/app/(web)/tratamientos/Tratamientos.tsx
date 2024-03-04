'use client';

import { useEffect, useState } from 'react';
import { ProductFilters } from '@interface/filters';
import { Product } from '@interface/product';
import CheckHydration from '@utils/CheckHydration';
import { HOLAGLOW_COLORS } from '@utils/colors';
import CategorySelectorSSR from 'app/(ssr)/homeSSR/components/CategorySelectorSSR';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgFilters } from 'app/icons/IconsDs';
import { useGlobalStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import isEmpty from 'lodash/isEmpty';
import Image from 'next/image';

import { AnimateOnViewport } from '../components/common/AnimateOnViewport';
import PackTypeFilterSSR from '../components/filters/PackTypeFilterSSR';
import { useDeviceSizeSSR } from '../components/layout/Breakpoint';
import ProductCard from '../components/product/ProductCard';
import LookingFor from './components/LookingFor';
import MobileFilters from './components/MobileFilters';
import { applyFilters, filterCount, INITIAL_FILTERS } from './utils/filters';

export default function Tratamientos({ products }: { products: Product[] }) {
  const deviceSize = useDeviceSizeSSR();

  const { isModalOpen } = useGlobalStore(state => state);

  const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  const [productFilters, setProductFilters] =
    useState<ProductFilters>(INITIAL_FILTERS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    applyFilters({ products: products, filters: productFilters })
  );

  useEffect(() => {
    if (!isModalOpen) {
      setIsMobileFiltersVisible(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    setFilteredProducts(
      applyFilters({ products: filteredProducts, filters: productFilters })
    );
  }, [productFilters]);

  return (
    <>
      <link rel="canonical" href="https://holaglow.com/tratamientos/" />

      <CheckHydration>
        <MobileFilters
          isVisible={isMobileFiltersVisible}
          setModalVisibility={setIsMobileFiltersVisible}
          products={products}
          productFilters={productFilters}
          setProductFilters={setProductFilters}
          filteredProducts={filteredProducts}
        />
      </CheckHydration>

      <div className="bg-hg-cream rounded-t-3xl overflow-hidden">
        <Container className="relative pt-8 pb-4">
          <Title
            size="2xl"
            className="font-bold mb-6 lg:mb-12 lg:w-3/5 md:text-4xl lg:text-5xl"
          >
            Nuestros{' '}
            <Underlined color={HOLAGLOW_COLORS['secondary700']}>
              tratamientos
            </Underlined>
          </Title>
          <Image
            src={'/images/products/productsBg.png'}
            height={858}
            width={1395}
            alt="nuestros tratamientos"
            className="hidden lg:block absolute right-[5%] top-[10%] h-full w-auto scale-[160%]"
          />
        </Container>
        <Container className="px-0 md:px-4 pb-4 relative">
          <div className="lg:flex lg:flex-row lg:justify-between">
            <AnimateOnViewport origin="bottom">
              <CategorySelectorSSR
                className="mb-4 lg:mb-0"
                products={products}
                productFilters={productFilters}
                setProductFilters={setProductFilters}
              />
            </AnimateOnViewport>
            <PackTypeFilterSSR
              className="ml-4 md:ml-0"
              productFilters={productFilters}
              setProductFilters={setProductFilters}
            />
          </div>
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
        <div className="bg-hg-cream500 pb-32 relative">
          <Flex
            layout="row-left"
            className="justify-between py-8 md:py-0 md:mt-8 md:absolute w-full"
          >
            <Container>
              <AnimateOnViewport>
                <Flex layout="row-left" className="w-full justify-between">
                  <Button
                    type="tertiary"
                    size="sm"
                    className="mr-2"
                    customStyles="group-hover:bg-hg-secondary100"
                    onClick={() => {
                      deviceSize.isMobile
                        ? setIsMobileFiltersVisible(true)
                        : setShowDesktopFilters(!showDesktopFilters);
                    }}
                  >
                    <SvgFilters className="mr-2" />
                    <Flex layout="col-center">Filtrar</Flex>
                  </Button>

                  <div className="mr-auto">
                    <Text
                      size="xs"
                      className={`text-hg-secondary transition-opacity underline cursor-pointer ${
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
                          text: '',
                          price: [],
                          type: [],
                        });
                      }}
                    >
                      Borrar filtros ({filterCount(productFilters)})
                    </Text>
                  </div>
                  <Text size="xs">
                    {
                      filteredProducts.filter(product => product.visibility)
                        .length
                    }{' '}
                    productos
                  </Text>
                </Flex>
              </AnimateOnViewport>
            </Container>
          </Flex>
          {/* 

          <AccordionPrimitive.Root
            type="single"
            className="w-full bg-white"
            collapsible
            value={showDesktopFilters.toString()}
          >
            <AccordionPrimitive.Item value="true" className="w-full">
              <AccordionPrimitive.Content className="overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <Container className="pt-24 px-8 pb-12">
                  <DesktopFilters
                    showDesktopFilters={showDesktopFilters}
                    setShowDesktopFilters={setShowDesktopFilters}
                    isDashboard={false}
                  />
                </Container>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          </AccordionPrimitive.Root>
        */}

          <Container>
            <ul
              className={`transition-all grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col gap-6 pb-6`}
            >
              {filteredProducts.map(product => {
                if (product.visibility) {
                  return (
                    <li key={product.id}>
                      <ProductCard
                        product={product}
                        isDashboard={false}
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
    </>
  );
}
