'use client';

import { useEffect, useRef, useState } from 'react';
import { SvgWhatsapp } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Product } from 'app/types/product';
import { getDiscountedPrice } from 'app/utils/common';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
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
      <div className="p-4 mx-w-xl bg-white rounded-t-[40px]">
        <Flex className="justify-between h-16">
          <div className="w-full mr-4 h-16">
            <Button
              size="xl"
              type="primary"
              className="mr-4 pointer-events-auto w-full"
              href={ROUTES.checkout.type}
              onClick={() => (!product ? setSelectedTreatments([]) : null)}
              id={'tmevent_click_floating_button'}
            >
              Me interesa
            </Button>
          </div>
          <Button
            type="secondary"
            size="xl"
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
