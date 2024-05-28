'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgSpinner } from 'app/icons/Icons';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

import { selectDermaProduct } from '../../multistep/planes/selectDermaPlanes';

export default function OptionsPricesSelectButton({
  index,
}: {
  index: number;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { resetCart, addItemToCart } = useCartStore(state => state);
  const { payment, setPayment } = useSessionStore(state => state);

  useEffect(() => {
    resetCart();
    setPayment(undefined);
  }, []);

  return (
    <Flex className="mt-6 mb-6" layout="col-center">
      <Button
        type="derma"
        size="xl"
        onClick={async () => {
          setIsLoading(true);
          setPayment(undefined);
          await selectDermaProduct({ index, addItemToCart, router });
        }}
        id="tmevent_derma_plans_selection_button"
      >
        {isLoading ? (
          <SvgSpinner className="w-full" />
        ) : (
          'Comprar rutina personalizada'
        )}
      </Button>
    </Flex>
  );
}
