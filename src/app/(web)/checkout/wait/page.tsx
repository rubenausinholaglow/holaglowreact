import SharedWrapper from 'app/(web)/components/layout/SharedWrapper';
import { headers } from 'next/headers';

import WaitComponent from './WaitComponent';

export default function Wait({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const host = headers().get('host');
  const isDerma =
    (host && host.startsWith('derma')) || searchParams.isDerma === 'true';

  return (
    <SharedWrapper
      isDerma={isDerma}
      hideButton
      hideFooter
      hideBackButton
      isCheckout
    >
      <WaitComponent isDerma={isDerma} />
    </SharedWrapper>
  );
}
