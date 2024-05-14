import SharedWrapper from 'app/(web)/components/layout/SharedWrapper';
import { headers } from 'next/headers';

import PrivacyPolicy from './PrivacyPolicy';

export default function PrivacyPolicyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const host = headers().get('host');
  const isDerma =
    (host && host.startsWith('derma')) || searchParams.isDerma === 'true';
  return (
    <SharedWrapper isDerma={isDerma}>
      {isDerma && <meta name="robots" content="noindex,follow" />}
      <PrivacyPolicy isDerma={isDerma} />
    </SharedWrapper>
  );
}
