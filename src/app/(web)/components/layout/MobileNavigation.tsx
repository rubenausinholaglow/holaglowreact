'use client';

import { useEffect, useState } from 'react';
import ROUTES from '@utils/routes';
import { SvgArrow, SvgCalling, SvgCross, SvgHolaglow } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { fetchClinics } from 'app/utils/fetch';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { isEmpty } from 'lodash';

import ProductSearchBar from '../product/ProductSearchBar';
import { isMobile } from './Breakpoint';

export default function MobileNavigation({
  isVisible,
  setIsMobileNavVisible,
}: {
  isVisible: boolean;
  setIsMobileNavVisible: (value: boolean) => void;
}) {
  const { clinics, setClinics, stateProducts } = useGlobalPersistedStore(
    state => state
  );
  //const { deviceSize } = useSessionStore(state => state);

  const [isSearchBarOpened, setIsSearchBarOpened] = useState(false);

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
      className="shadow-none bg-white"
      type="right"
      hideModalBackground
    >
      <Flex layout="col-left" className="w-full h-full relative">
        <Flex layout="row-between" className="w-full p-4">
          <SvgHolaglow className="text-hg-secondary" />
          <SvgCross
            height={20}
            width={20}
            className=""
            onClick={() => setIsMobileNavVisible(false)}
          />
        </Flex>
        <Container className="my-4">
          <ProductSearchBar
            className="text-md font-normal"
            products={stateProducts}
            isMobileNavigation
            setIsSearchBarOpened={setIsSearchBarOpened}
          />
        </Container>
        <Flex
          layout="col-left"
          className={`transition-all w-full h-full ${
            isSearchBarOpened ? 'opacity-0' : 'opacity-1'
          }`}
        >
          <Flex
            layout="col-left"
            className="gap-6 w-full text-lg font-semibold px-4 pb-8 border-b border-hg-black700"
          >
            <p className="font-gtUltra text-hg-secondary font-thin text-drxl">
              Nuestros tratamientos
            </p>

            <SimpleAccordion trigger="Más populares" isOpen={!isMobile()}>
              <ul className="text-sm pt-4 font-normal flex flex-col">
                <li>
                  <a
                    className="py-2 block"
                    href={`${ROUTES.treatments}/arrugas-expresion-frente-entrecejo-patas-gallo`}
                    id={'tmevent_nav_menu_click'}
                  >
                    Arrugas de expresión
                  </a>
                </li>

                <li>
                  <a
                    className="py-2 block"
                    href={`${ROUTES.treatments}/aumento-labios`}
                    id={'tmevent_nav_menu_click'}
                  >
                    Aumento de Labios
                  </a>
                </li>

                <li>
                  <a
                    className="py-2 block"
                    href={`${ROUTES.treatments}/armonizacion-facial`}
                    id={'tmevent_nav_menu_click'}
                  >
                    Armonización facial
                  </a>
                </li>

                <li>
                  <a
                    className="py-2 block"
                    href={`${ROUTES.treatments}/relleno-ojeras`}
                    id={'tmevent_nav_menu_click'}
                  >
                    Relleno de ojeras
                  </a>
                </li>

                <li>
                  <a
                    className="py-2 block"
                    href={`${ROUTES.treatments}/proyeccion-pomulos`}
                    id={'tmevent_nav_menu_click'}
                  >
                    Proyección de pómulos
                  </a>
                </li>
              </ul>
            </SimpleAccordion>

            <a href={ROUTES.treatments} id={'tmevent_nav_menu_click'}>
              <p className="font-semibold">Ver todos</p>
            </a>

            <Button
              size="lg"
              id="tmevent_nav_menu_click_pv_button"
              type="secondary"
              href={ROUTES.landings.pv}
            >
              Cita de asesoramiento gratis
              <SvgArrow height={16} width={16} className="ml-2" />
            </Button>
          </Flex>
          <Flex
            layout="col-left"
            className="gap-6 w-full text-lg font-semibold px-4 py-8"
          >
            <a href={ROUTES.aboutUs} id={'tmevent_nav_menu_click'}>
              <p className="font-semibold">Sobre nosotros</p>
            </a>

            {!isEmpty(clinics) && (
              <SimpleAccordion trigger="Clínicas" isOpen={!isMobile()}>
                <ul className="text-sm pt-4 font-normal flex flex-col">
                  {clinics.map(clinic => (
                    <li key={clinic.city}>
                      <a
                        className="py-2 block"
                        href={ROUTES.clinics}
                        id={'tmevent_nav_menu_click'}
                      >
                        {clinic.city}
                      </a>
                    </li>
                  ))}
                </ul>
              </SimpleAccordion>
            )}
            <a href={ROUTES.blog} id={'tmevent_nav_menu_click'}>
              <p className="font-semibold">Blog</p>
            </a>

            <SimpleAccordion trigger="Privacidad" isOpen={!isMobile()}>
              <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
                <li>
                  <a
                    className="py-2 block"
                    href={ROUTES.statics.privacyPolicy}
                    id={'tmevent_nav_menu_click'}
                  >
                    Política de privacidad
                  </a>
                </li>
                <li>
                  <a
                    className="py-2 block"
                    href={ROUTES.statics.termsAndConditions}
                    id={'tmevent_nav_menu_click'}
                  >
                    Términos y condiciones
                  </a>
                </li>
              </ul>
            </SimpleAccordion>
          </Flex>
          <Flex
            layout="col-left"
            className="p-4 text-xs gap-4 bg-derma-secondary300 w-full flex-grow"
          >
            <p className="font-gtUltra text-hg-secondary font-thin text-drxl">
              Contacto
            </p>
            <p>
              Para dudas y pedidos, escríbenos a{' '}
              <a href="mailto:hola@holaglow.com">hola@holaglow.com</a>
            </p>
            <p>Llámanos de 10h a 19h de Lunes a Viernes</p>

            <Button
              href="tel: +34682417208"
              type="secondary"
              size="md"
              customStyles="font-semibold"
              id="tmevent_nav_menu_click_call_button"
            >
              <SvgCalling className="h-4 w-4 mr-2" /> (+34) 682 417 208
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
}
