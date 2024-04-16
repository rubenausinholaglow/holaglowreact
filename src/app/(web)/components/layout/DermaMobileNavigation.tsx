'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import ROUTES from '@utils/routes';
import { SvgHolaglowDerma } from 'app/icons/iconsDerma';
import { SvgArrow, SvgCalling, SvgCross } from 'app/icons/IconsDs';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { fetchClinics } from 'app/utils/fetch';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { isEmpty } from 'lodash';

export default function DermaMobileNavigation({
  isVisible,
  setIsMobileNavVisible,
}: {
  isVisible: boolean;
  setIsMobileNavVisible: (value: boolean) => void;
}) {
  const { clinics, setClinics, stateProducts } = useGlobalPersistedStore(
    state => state
  );

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
          <SvgHolaglowDerma />
          <SvgCross
            height={20}
            width={20}
            className=""
            onClick={() => setIsMobileNavVisible(false)}
            id="tmevent_nav_menu_close"
          />
        </Flex>

        <Flex
          layout="col-left"
          className={`transition-all w-full h-full ${
            isSearchBarOpened ? 'opacity-0' : 'opacity-1'
          }`}
        >
          <Flex
            layout="col-left"
            className="gap-6 w-full text-lg font-semibold px-4 py-8"
          >
            <a href={ROUTES.derma.precios} id={'tmevent_nav_menu_click'}>
              <p className="font-semibold">Planes y precios</p>
            </a>
            <a href={ROUTES.derma.clinics} id={'tmevent_nav_menu_click'}>
              <p className="font-semibold">Clínicas</p>
            </a>
            <a href={ROUTES.derma.aboutUs} id={'tmevent_nav_menu_click'}>
              <p className="font-semibold">Sobre nosotros</p>
            </a>
            <SimpleAccordion trigger="Privacidad" isOpen={!isMobile}>
              <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
                <li>
                  <a
                    className="py-2 block"
                    href={ROUTES.derma.privacyPolicy}
                    id={'tmevent_nav_menu_click'}
                  >
                    Política de privacidad
                  </a>
                </li>
                <li>
                  <a
                    className="py-2 block"
                    href={ROUTES.derma.termsAndConditions}
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
            <p className="font-gtUltra text-derma-secondary font-thin text-xldr">
              Contacto
            </p>
            <p>
              Para dudas y pedidos, escríbenos a{' '}
              <a href="mailto:hola@holaglow.com">hola@holaglow.com</a>
            </p>
            <p>Llámanos de 10h a 19h de Lunes a Viernes</p>

            <Button
              href="tel: +34682417208"
              type="derma"
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
