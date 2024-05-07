import SharedWrapper from 'app/(web)/components/layout/SharedWrapper';
import { headers } from 'next/headers';

import Confirmation from './components/Confirmation';

export default function LegalAdvice({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const host = headers().get('host');
  const isDerma =
    (host && host.startsWith('derma')) || searchParams.isDerma === 'true';
  const isReagenda = searchParams.isReagenda === 'true';

  return (
    <SharedWrapper isDerma={isDerma} hideFooter>
      <Confirmation isDerma={isDerma} isReagenda={isReagenda} />
    </SharedWrapper>
  );
}
