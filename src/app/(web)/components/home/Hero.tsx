import { isMobileSSR } from '@utils/isMobileSSR';
import { SvgGoogle, SvgStar } from 'app/icons/IconsDs';
import ROUTES from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HomeHero() {
  const heroImgSrc = isMobileSSR()
    ? '/images/home/bg.png'
    : '/images/home/bg-desktop.png';

  return (
    <div className="relative pt-20 md:pt-32 -mt-[56px] md:-mt-[72px]">
      <Image
        src={heroImgSrc}
        fill
        priority
        className="object-cover object-right-bottom"
        alt="Medicina estética para cuidar tu piel"
      />
      <Container isHeader className="relative overflow-hidden">
        <Flex layout="col-left" className="md:flex-row w-full">
          <Flex
            layout="col-left"
            className="z-10 w-full md:w-1/2 md:pb-64 2xl:pb-96 mb-8 md:mb-0"
          >
            <Title
              as="h1"
              size="2xl"
              className="text-left font-bold leading-none md:mb-12"
              origin="right"
            >
              Medicina estética para cuidar tu piel
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
            className="mb-72 gap-2 bg-white/20 rounded-full px-4 md:ml-auto md:mb-0"
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
