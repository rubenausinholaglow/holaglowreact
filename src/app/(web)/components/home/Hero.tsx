import { HOLAGLOW_COLORS } from 'app/utils/colors';
import ROUTES from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { isMobile } from '../layout/Breakpoint';

export default function HomeHero() {
  return (
    <div className="relative pt-56">
      <Image
        src="/images/home/bg-desktop.png"
        fill
        alt="holaglow"
        objectFit="cover"
        objectPosition="bottom"
      />
      <Container className="relative overflow-hidden max-w-2xl">
        <Flex layout="col-center" className="md:flex-row">
          <Flex layout="col-left" className="pb-48 z-10 w-full md:w-1/2">
            <Text size="lg" className="mb-6 font-semibold" origin="top">
              Medicina estética
            </Text>
            <Title
              size="3xl"
              className="text-left font-bold leading-none mb-6 md:mb-12"
              origin="right"
            >
              Tu{' '}
              <Underlined color={HOLAGLOW_COLORS['primary']}>glow</Underlined>,
              <br />
              tus normas
            </Title>
            <Button
              id={'tmevent_header_button'}
              type="primary"
              size="xl"
              href={ROUTES.treatments}
            >
              <Text className="text-lg">Ver tratamientos</Text>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
