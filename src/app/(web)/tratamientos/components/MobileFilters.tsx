'use client';

import { useEffect } from 'react';
import { ProductFilters } from '@interface/filters';
import { Product } from '@interface/product';
import CategorySelectorSSR from 'app/(ssr)/homeSSR/components/CategorySelectorSSR';
import ClinicFilter from 'app/(web)/components/filters/ClinicFilter';
import PackTypeFilterSSR from 'app/(web)/components/filters/PackTypeFilterSSR';
import ZoneFilter from 'app/(web)/components/filters/ZoneFilter';
import { SvgCross } from 'app/icons/IconsDs';
import { useGlobalStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SwipeModal } from 'designSystem/Modals/Modal';
import { Text } from 'designSystem/Texts/Texts';

import { filterCount } from '../utils/filters';

export default function MobileFilters({
  isVisible,
  setModalVisibility,
  products,
  filteredProducts,
  productFilters,
  setProductFilters,
}: {
  isVisible: boolean;
  setModalVisibility: (value: boolean) => void;
  products: Product[];
  filteredProducts: Product[];
  productFilters: ProductFilters;
  setProductFilters: (filters: ProductFilters) => void;
}) {
  const { setIsModalOpen } = useGlobalStore(state => state);

  useEffect(() => {
    setIsModalOpen(isVisible);
  }, [isVisible]);

  return (
    <SwipeModal
      isOpen={isVisible}
      setModalVisibility={setModalVisibility}
      className="h-5/6"
    >
      <Flex layout="col-left" className="h-full relative pt-20">
        <Flex
          layout="col-center"
          className="fixed top-4 left-0 right-0 justify-between mb-6 px-4"
        >
          <div className="w-[72px] h-[6px] rounded-full bg-hg-black100 mx-auto mb-2"></div>
          <Flex className="justify-between w-full">
            <Text className="font-semibold">Filtrar</Text>
            <Flex>
              <Text
                size="xs"
                className={`text-hg-secondary transition-opacity underline cursor-pointer mr-4 ${
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
                  setModalVisibility(false);
                }}
              >
                Borrar filtros ({filterCount(productFilters)})
              </Text>
              <SvgCross
                height={20}
                width={20}
                onClick={() => setModalVisibility(false)}
              />
            </Flex>
          </Flex>
        </Flex>

        <div className="h-full relative">
          <div className="h-full overflow-y-scroll">
            <div className="border-b border-hg-black">
              <Container className="pb-4">
                <Text size="sm" className="mb-4 font-semibold">
                  Tratamientos
                </Text>
                <CategorySelectorSSR
                  isStacked
                  className="mb-4"
                  products={products}
                  productFilters={productFilters}
                  setProductFilters={setProductFilters}
                />
                <PackTypeFilterSSR
                  customStyles="bg-hg-black50"
                  productFilters={productFilters}
                  setProductFilters={setProductFilters}
                />
              </Container>
            </div>
            <Container className="py-4 pb-12">
              <Text size="sm" className="mb-4 font-semibold">
                Zona de la cara
              </Text>
              <ZoneFilter
                className="mb-8"
                productFilters={productFilters}
                setProductFilters={setProductFilters}
              />
              <Text size="sm" className="mb-4 font-semibold">
                Clínicas
              </Text>
              <ClinicFilter
                className="mb-6"
                productFilters={productFilters}
                setProductFilters={setProductFilters}
              />

              <Button
                id="tmevent_filters"
                size="xl"
                type="primary"
                className="w-full"
                onClick={() => setIsModalOpen(false)}
              >
                Mostrar resultados (
                {filteredProducts.filter(product => product.visibility).length})
              </Button>
            </Container>
          </div>
        </div>
      </Flex>
    </SwipeModal>
  );
}
