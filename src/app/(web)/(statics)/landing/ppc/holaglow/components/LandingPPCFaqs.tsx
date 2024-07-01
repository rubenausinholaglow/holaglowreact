import { isMobileSSR } from '@utils/isMobileSSR';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

const FAQS = [
  {
    title: '¿Qué esperar de la cita de asesoramiento?',
    description:
      'La finalidad de la cita de asesoramiento gratuita es entender qué te gustaría conseguir mediante la medicina estética para poder presentarte todas las opciones disponibles para ti. Para ello nos apoyamos en nuestro escáner facial 3D. Así podrás ver el efecto que tendría cada uno de los tratamientos sobre tu rostro y recibir toda la información para valorar la mejor opción para ti. ',
  },

  {
    title: '¿Cómo funciona el escáner facial 3D?',
    description:
      'Generamos una imagen en 3D de tu rostro a partir de varias fotos que te haremos el mismo día. Con esto podemos modificar tu imagen digital para que veas el antes y después de cada uno de los tratamientos que estás valorando y puedas decidir cuál te interesa más.',
  },

  {
    title: '¿Qué tratamientos hay en Holaglow?',
    description:
      'La medicina estética nos permite reducir los signos del envejecimiento, armonizar los rasgos del rostro o mejorar la calidad de piel y cabello con tratamientos no invasivos. Para ello nuestros médicos emplean una selección de los mejores productos del mercado para conseguir resultados naturales y duraderos.',
  },

  {
    title: 'Métodos de pago disponibles',
    description:
      'La cita de asesoramiento es gratuita. Si decides hacerte alguno de los tratamientos disponibles en Holaglow podrás abonarlo el día del tratamiento o antes en efectivo, con tarjeta de crédito o débito o financiarlo para pagar en los plazos que decidas.',
  },
];

export default function LandingPPCFaqs() {
  return (
    <Container className="py-12">
      <Title isAnimated size="2xl" className="font-bold mb-8 md:mb-12">
        Preguntas Frecuentes
      </Title>

      <Flex
        layout="col-left"
        className="w-full gap-8 md:grid md:grid-cols-2 md:gap-16"
      >
        {isMobileSSR() &&
          FAQS.map((faq, index) => {
            return (
              <SimpleAccordion
                key={faq.title}
                className="pb-4 md:mb-0 border-b border-hg-black"
                trigger={faq.title}
                triggerStyles="text-left items-start font-semibold"
              >
                <Text size="sm" className="text-hg-black500 pt-4">
                  {faq.description}
                </Text>
              </SimpleAccordion>
            );
          })}

        {!isMobileSSR() && (
          <Flex layout="col-left" className="w-full gap-6">
            {FAQS.map((faq, index) => {
              if (index % 2 === 0) {
                return (
                  <SimpleAccordion
                    key={faq.title}
                    className="pb-4 md:mb-0 border-b border-hg-black"
                    trigger={faq.title}
                    triggerStyles="text-left items-start font-semibold pb-2"
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

        {!isMobileSSR() && (
          <Flex layout="col-left" className="w-full gap-6">
            {FAQS.map((faq, index) => {
              if (index % 2 !== 0) {
                return (
                  <SimpleAccordion
                    key={faq.title}
                    className="pb-4 md:mb-0 border-b border-hg-black"
                    trigger={faq.title}
                    triggerStyles="text-left items-start font-semibold pb-2"
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
