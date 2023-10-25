import type { Metadata } from 'next';

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
import MainLayout from './components/layout/MainLayout';
import HomeBlocks from './HomeBlocks';
import { useElementOnScreen } from './utils/common';

export const metadata: Metadata = {
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
};

export default function Home() {
  return (
    <MainLayout>
      <HomeBlocks />
    </MainLayout>
  );
}
