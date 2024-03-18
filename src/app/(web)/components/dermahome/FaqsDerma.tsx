'use client';

import { useSessionStore } from 'app/stores/globalStore';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

const FAQS = [
  {
    title: '¿Qué precio tiene una consulta online?',
    description:
      'El precio de la rutina facial personalizada es de 99€ ( sale a 33€mes ya que dura 3 meses el tratamiento). Incluye la consulta con el médico para evaluar las necesidades de tu piel, los 3 productos que te enviamos a casa y la receta para una crema facial personalizada. La crema personalizada podrás encargarla en una farmacia y tiene un coste adicional de 25-40€.',
  },
  {
    title: '¿Qué es el cuidado facial de grado médico o farmacéutico?',
    description:
      'El cuidado facial de grado médico o farmacéutico es aquél que se adapta a las necesidades de cada paciente y que combina productos cosméticos con fármacos que únicamente pueden ser obtenidos mediante una receta, como es el caso de la formulación magistral.',
  },
  {
    title: '¿En qué tipo de afecciones pueden ayudarme?',
    description:
      'Contamos con una amplia red de dermatólogos estéticos para ofrecer un cuidado facial integral y atender cualquier necesidad estética de tu piel como: acné, poros obstruidos, puntos negros, líneas finas, pérdida de firmeza, manchas o rosácea, entre muchas más.',
  },
  {
    title: '¿Qué significa un cuidado facial personalizado?',
    description:
      'El cuidado facial personalizado consiste, en primer lugar, de una consulta médica para analizar las necesidades específicas de tu piel y, en segundo lugar, de la prescripción de una crema formulada exclusivamente para ti con tal de asegurar su eficacia y lograr resultados más notables y duraderos.',
  },
  {
    title:
      'Una vez tengo la receta, ¿cómo consigo mi crema facial personalizada?',
    description:
      'Las cremas faciales personalizadas son una combinación de fármacos exclusiva para un paciente específico, por tanto, se deben preparar de manera individual en un laboratorio. Así pues, deberás llevar tu receta a una farmacia para que encarguen su elaboración. Según los plazos establecidos, podrás recogerla en la farmacia por un precio de entre 25 y 40 €. Este precio lo establece cada laboratorio, no depende de nosotros, y puede variar dependiendo de las cantidades de cada ingrediente de la formulación magistral.',
  },
  {
    title: '¿Qué productos incluye la rutina facial complementaria?',
    description:
      'Todas las rutinas faciales complementarias contienen una espuma limpiadora y una crema de protección solar de alto espectro e hidratante indicada para todo tipo de pieles. Además, cada una de las rutinas incluye una crema para tratar el objetivo facial específico de cada paciente, desde las arrugas y el acné hasta las manchas o la rosácea.',
  },
];

export default function FaqsDerma() {
  const { deviceSize } = useSessionStore(store => store);

  return (
    <Container>
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

        {!deviceSize.isMobile && (
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
      </Flex>
    </Container>
  );
}
