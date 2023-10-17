'use client';

import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { SimpleAccordion } from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgHolaglow, SvgInstagram } from 'icons/IconsDs';
import { usePathname } from 'next/navigation';

export function Footer() {
  const { deviceSize, clinics } = useGlobalPersistedStore(state => state);
  const isHome = usePathname() === '/';

  return (
    <Container
      className={`${
        isHome ? 'pb-28' : 'pb-12'
      } pt-12 md:pt-16 md:pb-16 px-0 md:px-4`}
    >
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
            De 10h a 18:30h
            <br />
            <a href="tel:+34 682 417 208">(+34) 682 417 208</a>
          </Text>
          <Flex layout="row-center" className="w-full justify-between">
            <a href="https://www.instagram.com/holaglow.clinics/">
              <SvgInstagram height={24} width={24} />
            </a>
          </Flex>
        </Flex>

        <Flex
          layout="col-left"
          className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4 md:px-0 pb-6 border-b border-hg-black md:border-none"
        >
          <a href="/tratamientos">
            <p className="font-semibold">Ver Tratamientos</p>
          </a>

          <SimpleAccordion trigger="Rellenos" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <a href="/tratamientos/aumento-labios">
                <li>Aumento de Labios</li>
              </a>
              <a href="/tratamientos/relleno-ojeras">
                <li>Relleno de ojeras</li>
              </a>
              <a href="/tratamientos/proyeccion-pomulos">
                <li>Proyección de pómulos</li>
              </a>
              <a href="/tratamientos/relleno">
                <li>Ver más</li>
              </a>
            </ul>
          </SimpleAccordion>

          <SimpleAccordion trigger="Arrugas" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <a href="/tratamientos/prevencion-arrugas">
                <li>Prevención de arrugas</li>
              </a>
              <a href="/tratamientos/arrugas-expresion-frente-entrecejo-patas-gallo">
                <li>Arrugas frente</li>
              </a>
              <a href="/tratamientos/arrugas">
                <li>Ver más</li>
              </a>
            </ul>
          </SimpleAccordion>

          <a href="/tratamientos/hydrafacial">
            <p className="font-semibold">Hydrafacial ®</p>
          </a>

          <a href="/tratamientos/packs">
            <p className="font-semibold">Packs Glow</p>
          </a>

          <a href="/checkout/clinicas">
            <Button type="tertiary" className="md:hidden">
              Reservar Cita
            </Button>
          </a>
        </Flex>

        <Flex
          layout="col-left"
          className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4 md:px-0 pb-6"
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
              <a href="/quienes-somos">
                <li>Quiénes somos</li>
              </a>
              <a href="/quienes-somos">
                <li>Equipo médico</li>
              </a>
              <li>Blog</li>
            </ul>
          </SimpleAccordion>
          <SimpleAccordion trigger="Privacidad" isOpen={!deviceSize.isMobile}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              <a href="/politica-de-privacidad">
                <li>Política de privacidad</li>
              </a>
              <a href="/aviso-legal">
                <li>Términos y condiciones</li>
              </a>
            </ul>
          </SimpleAccordion>
        </Flex>
      </Flex>
    </Container>
  );
}
