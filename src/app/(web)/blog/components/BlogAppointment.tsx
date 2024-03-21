'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import useRoutes from '@utils/useRoutes';
import { useSessionStore } from 'app/stores/globalStore';
import { fetchProduct } from 'app/utils/fetch';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

export default function BlogAppointment() {
  const ROUTES = useRoutes();
  const router = useRouter();

  const { deviceSize, setSelectedTreatments, setSelectedPack } =
    useSessionStore(state => state);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId, false, false);
      setProduct(productDetails);
    }

    initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID!);
  }, []);

  const imgUrl = deviceSize.isMobile
    ? '/images/blog/BlogAppointment.png'
    : '/images/blog/BlogAppointment-desk.png';

  if (isEmpty(product)) {
    return <></>;
  }

  return (
    <div className="bg-hg-secondary relative">
      <Container className="px-0 md:px-4">
        <div
          className="relative aspect-[5/6] md:aspect-auto md:absolute top-0 bottom-0 right-0 md:left-[50%]"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: deviceSize.isMobile
              ? 'bottom center'
              : 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <Flex
          layout="col-center"
          className="px-4 py-8 md:px-0 md:w-1/2 md:mr-[50%] md:py-24 md:pl-16"
        >
          <Text
            isAnimated
            className="text-hg-primary font-gtUltra mb-6 text-3xl md:text-4xl md:pr-8"
          >
            Reserva tu cita
          </Text>
          <Text
            isAnimated
            className="mb-8 md:mb-12 text-white text-lg text-center md:pr-8"
          >
            Encuentra tu tratamiento ideal y pon las reglas a tu belleza.
          </Text>

          <Button
            className="mb-8 md:mb-0"
            id={'tmevent_click_pv_button'}
            isAnimated
            size={deviceSize.isMobile ? 'lg' : 'xl'}
            type="secondary"
            onClick={() => {
              setSelectedTreatments([product]);
              if (product.isPack) setSelectedPack(product);
              else setSelectedPack(undefined);
              router.push(ROUTES.checkout.clinics);
            }}
          >
            Ver disponibilidad
          </Button>
        </Flex>
      </Container>
    </div>
  );
}
