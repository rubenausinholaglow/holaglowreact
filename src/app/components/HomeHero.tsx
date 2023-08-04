import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Text, Underlined } from 'components/Texts';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function HomeHero() {
  return (
    <Container className="border-b border-hg-black mb-6">
      <Flex layout="col-left" className="py-20 ml-[60%]">
        <Text size="3xl" className="mb-2">
          Medicina estética
        </Text>
        <Text className="text-[84px] font-bold leading-none mb-12">
          Tu <Underlined color={HOLAGLOW_COLORS['lime']}>glow</Underlined>,
          <br />
          tus reglas
        </Text>
        <Button style="hero" size="lg">
          Ver tratamientos
        </Button>
      </Flex>
    </Container>
  );
}
