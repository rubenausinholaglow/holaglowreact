'use client';

import { useEffect, useRef, useState } from 'react';
import { Product } from '@interface/product';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgWhatsapp } from 'icons/IconsDs';
import Link from 'next/link';

export default function FloatingBottomBar({
  product,
  isVisible = true,
}: {
  product?: Product;
  isVisible?: boolean;
}) {
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
    setShowBottomBar(window.scrollY > 350);
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
      <div className="p-4 mx-w-xl md:mx-w-0 bg-white md:bg-transparent rounded-t-[40px]">
        <Flex layout="row-right" className="w-full">
          <Button
            size="xl"
            type="tertiary"
            bgColor="bg-hg-primary"
            className="grow mr-4 md:hidden pointer-events-auto"
            customStyles="px-4"
          >
            <Link href="#prices">
              {product ? (
                <>
                  <span className="inline-block">Reservar cita desde</span>{' '}
                  <span className="inline-block underline text-xl font-semibold">
                    {product.price} €
                  </span>
                </>
              ) : (
                'Reservar cita'
              )}
            </Link>
          </Button>
          <Button
            type="primary"
            size="xl"
            className="pointer-events-auto"
            bgColor="bg-hg-black"
            customStyles="h-[64px] p-0 w-[64px]"
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
