'use client';

import { useEffect } from 'react';
import { CartItem } from '@interface/product';
import { fetchProduct } from '@utils/fetch';
import ROUTES from '@utils/routes';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

export default function OptionsPricesSelectButton({
  index,
}: {
  index: number;
}) {
  const { resetCart, addItemToCart } = useCartStore(state => state);
  const router = useRouter();

  async function selectProduct(index: number) {
    let productId = '';
    switch (index) {
      case 0:
        productId = process.env.NEXT_PUBLIC_DERMA_SUSCRIPTION_ID!;
        break;
      case 1:
        productId = process.env.NEXT_PUBLIC_DERMA_ONE_PURCHASE_ID!;
        break;
      case 2:
        productId = process.env.NEXT_PUBLIC_DERMA_ONLY_RECEIPT_ID!;
        break;
    }
    const productDetails = await fetchProduct(productId, false, true);
    addItemToCart(productDetails as CartItem);
    router.push(ROUTES.derma.multistep.payment);
  }
  useEffect(() => {
    resetCart();
  }, []);

  return (
    <Flex className="justify-center">
      <Button
        type="derma"
        size="xl"
        customStyles="px-16"
        onClick={async () => await selectProduct(index)}
      >
        Seleccionar
      </Button>
    </Flex>
  );
}
