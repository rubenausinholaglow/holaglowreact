import { Product } from '@interface/product';
import type { Metadata } from 'next';

import Home from './components/Home';
import SSRWrapper from './components/SSRWrapper';

export const metadata: Metadata = {
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

export default function HomeSSR({ data }: { data: { products: Product[] } }) {
  return (
    <SSRWrapper>
      <Home data={data} />
    </SSRWrapper>
  );
}
