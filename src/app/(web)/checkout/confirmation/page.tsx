import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';

import Confirmation from './components/Confirmation';

export default function ConfirmationCheckout({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <App>
      <MainLayout hideFooter>
        <Confirmation isReagenda={searchParams.isReagenda === 'true'} />
      </MainLayout>
    </App>
  );
}
