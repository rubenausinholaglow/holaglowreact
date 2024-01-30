import 'app/globals.derma.css';

import Head from 'next/head';
import Script from 'next/script';

import App from './../components/layout/App';

export const metadata = {
  title: 'Cuidado facial personalizado - Holaglow Derma',
  description:
    'Reserva tu consulta online con un dermatólogo estético y encuentra el mejor tratamiento para las necesidades específicas de tu piel.',
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
      </Head>
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KMG5BW3L"
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
        })(window,document,'script','dataLayer','GTM-KMG5BW3L');`,
          }}
        ></Script>
      </head>
      <App>{children}</App>
    </html>
  );
}
