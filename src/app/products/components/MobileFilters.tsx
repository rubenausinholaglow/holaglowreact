import CategorySelector from 'app/components/filters/CategorySelector';
import ClinicFilter from 'app/components/filters/ClinicFilter';
import PackTypeFilter from 'app/components/filters/PackTypeFilter';
import ZoneFilter from 'app/components/filters/ZoneFilter';
import { useGlobalStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCross } from 'icons/IconsDs';

export default function MobileFilters({ isVisible }: { isVisible: boolean }) {
  const { setIsModalOpen } = useGlobalStore(state => state);

  return (
    <Modal
      isVisible={isVisible}
      width="w-full"
      height="h-4/5"
      className="shadow-none rounded-t-3xl"
      from="bottom"
    >
      <Flex layout="col-left" className="h-full relative pt-20">
        <Flex
          layout="col-center"
          className="fixed top-4 left-0 right-0 justify-between mb-6 px-4"
        >
          <div className="w-[72px] h-[6px] rounded-full bg-hg-black100 mx-auto mb-4"></div>
          <Flex className="justify-between w-full">
            <Text className="font-semibold">Filtrar</Text>
            <SvgCross
              height={24}
              width={24}
              onClick={() => setIsModalOpen(false)}
            />
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
            <Container className="py-4 pb-28">
              <Text size="sm" className="mb-4 font-semibold">
                Zona de la cara
              </Text>
              <ZoneFilter className="mb-8" />
              <Text size="sm" className="mb-4 font-semibold">
                Clínicas
              </Text>
              <ClinicFilter className="mb-8" />
            </Container>
          </div>
        </div>
        <div className="fixed bottom-2 left-0 right-0 p-4">
          <Button size="xl" type="primary" className="w-full">
            Mostrar resultados ()
          </Button>
        </div>
      </Flex>

      {/* <Flex
        layout="row-center"
        className="fixed top-0 left-0 right-0 justify-between mb-6 px-4"
      >
        <Text className="font-semibold">Filtrar</Text>
        <SvgCross
          height={24}
          width={24}
          onClick={() => setIsModalOpen(false)}
        />
      </Flex>
      <Container className="pt-4 pb-8 border-b border-hg-black relative">
        <div className="w-[72px] h-[6px] rounded-full bg-hg-black100 mx-auto mb-4"></div>

        <Text size="sm" className="mb-4 font-semibold">
          Tratamientos
        </Text>
        <CategorySelector isStacked className="mb-4" />
        <PackTypeFilter customStyles="bg-hg-black50" />
      </Container>
      <Container className="py-4">
        <Text size="sm" className="mb-4 font-semibold">
          Zona de la cara
        </Text>
        <ZoneFilter className="mb-8" />
        <Text size="sm" className="mb-4 font-semibold">
          Clínicas
        </Text>
        <ClinicFilter className="mb-8" />
        <Button size="xl" type="primary">
          Mostrar resultados ()
        </Button>
      </Container> */}
    </Modal>
  );
}
