import GoogleStars from 'app/(web)/components/home/GoogleStars';
import GoToTreatments from 'app/(web)/components/home/GoToTreatments';
import HomeHero from 'app/(web)/components/home/Hero';
import ValuesCarousel from 'app/(web)/components/home/ValuesCarousel';
import ValuesDescription from 'app/(web)/components/home/ValuesDescription';

import Clinics from './Clinics';
import HomeProfessionals from './HomeProfessionals';
import MainLayoutSSR from './MainLayout';
import HomeProducts from './Products';
import Testimonials from './Testimonials';

export default function Home() {
  return (
    <MainLayoutSSR>
      <HomeHero />
      <GoogleStars />
      <ValuesDescription />
      <ValuesCarousel />
      <HomeProducts />
      <HomeProfessionals />
      <Testimonials />
      <Clinics />
      <GoToTreatments />
    </MainLayoutSSR>
  );
}
