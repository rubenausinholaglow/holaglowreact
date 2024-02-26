import MainLayout from 'app/(web)/components/layout/MainLayout';

import Confirmation from './components/Confirmation';

export default function ConfirmationCheckout() {
  return (
    <MainLayout hideFooter>
      <Confirmation />
    </MainLayout>
  );
}
