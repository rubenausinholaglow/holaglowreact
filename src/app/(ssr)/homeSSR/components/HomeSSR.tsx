import GoogleStars from 'app/(web)/components/home/GoogleStars';
import HomeHero from 'app/(web)/components/home/Hero';
import ValuesCarousel from 'app/(web)/components/home/ValuesCarousel';
import ValuesDescription from 'app/(web)/components/home/ValuesDescription';
import dynamic from 'next/dynamic';

import MainLayoutSSR from './MainLayout';

/*
const HomeProducts = dynamic(() => import('./Products'));
const HomeProfessionals = dynamic(() => import('./HomeProfessionals'));
const Clinics = dynamic(() => import('./Clinics'));
const Testimonials = dynamic(() => import('./Testimonials'));
const GoToTreatments = dynamic(
  () => import('app/(web)/components/home/GoToTreatments')
  );
  */

export default function Home() {
  return (
    <MainLayoutSSR>
      <p>pepito</p>
      {/* 
      <HomeHero />
      <GoogleStars />
      <ValuesDescription />
      <ValuesCarousel />

      Load bottom components on client
      <HomeProducts />
      <HomeProfessionals />
      <Testimonials />
      <Clinics />
      <GoToTreatments />
       */}
    </MainLayoutSSR>
  );
}
