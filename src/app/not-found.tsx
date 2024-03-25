import 'app/globals.css';

import ROUTES from '@utils/routes';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import MainLayoutSSR from './(web)/components/layout/MainLayoutSSR';

export default function NotFound() {
  return (
    <MainLayoutSSR>
      <Flex
        layout="col-center"
        className="py-48 w-full justify-center items-center"
      >
        <Container>
          <Title className="text-hg-secondary font-gtUltraThin font-light mb-2 textwrap-pretty">
            ¡Ups! Parece que esta página no existe
          </Title>
          <Text className="text-center mb-8">
            Descubre todos nuestros tratamientos
          </Text>
          <Button
            size="lg"
            type="tertiary"
            customStyles="bg-hg-secondary border-none text-white"
            href={ROUTES.treatments}
          >
            Ver tratamientos
            <SvgArrow className="ml-3 h-5 w-5" />
          </Button>
        </Container>
      </Flex>
    </MainLayoutSSR>
  );
}
