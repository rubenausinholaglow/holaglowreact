'use client';

import { useEffect, useRef, useState } from 'react';
import { SvgWhatsapp } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

export default function PlanesBottomBar({
  threshold,
  selectedOption,
  isVisible = true,
}: {
  threshold?: number;
  selectedOption: string;
  isVisible?: boolean;
}) {
  const scrollPos = useRef(0);
  const [showBottomBar, setShowBottomBar] = useState(false);

  const recalculateVisibility = () => {
    setShowBottomBar(window.scrollY > (threshold ?? 300));
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

  const OPTIONS_VALUES = ['0', '1', '2'];

  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 z-40 pointer-events-none md:hidden ${
        showBottomBar && isVisible ? 'translate-y-[0%]' : 'translate-y-[105%]'
      }`}
    >
      <div className="p-4 mx-w-xl bg-white rounded-t-[40px]">
        <Button
          size="lg"
          type="derma"
          href="#"
          className="pointer-events-auto w-full"
          customStyles="px-2"
        >
          {!OPTIONS_VALUES.includes(selectedOption)
            ? 'Elige tu plan'
            : 'Continuar'}
        </Button>
      </div>
    </div>
  );
}
