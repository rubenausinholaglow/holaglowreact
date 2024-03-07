'use client';

import { useEffect } from 'react';
import ROUTES from '@utils/routes';
import { SvgPhone } from 'app/icons/Icons';
import { SvgArrow, SvgCalling, SvgCross, SvgHolaglow } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { fetchClinics } from 'app/utils/fetch';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

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
      className="shadow-none bg-derma-secondary300"
      type="right"
      hideModalBackground
    >
      <div className="bg-white border-b border-hg-black pt-12 pb-8 relative">
        <SvgHolaglow className="absolute top-4 left-4 text-hg-secondary" />
        <SvgCross
          height={20}
          width={20}
          className="absolute top-4 right-4"
          onClick={() => setIsMobileNavVisible(false)}
        />
        <Flex
          layout="col-left"
          className="gap-6 w-full md:w-1/4 text-lg font-semibold px-4 pt-4"
        >
          <p className="font-gtUltra text-hg-secondary font-thin text-drxl">
            Nuestros tratamientos
          </p>

          <SimpleAccordion
            trigger="Más populares"
            isOpen={!deviceSize.isMobile}
          >
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
            id={'tmevent_nav_menu_click'}
            type="secondary"
            href={ROUTES.checkout.clinics}
            onClick={() => {
              setSelectedTreatments([]);
            }}
          >
            Cita de asesoramiento gratis
            <SvgArrow height={16} width={16} className="ml-2" />
          </Button>
        </Flex>
      </div>
      <div className="bg-white py-8">
        <Flex
          layout="col-left"
          className="gap-6 w-full md:w-1/4 text-lg font-semibold px-4"
        >
          <a href={ROUTES.aboutUs} id={'tmevent_nav_menu_click'}>
            <p className="font-semibold">Sobre nosotros</p>
          </a>

          {!isEmpty(clinics) && (
            <SimpleAccordion trigger="Clínicas" isOpen={!deviceSize.isMobile}>
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

          <SimpleAccordion trigger="Privacidad" isOpen={!deviceSize.isMobile}>
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
      </div>
      <Flex
        layout="col-left"
        className="p-4 text-xs gap-4"
        style={{ paddingBottom: `${paddingBottom}px` }}
      >
        <p className="font-gtUltra text-hg-secondary font-thin text-drxl">
          Contacto
        </p>
        <p>
          Para dudas y pedidos, escríbenos a{' '}
          <a href="mailto:hola@holaglow.com">hola@holaglow.com</a>
        </p>
        <p>Llámanos de 10h a 19h de Lunes a Viernes</p>

        <Button type="secondary" size="md" customStyles="font-semibold">
          <SvgCalling className="h-4 w-4 mr-2" /> (+34) 682 417 208
        </Button>
      </Flex>
    </Modal>
  );
}
