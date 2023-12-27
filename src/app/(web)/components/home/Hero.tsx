import { HOLAGLOW_COLORS } from 'app/utils/colors';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HomeHero() {
  const ROUTES = useRoutes();

  return (
    <Container className="relative border-b border-hg-black overflow-hidden">
      <Flex layout="col-center" className="md:flex-row">
        <Image
          src="/images/home/Header.png"
          alt="Holaglow"
          width={1195}
          height={1500}
          className="h-auto w-full scale-[135%] mt-[18%] md:w-[55%] md:scale-100 md:mt-0 md:py-16 ml-[15%] md:ml-0"
        />
        <Flex
          layout="col-left"
          className="pb-10 z-10 w-full md:w-[45%] md:pl-8"
        >
          <Text size="xl" className="mb-2" isAnimated origin="top">
            Medicina estética
          </Text>
          <Title
            size="3xl"
            className="text-left font-bold leading-none mb-6 md:mb-12"
            isAnimated
            origin="right"
          >
            Tu <Underlined color={HOLAGLOW_COLORS['primary']}>glow</Underlined>,
            <br />
            tus normas
          </Title>
          <Button
            id={'tmevent_header_button'}
            type="primary"
            size="xl"
            href={ROUTES.treatments}
            isAnimated
          >
            Ver tratamientos
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
