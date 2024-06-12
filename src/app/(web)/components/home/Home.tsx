import FloatingBottomBar from 'app/(web)/components/home/FloatingBottomBar';
import GoToTreatments from 'app/(web)/components/home/GoToTreatments';
import HomeHero from 'app/(web)/components/home/Hero';
import ValuesCarousel from 'app/(web)/components/home/ValuesCarousel';
import ValuesDescription from 'app/(web)/components/home/ValuesDescription';
import { Metadata } from 'next';
import Script from 'next/script';

import Clinics from '../common/ClinicsSSR';
import MainLayoutSSR from '../layout/MainLayoutSSR';
import HomeProfessionals from './HomeProfessionals';
import Products from './ProductsSSR';
import Testimonials from './Testimonials';

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

export default function Home() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Holaglow',
            url: 'https://www.holaglow.com/',
            logo: '',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+34682417208',
              contactType: 'customer service',
              contactOption: 'TollFree',
              areaServed: 'ES',
              availableLanguage: ['en', 'es', 'Catalan'],
            },
            sameAs: [
              'https://www.facebook.com/p/Holaglow-100089635050832/?_rdr',
              'https://www.instagram.com/holaglow.clinics/',
              'https://www.youtube.com/channel/UClbkeOPUeqXaYyAnrHSencA',
              'https://es.linkedin.com/company/holaglow',
              'https://www.holaglow.com/',
            ],
          }),
        }}
      />
      <MainLayoutSSR>
        <HomeHero />
        <ValuesCarousel />
        <ValuesDescription />
        <Products />
        <HomeProfessionals />
        <Testimonials />
        <Clinics />
        <GoToTreatments />
      </MainLayoutSSR>
    </>
  );
}
