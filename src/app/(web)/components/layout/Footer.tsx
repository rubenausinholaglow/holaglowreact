'use client';

import { isMobile } from 'react-device-detect';
import { SvgHolaglow } from 'app/icons/IconsDs';
import { SvgInstagram, SvgTikTok } from 'app/icons/socialIcons';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import useRoutes from 'app/utils/useRoutes';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export function Footer() {
  const ROUTES = useRoutes();

  const { clinics } = useGlobalPersistedStore(state => state);
  const { setSelectedTreatments } = useSessionStore(state => state);

  return (
    <Container className="pb-20 pt-12 md:pt-16 px-0 md:px-4">
      <Flex layout="col-left" className="gap-12 md:flex-row">
        <Flex
          layout="col-left"
          className="md:w-1/2 order-3 md:-order-[1] px-4 md:px-0"
        >
          <SvgHolaglow
            className="text-hg-secondary mb-8"
            height={25}
            width={100}
          />
          <Text size="xs" className="text-hg-secondary700 font-semibold mb-3">
            Centro de medicina estética
          </Text>
          <Text size="xs" className="text-hg-secondary700 mb-12">
            La información de este sitio web, incluidos los artículos escritos
            por profesionales de la salud, es solo para fines de información
            general, no constituye un consejo médico y no se debe confiar en
            ella para un diagnóstico o tratamiento médico
          </Text>
          <Text size="xl" className="mb-6 font-semibold">
            Contacto
          </Text>
          <Text size="xs" className="mb-6">
            Para dudas y pedidos, escríbenos a{' '}
            <a href="mailto:hola@holaglow.com">hola@holaglow.com</a>
          </Text>
          <Text size="xs" className="leading-6 mb-10">
            Por teléfono de Lunes a Viernes
            <br />
            De 10 a 14h y de 15 a 19h
            <br />
            <a href="tel:+34 682 417 208">(+34) 682 417 208</a>
          </Text>
          <Flex layout="row-center" className="w-full justify-start gap-2">
            <a
              href="https://www.instagram.com/holaglow.clinics/"
              target="_blank"
              id={'tmevent_footer'}
            >
              <SvgInstagram height={24} width={24} />
            </a>
            <a
              href="https://www.tiktok.com/@holaglow.clinics"
              target="_blank"
              id={'tmevent_footer'}
            >
              <SvgTikTok height={24} width={24} />
            </a>
          </Flex>
        </Flex>

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

        <Flex
          layout="col-left"
          className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4 md:px-0 pb-6"
        >
          <SimpleAccordion trigger="Clínicas" isOpen={!isMobile}>
            <a href="/clinicas" id={'tmevent_footer'}>
              <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
                {clinics &&
                  clinics.map(clinic => (
                    <li key={clinic.city}>{clinic.city}</li>
                  ))}
              </ul>
            </a>
          </SimpleAccordion>

          <SimpleAccordion trigger="Nosotrxs" isOpen={!isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <a href="/quienes-somos" id={'tmevent_footer'}>
                <li>Quiénes somos</li>
              </a>
              <a href="/quienes-somos" id={'tmevent_footer'}>
                <li>Equipo médico</li>
              </a>
            </ul>
          </SimpleAccordion>
          <SimpleAccordion trigger="Privacidad" isOpen={!isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <a href="/politica-de-privacidad" id={'tmevent_footer'}>
                <li>Política de privacidad</li>
              </a>
              <a href="/aviso-legal" id={'tmevent_footer'}>
                <li>Términos y condiciones</li>
              </a>
              <a href="/condiciones-black-friday" id={'tmevent_footer'}>
                <li>Condiciones Black Friday</li>
              </a>
            </ul>
          </SimpleAccordion>
        </Flex>
      </Flex>
    </Container>
  );
}
