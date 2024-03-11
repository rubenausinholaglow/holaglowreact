import { HOLAGLOW_COLORS } from 'app/utils/colors';
import ROUTES from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { isMobile } from '../layout/Breakpoint';

export default function HomeHero() {
  return (
    <div className="relative border-4 border-hg-secondary">
      <Image
        src="/images/home/bg-desktop.png"
        fill
        alt="holaglow"
        className="object-cover bg-bottom"
      />
      <Container className="relative border-b border-hg-black overflow-hidden">
        <Flex layout="col-center" className="md:flex-row">
          <Flex
            layout="col-left"
            className="pb-10 z-10 w-full md:w-[45%] md:pl-8"
          >
            <Text size="xl" className="mb-2" origin="top">
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
              Ver tratamientos
            </Button>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
