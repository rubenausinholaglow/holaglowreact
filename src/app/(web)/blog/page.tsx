import type { Metadata } from 'next';

import BlogPage from './BlogPage';

export const metadata: Metadata = {
  title: 'Glow Getter - El blog sobre medicina estética de Holaglow',
  description:
    'Resuelve tus dudas y descubre todo sobre la medicina estética contada por profesionales del sector de una manera clara y honesta.',
  openGraph: {
    url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
    type: 'website',
    title: 'Tratamientos de medicina estética en Holaglow',
    description:
      'Encuentra el tratamiento de medicina estética que mejor se adapte a ti y potencia tu belleza desde el interior',
    images: ['/images/home/OGimagen_Holaglow.jpg'],
  },
};

export default function Blog() {
  return <BlogPage />;
}
