import './globals.css';

import { Poppins } from 'next/font/google';

//import IsMobile from 'utils/IsMobile';
import Header from './components/Header';

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
      <body className={poppins.className}>
        <Header />
        <main>{children}</main>

        <p
          id="breakpoints"
          className="after:content-['sm'] md:after:content-['md']"
        >
          chivato breakpoints
        </p>
      </body>
    </html>
  );
}
