import { getSelectorsByUserAgent } from 'react-device-detect';
import { headers } from 'next/headers';

export function isMobileSSR() {
  const userAgentObject = getSelectorsByUserAgent(
    headers().get('user-agent') ?? ''
  );

  return userAgentObject.isMobile;
}
export function isTabletSSR() {
  const userAgentObject = getSelectorsByUserAgent(
    headers().get('user-agent') ?? ''
  );

  return userAgentObject.isTablet;
}
