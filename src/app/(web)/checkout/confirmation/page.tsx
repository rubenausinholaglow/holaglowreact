import AppWrapper from 'app/(web)/components/layout/AppWrapper';
import MainLayout from 'app/(web)/components/layout/MainLayout';

import Confirmation from './components/Confirmation';

export default function ConfirmationCheckout() {
  return (
    <AppWrapper>
      <MainLayout hideFooter>
        <Confirmation />
      </MainLayout>
    </AppWrapper>
  );
}
