import MainLayoutSSR from 'app/(ssr)/homeSSR/components/MainLayout';
import type { Metadata } from 'next';

import Clinics from '../components/common/Clinics';
import FloatingBottomBar from '../components/home/FloatingBottomBar';
import GoToTreatments from '../components/home/GoToTreatments';
import HomeProfessionals from '../components/home/HomeProfessionals';
import Testimonials from '../components/home/Testimonials';

export const metadata: Metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
  openGraph: {
    url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
    type: 'website',
    title: 'Holaglow - La nueva cara de la medicina estética',
    description:
      'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
    images: ['/images/home/OGimagen_Holaglow.jpg'],
  },
};

export default function HomePage() {
  return (
    <MainLayoutSSR>
      <HomeProfessionals />
      <Testimonials />
      <Clinics />
      <GoToTreatments />
      <FloatingBottomBar />
    </MainLayoutSSR>
  );
}
