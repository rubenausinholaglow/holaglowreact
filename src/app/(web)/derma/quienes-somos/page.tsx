import AboutUs from 'app/(web)/(statics)/quienes-somos/AboutUs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://derma.holaglow.com'),
  title: 'Sobre nosotros - Holaglow',
  description:
    'Queremos cambiar el significado de la medicina estética como una opción más de autocuidado y de la expresión personal.',
  openGraph: {
    url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
    type: 'website',
    title: 'Sobre nosotros - Holaglow',
    description:
      'Queremos cambiar el significado de la medicina estética como una opción más de autocuidado y de la expresión personal.',
    images: ['/images/home/OGimagen_Holaglow.jpg'],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function StaticAboutUs() {
  return <AboutUs isDerma />;
}
