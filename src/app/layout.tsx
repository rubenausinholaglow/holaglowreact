import './globals.css';

import { Poppins } from 'next/font/google';
import Head from 'next/head';

import { Breakpoint } from './components/Breakpoint';
import Header from './components/Header';
import MainLayout from './components/MainLayout';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Holaglow - Medicina estética',
  description:
    'La nueva cara de la medicina estética. Tratamientos sin cirugía para conseguir resultados reales',
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
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <body className={poppins.className}>
        <Breakpoint />
        <MainLayout>
          <Header />
          <main>{children}</main>
        </MainLayout>
      </body>
    </html>
  );
}
