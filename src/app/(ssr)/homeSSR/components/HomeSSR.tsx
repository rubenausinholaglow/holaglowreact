import GoogleStars from 'app/(web)/components/home/GoogleStars';
import HomeHero from 'app/(web)/components/home/Hero';
import ValuesCarousel from 'app/(web)/components/home/ValuesCarousel';
import ValuesDescription from 'app/(web)/components/home/ValuesDescription';
import dynamic from 'next/dynamic';

import Clinics from './Clinics';
import MainLayoutSSR from './MainLayout';
import Products from './Products';

const HomeProfessionals = dynamic(() => import('./HomeProfessionals'), {
  ssr: false,
});
const Testimonials = dynamic(() => import('./Testimonials'), { ssr: false });
const GoToTreatments = dynamic(
  () => import('app/(web)/components/home/GoToTreatments'),
  {
    ssr: false,
  }
);
const FloatingBottomBar = dynamic(
  () => import('app/(web)/components/home/FloatingBottomBar'),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <MainLayoutSSR>
      <HomeHero />
      <GoogleStars />
      <ValuesCarousel />
      <ValuesDescription />
      <Products />
      <HomeProfessionals />
      <Testimonials />
      <Clinics />
      <GoToTreatments />
      <FloatingBottomBar />
    </MainLayoutSSR>
  );
}
