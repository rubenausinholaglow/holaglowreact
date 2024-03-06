'use client';

import { useEffect, useRef, useState } from 'react';
import PVBanner from 'app/(web)/tratamientos/components/PVBanner';
import { SvgCross } from 'app/icons/IconsDs';

export default function PVBottomBar({
  threshold,
  isVisible = true,
}: {
  threshold?: number;
  isVisible?: boolean;
}) {
  const scrollPos = useRef(0);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const lookingForElement = document.querySelector(
    '#lookingFor'
  ) as HTMLElement;

  let lookingForTopScrollPos = 0;
  let lookingForBottomScrollPos = 0;

  if (lookingForElement) {
    lookingForTopScrollPos =
      lookingForElement.offsetTop - lookingForElement.offsetHeight;

    lookingForBottomScrollPos =
      lookingForElement.offsetTop + lookingForElement.offsetHeight;
  }

  const recalculateVisibility = () => {
    setShowBottomBar(
      (window.scrollY > (threshold ?? 600) &&
        window.scrollY < lookingForTopScrollPos) ||
        window.scrollY > lookingForBottomScrollPos
    );
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
      className={`md:hidden transition-all fixed bottom-0 left-0 right-0 z-40 ${
        showBottomBar && isVisible && !isClosed
          ? 'translate-y-[0%]'
          : 'translate-y-[105%]'
      }`}
    >
      <SvgCross
        className="h-4 w-4 text-hg-secondary absolute top-3 right-3 cursor-pointer"
        onClick={() => setIsClosed(true)}
      />
      <PVBanner isFloating />
    </div>
  );
}
