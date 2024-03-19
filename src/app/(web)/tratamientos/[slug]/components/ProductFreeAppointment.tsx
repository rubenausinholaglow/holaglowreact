'use client';

import { useEffect, useState } from 'react';
import { SvgUserScan } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Product } from 'app/types/product';
import { fetchProduct } from 'app/utils/fetch';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

export default function ProductPaymentOptions() {
  const router = useRouter();
  const ROUTES = useRoutes();
  const { deviceSize, setSelectedTreatments } = useSessionStore(state => state);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId, false, false);
      setProduct(productDetails);
    }

    initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID!);
  }, []);

  const imgUrl = deviceSize.isMobile
    ? '/images/product/probadorVirtual.png'
    : '/images/product/probadorVirtual-desk.png';

  if (isEmpty(product)) {
    return <></>;
  }

  return (
    <div className="bg-derma-secondary300 relative">
      <Container className="px-0 md:px-4">
        <Flex
          layout="col-center"
          className="px-4 py-8 md:px-0 md:w-1/2 md:ml-[50%] md:py-24 md:pl-16"
        >
          <Title
            size="2xl"
            className="text-hg-secondary mb-2 md:mb-6 text-center"
          >
            ¿No sabes qué tratamiento hacerte?
          </Title>
          <Text className="mb-8 md:mb-12 md:text-lg text-center text-hg-black500">
            Si sientes curiosidad por algún tratamiento de medicina estética,
            podrás descubrir cómo será el resultado sobre una simulación 3D de
            tu rostro.
          </Text>

          <Button
            id={'tmevent_click_pv_button'}
            size={deviceSize.isMobile ? 'lg' : 'xl'}
            type="secondary"
            onClick={() => {
              setSelectedTreatments([product]);
              router.push(ROUTES.checkout.clinics);
            }}
          >
            <SvgUserScan className="mr-2 h-5 w-5" />
            Pide cita 3D gratis
          </Button>
        </Flex>
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
      </Container>
    </div>
  );
}
