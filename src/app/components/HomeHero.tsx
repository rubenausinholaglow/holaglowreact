import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Text } from 'components/Texts';

export default function HomeHero() {
  return (
    <Container className="border-b border-hg-black">
      <Flex layout="col-center">
        <Text>Medicina estética</Text>
        <Text>Tu glow</Text>
        <Text>Tus reglas</Text>
        <Button style="primary">Ver tratamientos</Button>
      </Flex>
    </Container>
  );
}
