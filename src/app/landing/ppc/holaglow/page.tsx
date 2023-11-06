'use client';

import { useEffect } from 'react';
import Clinics from 'app/components/common/Clinics';
import Professionals from 'app/components/common/Professionals';
import RegistrationForm from 'app/components/common/RegistrationForm';
import GoogleStars from 'app/components/home/GoogleStars';
import GoToTreatments from 'app/components/home/GoToTreatments';
import Products from 'app/components/home/Products';
import MainLayout from 'app/components/layout/MainLayout';
import FullWidthCarousel from 'app/components/product/fullWidthCarousel';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgHolaglow } from 'icons/Icons';
import { SvgArrow } from 'icons/IconsDs';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProduct } from 'utils/fetch';

import ConsistOf from './components/ConsistOF';
import LandingTestimonials from './components/LandingTestimonials';

export default function LandingCaptacion() {
  const {
    deviceSize,
    setSelectedTreatments,
    setSelectedSlot,
    setSelectedClinic,
    analyticsMetrics,
    setAnalyticsMetrics,
  } = useGlobalPersistedStore(state => state);

  const HEADER_HEIGHT = deviceSize.isMobile
    ? HEADER_HEIGHT_MOBILE
    : HEADER_HEIGHT_DESKTOP;
  const HEADER_HEIGHT_CLASS = `h-[${HEADER_HEIGHT}px]`;

  useEffect(() => {
    setSelectedSlot(undefined);
    setSelectedClinic(undefined);
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId);
      setSelectedTreatments([productDetails]);
    }

    initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID!);
    var varToBreak = null as any;
    varToBreak.id = '1';
    analyticsMetrics.treatmentText = 'LandingPPCHolaglow';
    analyticsMetrics.externalReference = 'Landing';
    analyticsMetrics.utmAdgroup = '';
    analyticsMetrics.utmCampaign = '';
    analyticsMetrics.utmContent = '';
    analyticsMetrics.utmMedium = '';
    analyticsMetrics.utmSource = '';
    analyticsMetrics.utmTerm = '';
    analyticsMetrics.locPhysicalMs = '';
    setAnalyticsMetrics(analyticsMetrics);
  }, []);

  return (
    <MainLayout hideHeader>
      <meta name="robots" content="noindex,follow" />
      <header id="header" className="z-30 w-full bg-white">
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
              className="lg:absolute right-0  2xl:mr-20"
            >
              <Button
                size={deviceSize.isMobile ? 'sm' : 'md'}
                type="tertiary"
                href={ROUTES.checkout.clinics}
              >
                Reservar cita
                <SvgArrow
                  height={16}
                  width={16}
                  className="ml-2 hidden md:block"
                />
              </Button>
            </Flex>
          </Flex>
        </Container>
      </header>

      <Container className="px-0 md:px-4 overflow-hidden">
        <div className="px-4 md:px-0 relative md:grid md:grid-cols-2 pt-12 pb-16 border-b border-hg-black">
          <div className="col-start-2 md:ml-16">
            <Title size="2xl" className="font-bold mb-4 md:mb-8">
              Asesórate{' '}
              <Underlined color={HOLAGLOW_COLORS['primary']}>gratis</Underlined>{' '}
              con nuestro equipo médico
            </Title>
            <Text className="w-[220px] md:w-full md:mb-12">
              Pide tu primera cita médica e infórmate sobre medicina estética
              sin compromiso
            </Text>
            <Flex className="hidden md:block md:justify-start">
              <Button
                size="xl"
                type="tertiary"
                customStyles="bg-hg-primary hover:bg-hg-secondary100"
                href="#leadForm"
              >
                Pide tu cita médica gratis
              </Button>
            </Flex>
          </div>
          <div className="row-start-1">
            <Image
              src={`/images/statics/landings/captacion/hero${
                deviceSize.isMobile ? '' : 'Desktop'
              }.png`}
              alt="Asesórate gratis con nuestro equipo médico"
              height={1044}
              width={924}
              className="translate-x-4 -translate-y-[5%] md:translate-y-0 md:translate-x-0"
            />
            <Flex className="justify-center col-start-2 -mt-[40%] md:hidden md:mt-auto md:self-start md:justify-start md:ml-16 ">
              <Button
                size="xl"
                type="tertiary"
                customStyles="bg-hg-primary hover:bg-hg-secondary100"
                href="#leadForm"
              >
                Pide tu cita médica gratis
              </Button>
            </Flex>
          </div>
        </div>
      </Container>

      <Container className="relative px-0">
        <div className="md:absolute right-0 -top-[45px]">
          <GoogleStars hideOnDesktop={false} />
        </div>
      </Container>

      <ConsistOf />

      <Products hideCategorySelector />

      <div className="bg-[url('/images/statics/landings/captacion/testimonialsBg.svg')] md:bg-[url('/images/statics/landings/captacion/testimonialsBg-desktop.svg')] bg-no-repeat bg-center pb-12 md:py-16">
        <LandingTestimonials />
      </div>

      <div
        className="bg-hg-black100 pb-4 rounded-t-2xl md:bg-hg-secondary100"
        id="leadForm"
      >
        <Container className="py-8 md:py-16">
          <Flex
            layout="col-left"
            className="md:flex md:flex-row items-center md:gap-16"
          >
            <div className="md:order-2">
              <Title size="2xl" className="font-bold mb-4">
                Rellena el formulario para{' '}
                <Underlined color={HOLAGLOW_COLORS['primary']}>
                  agendar
                </Underlined>{' '}
                tu cita
              </Title>
              <Text className="text-hg-black500 mb-8 md:text-lg">
                En el siguiente paso podrás seleccionar clínica
              </Text>
            </div>
            <div className="md:bg-hg-black50 md:p-8 rounded-2xl shrink-0 md:shadow-centered-secondary">
              <RegistrationForm />
            </div>
          </Flex>
        </Container>
      </div>

      <div className="bg-hg-pink/30 py-16">
        <Container className="px-0 md:flex md:flex-row items-center">
          <Container className="mb-4 md:w-3/4">
            <Title size="2xl" className="font-bold mb-4">
              Diseñamos contigo un tratamiento{' '}
              <Underlined color={HOLAGLOW_COLORS['primary']}>
                a tu medida
              </Underlined>
            </Title>
          </Container>

          <Container className="mt-12 pt-6 md:mt-0 px-0 md:px-4 md:w-2/5 shrink-0 overflow-hidden md:overflow-auto">
            <Image
              src="/images/statics/landings/captacion/comoFunciona.png"
              alt="¿Cómo Funciona?"
              width={816}
              height={816}
              className="w-full scale-[115%] md:scale-100 mt-4"
            />
          </Container>
        </Container>
        <FullWidthCarousel
          className="pb-8 -mt-8"
          visibleSlides={deviceSize.isMobile ? 1.5 : null}
          isPlaying
        >
          {Array.from({ length: 15 }, (_, index) => (
            <div
              className="aspect-[3/4] relative h-[300px] md:h-[350px] mr-8 rounded-3xl overflow-hidden"
              key={index}
            >
              <Image
                src={`/images/statics/landings/captacion/comoFunciona/${
                  index + 1
                }.jpg`}
                alt={`Cómo funciona ${index}`}
                fill
                className="object-cover"
                loading="eager"
              />
            </div>
          ))}
        </FullWidthCarousel>

        <Container>
          <Flex className="justify-center">
            <Button
              size="xl"
              type="tertiary"
              customStyles="bg-hg-primary hover:bg-hg-secondary100"
              href="#leadForm"
            >
              Pide tu cita médica gratis
            </Button>
          </Flex>
        </Container>
      </div>

      <div className="bg-[#f8fefe] pt-12 pb-24 md:py-16">
        <Professionals />
      </div>

      <Clinics />
      <GoToTreatments />
    </MainLayout>
  );
}
