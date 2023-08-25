import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgHolaglow, SvgInstagram } from 'icons/IconsDs';

export function Footer() {
  return (
    <Container className="py-16">
      <Flex layout="row-center" className="gap-12 items-start">
        <Flex layout="col-left" className="basis-1/2">
          <SvgHolaglow className="text-hg-malva mb-8" height={25} width={100} />
          <Text size="xs" className="text-hg-darkMalva font-semibold mb-3">
            Centro de medicina estética
          </Text>
          <Text size="xs" className="text-hg-darkMalva mb-12">
            Centro de medicina estética La información de este sitio web,
            incluidos los artículos escritos por profesionales de la salud, es
            solo para fines de información general, no constituye un consejo
            médico y no se debe confiar en ella para un diagnóstico o
            tratamiento médico
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
          <SvgInstagram height={24} width={24} />
        </Flex>

        <Flex layout="col-left" className="basis-1/4">
          <ul className="flex flex-col gap-3 text-xl font-semibold">
            <li>Labios</li>
            <li>Facial</li>
            <li>Piel</li>
            <li>Hydrafacial</li>
            <li>Capilar</li>
            <li>Otros</li>
          </ul>
        </Flex>
        <Flex layout="col-left" className="basis-1/4">
          <Text size="xl" className="mb-4 font-semibold">
            Clínicas
          </Text>
          <ul className="leading-6 mb-12 text-xs">
            <li>Barcelona</li>
            <li>Madrid</li>
            <li>Valencia</li>
          </ul>

          <Text size="xl" className="mb-4 font-semibold">
            About us
          </Text>
          <ul className="leading-6 mb-12 text-xs">
            <li>Equipo profesional</li>
            <li>Blog</li>
          </ul>

          <Text size="xl" className="mb-4 font-semibold">
            Privacidad
          </Text>
          <ul className="leading-6 mb-12 text-xs">
            <li>Aviso Legal</li>
            <li>Política de privacidad</li>
          </ul>
        </Flex>
      </Flex>
    </Container>
  );
}
