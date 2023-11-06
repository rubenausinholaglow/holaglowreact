'use client';

import { useEffect, useState } from 'react';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import Clinics from './components/common/Clinics';
import FloatingBottomBar from './components/home/FloatingBottomBar';
import GoogleStars from './components/home/GoogleStars';
import GoToTreatments from './components/home/GoToTreatments';
import Hero from './components/home/Hero';
import Professionals from './components/home/HomeProfessionals';
import Products from './components/home/Products';
import Testimonials from './components/home/Testimonials';
import ValuesCarousel from './components/home/ValuesCarousel';
import ValuesDescription from './components/home/ValuesDescription';
import { useGlobalPersistedStore } from './stores/globalStore';

export default function HomeBlocks() {
  const { deviceSize } = useGlobalPersistedStore(state => state);

  const [floatingBarThreshold, setFloatingBarThreshold] = useState(0);

  useEffect(() => {
    const professionals = document.getElementById('professionals');

    if (professionals && floatingBarThreshold === 0) {
      const rect = professionals.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop + 125;

      setFloatingBarThreshold(elementTop);
    }
  }, []);

  return (
    <>
      <Hero />
      <GoogleStars />
      <ValuesCarousel />
      <Container className="px-0 pt-8 md:pt-12">
        <div
          className={`relative ${
            deviceSize.isMobile ? 'aspect-[39/78]' : 'aspect-[2432/1096]'
          }`}
        >
          <Image
            src={`/images/home/bf-bg${deviceSize.isMobile ? '' : '-desk'}.png`}
            className="object-fill"
            fill
            alt="black friday holaglow"
          />
          <Flex
            layout="col-center"
            className="absolute left-4 right-4 top-[35%] bottom-0 md:top-[58%] gap-12 md:gap-4"
          >
            <Text
              disableAnimation
              className="text-ellipsis text-center md:text-right uppercase italic text-white px-4 w-full text-lg font-medium md:mr-[13%]"
            >
              Descuentos especiales
              <br />
              sólo hoy
            </Text>
            <Button
              size="xl"
              disableAnimation
              type="secondary"
              className="mx:auto md:ml-auto md:mr-[13%]"
              customStyles="bg-hg-primary border-none text-hg-black font-bold px-12"
            >
              Ver descuentos
            </Button>
          </Flex>
        </div>
      </Container>
      <ValuesDescription />
      <Products />
      <div id="professionals">
        <Professionals />
      </div>
      <Testimonials />
      <Clinics />
      <GoToTreatments />
      {deviceSize.isMobile && floatingBarThreshold !== 0 && (
        <FloatingBottomBar threshold={floatingBarThreshold} />
      )}
    </>
  );
}
