import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';

import Confirmation from './components/Confirmation';

export default function ConfirmationCheckout() {
  return (
    <App>
      <MainLayout hideFooter>
        <Confirmation />
      </MainLayout>
    </App>
  );
}
