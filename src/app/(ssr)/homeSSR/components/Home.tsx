import Clinics from 'app/(web)/components/common/Clinics';
import GoogleStars from 'app/(web)/components/home/GoogleStars';
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
      <div id="professionals">
        <HomeProfessionals />
      </div>
      <Testimonials />
      <Clinics />
    </MainLayoutSSR>
  );
}

{
  /* <Hero />
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
)} */
}
