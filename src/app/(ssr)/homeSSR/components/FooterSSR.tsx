import { fetchClinics } from '@utils/fetch';
import { SvgHolaglow } from 'app/icons/IconsDs';
import { SvgInstagram } from 'app/icons/socialIcons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { headers } from 'next/headers';

import FooterFirstBlock from './FooterFirstBlock';
import FooterSecondBlock from './FooterSecondBlock';

async function getClinics() {
  const clinics = await fetchClinics();

  return clinics;
}

export default async function Footer() {
  const clinics = await getClinics();

  const headersList = headers();
  const path = headersList.get('next-url') || '';
  const isHome = path === '/homeSSR';

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
            De 10 a 14h y de 15 a 19h
            <br />
            <a href="tel:+34 682 417 208">(+34) 682 417 208</a>
          </Text>
          <Flex layout="row-center" className="w-full justify-between">
            <a
              href="https://www.instagram.com/holaglow.clinics/"
              id={'tmevent_footer'}
            >
              <SvgInstagram height={24} width={24} />
            </a>
          </Flex>
        </Flex>

        <FooterFirstBlock />
        <FooterSecondBlock clinics={clinics} />
      </Flex>
    </Container>
  );
}
