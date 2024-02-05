'use client';

import { useEffect, useState } from 'react';

import { useSessionStore } from '../../../stores/globalStore';
import Clinics from '../common/Clinics';
import MainLayout from '../layout/MainLayout';
import FloatingBottomBar from './FloatingBottomBar';
import GoogleStars from './GoogleStars';
import GoToTreatments from './GoToTreatments';
import Hero from './Hero';
import Professionals from './HomeProfessionals';
import Products from './Products';
import HomePromo from './Promo';
import Testimonials from './Testimonials';
import ValuesCarousel from './ValuesCarousel';
import ValuesDescription from './ValuesDescription';

export default function HomeBlocks() {
  const { deviceSize } = useSessionStore(state => state);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  return (
    <MainLayout>
      <Hero />
      <GoogleStars />
      <ValuesCarousel />
      <HomePromo />
      <ValuesDescription />
      <Products />
      <div id="professionals">
        <Professionals />
      </div>
      <Testimonials />
      <Clinics />
      <GoToTreatments />
      {deviceSize.isMobile && <FloatingBottomBar threshold={1200} />}
    </MainLayout>
  );
}
