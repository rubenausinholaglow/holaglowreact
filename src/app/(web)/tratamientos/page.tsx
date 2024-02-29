import { fetchProducts } from '@utils/fetch';
import MainLayoutSSR from 'app/(ssr)/homeSSR/components/MainLayout';
import type { Metadata } from 'next';

import Tratamientos from './Tratamientos';

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

async function getProducts() {
  const products = await fetchProducts({ isDerma: false });

  return products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <MainLayoutSSR>
      <Tratamientos products={products} />
    </MainLayoutSSR>
  );
}
