'use client';

import { RefObject } from 'react';

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
import { useElementOnScreen } from './utils/common';

export default function HomeBlocks() {
  const { deviceSize } = useGlobalPersistedStore(state => state);
  const [productCardsRef, isProductCardsVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  return (
    <>
      <Hero />
      <GoogleStars />
      <ValuesCarousel />
      <ValuesDescription />
      <div ref={productCardsRef as RefObject<HTMLDivElement>}>
        <Products />
      </div>
      <Professionals />
      <Testimonials />
      <Clinics />
      <GoToTreatments />
      {deviceSize.isMobile && (
        <FloatingBottomBar isVisible={!isProductCardsVisible} />
      )}
    </>
  );
}
