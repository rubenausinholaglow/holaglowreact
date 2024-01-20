'use client';

import { AnimateOnViewport } from 'app/(web)/components/common/AnimateOnViewport';
import TestimonialCard from 'app/(web)/components/common/TestimonialCard';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { useSessionStore } from 'app/stores/globalStore';
import { Testimonial } from 'app/types/testimonial';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { SimpleAccordion } from 'designSystem/Accordion/Accordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

const FAQS = [
  {
    title: '¿Qué precio tiene una consulta online?',
    description:
      'La consulta online con un dermatólogo cuesta 49 € e incluye el asesoramiento personalizado y la prescripción de una crema formulada exclusivamente para ti siempre que sea necesario.',
  },
  {
    title: '¿Qué es el cuidado facial de grado médico o farmacéutico?',
    description:
      'El cuidado facial de grado médico o farmacéutico es aquél que se adapta a las necesidades de cada paciente y que combina productos cosméticos con fármacos que únicamente pueden ser recetados por un doctor, como es el caso de la formulación magistral.',
  },
  {
    title: '¿En qué tipo de afecciones pueden ayudarme?',
    description:
      'Contamos con una amplia red de dermatólogos experimentados para ofrecer un cuidado facial integral y atender cualquier afección o necesidad de tu piel como: acné, poros obstruidos, puntos negros, líneas finas, pérdida de firmeza o rosácea, entre muchas más.',
  },
  {
    title: '¿Qué significa un cuidado facial personalizado?',
    description:
      'El cuidado facial personalizado consiste, en primer lugar, de una consulta médica para analizar las necesidades específicas de tu piel y, en segundo lugar, de la prescripción de una crema formulada exclusivamente para ti con tal de asegurar su eficacia y lograr resultados más notables y duraderos.',
  },
];

export default function FaqsDerma() {
  const { deviceSize } = useSessionStore(store => store);

  return (
    <Container>
      <Flex layout="row-between" className="w-full gap-2 mb-4 md:mb-8">
        <Title
          isAnimated
          size="2xl"
          className="font-gtUltraBold text-derma-primary font-bold"
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
        className="w-full gap-6 md:grid md:grid-cols-2 md:gap-16"
      >
        {deviceSize.isMobile &&
          FAQS.map((faq, index) => {
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

        {!deviceSize.isMobile && (
          <Flex layout="col-left" className="w-full gap-4">
            {FAQS.map((faq, index) => {
              if (index % 2 === 0) {
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
              }
              return null;
            })}
          </Flex>
        )}

        {!deviceSize.isMobile && (
          <Flex layout="col-left" className="w-full gap-4">
            {FAQS.map((faq, index) => {
              if (index % 2 !== 0) {
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
              }
              return null;
            })}
          </Flex>
        )}
      </Flex>
    </Container>
  );
}
