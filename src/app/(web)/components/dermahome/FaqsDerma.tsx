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
    title: '¿Podré ver los resultados de manera instantánea?',
    description:
      'Los resultados son inmediatos y visibles desde el primer momento, aunque pueden estar condicionados por la posible inflamación. El resultado óptimo del tratamiento se verá a las tres semanas de la aplicación',
  },
  {
    title: '¿Cuánto tiempo duran los resultados del ácido hialurónico?',
    description:
      'Cada uno de nosotros es único y también lo es nuestra piel. Generalmente, el ácido hialurónico se reabsorbe durante los seis o doce meses posteriores a su aplicación.',
  },
  {
    title: '¿La aplicación de ácido hialurónico es dolorosa?',
    description:
      'La aplicación de ácido hialurónico no es dolorosa. De todos modos, el umbral del dolor es distinto para cada persona por lo que estaremos encantados de aplicar anestésico tópico, si lo deseas. ',
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
        className="w-full gap-4 md:grid md:grid-cols-2 md:gap-16"
      >
        {deviceSize.isMobile &&
          FAQS.map((faq, index) => {
            return (
              <SimpleAccordion
                key={faq.title}
                className="p-4 md:mb-0 bg-white rounded-2xl"
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
                    className="p-4 md:mb-0 bg-white rounded-2xl"
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
                    className="p-4 md:mb-0 bg-white rounded-2xl"
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
