'use client';

import { useEffect, useState } from 'react';

import { useSessionStore } from '../../../stores/globalStore';
import Clinics from '../common/Clinics';
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
      <HomePromo />
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
