'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgSpinner } from 'app/icons/Icons';
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

  useEffect(() => {
    resetCart();
  }, []);

  return (
    <Flex className="justify-center mt-6  self-bottom">
      <Button
        className="w-full"
        type="derma"
        size="xl"
        customStyles="px-16"
        onClick={async () => {
          setIsLoading(true);
          await selectDermaProduct({ index, addItemToCart, router });
        }}
      >
        {isLoading ? <SvgSpinner className="w-full" /> : 'Seleccionar'}
      </Button>
    </Flex>
  );
}
