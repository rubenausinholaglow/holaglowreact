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

        <p>Filters here</p>
      </Container>
    </Modal>
  );
}
