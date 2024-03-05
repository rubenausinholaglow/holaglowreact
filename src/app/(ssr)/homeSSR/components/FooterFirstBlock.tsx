'use client';

import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import { useDeviceSizeSSR } from 'app/(web)/components/layout/Breakpoint';
import { useSessionStore } from 'app/stores/globalStore';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

export default function FooterFirstBlock() {
  const deviceSize = useDeviceSizeSSR();
  const { setSelectedTreatments } = useSessionStore(state => state);

  return (
    <CheckHydration>
      <Flex
        layout="col-left"
        className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4 md:px-0 pb-6 border-b border-hg-black md:border-none"
      >
        <a href={ROUTES.treatments} id={'tmevent_footer'}>
          <p className="font-semibold">Ver Tratamientos</p>
        </a>

        <SimpleAccordion trigger="Rellenos" isOpen={!deviceSize.isMobile}>
          <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
            <a href="/tratamientos/aumento-labios" id={'tmevent_footer'}>
              <li>Aumento de Labios</li>
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

        <SimpleAccordion trigger="Arrugas" isOpen={!deviceSize.isMobile}>
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

        <Button
          id={'tmevent_footer'}
          type="white"
          href={ROUTES.checkout.clinics}
          onClick={() => {
            setSelectedTreatments([]);
          }}
        >
          Reservar Cita
        </Button>
      </Flex>
    </CheckHydration>
  );
}
