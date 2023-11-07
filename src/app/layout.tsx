import './globals.css';
import './../../public/styles/Alma/widgets.min.css';

import Head from 'next/head';
import Script from 'next/script';

import App from './components/layout/App';

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
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}

        <Script
          id="bugnsag"
          type="text/javascript"
          strategy="beforeInteractive"
          src="https://d2wy8f7a9ursnm.cloudfront.net/v7/bugsnag.min.js"
        ></Script>
        <Script
          id="bugsnagPerformance"
          type="module"
          strategy="beforeInteractive"
        >
          import BugsnagPerformance from
          '//d2wy8f7a9ursnm.cloudfront.net/v1.2.0/bugsnag-performance.min.js'
        </Script>

        <Script
          id="bugsnagStart"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `Bugsnag.start({ apiKey: '8c6cd8495d37038715215411471cd7e6' });
          BugsnagPerformance.start({ apiKey: '8c6cd8495d37038715215411471cd7e6' });`,
          }}
        ></Script>
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
      <App>{children}</App>
    </html>
  );
}
