'use client';

import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import { isMobile } from 'app/(web)/components/layout/Breakpoint';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Flex } from 'designSystem/Layouts/Layouts';

export default function FooterFirstBlock() {
  return (
    <CheckHydration>
      <Flex
        layout="col-left"
        className="gap-6 w-full md:w-1/3 text-xl font-semibold px-4 md:px-0 pb-6 border-b border-hg-black md:border-none"
      >
        <SimpleAccordion
          trigger={isMobile() ? 'Tratamientos' : 'Tratamientos más populares'}
          triggerStyles="text-left"
          isOpen={!isMobile()}
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
      </Flex>
    </CheckHydration>
  );
}
