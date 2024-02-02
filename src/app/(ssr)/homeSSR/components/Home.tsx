import Clinics from 'app/(web)/components/common/Clinics';
import GoogleStars from 'app/(web)/components/home/GoogleStars';
import GoToTreatments from 'app/(web)/components/home/GoToTreatments';
import HomeHero from 'app/(web)/components/home/Hero';
import HomeProfessionals from 'app/(web)/components/home/HomeProfessionals';
import HomeProducts from 'app/(web)/components/home/Products';
import Testimonials from 'app/(web)/components/home/Testimonials';
import ValuesCarousel from 'app/(web)/components/home/ValuesCarousel';
import ValuesDescription from 'app/(web)/components/home/ValuesDescription';
import MainLayoutSSR from 'app/(web)/components/layout/MainLayoutSSR';

export default function Home() {
  return (
    <MainLayoutSSR>
      <HomeHero />
      <GoogleStars />
      <ValuesCarousel />
      <ValuesDescription />
      <HomeProducts />
      <HomeProfessionals />
      <Testimonials />
      <Clinics />
      <GoToTreatments />
    </MainLayoutSSR>
  );
}
