import Clinics from './components/home/Clinics';
import GoToTreatments from './components/home/GoToTreatments';
import Hero from './components/home/Hero';
import InTheNews from './components/home/InTheNews';
import Products from './components/home/Products';
import Professionals from './components/home/Professionals';
import Testimonials from './components/home/Testimonials';
import ValuesCarousel from './components/home/ValuesCarousel';
import ValuesDescription from './components/home/ValuesDescription';

export default function Home() {
  return (
    <>
      <Hero />
      <ValuesCarousel />
      <ValuesDescription />
      <Products />
      <Professionals />
      <Testimonials />
      <InTheNews />
      <Clinics />
      <GoToTreatments />
    </>
  );
}
