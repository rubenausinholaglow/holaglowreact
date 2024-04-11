'use client';

import { isMobile } from 'react-device-detect';
import CheckHydration from '@utils/CheckHydration';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

const FAQS = [
  {
    title: '¿Qué incluye la rutina facial personalizada?',
    description:
      'La rutina facial personalizada está compuesta por la receta de una crema facial personalizada y 3 cremas que complementan y potencian el efecto de la crema personalizada. Después del diagnóstico recibirás la receta de tu crema personalizada, una espuma limpiadora, protector solar y una crema de día específica para tus objetivos.',
  },
  {
    title: '¿Qué precio tiene la rutina facial personalizada?',
    description:
      'Las rutinas las elabora el médico con la información que proporciones en el formulario y las fotos que adjuntes. Está pensada para 3 meses, que es el tiempo mínimo para empezar a ver resultados y tiene un coste de 75€ más el coste de la elaboración de tu crema facial personalizada en la farmacia, que suele ser entre 25-40€ dependiendo de la composición.',
  },
  {
    title: '¿Cómo analizamos tu piel para personalizar tu rutina?',
    description:
      'Para darte un diagnóstico acertado de tu piel y diseñar tu rutina facial personalizada, te asignaremos uno de nuestros médicos que analizará tu caso teniendo en cuenta la información que proporciones en el formulario y las fotografías de tu rostro que te pediremos durante el proceso. Es importante responder con la mayor exactitud posible y que te asegures de que en las fotos se aprecian los detalles de tu piel que quieres tratar.',
  },
  {
    title: '¿Cuánto dura el tratamiento?',
    description:
      'La rutina facial está pensada para que dure 3 meses, que es el tiempo suficiente definido por nuestros médicos para que los resultados sean visibles. No obstante, cada piel es única y evoluciona de forma distinta. Si quieres que uno de nuestros médicos haga seguimiento de tu evolución para ir adaptando la composición y la duración de la rutina, te recomendamos elegir el modelo de suscripción una vez completado el formulario de diagnóstico de tu piel.',
  },
  {
    title: '¿Qué tipos de tratamiento hay?',
    description:
      'Ofrecemos 2 tipos de tratamiento para que puedas ver progreso en tu piel. Por un lado una rutina facial para 3 meses (tiempo recomendado para ver resultados) y por otro lado una rutina facial por suscripción que incluye los mismos productos además de seguimiento mensual por parte de tu médico para poder evaluar la evolución de tu piel y ajustar tu rutina cuando sea necesario.',
  },
  {
    title: '¿Dónde consigo mi crema personalizada?',
    description:
      'Tu crema personalizada estará formulada específicamente para ti por tu médico y contendrá principios activos (ingredientes) catalogados como medicamento. Por eso necesita ser recetada por un médico y se elabora bajo demanda. Para conseguir la tuya, deberás pedirla en tu farmacia más cercana presentando la receta y documento de identificación. Tiene un coste a abonar en la farmacia de entre 25-40€.',
  },
];

export default function FaqsDerma({ className = '' }: { className?: string }) {
  return (
    <Container className={className}>
      <Flex layout="row-between" className="w-full gap-2 mb-12">
        <Title
          isAnimated
          size="2xl"
          className="font-gtUltra text-derma-primary font-bold"
        >
          Preguntas frecuentes
        </Title>
        <Image
          src="/images/derma/home/faqsDerma.png"
          alt="Holaglow"
          width={286}
          height={176}
          className="pl-8 md:pl-16"
        />
      </Flex>

      <Flex
        layout="col-left"
        className="w-full gap-8 md:grid md:grid-cols-2 md:gap-16"
      >
        <CheckHydration>
          {isMobile &&
            FAQS.map(faq => {
              return (
                <SimpleAccordion
                  key={faq.title}
                  className="pb-4 md:mb-0 border-b border-derma-tertiary"
                  trigger={faq.title}
                  triggerStyles="text-left items-start font-semibold"
                >
                  <Text size="sm" className="text-hg-black500 pt-4">
                    {faq.description}
                  </Text>
                </SimpleAccordion>
              );
            })}

          {!isMobile && (
            <Flex layout="col-left" className="w-full gap-10">
              {FAQS.map((faq, index) => {
                if (index % 2 === 0) {
                  return (
                    <SimpleAccordion
                      key={faq.title}
                      className="pb-4 md:mb-0 border-b border-derma-tertiary"
                      trigger={faq.title}
                      triggerStyles="text-left items-start font-semibold text-lg pb-2"
                    >
                      <Text size="sm" className="text-hg-black500 pt-4">
                        {faq.description}
                      </Text>
                    </SimpleAccordion>
                  );
                }
                return null;
              })}
            </Flex>
          )}

          {!isMobile && (
            <Flex layout="col-left" className="w-full gap-10">
              {FAQS.map((faq, index) => {
                if (index % 2 !== 0) {
                  return (
                    <SimpleAccordion
                      key={faq.title}
                      className="pb-4 md:mb-0 border-b border-derma-tertiary"
                      trigger={faq.title}
                      triggerStyles="text-left items-start font-semibold text-lg pb-2"
                    >
                      <Text size="sm" className="text-hg-black500 pt-4">
                        {faq.description}
                      </Text>
                    </SimpleAccordion>
                  );
                }
                return null;
              })}
            </Flex>
          )}
        </CheckHydration>
      </Flex>
    </Container>
  );
}
