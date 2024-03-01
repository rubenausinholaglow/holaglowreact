'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import { fetchProduct } from '@utils/fetch';
import ROUTES from '@utils/routes';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/navigation';

export default function GoToCheckout() {
  const router = useRouter();
  const { setSelectedTreatments } = useSessionStore(state => state);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function initPVProduct(productId: string, isDashboard: boolean) {
      const productDetails = await fetchProduct(productId, false);
      setProduct(productDetails);
    }

    initPVProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID || '', false);
  }, []);

  if (isEmpty(product)) {
    return (
      <Button
        size="lg"
        type="tertiary"
        customStyles="bg-hg-secondary border-none text-white gap-2 px-16"
        className="mb-8"
      >
        <SvgSpinner className="text-white" />
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      type="tertiary"
      customStyles="bg-hg-secondary border-none text-white gap-2"
      className="mb-8"
      onClick={() => {
        setSelectedTreatments([product]);
        router.push(ROUTES.checkout.clinics);
      }}
    >
      Pedir cita gratis
      <SvgArrow className="h-4 w-4" />
    </Button>
  );
}
