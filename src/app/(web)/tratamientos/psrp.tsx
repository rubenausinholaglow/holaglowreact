'use client';

import { useEffect, useState } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { setSeoMetaData } from '@utils/common';
import { filterItems } from '@utils/filterItems';
import { AnimateOnViewport } from 'app/(web)/components/common/AnimateOnViewport';
import CategorySelector from 'app/(web)/components/filters/CategorySelector';
import PackTypeFilter from 'app/(web)/components/filters/PackTypeFilter';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import ProductCard from 'app/(web)/components/product/ProductCard';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgFilters } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useGlobalStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import DesktopFilters from './components/DesktopFilters';
import LookingFor from './components/LookingFor';
import MobileFilters from './components/MobileFilters';
import { applyFilters, filterCount } from './utils/filters';

export default function PsrpPage({
  slug = '',
  isDashboard = false,
}: {
  slug?: string;
  isDashboard?: boolean;
}) {
  const { stateProducts, dashboardProducts } = useGlobalPersistedStore(
    state => state
  );
  const { deviceSize } = useSessionStore(state => state);
  const {
    filteredProducts,
    setFilteredProducts,
    productFilters,
    setProductFilters,
    isModalOpen,
  } = useGlobalStore(state => state);

  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  const [showDashboardFilters, setShowDashboardFilters] = useState(true);

  const metadataPacks = {
    title: 'Packs de tratamientos de medicina estética - Holaglow',
    description:
      'Elige uno de los packs para tratar de manera global tus objetivos estéticos y conseguir el resultado que deseas',
  };

  useEffect(() => {
    if (slug !== '') {
      if (slug !== 'packs') {
        let filterToApply = '';
        switch (slug) {
          case 'piel':
            filterToApply = 'Calidad de la Piel';
            break;
          case 'pelo':
            filterToApply = 'Caida del pelo';
            break;
          default:
            filterToApply =
              slug[0].toUpperCase() + slug.substr(1).toLowerCase();
            break;
        }
        const categoryExists = filterItems.some(x => {
          const exists = x.buttons.some(y => {
            if (y.value == filterToApply) return true;
          });
          return exists;
        });
        if (
          filterToApply &&
          productFilters.category.indexOf(filterToApply) == -1 &&
          categoryExists
        ) {
          if (filterToApply == 'Calidad de la Piel')
            filterToApply = 'Calidad Piel';
          productFilters.category.push(filterToApply);
        }
      } else {
        setSeoMetaData(metadataPacks.title, metadataPacks.description);
        productFilters.isPack = true;
      }
      setProductFilters(productFilters);
    }
  }, [slug, stateProducts]);

  useEffect(() => {
    processFilters();
    setIsHydrated(true);
  }, [productFilters]);

  useEffect(() => {
    if (!isModalOpen) {
      setIsMobileFiltersVisible(false);
    }
  }, [isModalOpen]);

  if (!isHydrated) {
    return <></>;
  }

  if (isDashboard)
    return (
      <MainLayout
        isDashboard
        hideContactButtons
        hideProfessionalSelector
        showCart
      >
        {!isEmpty(filteredProducts) && (
          <>
            <Flex className="justify-start px-4 py-1 w-full">
              <Flex className="mr-auto gap-2">
                <Button
                  type="tertiary"
                  size="sm"
                  onClick={() => {
                    setShowDashboardFilters(!showDashboardFilters);
                  }}
                >
                  <SvgFilters className="mr-2" />
                  <Flex layout="col-center">Filtrar</Flex>
                </Button>
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
              </Flex>
              <Text size="xs">
                {filteredProducts.filter(product => product.visibility).length}{' '}
                productos
              </Text>
            </Flex>
            <div className="w-full mt-9">
              <div
                className={`transition-all bg-white rounded-r-xl left-0 top-0 z-10 w-2/5 ${
                  showDashboardFilters
                    ? 'translate-0 sticky'
                    : '-translate-x-full absolute'
                }`}
              >
                <DesktopFilters
                  showDesktopFilters={showDashboardFilters}
                  setShowDesktopFilters={setShowDashboardFilters}
                  isDashboard={true}
                />
              </div>

              <ul
                className={`transition-all -mt-9 px-4 grid gap-4 ${
                  showDashboardFilters
                    ? 'grid-cols-2 w-3/5 ml-[40%]'
                    : 'grid-cols-3 w-full'
                } pb-6`}
              >
                {filteredProducts?.map(product => {
                  if (product.visibility) {
                    return (
                      <li key={product.id}>
                        <ProductCard
                          product={product}
                          className="h-full flex flex-col"
                          isDashboard={isDashboard}
                        />
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </>
        )}
      </MainLayout>
    );
  else
    return (
      <MainLayout hideHeader={slug != ''}>
        <link rel="canonical" href="https://holaglow.com/tratamientos/" />
        <MobileFilters
          isVisible={isMobileFiltersVisible}
          setModalVisibility={setIsMobileFiltersVisible}
        />

        <div className="bg-hg-cream rounded-t-3xl overflow-hidden">
          <Container className="relative pt-8 pb-4">
            <Title
              isAnimated
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
              <AnimateOnViewport
                origin={deviceSize.isMobile ? 'right' : 'bottom'}
              >
                <CategorySelector className="mb-4 lg:mb-0" />
              </AnimateOnViewport>
              <PackTypeFilter className="ml-4 md:ml-0" />
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

            <Container>
              <ul
                className={`transition-all grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col gap-6 ${
                  showDesktopFilters ? 'md:pt-12' : 'md:pt-24'
                }   pb-6`}
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
      </MainLayout>
    );

  function processFilters() {
    if (isDashboard) {
      if (isEmpty(filteredProducts)) {
        setFilteredProducts(dashboardProducts);
        setFilteredProducts(
          applyFilters({ products: dashboardProducts, filters: productFilters })
        );
      } else {
        setFilteredProducts(
          applyFilters({ products: filteredProducts, filters: productFilters })
        );
      }
    } else {
      if (isEmpty(filteredProducts)) {
        setFilteredProducts(stateProducts);
        setFilteredProducts(
          applyFilters({ products: stateProducts, filters: productFilters })
        );
      } else {
        setFilteredProducts(
          applyFilters({ products: filteredProducts, filters: productFilters })
        );
      }
    }
  }
}
