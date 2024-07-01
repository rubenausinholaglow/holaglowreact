import { isMobile } from 'react-device-detect';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import { Flex } from 'designSystem/Layouts/Layouts';
import dynamic from 'next/dynamic';

import AppointmentButton from './AppointmentButton';

const SimpleAccordion = dynamic(
  () => import('designSystem/Accordion/SimpleAccordion'),
  { ssr: false }
);

export default function FooterFirstBlock() {
  return (
    <CheckHydration>
      <Flex
        layout="col-left"
        className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4 md:px-0 pb-6 border-b border-hg-black md:border-none"
      >
        <a href={ROUTES.treatments} id={'tmevent_footer'}>
          <p className="font-semibold">Ver Tratamientos</p>
        </a>

        <SimpleAccordion trigger="Rellenos" isOpen={!isMobile}>
          <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
            <a href="/tratamientos/aumento-labios" id={'tmevent_footer'}>
              <li>Aumento de labios</li>
            </a>
            <a href="/tratamientos/relleno-ojeras" id={'tmevent_footer'}>
              <li>Relleno de ojeras</li>
            </a>
            <a href="/tratamientos/proyeccion-pomulos" id={'tmevent_footer'}>
              <li>Proyección de pómulos</li>
            </a>
            <a href="/tratamientos/relleno" id={'tmevent_footer'}>
              <li>Ver más</li>
            </a>
          </ul>
        </SimpleAccordion>

        <SimpleAccordion trigger="Arrugas" isOpen={!isMobile}>
          <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
            <a href="/tratamientos/prevencion-arrugas" id={'tmevent_footer'}>
              <li>Prevención de arrugas</li>
            </a>
            <a
              href="/tratamientos/arrugas-expresion-frente-entrecejo-patas-gallo"
              id={'tmevent_footer'}
            >
              <li>Arrugas frente</li>
            </a>
            <a href="/tratamientos/arrugas" id={'tmevent_footer'}>
              <li>Ver más</li>
            </a>
          </ul>
        </SimpleAccordion>

        <a href="/tratamientos/hydrafacial" id={'tmevent_footer'}>
          <p className="font-semibold">Hydrafacial ®</p>
        </a>

        <a href="/tratamientos/packs" id={'tmevent_footer'}>
          <p className="font-semibold">Packs Glow</p>
        </a>

        <AppointmentButton />
      </Flex>
    </CheckHydration>
  );
}
