'use client';

import { SvgHolaglowDermaUnicolor } from 'app/icons/iconsDerma';
import { SvgInstagram } from 'app/icons/socialIcons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { usePathname } from 'next/navigation';

export default function DermaFooter({
  className = '',
  hideFooter = false,
}: {
  className?: string;
  hideFooter?: boolean;
}) {
  const isHome = usePathname() === '/';

  if (hideFooter) {
    return <></>;
  }

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
