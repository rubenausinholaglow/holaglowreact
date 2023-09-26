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
            <a href="mailto:info@holaglow.com">info@holaglow.com</a>
          </Text>
          <Text size="xs" className="leading-6 mb-10">
            Por teléfono de Lunes a Viernes
            <br />
            De 10h a 18:30h
            <br />
            <a href="tel:+34 699 999 999">(+34) 699 999 999</a>
          </Text>
          <Flex layout="row-center" className="w-full justify-between">
            <SvgInstagram height={24} width={24} />
          </Flex>
        </Flex>

        <Flex
          layout="col-left"
          className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4 md:px-0 pb-6 border-b border-hg-black md:border-none"
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
      </Flex>
    </Container>
  );
}
