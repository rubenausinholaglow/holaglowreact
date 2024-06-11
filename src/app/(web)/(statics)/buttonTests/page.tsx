import {
  isAndroid,
  isChrome,
  isChromium,
  isDesktop,
  isIOS,
  isSafari,
} from 'react-device-detect';
import MainLayoutSSR from 'app/(web)/components/layout/MainLayoutSSR';
import { poppinsTest } from 'app/fonts';
import {
  isIOSSSR,
  isMacOsSSR,
  isMobileSSR,
  isSafariSSR,
} from 'app/utils/isMobileSSR';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';

export default function ButtonTests() {
  return (
    <MainLayoutSSR hideFooter>
      <Container className="py-24">
        <Flex className="w-full gap-4 mb-24 flex-wrap">
          <Button type="primary" size="xl">
            Default
          </Button>

          <div
            className={`bg-hg-secondary h-16 px-6 rounded-full text-white ${poppinsTest.className} font-semibold flex items-center text-lg`}
          >
            Test PoppinsTest
          </div>

          <div
            className={`h-16 px-6 rounded-full text-white font-semibold flex items-center text-lg leading-none ${
              isSafari ? 'bg-hg-primary' : 'bg-hg-secondary '
            }`}
          >
            Test PoppinsTest
          </div>
        </Flex>
        <p>is Safari? - {isSafari.toString()}</p>
        <p>is IOS? - {isIOS.toString()}</p>
        <p>is Android? - {isAndroid.toString()}</p>
        <p>is Chrome? - {isChrome.toString()}</p>
        <p>is Chromium? - {isChromium.toString()}</p>
        <p>is Desktop? - {isDesktop.toString()}</p>
        <p>is MobileSSR? - {isMobileSSR().toString()}</p>
        <p>is SafariSSR? - {isSafariSSR().toString()}</p>
        <p>is MacOsSSR? - {isMacOsSSR().toString()}</p>
        <p>is IOS? - {isIOSSSR().toString()}</p>
      </Container>
    </MainLayoutSSR>
  );
}
