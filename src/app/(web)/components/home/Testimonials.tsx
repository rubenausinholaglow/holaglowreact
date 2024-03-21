import { Testimonial } from '@interface/testimonial';
import isMobileSSR from '@utils/isMobileSSR';
import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgByGoogle, SvgStar } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import TestimonialCard from '../common/TestimonialCard';
import FullWidthCarousel from '../product/fullWidthCarousel';

const TESTIMONIALS: Testimonial[] = [
  {
    city: 'Barcelona',
    name: 'Belen Hevia',
    imgUrl: '/images/testimonials/belenHevia.png',
    value: 4.7,
    testimonial:
      'Encantada de la experiencia, el doctor va explicando a cada momento lo que va haciendo y el personal súper amable . 100% recomendable 👌',
  },
  {
    city: 'Toledo',
    name: 'Maria José Zamora',
    imgUrl: '/images/testimonials/mariaJoseZamora.png',
    value: 4.7,
    testimonial:
      'Perfecta experiencia en Holaglow! Equipo de súper profesionales, que te asesoran y acompañan durante el tratamiento',
  },
  {
    city: 'Alicante',
    name: 'Maria Quilez',
    imgUrl: '/images/testimonials/mariaQuilez.png',
    value: 4.7,
    testimonial:
      'Estoy super contenta con el resultado. El equipo médico me ha asesorado muy bien y me he sentido muy cómoda en todo momento. El escáner es una pasada!!!!',
  },
  {
    city: 'Tarragona',
    name: 'Luna Santiago',
    imgUrl: '/images/testimonials/lunaSantiago.png',
    value: 4.7,
    testimonial:
      'Me he hecho los labios y ha sido increíble!!! Sin duda el mejor lugar en el que poder confiarse. Un trato maravilloso hacia los clientes, os lo recomiendo!!',
  },
  {
    city: 'Madrid',
    name: 'Anna Asián',
    imgUrl: '/images/testimonials/annaAsian.png',
    value: 4.7,
    testimonial:
      'He visitado la clínica y son súper amables y profesionales, antes del tratamiento puedes ver el resultado de forma virtual en un simulador. Decidí hacerme un tratamiento antiarrugas en la frente, entrecejo y patas de gallo. Encantada con mi nueva imagen,mejorada y muy natural.',
  },
];
export default async function Testimonials() {
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
        hasDots={isMobileSSR()}
        hasControls={!isMobileSSR()}
        className="pb-8"
        visibleSlides={isMobileSSR() ? 1.2 : 3.5}
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
