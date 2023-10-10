import Clinics from './components/common/Clinics';
import FloatingBottomBar from './components/home/FloatingBottomBar';
import GoogleStars from './components/home/GoogleStars';
import GoToTreatments from './components/home/GoToTreatments';
import Hero from './components/home/Hero';
import Professionals from './components/home/HomeProfessionals';
import InTheNews from './components/home/InTheNews';
import Products from './components/home/Products';
import Testimonials from './components/home/Testimonials';
import ValuesCarousel from './components/home/ValuesCarousel';
import ValuesDescription from './components/home/ValuesDescription';
import MainLayout from './components/layout/MainLayout';
export const metadata = {
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
};

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <GoogleStars />
      <ValuesCarousel />
      <ValuesDescription />
      <Products />
      <Professionals />
      <Testimonials />
      <Clinics />
      <GoToTreatments />
    </MainLayout>
  );
}
