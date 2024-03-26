'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Product } from '@interface/product';
import { fetchProduct } from '@utils/fetch';
import ROUTES from '@utils/routes';
import { SvgUserScan } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { isEmpty } from 'lodash';

export default function GoToPVButton() {
  const { setSelectedTreatments } = useSessionStore(state => state);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId, false, false);
      setProduct(productDetails);
    }

    initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID!);
  }, []);

  if (isEmpty(product)) {
    return <></>;
  }

  return (
    <Button
      id={'tmevent_click_pv_button'}
      size={isMobile ? 'lg' : 'xl'}
      type="secondary"
      onClick={() => {
        setSelectedTreatments([product]);
      }}
    >
      <a href={ROUTES.checkout.clinics} className="flex">
        <SvgUserScan className="mr-2 h-5 w-5" />
        Pide cita 3D gratis
      </a>
    </Button>
  );
}
