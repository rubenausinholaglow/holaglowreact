import { getSelectorsByUserAgent } from 'react-device-detect';
import { headers } from 'next/headers';

export default function isMobileSSR() {
  const userAgentObject = getSelectorsByUserAgent(
    headers().get('user-agent') ?? ''
  );

  return userAgentObject.isMobile;
}
