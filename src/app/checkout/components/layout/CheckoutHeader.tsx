import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrowSmallLeft } from 'icons/Icons';
import { SvgHolaglow } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export default function CheckoutHeader() {
  const router = useRouter();

  return (
    <Container>
      <Script
        id="bugnsag"
        type="text/javascript"
        strategy="beforeInteractive"
        src="//d2wy8f7a9ursnm.cloudfront.net/v7/bugsnag.min.js"
      ></Script>
      <Script
        id="bugsnagPerformance"
        type="text/javascript"
        strategy="beforeInteractive"
        src="//d2wy8f7a9ursnm.cloudfront.net/v1.2.0/bugsnag-performance.min.js"
      ></Script>

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
      />
      <meta name="robots" content="noindex,follow" />
      <Flex layout="row-between" className="py-4 md:py-6">
        <SvgHolaglow className="text-hg-secondary md:h-[29px] md:w-[120px]" />
        <Button size="sm" type="tertiary" onClick={() => router.back()}>
          <SvgArrowSmallLeft className="mr-2" />

          <span className="hidden md:block">Volver atrás</span>
          <span className="md:hidden">Atrás</span>
        </Button>
      </Flex>
    </Container>
  );
}
