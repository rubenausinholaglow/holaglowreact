import { useGlobalStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCheck, SvgCircle } from 'icons/Icons';
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
          <Text className="font-semibold">Filtrar y ordenar</Text>
          <SvgCross
            height={24}
            width={24}
            onClick={() => setIsModalOpen(false)}
          />
        </Flex>
        <Text size="xs" className="font-semibold mb-4">
          Ordenar por
        </Text>
        <ul className="flex flex-col gap-4 text-xs">
          <li className="flex flex-row items-center text-xs">
            <SvgCheck height={24} width={24} className="mr-2" />
            Destacados
          </li>
          <li className="flex flex-row items-center text-xs">
            <SvgCircle height={24} width={24} className="mr-2" />
            Más vendidos
          </li>
          <li className="flex flex-row items-center text-xs">
            <SvgCircle height={24} width={24} className="mr-2" />
            Precio de menor a mayor
          </li>
          <li className="flex flex-row items-center text-xs">
            <SvgCircle height={24} width={24} className="mr-2" />
            Precio de mayor a menor
          </li>
        </ul>
      </Container>
    </Modal>
  );
}
