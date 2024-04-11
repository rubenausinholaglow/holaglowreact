import '../../../public/styles/Alma/widgets.min.css';

import Head from 'next/head';
import Script from 'next/script';

import App from '../(web)/components/layout/App';

export const metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Holaglow - Medicina estética',
  description:
    'La nueva cara de la medicina estética. Tratamientos sin cirugía para conseguir resultados reales',
  image: '/images/home/OGimagen_Holaglow.jpg',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="max-h-screen h-full bg-white text-hg-black">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta property="og:image" content={metadata.image} />
      </Head>
      <head></head>
      <App>{children}</App>
    </html>
  );
}
