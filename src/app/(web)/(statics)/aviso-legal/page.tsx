import SharedWrapper from 'app/(web)/components/layout/SharedWrapper';
import { headers } from 'next/headers';

import LegalAdviceContent from './LegalAdviceContent';

export default function LegalAdvice({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const host = headers().get('host');
  const isDerma =
    (host && host.startsWith('derma')) || searchParams.isDerma === 'true';

  console.log(searchParams.test);
  return (
    <SharedWrapper isDerma={isDerma}>
      {isDerma && <meta name="robots" content="noindex,follow" />}
      <LegalAdviceContent isDerma={isDerma} />
    </SharedWrapper>
  );
}
