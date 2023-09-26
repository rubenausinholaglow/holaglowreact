import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  SimpleAccordion,
} from 'designSystem/Accordion/Accordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgAdd } from 'icons/IconsDs';

export default function ProductFaqs() {
  return (
    <Container className="py-12">
      <Title size="2xl" className="font-bold mb-8 md:mb-12">
        Consulta las preguntas{' '}
        <Underlined color={HOLAGLOW_COLORS['primary']}>frecuentes</Underlined>
      </Title>

      <Flex layout="col-left" className="gap-6 md:flex-row md:gap-16">
        <Flex layout="col-left" className="w-full gap-6 md:w-1/2">
          <SimpleAccordion
            className="border-b border-hg-black pb-4"
            trigger="¿Podré ver los resultados de manera instantánea?"
            triggerStyles="text-left items-start font-semibold"
            iconStyles="mt-1"
          >
            <Text size="sm" className="text-hg-black500 py-4">
              En Holaglow defendemos una medicina estética que cuida y, para
              ello, la profesionalidad y la empatía son fundamentales. Todos
              nuestros doctores comparten el mismo compromiso: ponerse en tu
              piel, de manera literal y metafóricamente.
            </Text>
          </SimpleAccordion>
          <SimpleAccordion
            className="border-b border-hg-black pb-4"
            trigger="¿Cuánto tiempo duran los resultados del ácido hialurónico?"
            triggerStyles="text-left items-start font-semibold"
            iconStyles="mt-1"
          >
            <Text size="sm" className="text-hg-black500 py-4">
              En Holaglow defendemos una medicina estética que cuida y, para
              ello, la profesionalidad y la empatía son fundamentales. Todos
              nuestros doctores comparten el mismo compromiso: ponerse en tu
              piel, de manera literal y metafóricamente.
            </Text>
          </SimpleAccordion>
        </Flex>
        <Flex layout="col-left" className="w-full gap-6 md:w-1/2">
          <SimpleAccordion
            className="border-b border-hg-black pb-4"
            trigger="¿La aplicación de ácido hialurónico es dolorosa?"
            triggerStyles="text-left items-start font-semibold"
            iconStyles="mt-1"
          >
            <Text size="sm" className="text-hg-black500 py-4">
              En Holaglow defendemos una medicina estética que cuida y, para
              ello, la profesionalidad y la empatía son fundamentales. Todos
              nuestros doctores comparten el mismo compromiso: ponerse en tu
              piel, de manera literal y metafóricamente.
            </Text>
          </SimpleAccordion>
          <SimpleAccordion
            className="border-b border-hg-black pb-4"
            trigger="¿Qué efectos secundarios puede tener el ácido hialurónico?"
            triggerStyles="text-left items-start font-semibold"
            iconStyles="mt-1"
          >
            <Text size="sm" className="text-hg-black500 py-4">
              En Holaglow defendemos una medicina estética que cuida y, para
              ello, la profesionalidad y la empatía son fundamentales. Todos
              nuestros doctores comparten el mismo compromiso: ponerse en tu
              piel, de manera literal y metafóricamente.
            </Text>
          </SimpleAccordion>
        </Flex>
      </Flex>
    </Container>
  );
}
