import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';

export default function HomeHero() {
  return (
    <Container className=" mb-6 border-b border-hg-black">
      <Flex layout="col-left" className="py-36 ml-[60%] ">
        <Text size="xl" className="mb-2">
          Medicina estética
        </Text>
        <Title size="3xl" className="font-bold leading-none mb-12">
          Tu <Underlined color={HOLAGLOW_COLORS['lime']}>glow</Underlined>,
          <br />
          tus reglas
        </Title>
        <Button type="primary" size="xl">
          Ver tratamientos
        </Button>
      </Flex>
    </Container>
  );
}
