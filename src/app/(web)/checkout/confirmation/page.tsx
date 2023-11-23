import MainLayout from 'app/components/layout/MainLayout';

import Confirmation from './components/Confirmation';

export default function ConfirmationCheckout() {
  return (
    <MainLayout hideFooter>
      <Confirmation />
    </MainLayout>
  );
}
