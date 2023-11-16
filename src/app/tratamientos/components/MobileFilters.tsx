import { useEffect } from 'react';
import CategorySelector from 'app/components/filters/CategorySelector';
import ClinicFilter from 'app/components/filters/ClinicFilter';
import PackTypeFilter from 'app/components/filters/PackTypeFilter';
import ZoneFilter from 'app/components/filters/ZoneFilter';
import { useGlobalStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SwipeModal } from 'designSystem/Modals/Modal';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCross } from 'icons/IconsDs';

import { filterCount } from '../utils/filters';

export default function MobileFilters({
  isVisible,
  setModalVisibility,
}: {
  isVisible: boolean;
  setModalVisibility: (value: boolean) => void;
}) {
  const {
    setIsModalOpen,
    productFilters,
    setProductFilters,
    filteredProducts,
  } = useGlobalStore(state => state);

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
                    text: [],
                    type: [],
                    price: [],
                  });
                  setModalVisibility(false);
                }}
              >
                Borrar filtros ({filterCount(productFilters)})
              </Text>
              <SvgCross
                height={20}
                width={20}
                onClick={() => setIsModalOpen(false)}
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
                <CategorySelector isStacked className="mb-4" />
                <PackTypeFilter customStyles="bg-hg-black50" />
              </Container>
            </div>
            <Container className="py-4 pb-12">
              <Text size="sm" className="mb-4 font-semibold">
                Zona de la cara
              </Text>
              <ZoneFilter className="mb-8" />
              <Text size="sm" className="mb-4 font-semibold">
                Clínicas
              </Text>
              <ClinicFilter className="mb-6" />

              <Button
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
