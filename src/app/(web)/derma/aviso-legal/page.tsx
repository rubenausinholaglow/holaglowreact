import LegalAdviceContent from 'app/(web)/(statics)/aviso-legal/LegalAdviceContent';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';

export default function LegalAdvice() {
  return (
    <DermaLayout>
      <meta name="robots" content="noindex,follow" />
      <LegalAdviceContent></LegalAdviceContent>
    </DermaLayout>
  );
}
