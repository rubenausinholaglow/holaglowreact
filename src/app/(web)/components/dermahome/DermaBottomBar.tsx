'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from 'designSystem/Buttons/Buttons';

export default function DermaBottomBar({
  threshold,
  isVisible = true,
}: {
  threshold?: number;
  isVisible?: boolean;
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

  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 z-40 pointer-events-none md:hidden ${
        showBottomBar && isVisible ? 'translate-y-[0%]' : 'translate-y-[105%]'
      }`}
    >
      <div className="p-4 mx-w-xl bg-derma-secondary400 rounded-t-[40px]">
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
    </div>
  );
}
