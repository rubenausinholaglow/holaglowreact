import { Metadata } from 'next';

import Clinicas from './Clinicas';

export const metadata: Metadata = {
  metadataBase: new URL('https://holaglow.com'),
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
};

export default function StaticClinics() {
  return <Clinicas />;
}
