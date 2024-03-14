'use client';

import { Testimonial } from '@interface/testimonial';
import TestimonialCard from 'app/(web)/components/common/TestimonialCard';
import { isMobile } from 'app/(web)/components/layout/Breakpoint';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgByGoogle, SvgStar } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

const TESTIMONIALS: Testimonial[] = [
  {
    city: 'Barcelona',
    name: 'Carmen Ausín',
    imgUrl: '/images/derma/testimonials/carmenAusin.png',
    value: 4.7,
    testimonial:
      'Ya no sabía qué hacer con mi acné, hasta que descubrí la crema formulada!!! Ya llevo unos meses usándola y empiezo a ver cambios en mi piel, cosa que no había notado con ninguna otra crema… ya no me da vergüenza salir a la calle sin maquillaje! Gracias!!',
  },
  {
    city: 'Toledo',
    name: 'Marta Gil',
    imgUrl: '/images/derma/testimonials/martaGil.png',
    value: 4.7,
    testimonial:
      'Además de haberme ayudado mucho con mi piel, siempre me han apoyado, los médicos son muy amables y profesionales. Da gusto recibir asesoramiento de esta calidad desde casa!',
  },
  {
    city: 'Alicante',
    name: 'Rubén Zamora',
    imgUrl: '/images/derma/testimonials/rubenZamora.png',
    value: 4.7,
    testimonial:
      'He luchado contra la rosácea durante muchos años y he probado muchísimos médicos y métodos, incluso láseres, pero solo con mi cremafacial personalizada estoy consiguiendo resultados realmente duraderos!! ',
  },
  {
    city: 'Tarragona',
    name: 'Amalia Rodriguez',
    imgUrl: '/images/derma/testimonials/amaliaRodriguez.png',
    value: 4.7,
    testimonial:
      'Estaba cansada de los videos de tiktok recomendando soluciones milagrosas que luego no funcionan… Tener una consulta con un dermatólogo y una crema formulada para mi me ha ayudado a simplificar mi rutina facial y a escuchar lo que realmente necesita mi piel. Lo recomiendo mucho!!!',
  },
];

export default function Testimonials() {
  return (
    <>
      <Container className="py-12">
        <Title isAnimated size="2xl" className="font-bold mb-6 md:mb-8">
          Si tú estás feliz nosotros también
        </Title>
        <Text className="text-hg-black500 mb-6 md:mb-12 md:text-lg">
          Sabemos que nada transmite más confianza que una historia real. Te
          presentamos a las personas que ya han confiado en Holaglow.
        </Text>

        <Flex className="gap-4">
          <SvgHolaglowHand className="h-[72px] w-[72px] p-4 bg-hg-secondary text-hg-primary rounded-full" />
          <Flex layout="col-left" className="gap-1">
            <Text className="font-semibold">Holaglow clinics</Text>
            <Text className="text-xs text-hg-black400">
              Basado en 83 comentarios
            </Text>
            <Flex className="gap-2 text-hg-secondary">
              <Text className="font-semibold text-lg -mb-1">4.9</Text>
              <SvgStar />
              <SvgStar />
              <SvgStar />
              <SvgStar />
              <SvgStar />
              <SvgByGoogle className="ml-8 -mb-1" />
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <FullWidthCarousel
        hasDots={isMobile()}
        hasControls={!isMobile()}
        className="pb-8"
        visibleSlides={isMobile() ? 1.2 : 3.5}
      >
        {TESTIMONIALS.map((testimonial: Testimonial | any) => {
          return (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              className="h-full flex flex-col mr-8 bg-derma-secondary300"
            />
          );
        })}
      </FullWidthCarousel>
    </>
  );
}
