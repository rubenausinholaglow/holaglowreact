import CheckHydration from '@utils/CheckHydration';
import Confirmation from 'app/(web)/checkout/confirmation/components/Confirmation';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';

export default function ConfirmationCheckout() {
  return (
    <CheckHydration>
      <meta name="robots" content="noindex,follow" />
      <div className="bg-derma-secondary300 min-h-screen" id="tm_derma_step9">
        <DermaLayout hideButton hideFooter showNavigation>
          <Confirmation isDerma />
        </DermaLayout>
      </div>
    </CheckHydration>
  );
}
