'use client';

import { useEffect } from 'react';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { SimpleAccordion } from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { fetchClinics } from 'utils/fetch';

export default function MobileNavigation({
  isVisible,
  headerHeight,
}: {
  isVisible: boolean;
  headerHeight: number;
}) {
  const paddingBottom = headerHeight + 16;
  const { deviceSize, clinics, setClinics } = useGlobalPersistedStore(
    state => state
  );

  useEffect(() => {
    async function initClinics() {
      const clinics = await fetchClinics();

      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }
  }, [clinics]);

  return (
    <Modal
      isVisible={isVisible}
      width="w-full"
      className="shadow-none bg-hg-primary300"
      type="right"
      style={{ top: headerHeight }}
      hideModalBackground
    >
      <div className="bg-white border-b border-hg-black py-8">
        <Flex
          layout="col-left"
          className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4"
        >
          <p className="font-semibold">Ver Tratamientos</p>

          <SimpleAccordion trigger="Rellenos" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <li>Aumento de Labios</li>
              <li>Relleno de ojeras</li>
              <li>Proyección de pómulos</li>
              <li>Ver más</li>
            </ul>
          </SimpleAccordion>

          <SimpleAccordion trigger="Arrugas" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <li>Prevención de arrugas</li>
              <li>Arrugas frente</li>
              <li>Ver más</li>
            </ul>
          </SimpleAccordion>

          <p className="font-semibold">Hydrafacial ®</p>

          <p className="font-semibold">Packs Glow</p>

          <Button type="tertiary" className="md:hidden">
            Reservar Cita
          </Button>
        </Flex>
      </div>
      <div className="bg-white border-b border-hg-black py-8">
        <Flex
          layout="col-left"
          className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4"
        >
          <SimpleAccordion trigger="Clínicas" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              {clinics.map(clinic => (
                <li key={clinic.city}>{clinic.city}</li>
              ))}
            </ul>
          </SimpleAccordion>

          <SimpleAccordion trigger="Nosotrxs" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <li>Quiénes somos</li>
              <li>Equipo médico</li>
              <li>Blog</li>
            </ul>
          </SimpleAccordion>
          <SimpleAccordion trigger="Privacidad" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <li>Política de privacidad</li>
              <li>Términos y condiciones</li>
            </ul>
          </SimpleAccordion>
        </Flex>
      </div>
      <Flex
        layout="col-left"
        className="p-4 text-xs gap-4"
        style={{ paddingBottom: `${paddingBottom}px` }}
      >
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
