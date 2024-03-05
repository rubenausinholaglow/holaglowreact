'use client';

import AnimateOnViewport from 'app/(web)/components/common/AnimateOnViewport';
import TestimonialCard from 'app/(web)/components/common/TestimonialCard';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { useSessionStore } from 'app/stores/globalStore';
import { Testimonial } from 'app/types/testimonial';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

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

export default function TestimonialsDerma() {
  const { deviceSize } = useSessionStore(store => store);

  return (
    <>
      <Container>
        <Title
          isAnimated
          size="2xl"
          className="font-gtUltra text-derma-primary font-bold mb-8 md:mb-12"
        >
          Opiniones sobre Derma
        </Title>
      </Container>
      <AnimateOnViewport>
        <FullWidthCarousel
          hasControls={true}
          className="pb-8"
          visibleSlides={deviceSize.isMobile ? 1.2 : 3.5}
          isDerma={true}
        >
          {TESTIMONIALS.map((testimonial: Testimonial | any) => {
            return (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                className="h-full flex flex-col mr-4 border border-hg-black300 bg-transparent"
              />
            );
          })}
        </FullWidthCarousel>
      </AnimateOnViewport>
    </>
  );
}
