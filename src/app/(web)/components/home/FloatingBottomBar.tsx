'use client';

import { useEffect, useRef, useState } from 'react';
import { Product } from 'app/(dashboard)/dashboard/interface/product';
import { useSessionStore } from 'app/stores/globalStore';
import { getDiscountedPrice } from 'app/utils/common';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgWhatsapp } from 'icons/IconsDs';
import { isEmpty } from 'lodash';

export default function FloatingBottomBar({
  product,
  threshold,
  isVisible = true,
}: {
  product?: Product;
  threshold?: number;
  isVisible?: boolean;
}) {
  const ROUTES = useRoutes();

  const { setSelectedTreatments } = useSessionStore(state => state);
  const scrollPos = useRef(0);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);

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

  useEffect(() => {
    if (product && !isEmpty(product.discounts)) {
      setDiscountedPrice(getDiscountedPrice(product));
    }
  }, [product]);

  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 z-40 pointer-events-none ${
        showBottomBar && isVisible ? 'translate-y-[0%]' : 'translate-y-[105%]'
      }`}
    >
      <div className="p-4 mx-w-xl bg-white rounded-t-[40px]">
        <Flex className="justify-between h-16">
          <div className="w-full mr-4 h-16">
            <Button
              size="xl"
              type="tertiary"
              bgColor="bg-hg-primary"
              className="mr-4 pointer-events-auto w-full"
              href={product ? '#prices' : ROUTES.checkout.clinics}
              onClick={() => (!product ? setSelectedTreatments([]) : null)}
              customStyles="px-2"
              id={'tmevent_click_floating_button'}
            >
              {product ? (
                <div className="w-full">
                  <span className="inline-block mr-1">Reserva desde</span>
                  {discountedPrice && (
                    <span className="inline-block line-through font-normal mr-1">
                      {product.price} €
                    </span>
                  )}
                  <span className="font-semibold text-lg">
                    {discountedPrice ? discountedPrice : product.price} €
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
            id={'tmevent_click_floating_button'}
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
