import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';

import LegalAdviceContent from './LegalAdviceContent';

export default function LegalAdvice() {
  return (
    <App>
      <MainLayout>
        <meta name="robots" content="noindex,follow" />
        <LegalAdviceContent />
      </MainLayout>
    </App>
  );
}
