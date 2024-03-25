'use client';

import { useEffect, useRef, useState } from 'react';
import { fetchProduct } from '@utils/fetch';
import { SvgWhatsapp } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Product } from 'app/types/product';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { twMerge } from 'tailwind-merge';

export default function FloatingBottomBar({
  product,
  threshold,
  isVisible = true,
  className = '',
}: {
  product?: Product;
  threshold?: number;
  isVisible?: boolean;
  className?: string;
}) {
  const ROUTES = useRoutes();

  const { setSelectedTreatments, setSelectedPack } = useSessionStore(
    state => state
  );
  const scrollPos = useRef(0);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [medicalVisitProduct, setMedicalVisitProduct] = useState<Product>();

  let url =
    'https://wa.me/+34930346565?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20Holaglow%20y%20vuestros%20tratamientos';
  if (product) {
    url =
      'https://wa.me/+34930346565?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20el%20tratamiento%20' +
      product.title;
  }

  const recalculateVisibility = () => {
    setShowBottomBar(window.scrollY > (threshold ?? 350));
    scrollPos.current = window.scrollY;
  };

  const handleScroll = () => {
    requestAnimationFrame(() => recalculateVisibility());
  };

  useEffect(() => {
    async function initMedicalVisitProduct() {
      const medicalVisitProduct = await fetchProduct(
        process.env.NEXT_PUBLIC_MEDICAL_VISIT || '',
        false,
        false
      );

      setMedicalVisitProduct(medicalVisitProduct);
    }

    initMedicalVisitProduct();
  }, []);

  useEffect(() => {
    scrollPos.current = 0;
    recalculateVisibility();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, handleScroll]);

  return (
    <div
      className={`md:hidden transition-all fixed bottom-0 left-0 right-0 z-40 pointer-events-none ${
        showBottomBar && isVisible ? 'translate-y-[0%]' : 'translate-y-[105%]'
      }`}
    >
      <div
        className={twMerge(
          `p-4 mx-w-xl bg-white rounded-t-[40px] ${className}`
        )}
      >
        <Flex className="justify-between">
          <div className="w-full mr-4">
            <Button
              size="lg"
              type="primary"
              className="mr-4 pointer-events-auto w-full"
              href={ROUTES.checkout.type}
              onClick={() => {
                product && medicalVisitProduct && product.isPack
                  ? setSelectedTreatments([medicalVisitProduct])
                  : !product
                  ? setSelectedTreatments([])
                  : setSelectedTreatments([product]);

                if (product && product.isPack) setSelectedPack(product);
                else setSelectedPack(undefined);
              }}
              id={'tmevent_click_floating_button'}
            >
              {product ? 'Me interesa' : 'Reservar cita'}
            </Button>
          </div>
          <Button
            type="secondary"
            size="lg"
            className="pointer-events-auto"
            customStyles="shrink-0"
          >
            <a
              href={url}
              target="_blank"
              id="tmevent_click_floating_button_whatsapp"
            >
              <SvgWhatsapp className="text-hg-secondary" />
            </a>
          </Button>
        </Flex>
      </div>
    </div>
  );
}
