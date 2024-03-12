import { SvgGoogle, SvgStar } from 'app/icons/IconsDs';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import ROUTES from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HomeHero() {
  return (
    <div
      className="
        relative pt-24 md:pt-36 -mt-[56px] md:-mt-[72px] 
        bg-[url('/images/home/bg.png')] md:bg-[url('/images/home/bg-desktop.png')] bg-cover bg-bottom
      "
    >
      <Image
        src="/images/home/bg.png"
        fill
        alt="holaglow"
        objectFit="cover"
        objectPosition="bottom"
        priority
        className="md:hidden"
      />
      <Image
        src="/images/home/bg-desktop.png"
        fill
        alt="holaglow"
        objectFit="cover"
        objectPosition="bottom"
        priority
        className="hidden md:block"
      />
      <Container isHeader className="relative overflow-hidden">
        <Flex layout="col-left" className="md:flex-row w-full">
          <Flex
            layout="col-left"
            className="z-10 w-full md:w-1/2 md:pb-80 mb-8 md:mb-0"
          >
            <Text className="mb-6 font-semibold md:text-lg" origin="top">
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
              className="hidden md:block"
            >
              <Text className="text-lg">Ver tratamientos</Text>
            </Button>
          </Flex>
          <Flex
            layout="row-left"
            className="mb-80 gap-2 bg-white/20 rounded-full px-4 md:ml-auto md:mb-0"
          >
            <SvgStar className="-mt-1" />
            <span>4,7</span>
            <SvgGoogle className="h-10" />
          </Flex>
          <Flex className="justify-center w-full pb-12 md:hidden">
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
