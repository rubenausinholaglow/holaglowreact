'use client';

import { useEffect, useRef, useState } from 'react';
import { Product } from '@interface/product';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgWhatsapp } from 'icons/IconsDs';
import Link from 'next/link';

export default function FloatingBottomBar({ product }: { product?: Product }) {
  const scrollPos = useRef(0);

  const [showBottomBar, setShowBottomBar] = useState(false);

  const recalculateVisibility = () => {
    setShowBottomBar(window.scrollY < 350 /* || scrollPos > window.scrollY */);
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
        showBottomBar ? 'translate-y-[105%]' : 'translate-y-[0%]'
      }`}
    >
      <div className="p-4 mx-w-xl md:mx-w-0 bg-white md:bg-transparent rounded-t-[40px]">
        <Flex layout="row-right" className="w-full">
          <Button
            size="xl"
            type="tertiary"
            bgColor="bg-hg-primary"
            className="grow mr-4 md:hidden pointer-events-auto"
          >
            <Link href="#prices" className="text-inherit">
              {product ? (
                <span>
                  Reservar cita desde{' '}
                  <span className="underline text-xl font-semibold">
                    {product.price} €
                  </span>
                </span>
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
            <SvgWhatsapp className="text-hg-primary" />
          </Button>
        </Flex>
      </div>
    </div>
  );
}
