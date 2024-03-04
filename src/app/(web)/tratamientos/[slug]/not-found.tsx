import ROUTES from '@utils/routes';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

export default function NotFound() {
  return (
    <Flex
      layout="col-center"
      className="h-screen w-full justify-center items-center"
    >
      <Container>
        <Title className="text-hg-secondary font-gtUltraThin font-light mb-2">
          ¡Ups! este tratamiento no existe
        </Title>
        <Text className="text-center mb-8">
          Descubre todos nuestros tratamientos en el siguiente botón
        </Text>
        <Button
          size="lg"
          type="tertiary"
          customStyles="bg-hg-secondary border-none text-white"
          href={ROUTES.treatments}
        >
          Ver todos los tratamientos
          <SvgArrow className="ml-3 h-5 w-5" />
        </Button>
      </Container>
    </Flex>
  );
}
