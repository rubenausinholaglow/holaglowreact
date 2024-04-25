'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import { fetchProduct } from '@utils/fetch';
import ROUTES from '@utils/routes';
import { SvgArrow, SvgUserScan } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

export default function PVCard() {
  const router = useRouter();

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
    <Flex className="bg-white flex-col p-6 rounded-2xl shadow-centered-secondary w-full md:w-1/2">
      <Flex layout="col-left" className="w-full">
        <Flex layout="row-between" className="w-full mb-2 items-start">
          <Flex className="text-hg-secondary">
            <span className="text-2xl font-semibold md:text-2xl mr-2">
              Gratis
            </span>
          </Flex>
        </Flex>
        <Text className="font-semibold md:text-lg">Primera cita</Text>
      </Flex>
      <Flex layout="row-left" className="w-full pt-2 items-center gap-2 mb-6">
        <SvgUserScan className="w-6 h-6 text-hg-secondary" />
        <Text className="text-sm">Te asesoramos con nuestro escáner 3D</Text>
      </Flex>
      <Button
        type="primary"
        className="self-start mt-auto"
        onClick={() => {
          setSelectedTreatments([product]);
          router.push(ROUTES.checkout.clinics);
        }}
      >
        Me interesa
        <SvgArrow height={16} width={16} className="ml-2 pointer-events-none" />
      </Button>
    </Flex>
  );
}
