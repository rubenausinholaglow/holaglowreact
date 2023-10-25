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

  const [floatingBarThreshold, setFloatingBarThreshold] = useState<
    number | null
  >(null);

  useEffect(() => {
    const products = document.getElementById('products');

    if (products && !floatingBarThreshold) {
      const rect = products.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;

      setFloatingBarThreshold(elementTop);
    }
  }, []);

  return (
    <>
      <Hero />
      <GoogleStars />
      <ValuesCarousel />
      <ValuesDescription />
      <div id="products">
        <Products />
      </div>
      <Professionals />
      <Testimonials />
      <Clinics />
      <GoToTreatments />
      {deviceSize.isMobile && <FloatingBottomBar threshold={1200} />}
    </>
  );
}
