import Accordion from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Title } from 'designSystem/Texts/Texts';
import { SvgArrow } from 'icons/IconsDs';

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
      width="w-full"
      className="shadow-none"
      from="right"
      style={{ top: headerHeight }}
      hideModalBackground
    >
      <Container className="border-b border-hg-black py-8">
        <Flex layout="col-left" className="text-xl font-semibold">
          <ul className="flex flex-col gap-8 mb-8">
            <li>Labios</li>
            <li>Facial</li>
            <li>Piel</li>
            <li>Hydrafacial</li>
            <li>Capilar</li>
            <li>Otros</li>
          </ul>
          <Button type="tertiary">Reservar Cita</Button>
        </Flex>
      </Container>
      <Container className="pt-8 pb-12">
        <Flex layout="col-left" className="text-xl font-semibold mb-12 gap-8">
          <Accordion trigger="Clínicas">
            <ul className="text-md pl-2 pt-2 font-normal flex flex-col gap-2">
              <li>Madrid</li>
              <li>Barcelona</li>
              <li>Valencia</li>
            </ul>
          </Accordion>
          <Accordion trigger="Sobre nosotros">
            <p>Bla bla bla sobre nosotros (?)</p>
          </Accordion>
          <Accordion trigger="Privacidad">
            <p>Bla bla bla privacidad (?)</p>
          </Accordion>
        </Flex>

        <Button type="secondary" size="xl" className="mx-auto">
          <Flex layout="row-center">
            Descubre tu tratamiento
            <SvgArrow height={24} width={24} className="ml-2" />
          </Flex>
        </Button>
      </Container>
      <Flex layout="col-left" className="bg-hg-primary300 p-4 text-xs gap-4">
        <Title size="xl">Contacto</Title>
        <p>
          Para dudas y pedidos, escríbenos a{' '}
          <a href="mailto:info@holaglow.com">info@holaglow.com</a>
        </p>
        <p className="leading-6">
          Por teléfono de Lunes a Viernes
          <br />
          De 10h a 18:30h
          <br />
          <a href="tel:(+34) 699 999 999">(+34) 699 999 999</a>
        </p>
      </Flex>
    </Modal>
  );
}
