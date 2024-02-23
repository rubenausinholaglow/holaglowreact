import MainLayoutSSR from 'app/(ssr)/homeSSR/components/MainLayout';
import type { Metadata } from 'next';

import GoogleStars from '../components/home/GoogleStars';
import HomeHero from '../components/home/Hero';
import Products from '../components/home/Products';
import ValuesCarousel from '../components/home/ValuesCarousel';
import ValuesDescription from '../components/home/ValuesDescription';

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
      <HomeHero />
      <GoogleStars />
      <ValuesCarousel />
      <ValuesDescription />
      <Products />
    </MainLayoutSSR>
  );
}
