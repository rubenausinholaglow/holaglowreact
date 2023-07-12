import './globals.css';

import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="max-h-screen h-full">
      <body className={`${outfit.className} h-full`}>{children}</body>
    </html>
  );
}
