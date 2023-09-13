import { useGlobalStore } from 'app/stores/globalStore';
import { Modal } from 'designSystem/Modals/Modal';

export default function MobileFilters({ isVisible }: { isVisible: boolean }) {
  const { isModalOpen } = useGlobalStore(state => state);

  return (
    <Modal
      isVisible={isVisible && isModalOpen}
      width="w-full"
      height="h-3/4"
      className="shadow-none"
      from="bottom"
    >
      test
    </Modal>
  );
}
