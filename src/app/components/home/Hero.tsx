import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';

export default function HomeHero() {
  return (
    <Container className="border-b border-hg-black">
      <Flex layout="col-left" className="pt-[250px] pb-10 md:py-36 md:ml-[55%]">
        <Text size="xl" className="mb-2">
          Medicina estética
        </Text>
        <Title size="3xl" className="font-bold leading-none mb-6 md:mb-12">
          Tu <Underlined color={HOLAGLOW_COLORS['primary']}>glow</Underlined>,
          <br />
          tus normas
        </Title>
        <Flex>
          <Button
            type="primary"
            size="xl"
            href={ROUTES.products}
            className="mr-2"
          >
            Ver tratamientos
          </Button>
          <Button type="tertiary" size="xl" href={ROUTES.checkout.clinics}>
            Pedir cita
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
