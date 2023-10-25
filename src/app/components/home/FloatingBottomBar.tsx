'use client';

import { useEffect, useRef, useState } from 'react';
import { Product } from '@interface/product';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgWhatsapp } from 'icons/IconsDs';

export default function FloatingBottomBar({
  product,
  threshold,
  isVisible = true,
}: {
  product?: Product;
  threshold?: number;
  isVisible?: boolean;
}) {
  const { setSelectedTreatments } = useGlobalPersistedStore(state => state);
  const scrollPos = useRef(0);
  const [showBottomBar, setShowBottomBar] = useState(false);

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
    scrollPos.current = 0;
    recalculateVisibility();

    window.addEventListener('scroll', handleScroll, { passive: true });
  }, []);

  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 z-40 pointer-events-none ${
        showBottomBar && isVisible ? 'translate-y-[0%]' : 'translate-y-[105%]'
      }`}
    >
      <div className="p-4 mx-w-xl bg-white rounded-t-[40px]">
        <Flex className="justify-between">
          <div className="w-full mr-4">
            <Button
              size="xl"
              type="tertiary"
              bgColor="bg-hg-primary"
              className="mr-4 pointer-events-auto w-full"
              href={product ? '#prices' : ROUTES.checkout.clinics}
              onClick={() => (!product ? setSelectedTreatments([]) : null)}
              customStyles="px-4"
            >
              {product ? (
                <div className="w-full">
                  <span className="inline-block">Reservar cita desde</span>{' '}
                  <span className="inline-block underline text-xl font-semibold">
                    {product.price} €
                  </span>
                </div>
              ) : (
                'Reservar cita'
              )}
            </Button>
          </div>
          <Button
            type="primary"
            size="xl"
            className="pointer-events-auto"
            customStyles="h-[64px] p-0 w-[64px] shrink-0"
          >
            <a href={url} target="_blank">
              <SvgWhatsapp className="text-hg-primary" />
            </a>
          </Button>
        </Flex>
      </div>
    </div>
  );
}
