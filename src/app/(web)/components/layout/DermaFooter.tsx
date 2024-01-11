'use client';

import {
  SvgHolaglowDerma,
  SvgHolaglowDermaUnicolor,
} from 'app/icons/iconsDerma';
import { SvgHolaglow } from 'app/icons/IconsDs';
import { SvgInstagram } from 'app/icons/socialIcons';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import useRoutes from 'app/utils/useRoutes';
import { SimpleAccordion } from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { usePathname } from 'next/navigation';

export function DermaFooter({ className = '' }: { className?: string }) {
  const ROUTES = useRoutes();

  const { clinics } = useGlobalPersistedStore(state => state);
  const { deviceSize, setSelectedTreatments } = useSessionStore(state => state);
  const isHome = usePathname() === '/';

  return (
    <div className={`bg-derma-tertiary ${className}`}>
      <Container
        className={`${
          isHome ? 'pb-28' : 'pb-12'
        } pt-12 md:pt-16 md:pb-16 px-0 md:px-4`}
      >
        <Flex layout="col-left" className="gap-12 md:flex-row">
          <Flex
            layout="col-left"
            className="md:w-1/2 order-3 md:-order-[1] px-4 md:px-0 text-white"
          >
            <SvgHolaglowDermaUnicolor
              height={40}
              width={115}
              className="text-white mb-4"
            />
            <Text size="xs" className="text-white font-semibold mb-3">
              Centro de medicina estética
            </Text>
            <Text size="xs" className="text-white mb-12">
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
              <a href="mailto:hola@holaglow.com" className="text-derma-primary">
                hola@holaglow.com
              </a>
            </Text>
            <Text size="xs" className="leading-6 mb-10">
              Por teléfono de Lunes a Viernes
              <br />
              De 10 a 14h y de 15 a 19h
              <br />
              <a href="tel:+34 682 417 208" className="text-derma-primary">
                (+34) 682 417 208
              </a>
            </Text>
            <Flex layout="row-center" className="w-full justify-between">
              <a
                href="https://www.instagram.com/holaglow.clinics/"
                id={'tmevent_footer'}
              >
                <SvgInstagram height={24} width={24} className="text-white" />
              </a>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
