'use client';

import { AnimateOnViewport } from 'app/(web)/components/common/AnimateOnViewport';
import TestimonialCard from 'app/(web)/components/common/TestimonialCard';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { Testimonial } from 'app/types/testimonial';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';

const TESTIMONIALS: Testimonial[] = [
  {
    city: 'Barcelona',
    name: 'Yolanda Pérez',
    imgUrl: '/images/statics/landings/captacion/YolandaPérez.jpg',
    value: 4.7,
    testimonial:
      'Trato espectacular de todos, en especial Roma por el tiempo dedicado a explicar con detalle cada tratamiento y dando consejos de cómo obtener el mejor resultado. Es genial la visualización 3D de cómo quedaría lo que decidas hacerte. El doctor dedica tiempo a explicar el procedimiento y el resultado ha sido genial. 100% recomendable!',
  },
  {
    city: 'Madrid',
    name: 'Mía GC',
    imgUrl: '/images/statics/landings/captacion/MíaGC.jpg',
    value: 4.7,
    testimonial:
      'La atención y el trato al caso específico de cada persona son muy buenos, además de tener detalles muy guays como una bebida al llegar. Las recomendaciones son muy honestas y te sientes acompañada en todo momento.',
  },
  {
    city: 'Barcelona',
    name: 'Lluna Santiago',
    imgUrl: '/images/statics/landings/captacion/LlunaSantiago.jpg',
    value: 4.7,
    testimonial:
      'Me he hecho los labios y ha sido increíble!!! Sin duda el mejor lugar en el que poder confiarse. Un trato maravilloso hacia los clientes, os lo recomiendo!!',
  },
  {
    city: 'Barcelona',
    name: 'Noemí Clemente',
    imgUrl: '/images/statics/landings/captacion/NoemiClemente.jpg',
    value: 4.7,
    testimonial:
      'Hace 1 mes fui hacerme un estudio para hacerme un tratamiento facial, desde el minuto 1 el trato fue increíble. Me hizo el estudio Roma que fue súper cercano y claro con lo que necesitaba, tengo que decir que hace tiempo quería hacerme el tratamiento pero no encontraba a nadie que me asesorara con tanta confianza y seguridad. Ayer fui a hacerme el tratamiento y me puse en manos del Dr. Basart que me explicó todos los pasos del tratamiento. Ya tengo fecha.',
  },
  {
    city: 'Madrid',
    name: 'Carlos Correa',
    imgUrl: '/images/statics/landings/captacion/CarlosCorrea.jpg',
    value: 4.7,
    testimonial:
      '¡¡Muy buena experiencia!! Desde el detalle de la bebida, el equipo de recepción hasta el momento del tratamiento con la doctora. Iba con mucho miedo por ser mi primera vez y salgo muy contento!',
  },
  {
    city: 'Madrid',
    name: 'Julia Capozzi',
    imgUrl: '/images/statics/landings/captacion/JuliaCapozzi.jpg',
    value: 4.7,
    testimonial:
      'Llevo unos días desde mi tratamiento de aumento de labios en Holaglow y se merece 5 estrellas. Estoy súper satisfecha, los resultados son exactamente los que deseaba. El trato del médico ha sido muy cercano y profesional. Me he sentido bien, me ha transmitido confianza la marca desde el primer momento. Además, un par de días después te llega la llamada de la clínica para preguntarte si estás bien. Pequeños pero importantes detalles de calidad en atención al paciente. ¡Repetiré!',
  },
];

export default function LandingTestimonials() {
  return (
    <>
      <Container>
        <Title isAnimated size="2xl" className="font-bold mb-4">
          ¿Qué dicen de{' '}
          <Underlined color={HOLAGLOW_COLORS['primary']}>nosotros</Underlined>?
        </Title>
      </Container>
      <AnimateOnViewport>
        <FullWidthCarousel className="pb-8">
          {TESTIMONIALS.map((testimonial: Testimonial | any) => {
            return (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                className="h-full flex flex-col mr-4"
              />
            );
          })}
        </FullWidthCarousel>
      </AnimateOnViewport>
    </>
  );
}
