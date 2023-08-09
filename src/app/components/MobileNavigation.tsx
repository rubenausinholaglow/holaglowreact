import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Modal } from 'components/Modals/Modal';

export default function MobileNavigation({
  isVisible,
  headerHeight,
}: {
  isVisible: boolean;
  headerHeight: number;
}) {
  return (
    <Modal
      isVisible={isVisible}
      width="full"
      className="shadow-none"
      style={{ top: headerHeight }}
    >
      <Container className="border-b border-hg-black pt-8">
        <Flex layout="col-left">
          <ul className="text-lg font-semibold flex flex-col gap-6">
            <li>Tratamientos</li>
            <li>Clinicas</li>
            <li>About Us</li>
            <li>Privacidad</li>
          </ul>
          <Button type="tertiary">Reservar Cita</Button>
        </Flex>
      </Container>
    </Modal>
  );
}
