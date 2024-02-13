import 'app/globals.css';

import { ReactNode } from 'react';
import { Breakpoint } from 'app/(web)/components/layout/Breakpoint';
import { poppins } from 'app/fonts';
import Head from 'next/head';
import Script from 'next/script';

import { ModalBackground } from './homeSSR/components/Modal';

export const metadata = {
  title: 'Holaglow - Medicina estética',
  description:
    'La nueva cara de la medicina estética. Tratamientos sin cirugía para conseguir resultados reales',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="max-h-screen h-full bg-white text-hg-black">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script
          id="cookieyes"
          type="text/javascript"
          strategy="beforeInteractive"
          src="https://cdn-cookieyes.com/client_data/358786368d84a68230dff524/script.js"
        ></Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K3NZR8P"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-K3NZR8P');`,
          }}
        ></Script>
      </head>
      <body id="body" className={`relative min-h-full ${poppins.className}`}>
        <ModalBackground />
        <Breakpoint />
        {children}
      </body>
    </html>
  );
}