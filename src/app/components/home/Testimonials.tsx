'use client';

import { useSessionStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

interface Testimonial {
  name: string;
  testimonial: string;
  imgUrl: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'BELEN HEVIA',
    testimonial:
      'Encantada de la experiencia, el doctor va explicando a cada momento lo que va haciendo y el personal súper amable . 100% recomendable 👌',
    imgUrl: '/images/testimonials/belenHevia.png',
  },
  {
    name: 'MARIA JOSÉ ZAMORA',
    testimonial:
      'Perfecta experiencia en Holaglow! Equipo de súper profesionales, que te asesoran y acompañan durante el tratamiento',
    imgUrl: '/images/testimonials/mariaJoseZamora.png',
  },
  {
    name: 'MARIA QUILEZ',
    testimonial:
      'Estoy super contenta con el resultado. El equipo médico me ha asesorado muy bien y me he sentido muy cómoda en todo momento. El escáner es una pasada!!!!',
    imgUrl: '/images/testimonials/mariaQuilez.png',
  },
  {
    name: 'LUNA SANTIAGO',
    testimonial:
      'Me he hecho los labios y ha sido increíble!!! Sin duda el mejor lugar en el que poder confiarse. Un trato maravilloso hacia los clientes, os lo recomiendo!!',
    imgUrl: '/images/testimonials/lunaSantiago.png',
  },
  {
    name: 'ANNA ASIÁN',
    testimonial:
      'He visitado la clínica y son súper amables y profesionales, antes del tratamiento puedes ver el resultado de forma virtual en un simulador. Decidí hacerme un tratamiento antiarrugas en la frente, entrecejo y patas de gallo. Encantada con mi nueva imagen,mejorada y muy natural.',
    imgUrl: '/images/testimonials/annaAsian.png',
  },
  {
    name: 'MONTSE MELERO',
    testimonial:
      'Ha sido mi primera vez y no puedo estar más contenta. El personal es encantador, me he sentido acompañada en todo momento y los resultados increíbles, ya se lo he recomendado a mis amigas, ¡Repetiré seguro!',
    imgUrl: '/images/testimonials/montseMelero.png',
  },
  {
    name: 'ALBERTO SANTAMARIA',
    testimonial:
      'Un gran equipo de profesionales!! Todos son súper amables y agradables, lo que te hace sentir muy agusto cuando te haces los tratamientos, te informan de todo lo que tengas dudas sin compromiso y te recomiendan siempre lo mejor que se te adapte a tu persona, sin duda lo recomiendo un 💯',
    imgUrl: '/images/testimonials/albertoSantamaria.png',
  },
];

const Testimonial = ({
  imgUrl,
  name,
  testimonial,
}: {
  imgUrl: string;
  name: string;
  testimonial: string;
}) => {
  return (
    <Flex layout="col-center" className="items-stretch">
      <div className="relative aspect-square mb-4">
        <Image
          src={imgUrl}
          alt="testimonials"
          fill
          objectFit="cover"
          className="rounded-xl mb-4"
        />
      </div>
      <Text className="font-semibold text-center mb-4">{name}</Text>
      <Text size="sm" className="text-hg-black500 text-center">
        {testimonial}
      </Text>
    </Flex>
  );
};

export default function Testimonials() {
  const deviceSize = useSessionStore(state => state.deviceSize);

  const visibleTestimonials = () => {
    if (deviceSize.isMobile) {
      return 1;
    }

    if (deviceSize.isTablet) {
      return 2;
    }

    return 3;
  };

  function shuffleArray(array: Testimonial[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledTestimonials = shuffleArray(TESTIMONIALS);

  return (
    <Container className="py-12">
      <Title isAnimated size="2xl" className="font-bold mb-6 md:mb-8">
        Si tú estás{' '}
        <Underlined color={HOLAGLOW_COLORS['primary']}>feliz</Underlined>,
        nosotros también
      </Title>
      <Text className="text-hg-black500 mb-6 md:mb-12">
        Sabemos que nada transmite más confianza que una historia real. Te
        presentamos a las personas que ya han confiado en Holaglow.
      </Text>
      <Carousel
        hasControls
        className="relative mb-12"
        isIntrinsicHeight
        visibleSlides={visibleTestimonials()}
        infinite={false}
        sliderStyles={`${deviceSize.isMobile ? '' : 'gap-16'}`}
      >
        {shuffledTestimonials.map((item: Testimonial) => (
          <Testimonial
            key={item.name}
            imgUrl={item.imgUrl}
            name={item.name}
            testimonial={item.testimonial}
          />
        ))}
      </Carousel>
    </Container>
  );
}
