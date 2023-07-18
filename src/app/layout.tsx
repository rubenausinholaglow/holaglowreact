import './globals.css';

import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['400', '600'], subsets: ['latin'] });

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
    <html lang="en" className="max-h-screen h-full">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
