'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { fetchProduct } from 'utils/fetch';

export default function ProductPaymentOptions() {
  const router = useRouter();
  const { deviceSize, setSelectedTreatments } = useGlobalPersistedStore(
    state => state
  );
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId);
      setProduct(productDetails);
    }

    initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_FLOWWWID!);
  }, []);

  const imgUrl = deviceSize.isMobile
    ? '/images/product/probadorVirtual.jpg'
    : '/images/product/probadorVirtual-desk.jpg';

  if (isEmpty(product)) {
    return <></>;
  }

  return (
    <div className="bg-hg-pink relative">
      <Container className="px-0 md:px-4">
        <div
          className="relative aspect-[3/2] md:aspect-auto md:absolute top-0 bottom-0 left-0 right-[50%]"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: deviceSize.isMobile
              ? 'bottom center'
              : 'right center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <Flex
          layout="col-center"
          className="px-4 py-8 md:px-0 md:w-1/2 md:ml-[50%] md:py-24 md:pl-16"
        >
          <Title className="text-hg-secondary mb-2 md:mb-6">
            ¿Te gustaría ver cómo quedará tu tratamiento antes de hacértelo?
          </Title>
          <Text className="mb-8 md:mb-12 md:text-lg md:text-center">
            Si sientes curiosidad por algún tratamiento de medicina estética,
            podrás descubrir cómo será el resultado sobre una simulación 3D de
            tu rostro.
          </Text>

          <Button
            size={deviceSize.isMobile ? 'lg' : 'xl'}
            type="secondary"
            onClick={() => {
              setSelectedTreatments([product]);
              router.push(ROUTES.checkout.clinics);
            }}
          >
            Pide cita 3d gratis
          </Button>
        </Flex>
      </Container>
    </div>
  );
}
