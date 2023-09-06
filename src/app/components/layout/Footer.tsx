import Accordion from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgHolaglow, SvgInstagram, SvgUserOctagon } from 'icons/IconsDs';

export function Footer() {
  return (
    <Container className="py-16">
      <Flex layout="row-center" className="gap-12 items-start">
        <Flex layout="col-left" className="w-1/2">
          <SvgHolaglow
            className="text-hg-purple mb-8"
            height={25}
            width={100}
          />
          <Text size="xs" className="text-hg-purple700 font-semibold mb-3">
            Centro de medicina estética
          </Text>
          <Text size="xs" className="text-hg-purple700 mb-12">
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
          <Flex layout="row-center" className="w-full justify-between">
            <SvgInstagram height={24} width={24} />
            <Button type="tertiary" size="sm" className="ml-2 hidden lg:block">
              <Flex layout="row-center">
                <SvgUserOctagon
                  fill="transparent"
                  height={16}
                  width={16}
                  className="mr-2"
                />
                <span className="font-semibold">Mi espacio glow</span>
              </Flex>
            </Button>
          </Flex>
        </Flex>

        <Flex
          layout="col-left"
          className="gap-6 basis-1/4 text-xl font-semibold"
        >
          <p className="font-semibold">Ver Tratamientos</p>

          <Accordion trigger="Rellenos" isOpen>
            <ul className="text-md pl-2 pt-2 font-normal flex flex-col gap-2">
              <li>Aumento de Labios</li>
              <li>Relleno de ojeras</li>
              <li>Proyección de pómulos</li>
              <li>Ver más</li>
            </ul>
          </Accordion>

          <Accordion trigger="Arrugas" isOpen>
            <ul className="text-md pl-2 pt-2 font-normal flex flex-col gap-2">
              <li>Prevención de arrugas</li>
              <li>Arrugas frente</li>
              <li>Ver más</li>
            </ul>
          </Accordion>

          <p className="font-semibold">Hydrafacial</p>

          <p className="font-semibold">Packs Glow</p>
        </Flex>
        <Flex layout="col-left" className="basis-1/4">
          <Accordion trigger="Clínicas">
            <ul className="text-md pl-2 pt-2 font-normal flex flex-col gap-2">
              <li>Madrid</li>
              <li>Barcelona</li>
              <li>Valencia</li>
            </ul>
          </Accordion>
          <Accordion trigger="Sobre nosotros">
            <p>Bla bla bla sobre nosotros (?)</p>
          </Accordion>
          <Accordion trigger="Privacidad">
            <p>Bla bla bla privacidad (?)</p>
          </Accordion>
        </Flex>
      </Flex>
    </Container>
  );
}
