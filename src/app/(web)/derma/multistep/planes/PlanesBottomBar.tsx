import { useEffect } from 'react';
import CheckHydration from '@utils/CheckHydration';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { useRouter } from 'next/navigation';

import { SUBSCRIPTIONS } from '../../planes/mockedData';
import { selectDermaProduct } from './selectDermaPlanes';

export default function PlanesBottomBar({
  selectedOption,
}: {
  selectedOption: string;
}) {
  const router = useRouter();
  const { resetCart, addItemToCart } = useCartStore(state => state);

  const OPTIONS_VALUES = ['0', '1', '2'];

  useEffect(() => {
    resetCart();
  }, []);

  function handleContinue() {
    selectDermaProduct({
      index: Number(selectedOption),
      addItemToCart,
      router,
    });
  }

  return (
    <CheckHydration>
      <div
        className={`transition-all fixed bottom-0 left-0 right-0 z-40 pointer-events-none ${
          OPTIONS_VALUES.includes(selectedOption)
            ? 'translate-y-[0%]'
            : 'translate-y-[105%]'
        }`}
      >
        <div className="p-4 mx-w-xl bg-white rounded-t-[40px]">
          <Button
            size="lg"
            type="derma"
            className="pointer-events-auto w-full"
            customStyles="px-2"
            onClick={() => handleContinue()}
            id="tmevent_derma_plans_continue_button"
          >
            {!OPTIONS_VALUES.includes(selectedOption)
              ? 'Elige tu plan'
              : `Continuar con ${SUBSCRIPTIONS[Number(selectedOption)].title}`}
          </Button>
        </div>
      </div>
    </CheckHydration>
  );
}
