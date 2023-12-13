'use client';

import { useEffect } from 'react';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { ROUTES } from 'app/utils/routes';
import { SimpleAccordion } from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Title } from 'designSystem/Texts/Texts';
import { SvgArrow, SvgCross } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import { fetchClinics } from 'utils/fetch';

export default function MobileNavigation({
  isVisible,
  headerHeight,
  setIsMobileNavVisible,
}: {
  isVisible: boolean;
  headerHeight: number;
  setIsMobileNavVisible: (value: boolean) => void;
}) {
  const paddingBottom = headerHeight + 16;
  const { clinics, setClinics } = useGlobalPersistedStore(state => state);
  const { deviceSize, setSelectedTreatments } = useSessionStore(state => state);

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
      hideModalBackground
    >
      <div className="bg-white border-b border-hg-black pt-12 pb-8 relative">
        <SvgCross
          height={20}
          width={20}
          className="absolute top-4 right-4"
          onClick={() => setIsMobileNavVisible(false)}
        />
        <Flex
          layout="col-left"
          className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4"
        >
          <a href={ROUTES.treatments} id={'tmevent_nav_menu_click'}>
            <p className="font-semcibold">Ver Tratamientos</p>
          </a>

          <SimpleAccordion trigger="Rellenos" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <a
                href="/tratamientos/aumento-labios"
                id={'tmevent_nav_menu_click'}
              >
                <li>Aumento de Labios</li>
              </a>
              <a
                href="/tratamientos/relleno-ojeras"
                id={'tmevent_nav_menu_click'}
              >
                <li>Relleno de ojeras</li>
              </a>
              <a
                href="/tratamientos/proyeccion-pomulos"
                id={'tmevent_nav_menu_click'}
              >
                <li>Proyección de pómulos</li>
              </a>
              <a href="/tratamientos/relleno" id={'tmevent_nav_menu_click'}>
                <li>Ver más</li>
              </a>
            </ul>
          </SimpleAccordion>

          <SimpleAccordion trigger="Arrugas" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <a
                href="/tratamientos/prevencion-arrugas"
                id={'tmevent_nav_menu_click'}
              >
                <li>Prevención de arrugas</li>
              </a>
              <a
                href="/tratamientos/arrugas-expresion-frente-entrecejo-patas-gallo"
                id={'tmevent_nav_menu_click'}
              >
                <li>Arrugas frente</li>
              </a>
              <a href="/tratamientos/arrugas" id={'tmevent_nav_menu_click'}>
                <li>Ver más</li>
              </a>
            </ul>
          </SimpleAccordion>

          <a href="/tratamientos/hydrafacial" id={'tmevent_nav_menu_click'}>
            <p className="font-semibold">Hydrafacial ®</p>
          </a>

          <a href="/tratamientos/packs" id={'tmevent_nav_menu_click'}>
            <p className="font-semibold">Packs Glow</p>
          </a>

          <Button
            id={'tmevent_nav_menu_click'}
            type="tertiary"
            href={ROUTES.checkout.clinics}
            onClick={() => {
              setSelectedTreatments([]);
            }}
          >
            Reservar cita
            <SvgArrow height={16} width={16} className="ml-2" />
          </Button>
        </Flex>
      </div>
      <div className="bg-white border-b border-hg-black py-8">
        <Flex
          layout="col-left"
          className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4"
        >
          <SimpleAccordion trigger="Clínicas" isOpen={!deviceSize.isMobile}>
            <a href="/clinicas" id={'tmevent_nav_menu_click'}>
              <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
                {clinics.map(clinic => (
                  <li key={clinic.city}>{clinic.city}</li>
                ))}
              </ul>
            </a>
          </SimpleAccordion>

          <SimpleAccordion trigger="Nosotrxs" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <a href="/quienes-somos" id={'tmevent_nav_menu_click'}>
                <li>Quiénes somos</li>
              </a>
              <a href="/quienes-somos" id={'tmevent_nav_menu_click'}>
                <li>Equipo médico</li>
              </a>
            </ul>
          </SimpleAccordion>
          <a href="/blog" id={'tmevent_nav_menu_click'}>
            <p className="font-semibold">Blog</p>
          </a>
          <SimpleAccordion trigger="Privacidad" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <a href="/politica-de-privacidad" id={'tmevent_nav_menu_click'}>
                <li>Política de privacidad</li>
              </a>
              <a href="/aviso-legal" id={'tmevent_nav_menu_click'}>
                <li>Términos y condiciones</li>
              </a>
              <a href="/condiciones-black-friday" id={'tmevent_nav_menu_click'}>
                <li>Condiciones Black Friday</li>
              </a>
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
          <a href="mailto:hola@holaglow.com">hola@holaglow.com</a>
        </p>
        <p className="leading-6">
          Por teléfono de Lunes a Viernes
          <br />
          De 10 a 14h y de 15 a 19h
          <br />
          <a href="tel:(+34) 682 417 208">(+34) 682 417 208</a>
        </p>
      </Flex>
    </Modal>
  );
}
