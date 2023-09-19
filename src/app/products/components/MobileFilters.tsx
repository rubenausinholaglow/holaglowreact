import CategorySelector from 'app/components/filters/CategorySelector';
import PackTypeFilter from 'app/components/filters/PackTypeFilter';
import ZoneFilter from 'app/components/filters/ZoneFilter';
import { useGlobalStore } from 'app/stores/globalStore';
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
      height="h-3/4"
      className="shadow-none rounded-t-3xl"
      from="bottom"
    >
      <Container className="pt-4 pb-8 border-b border-hg-black">
        <div className="w-[72px] h-[6px] rounded-full bg-hg-black100 mx-auto mb-4"></div>
        <Flex layout="row-center" className="justify-between mb-6">
          <Text className="font-semibold">Filtrar</Text>
          <SvgCross
            height={24}
            width={24}
            onClick={() => setIsModalOpen(false)}
          />
        </Flex>

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
        <ZoneFilter />
      </Container>
    </Modal>
  );
}
