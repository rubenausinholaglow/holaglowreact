import { isMobileSSR } from '@utils/isMobileSSR';
import ROUTES from '@utils/routes';
import ClinicsSSR from 'app/(web)/components/common/ClinicsSSR';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import ProfessionalsSSR from 'app/(web)/components/common/ProfessionalsSSR';
import Testimonials from 'app/(web)/components/home/Testimonials';
import MainLayoutSSR from 'app/(web)/components/layout/MainLayoutSSR';
import ProductVideos from 'app/(web)/tratamientos/[slug]/components/ProductVideos';
import { SvgHolaglow, SvgHolaglowHand } from 'app/icons/Icons';
import {
  SvgArrow,
  SvgByGoogle,
  SvgCalling,
  SvgStar,
  SvgUserScan,
} from 'app/icons/IconsDs';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { Button } from 'designSystem/Buttons/Buttons';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import Link from 'next/link';

import LandingPPCFaqs from './components/LandingPPCFaqs';
import LeadLandingRegistrationForm from './components/LeadLandingRegistrationForm';

export default function LandingCaptacion() {
  const HEADER_HEIGHT = isMobileSSR()
    ? HEADER_HEIGHT_MOBILE
    : HEADER_HEIGHT_DESKTOP;
  const HEADER_HEIGHT_CLASS = `h-[${HEADER_HEIGHT}px]`;

  const videos = [
    {
      url: '6JTUo3RinD8',
      active: true,
    },
    {
      url: 'w2k8_rsVUow',
      active: true,
    },
    {
      url: 'ULjrbydmOiE',
      active: true,
    },
    {
      url: 'Bv1kC-be09U',
      active: true,
    },
    {
      url: 'yoFtEyG3Lgc',
      active: true,
    },
    {
      url: '3r1DnOMOEoQ',
      active: true,
    },
    {
      url: 'jdXB7I9HHrY',
      active: true,
    },
    {
      url: 'jIK-_jSETPg',
      active: true,
    },
  ];

  return (
    <MainLayoutSSR
      hideHeader
      className="bg-derma-secondary300"
      hideFloatingBottomBar
    >
      <meta name="robots" content="noindex,follow" />
      <header id="header" className="z-30 w-full bg-transparent">
        <Container isHeader>
          <Flex
            layout="row-between"
            className={`w-full relative py-4 lg:py-5 justify-between lg:justify-center ${HEADER_HEIGHT_CLASS}`}
          >
            <Link href={ROUTES.home} className="lg:absolute left-0 2xl:ml-20">
              <SvgHolaglow
                fill={HOLAGLOW_COLORS['secondary']}
                className="h-[24px] lg:h-[32px] w-[98px] lg:w-[130px]"
              />
            </Link>

            <Flex
              layout="row-center"
              className="lg:absolute right-0 gap-3 2xl:mr-20"
            >
              <div className="scroll-smooth">
                <Button
                  className="md:order-2"
                  size={isMobileSSR() ? 'sm' : 'md'}
                  type="white"
                  href="#leadForm"
                  customStyles="bg-transparent"
                >
                  Reservar cita
                  <SvgArrow
                    height={16}
                    width={16}
                    className="ml-2 hidden md:block"
                  />
                </Button>
              </div>

              <Button
                size={isMobileSSR() ? 'sm' : 'md'}
                type="secondary"
                href="tel:+34 682 417 208"
                customStyles="bg-transparent md:bg-inherit border-0 md:border md:border-hg-secondary"
              >
                <SvgCalling className=" text-hg-black md:text-hg-secondary h-6 w-6 md:h-4 md:w-4 -mr-4 md:mr-2" />
                <span className="hidden md:inline">(+34) 682 417 208</span>
              </Button>
            </Flex>
          </Flex>
        </Container>
      </header>

      <div className="relative">
        <Container className="pt-12 pb-8 md:py-16 flex flex-col md:flex-row">
          <div className="flex md:w-1/2  md:pl-12 ml-auto">
            <Flex layout="col-left">
              <Text className="font-bold mb-4 md:mb-8 text-3xl font-gtUltra text-hg-secondary md:text-5xl lg:text-6xl">
                Cita de asesoramiento gratis con escáner facial
              </Text>
              <Flex className="absolute bottom-8 left-0 right-0 md:relative md:bottom-0 mx-auto md:mx-0 w-full justify-center md:justify-start">
                <div className="scroll-smooth">
                  <Button isAnimated size="xl" type="primary" href="#leadForm">
                    <SvgUserScan className="mr-2 h-6 w-6" />
                    Pedir cita
                  </Button>
                </div>
              </Flex>
            </Flex>
          </div>
          <div className="md:absolute top-0 bottom-0 left-0 right-1/2">
            <div className="relative h-full">
              <Image
                src="/images/statics/landings/captacion/PVWider.png"
                alt="descubre"
                className="object-cover object-right-bottom"
                fill
              />
            </div>
          </div>
        </Container>
        <Image
          src="/images/statics/landings/captacion/PVWider.png"
          alt="descubre"
          height={1552}
          width={1440}
          className="md:hidden w-full"
        />
      </div>

      <div className="bg-hg-secondary/30 py-4">
        <Container>
          <Flex className="gap-4 w-full">
            <SvgHolaglowHand className="h-[72px] w-[72px] p-3 bg-hg-secondary text-hg-primary rounded-full shrink-0" />
            <Flex layout="col-left" className="gap-1 w-full">
              <Text className="font-semibold text-lg">
                Holaglow clinics{' '}
                <span className="inline-block text-xs text-hg-black500 font-normal md:ml-6">
                  +1000 pacientes atendidos
                </span>
              </Text>
              <Flex className="gap-2 text-hg-secondary w-full">
                <Text className="font-semibold text-lg -mb-1">4.9</Text>
                <SvgStar />
                <SvgStar />
                <SvgStar />
                <SvgStar />
                <SvgStar />
                <SvgByGoogle className="ml-auto -mb-1" />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </div>

      <div className="bg-hg-tertiary/10">
        <Container className="pt-12 md:pt-16 ">
          <Title isAnimated size="2xl" className="font-bold mb-4 md:mb-8">
            ¿En qué consiste nuestro asesoramiento?
          </Title>
        </Container>

        <Container className="px-0 md:px-4 pb-12 md:pb-16 ">
          <Flex className="w-full md:gap-16 items-start">
            <Carousel
              controlstyles="px-4"
              hasDots={isMobileSSR()}
              dragEnabled
              touchEnabled
              visibleSlides={isMobileSSR() ? 1.25 : 3}
            >
              {[
                {
                  icon: 'SvgCalendar',
                  iconFamily: 'older',
                  title: 'Pide tu cita gratis',
                  description:
                    'Reserva una cita con nuestro equipo médico y cuéntanos qué objetivos tienes para tu piel',
                },
                {
                  icon: 'SvgUserScan',
                  iconFamily: 'default',
                  title: 'Escáner facial en 3D',
                  description:
                    'Usamos la última tecnología para generar tu imagen en tres dimensiones y ver los resultados que tendrían distintos tratamientos',
                },
                {
                  icon: 'SvgDiamond',
                  iconFamily: 'older',
                  title: 'Elige los resultados que deseas',
                  description:
                    'Diseñaremos el tratamiento ideal con la información del escáner para conseguir los resultados que quieres',
                },
              ].map((item, index) => (
                <div className="p-4 h-full flex w-full" key={item.title}>
                  <div
                    className=" bg-derma-secondary400 border border-hg-secondary700 rounded-2xl p-4 md:p-6 md:py-10 relative justify-center items-center"
                    style={{
                      boxShadow: '0px 4px 12px 0px #A96FE74D',
                    }}
                  >
                    <span className="absolute top-0 left-0 px-6 border-b border-r border-hg-secondary700 font-gtUltra text-3xl text-hg-secondary500 font-bold">
                      {index + 1}
                    </span>
                    <DynamicIcon
                      family={item.iconFamily as 'default' | 'older'}
                      name={item.icon}
                      height={48}
                      width={48}
                      className="text-hg-secondary mx-auto mb-8"
                    />
                    <Text className="text-center text-xl font-semibold text-hg-secondary mb-4">
                      {item.title}
                    </Text>
                    <Text className="text-center text-hg-black500">
                      {item.description}
                    </Text>
                  </div>
                </div>
              ))}
            </Carousel>
          </Flex>
        </Container>
      </div>

      <div className="bg-derma-secondary300">
        <Container className="pt-12 md:pt-16 ">
          <Title isAnimated size="2xl" className="font-bold mb-8 md:mb-12">
            Antes y después
          </Title>
        </Container>

        <Container className="px-0 md:px-4 pb-12 md:pb-16 ">
          <Flex className="w-full md:gap-16 items-start">
            <Carousel
              controlstyles="px-4"
              hasControls
              hasCounter={isMobileSSR()}
              dragEnabled
              touchEnabled
              visibleSlides={isMobileSSR() ? 1 : 3}
              className="md:px-0 rounded-xl aspect-square md:aspect-auto"
            >
              {[
                {
                  treatment: 'Aumento de labios',
                  src: 'https://www.holaglow.com/_next/image?url=https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/1.jpg&w=1080&q=75',
                },
                {
                  treatment:
                    'Arrugas de expresión: frente, entrecejo y patas de gallo',
                  src: 'https://www.holaglow.com/_next/image?url=https://budgetimages.blob.core.windows.net/images/antes-y-despues/arrugas-expresion-frente-entrecejo-patas-gallo/1.jpg&w=1080&q=75',
                },
                {
                  treatment: 'Relleno de ojeras',
                  src: 'https://www.holaglow.com/_next/image?url=https://budgetimages.blob.core.windows.net/images/antes-y-despues/relleno-ojeras/1.jpg&w=1080&q=75',
                },
                {
                  treatment: 'Rinomodelacion',
                  src: 'https://www.holaglow.com/_next/image?url=https://budgetimages.blob.core.windows.net/images/antes-y-despues/rinomodelacion/1.jpg&w=1080&q=75',
                },
                {
                  treatment: 'Proyeccion de mentón',
                  src: 'https://www.holaglow.com/_next/image?url=https://budgetimages.blob.core.windows.net/images/antes-y-despues/proyeccion-menton/1.jpg&w=1080&q=75',
                },
                {
                  treatment: 'Surco nasogeniano',
                  src: 'https://www.holaglow.com/_next/image?url=https://budgetimages.blob.core.windows.net/images/antes-y-despues/surco-nasogeniano/1.jpg&w=1080&q=75',
                },
              ].map(item => (
                <div className="px-4 h-full flex w-full" key={item.treatment}>
                  <div className="overflow-hidden relative flex flex-col h-full w-full  justify-between ">
                    <Flex className="grow w-full justify-center mb-6">
                      <Text className="font-semibold text-center text-lg">
                        {item.treatment}
                      </Text>
                    </Flex>
                    <div className="relative aspect-square">
                      <Image
                        src={item.src || ''}
                        alt={'antes y despues ' + item.treatment}
                        fill
                        className="object-cover rounded-3xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </Flex>
        </Container>
      </div>

      <div className="bg-hg-secondary100 py-12 md:py-16">
        <ProfessionalsSSR />
      </div>

      <div className="md:bg-hg-secondary/30 relative z-10" id="leadForm">
        <Container className="px-0 md:py-16 md:px-4">
          <Flex className="w-full gap-8 md:gap-12 items-start">
            <div className="hidden md:block md:w-1/2">
              <Title isAnimated size="2xl" className="font-bold mb-4 md:mb-8">
                Pide tu cita gratis
              </Title>
              <Text className="text-hg-black500 mb-8 md:text-lg">
                Te asesoraremos con nuestro escáner facial 3D
              </Text>
            </div>
            <div
              className="md:w-1/2 bg-derma-secondary500 rounded-3xl p-4 md:p-8 border border-hg-secondary700 md:border-0 -mb-4 md:-mb-0"
              style={{ boxShadow: '0px 4px 12px 0px #A96FE74D' }}
            >
              <div className="md:hidden pt-4">
                <Title isAnimated size="2xl" className="font-bold mb-4 md:mb-8">
                  Pide tu cita gratis
                </Title>
                <Text className="text-hg-black500 mb-8 md:text-lg">
                  Te asesoraremos con nuestro escáner facial 3D
                </Text>
              </div>
              <LeadLandingRegistrationForm />
            </div>
          </Flex>
        </Container>
      </div>

      <ClinicsSSR className="pt-8" />

      <div className="bg-hg-secondary/10">
        <Container className="pt-12 md:pt-16 ">
          <Title isAnimated size="2xl" className="font-bold mb-4 md:mb-8">
            Vive la experiencia glow
          </Title>
        </Container>
        <Container className="pl-4 pr-0 md:px-4 pb-12 md:pb-16">
          <Carousel
            controlstyles="px-4"
            hasDots={isMobileSSR()}
            hasControls={!isMobileSSR()}
            dragEnabled
            touchEnabled
            visibleSlides={isMobileSSR() ? 1.33 : 3}
          >
            {[
              '/images/statics/landings/captacion/ppcSlider1.jpg',
              '/images/statics/landings/captacion/ppcSlider2.jpg',
              '/images/statics/landings/captacion/ppcSlider3.jpg',
              '/images/statics/landings/captacion/ppcSlider4.jpg',
            ].map(image => (
              <div className="aspect-[2/3] relative mr-4" key={image}>
                <Image
                  fill
                  src={image}
                  alt="Descubre la experiencia Glow"
                  className="object-cover rounded-3xl"
                />
              </div>
            ))}
          </Carousel>
        </Container>
      </div>

      <ProductVideos videos={videos} />

      <div className="bg-white/50">
        <Testimonials />
      </div>

      <div className="bg-hg-secondary">
        <Container className="py-12 md:py-16">
          <Flex className="flex-col items-center gap-4 md:gap-8">
            <SvgUserScan className="h-12 w-12 md:h-16 md:w-16 text-hg-secondary300" />
            <Title
              isAnimated
              size="2xl"
              className="text-hg-primary text-3xl font-bold text-center"
            >
              Asesórate con nuestro equipo médico
            </Title>
            <div className="scroll-smooth">
              <Button
                size="lg"
                type="primary"
                href="#leadForm"
                customStyles="bg-hg-secondary300 text-hg-secondary hover:bg-hg-secondary100"
              >
                Pedir cita gratis
              </Button>
            </div>
          </Flex>
        </Container>
      </div>

      <LandingPPCFaqs />
    </MainLayoutSSR>
  );
}
