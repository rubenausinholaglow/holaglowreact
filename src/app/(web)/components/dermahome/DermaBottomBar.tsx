'use client';

import { useEffect, useRef, useState } from 'react';
import { SvgWhatsapp } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

export default function DermaBottomBar({
  threshold,
  isVisible = true,
  showButton = true,
}: {
  threshold?: number;
  isVisible?: boolean;
  showButton?: boolean;
}) {
  const scrollPos = useRef(0);
  const [showBottomBar, setShowBottomBar] = useState(false);

  const recalculateVisibility = () => {
    setShowBottomBar(window.scrollY > (threshold ?? 800));
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

  const url =
    'https://wa.me/+34930346565?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20Holaglow%20derma';
  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 z-40 pointer-events-none md:hidden ${
        showBottomBar && isVisible ? 'translate-y-[0%]' : 'translate-y-[105%]'
      }`}
    >
      {showButton && (
        <div className="p-4 mx-w-xl bg-derma-secondary400 rounded-t-[40px]">
          <Flex className="justify-between h-16">
            <div className="w-full mr-4 h-16">
              <Button
                size="xl"
                type="derma"
                href="/multistep/start"
                className="mr-4 pointer-events-auto w-full"
                customStyles="px-2"
                id="tmevent_derma_multistep_start_bottom"
              >
                Reserva tu videollamada
              </Button>
            </div>
            <Button
              type="derma"
              size="xl"
              className="pointer-events-auto"
              customStyles="shrink-0"
            >
              <a
                href={url}
                target="_blank"
                id="tmevent_click_floating_button_whatsapp"
              >
                <SvgWhatsapp className="text-derma-secondary" />
              </a>
            </Button>
          </Flex>
        </div>
      )}
      {!showButton && (
        <Button
          type="derma"
          size="xl"
          className="pointer-events-auto right-1 bottom-1 fixed bottom-0 z-40"
          customStyles="shrink-0"
        >
          <a
            href={url}
            target="_blank"
            id="tmevent_click_floating_button_whatsapp"
          >
            <SvgWhatsapp className="text-derma-secondary" />
          </a>
        </Button>
      )}
    </div>
  );
}
