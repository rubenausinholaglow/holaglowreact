import { ReactNode } from 'react';
import { headers } from 'next/headers';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Holaglow - Medicina estética',
  description:
    'La nueva cara de la medicina estética. Tratamientos sin cirugía para conseguir resultados reales',
  viewport: 'width=device-width, initial-scale=1, user-scalable=no',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const headersList = headers();
  const domain = headersList.get('host') || '';
  const isDerma = domain.includes('derma');

  const GOOGLE_ID = isDerma ? 'GTM-KMG5BW3L' : 'GTM-K3NZR8P';

  return (
    <html lang="en" className="max-h-screen h-full bg-white text-hg-black">
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script
          id="cookieyes"
          type="text/javascript"
          strategy="lazyOnload"
          src="https://cdn-cookieyes.com/client_data/358786368d84a68230dff524/script.js"
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GOOGLE_ID}');`,
          }}
        ></Script>
      </head>

      {children}
    </html>
  );
}
