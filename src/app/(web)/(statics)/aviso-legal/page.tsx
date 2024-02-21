import AppWrapper from 'app/(web)/components/layout/AppWrapper';
import MainLayout from 'app/(web)/components/layout/MainLayout';

import LegalAdviceContent from './LegalAdviceContent';

export default function LegalAdvice() {
  return (
    <AppWrapper>
      <MainLayout>
        <meta name="robots" content="noindex,follow" />
        <LegalAdviceContent></LegalAdviceContent>
      </MainLayout>
    </AppWrapper>
  );
}
