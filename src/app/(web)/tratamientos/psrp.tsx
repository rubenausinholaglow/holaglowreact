'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { setSeoMetaData } from '@utils/common';
import { filterItems } from '@utils/filterItems';
import AnimateOnViewport from 'app/(web)/components/common/AnimateOnViewport';
import CategorySelector from 'app/(web)/components/filters/CategorySelector';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import ProductCard from 'app/(web)/components/product/ProductCard';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgFilters } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

import ProductSearchBar from '../components/product/ProductSearchBar';
import DesktopFilters from './components/DesktopFilters';
import LookingFor from './components/LookingFor';
import MobileFilters from './components/MobileFilters';
import PVBanner from './components/PVBanner';
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
  const {
    filteredProducts,
    setFilteredProducts,
    productFilters,
    setProductFilters,
    isModalOpen,
  } = useGlobalStore(state => state);

  const [isHydrated, setIsHydrated] = useState(true);
  const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  const [showDashboardFilters, setShowDashboardFilters] = useState(true);

  const metadataPacks = {
    title: 'Packs de tratamientos de medicina estética - Holaglow',
    description:
      'Elige uno de los packs para tratar de manera global tus objetivos estéticos y conseguir el resultado que deseas',
  };

  useEffect(() => {
    if (isDashboard) {
      productFilters.isPack = true;
      setProductFilters(productFilters);
    }
  }, []);

  useEffect(() => {
    if (slug !== '') {
      let filterToApply = '';
      switch (slug) {
        case 'piel':
          filterToApply = 'Calidad de la Piel';
          break;
        case 'pelo':
          filterToApply = 'Caida del pelo';
          break;
        default:
          filterToApply = slug[0].toUpperCase() + slug.substr(1).toLowerCase();
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

      if (slug === 'packs') {
        setSeoMetaData(metadataPacks.title, metadataPacks.description);
      }

      setProductFilters(productFilters);
      processFilters();
    }
  }, [slug, stateProducts]);

  useEffect(() => {
    if (filteredProducts && filteredProducts.length > 0) {
      processFilters();
      setIsHydrated(true);
    }
  }, [productFilters, dashboardProducts]);

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
                  type="white"
                  size="sm"
                  onClick={() => {
                    setShowDashboardFilters(!showDashboardFilters);
                  }}
                >
                  <SvgFilters className="mr-2" />
                  Filtrar
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
                  isDashboard={isDashboard}
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
      <MainLayout>
        <link rel="canonical" href="https://holaglow.com/tratamientos/" />
        <MobileFilters
          isVisible={isMobileFiltersVisible}
          setModalVisibility={setIsMobileFiltersVisible}
        />
        <div className="bg-hg-cream rounded-t-3xl">
          <Container className="relative pt-6 pb-4">
            <Title as="h1" isAnimated size="3xl" className="mt-4">
              Nuestros tratamientos
            </Title>
          </Container>
          <Container className="md:hidden">
            <ProductSearchBar products={stateProducts} className="mb-4" />
          </Container>
          <Container className="px-0 md:px-4 pb-4 md:pb-8 relative">
            <div className="xl:flex xl:flex-row xl:justify-between items-center">
              <ProductSearchBar
                products={stateProducts}
                className="hidden md:block mr-4"
              />
              <AnimateOnViewport
                origin={isMobile ? 'right' : 'bottom'}
                className="shrink-0"
              >
                <CategorySelector />
              </AnimateOnViewport>
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
              className="justify-between pt-6 pb-4 md:py-0 md:mt-8 md:absolute w-full"
            >
              <Container>
                <AnimateOnViewport>
                  <Flex layout="row-left" className="w-full justify-between">
                    <Button
                      type="white"
                      size="sm"
                      className="mr-2"
                      customStyles="bg-transparent"
                      onClick={() => {
                        isMobile
                          ? setIsMobileFiltersVisible(true)
                          : setShowDesktopFilters(!showDesktopFilters);
                      }}
                    >
                      <SvgFilters className="mr-2" />
                      Filtrar
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
                      isDashboard={isDashboard}
                    />
                  </Container>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            </AccordionPrimitive.Root>

            <Container>
              <ul
                className={`transition-all grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col gap-2 md:gap-6 ${
                  showDesktopFilters ? 'md:pt-12' : 'md:pt-24'
                }   pb-6`}
              >
                <li className="-mb-2 md:mb-0 md:pt-10">
                  <PVBanner />
                </li>
                {filteredProducts.map(product => {
                  if (product.visibility) {
                    return (
                      <li key={product.id}>
                        <ProductCard
                          product={product}
                          isDashboard={isDashboard}
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
