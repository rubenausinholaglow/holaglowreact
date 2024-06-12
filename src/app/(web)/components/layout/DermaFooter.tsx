'use client';

import { SvgHolaglowDermaUnicolor } from 'app/icons/iconsDerma';
import { SvgInstagram, SvgTikTok } from 'app/icons/socialIcons';
import dayjs from 'dayjs';
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
            <Text size="xs" className="text-white mb-8">
              Asesoramiento personalizado para el cuidado facial de grado médico
            </Text>

            <Flex layout="row-left" className="w-full gap-4 mb-8">
              <a
                href="https://www.instagram.com/holaglow.derma/"
                target="_blank"
                id={'tmevent_footer'}
              >
                <SvgInstagram height={24} width={24} className="text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@holaglow.derma"
                target="_blank"
                id={'tmevent_footer'}
              >
                <SvgTikTok height={24} width={24} className="text-white" />
              </a>
            </Flex>

            <Text size="xs" className="text-white mb-8">
              Copyright © {dayjs().year()} Derma by Holaglow
            </Text>
          </Flex>

          <Flex
            layout="col-left"
            className="md:w-1/4 order-3 md:-order-[1] px-4 md:px-0 text-white"
          >
            <Text size="xl" className="mb-6 font-gtUltraThin">
              Contacto
            </Text>
            <Text size="xs" className="mb-6">
              Para dudas y pedidos, escríbenos a{' '}
              <a
                href="mailto:derma@holaglow.com"
                className="text-derma-primary"
              >
                derma@holaglow.com
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
          </Flex>

          <Flex
            layout="col-left"
            className="md:w-1/4 order-3 md:-order-[1] px-4 md:px-0 text-white"
          >
            <Text size="xl" className="mb-6 font-gtUltraThin">
              Privacidad
            </Text>
            <ul className="text-xs font-normal flex flex-col gap-2">
              <a href="/politica-de-privacidad" id={'tmevent_footer'}>
                <li>Política de privacidad</li>
              </a>
              <a href="/aviso-legal" id={'tmevent_footer'}>
                <li>Términos y condiciones</li>
              </a>
            </ul>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
