'use client';

import { useEffect, useState } from 'react';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgWhatsapp } from 'icons/IconsDs';

let scrollPos = 0;

export default function FloatingBottomBar() {
  const [showBottomBar, setShowBottomBar] = useState(false);

  const recalculateVisibility = () => {
    setShowBottomBar(window.scrollY < 350 /* || scrollPos > window.scrollY */);
    scrollPos = window.scrollY;
  };

  const handleScroll = () => {
    requestAnimationFrame(() => recalculateVisibility());
  };

  useEffect(() => {
    scrollPos = 0;
    recalculateVisibility();

    window.addEventListener('scroll', handleScroll, { passive: true });
  }, []);

  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 z-50 ${
        showBottomBar ? 'translate-y-[105%]' : 'translate-y-[0%]'
      }`}
    >
      <Container className="pb-4">
        <Flex layout="row-center" className="justify-between w-full">
          <Button
            size="xl"
            type="tertiary"
            bgColor="bg-hg-primary"
            className="grow mr-4"
          >
            Reservar cita
          </Button>
          <Button type="primary" size="xl" customStyles="p-0 w-[64px]">
            <SvgWhatsapp />
          </Button>
        </Flex>
      </Container>
    </div>
  );
}
