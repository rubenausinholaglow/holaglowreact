import type { Metadata } from 'next';

import App from '../components/layout/App';
import PsrpPage from './psrp';

export const metadata: Metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Tratamientos de medicina estética en Holaglow',
  description:
    'Encuentra el tratamiento de medicina estética que mejor se adapte a ti y potencia tu belleza desde el interior',
  openGraph: {
    url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
    type: 'website',
    title: 'Tratamientos de medicina estética en Holaglow',
    description:
      'Encuentra el tratamiento de medicina estética que mejor se adapte a ti y potencia tu belleza desde el interior',
    images: ['/images/home/OGimagen_Holaglow.jpg'],
  },
};

export default function ProductsPage() {
  return (
    <App>
      <PsrpPage slug="" isDashboard={false} />
    </App>
  );
}
