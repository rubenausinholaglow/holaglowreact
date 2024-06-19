import { SvgHolaglow } from 'app/icons/Icons';
import { SvgInstagram, SvgTikTok } from 'app/icons/socialIcons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function FooterIntro() {
  return (
    <Flex
      layout="col-left"
      className="md:w-1/2 order-3 md:-order-[1] px-4 md:px-0"
    >
      <SvgHolaglow className="text-hg-secondary mb-8" height={25} width={100} />
      <Text size="xs" className="text-hg-secondary700 font-semibold mb-3">
        Centro de medicina estética (a mi no me peta)
      </Text>
      <Text size="xs" className="text-hg-secondary700 mb-12">
        La información de este sitio web, incluidos los artículos escritos por
        profesionales de la salud, es solo para fines de información general, no
        constituye un consejo médico y no se debe confiar en ella para un
        diagnóstico o tratamiento médico
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
  );
}
