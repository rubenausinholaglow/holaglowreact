'use client';

import { Suspense, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Product } from '@interface/product';
import UserService from '@services/UserService';
import { fetchProduct } from '@utils/fetch';
import ROUTES from '@utils/routes';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

export default function GoToCheckout() {
  const router = useRouter();
  const { setSelectedTreatments, setSelectedClinic } = useSessionStore(
    state => state
  );

  const { clinics } = useGlobalPersistedStore(state => state);
  const [product, setProduct] = useState<Product | null>(null);
  const { setCurrentUser } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    async function initPVOnlineProduct(productId: string) {
      const productDetails = await fetchProduct(productId, false, false);
      setProduct(productDetails);
    }

    initPVOnlineProduct(
      process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ONLINE_ID || ''
    );
    const queryString = window?.location?.search;
    const params = new URLSearchParams(queryString.toLowerCase());
    const userId = params.get('userid') || '';

    async function login() {
      const user = await UserService.getUserById(userId, false);
      setCurrentUser(user);
    }
    if (userId) login();
  }, []);

  return (
    <>
      {isEmpty(product) && (
        <Button
          size={isMobile ? 'lg' : 'xl'}
          type="tertiary"
          customStyles="bg-hg-secondary border-none text-white gap-2 px-16 hover:bg-hg-secondary700"
          className="mb-8"
        >
          <SvgSpinner className="text-white" />
        </Button>
      )}
      {!isEmpty(product) && (
        <Button
          id="tmevent_landingPV_start"
          size={isMobile ? 'lg' : 'xl'}
          type="primary"
          className="mb-8"
          onClick={() => {
            setSelectedTreatments([product]);
            const clinic = clinics.find(x => x.city == 'Valencia')!;
            setSelectedClinic(clinic);
            router.push(ROUTES.checkout.schedule);
          }}
        >
          Pedir cita gratis
          <SvgArrow className="h-4 w-4 ml-2" />
        </Button>
      )}
    </>
  );
}
