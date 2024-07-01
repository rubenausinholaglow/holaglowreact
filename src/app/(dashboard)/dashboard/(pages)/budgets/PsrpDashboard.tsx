'use client';

import { useEffect, useRef, useState } from 'react';
import { setSeoMetaData } from '@utils/common';
import { filterItems } from '@utils/filterItems';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import ProductCard from 'app/(web)/components/product/ProductCard';
import DesktopFilters from 'app/(web)/tratamientos/components/DesktopFilters';
import {
  applyFilters,
  filterCount,
} from 'app/(web)/tratamientos/utils/filters';
import { SvgFilters } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

import ProfessionalsModal from './ProfessionalsModal';

export default function PsrpDashboard({ slug = '' }: { slug?: string }) {
  const { stateProducts, dashboardProducts } = useGlobalPersistedStore(
    state => state
  );
  const {
    filteredProducts,
    setFilteredProducts,
    productFilters,
    setProductFilters,
  } = useGlobalStore(state => state);

  const [isHydrated, setIsHydrated] = useState(false);
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
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  return (
    <MainLayout
      isDashboard
      hideContactButtons
      hideProfessionalSelector
      showCart
    >
      <ProfessionalsModal />

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
                isDashboard
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
                        isDashboard
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

  function processFilters() {
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
  }
}
