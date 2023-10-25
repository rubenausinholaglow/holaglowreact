'use client';

import { useEffect, useState } from 'react';

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
