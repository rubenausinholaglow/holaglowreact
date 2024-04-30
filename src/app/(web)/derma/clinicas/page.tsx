import Clinicas from 'app/(web)/(statics)/clinicas/Clinicas';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://derma.holaglow.com'),
  title: 'Las ciudades donde te subimos el glow',
  description:
    'Ven a visitar las clínicas Holaglow, un espacio de confianza, profesionalidad e innovación donde podrás expresar tu belleza libremente.',
  openGraph: {
    url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
    type: 'website',
    title: 'Las ciudades donde te subimos el glow',
    description:
      'Ven a visitar las clínicas Holaglow, un espacio de confianza, profesionalidad e innovación donde podrás expresar tu belleza libremente.',
    images: ['/images/home/OGimagen_Holaglow.jpg'],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function StaticClinics() {
  return <Clinicas isDerma />;
}
