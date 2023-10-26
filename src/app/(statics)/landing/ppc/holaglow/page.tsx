'use client';

import GoogleStars from 'app/components/home/GoogleStars';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgHolaglow } from 'icons/Icons';
import { SvgArrow, SvgCross, SvgMenu } from 'icons/IconsDs';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingCaptacion() {
  const { deviceSize, setSelectedTreatments } = useGlobalPersistedStore(
    state => state
  );

  const HEADER_HEIGHT = deviceSize.isMobile
    ? HEADER_HEIGHT_MOBILE
    : HEADER_HEIGHT_DESKTOP;
  const HEADER_HEIGHT_CLASS = `h-[${HEADER_HEIGHT}px]`;

  return (
    <>
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
                onClick={() => {
                  setSelectedTreatments([]);
                }}
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

      <Container>
        <div className="pt-6 pb-12 border-b border-hg-black">
          <Title size="2xl" className="font-bold mb-4">
            Asesórate{' '}
            <Underlined color={HOLAGLOW_COLORS['primary']}>gratis</Underlined>{' '}
            con nuestro equipo médico
          </Title>
          <Text className="w-1/2 relative">
            Pide tu primera cita médica e infórmate sobre medicina estética sin
            compromiso
          </Text>
          <Image
            src="/images/statics/landings/captacion/hero.png"
            alt="Asesórate gratis con nuestro equipo médico"
            height={1044}
            width={924}
            className="w-4/5 ml-auto -mt-[30%]"
          />
          <Flex className="justify-center">
            <Button size="xl" type="secondary" href="#leadForm">
              Pide tu cita médiga gratis
            </Button>
          </Flex>
        </div>
      </Container>

      <GoogleStars />

      <Container className="py-8">
        <Title size="2xl" className="font-bold mb-4">
          ¿En qué{' '}
          <Underlined color={HOLAGLOW_COLORS['primary']}>consiste</Underlined>?
        </Title>

        <Carousel
          hasControls
          className="relative mb-12"
          isIntrinsicHeight
          visibleSlides={visibleTestimonials()}
          infinite={false}
          sliderStyles={`${deviceSize.isMobile ? '' : 'gap-16'}`}
        >
          {shuffledTestimonials.map((item: Testimonial) => (
            <Testimonial
              key={item.name}
              imgUrl={item.imgUrl}
              name={item.name}
              testimonial={item.testimonial}
            />
          ))}
        </Carousel>

        <Flex className="justify-center">
          <Button size="xl" type="secondary" href="#leadForm">
            ¡Yo quiero!
          </Button>
        </Flex>
      </Container>
    </>
  );
}
