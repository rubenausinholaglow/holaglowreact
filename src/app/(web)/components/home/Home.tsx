import FloatingBottomBar from 'app/(web)/components/home/FloatingBottomBar';
import GoToTreatments from 'app/(web)/components/home/GoToTreatments';
import HomeHero from 'app/(web)/components/home/Hero';
import ValuesCarousel from 'app/(web)/components/home/ValuesCarousel';
import ValuesDescription from 'app/(web)/components/home/ValuesDescription';

import Clinics from '../common/ClinicsSSR';
import MainLayoutSSR from '../layout/MainLayoutSSR';
import HomeProfessionals from './HomeProfessionals';
import Products from './ProductsSSR';
import Testimonials from './Testimonials';

export default function Home() {
  return (
    <MainLayoutSSR>
      <HomeHero />
      <ValuesCarousel />
      <ValuesDescription />
      <Products />
      <HomeProfessionals />
      <Testimonials />
      <Clinics />
      <GoToTreatments />
      <FloatingBottomBar className="bg-derma-secondary500" />
    </MainLayoutSSR>
  );
}
