'use client';

import { useEffect, useState } from 'react';
import CheckHydration from '@utils/CheckHydration';
import { SvgHolaglowDerma } from 'app/icons/iconsDerma';
import { useSessionStore } from 'app/stores/globalStore';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import useRoutes from 'app/utils/useRoutes';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import Link from 'next/link';

import { AnimateOnViewport } from '../common/AnimateOnViewport';

let isTicking = false;
let scrollPos = 0;

export default function DermaHeader() {
  const ROUTES = useRoutes();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrollOnTop, setIsScrollOnTop] = useState(true);

  const { deviceSize } = useSessionStore(state => state);

  const HEADER_HEIGHT = deviceSize.isMobile
    ? HEADER_HEIGHT_MOBILE
    : HEADER_HEIGHT_DESKTOP;
  const HEADER_HEIGHT_CLASS = `h-[${HEADER_HEIGHT}px]`;

  const recalculateVisibility = () => {
    setIsHeaderVisible(
      window.scrollY < HEADER_HEIGHT || scrollPos > window.scrollY
    );
    scrollPos = window.scrollY;
    setIsScrollOnTop(scrollPos === 0);

    isTicking = false;
  };

  const handleScroll = () => {
    if (!isTicking) {
      requestAnimationFrame(() => recalculateVisibility());
      isTicking = true;
    }
  };

  useEffect(() => {
    scrollPos = 0;
    isTicking = false;

    recalculateVisibility();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <CheckHydration>
      <header
        id="header"
        className={`z-30 w-full top-0 sticky transition-all ${
          !isHeaderVisible ? '-translate-y-full' : '-translate-y-0'
        } ${isScrollOnTop ? 'bg-transparent' : 'bg-white'}`}
      >
        <AnimateOnViewport origin="top">
          <Container isHeader>
            <Flex
              layout="row-between"
              className={`w-full relative py-4 lg:py-5 justify-between lg:justify-center ${HEADER_HEIGHT_CLASS}`}
            >
              <Link href={ROUTES.home} className="lg:absolute left-0 2xl:ml-20">
                <SvgHolaglowDerma width={92} height={32} className="mt-1" />
              </Link>
            </Flex>
          </Container>
        </AnimateOnViewport>
      </header>
    </CheckHydration>
  );
}

{
  /* <header
      id="header"
      className={`z-30 w-full top-0 sticky transition-all ${
        !isHeaderVisible ? '-translate-y-full' : '-translate-y-0'
      } ${isScrollOnTop ? 'bg-transparent' : 'bg-white'}`}
    >
      <AnimateOnViewport origin="top">
        <Container>
          <Flex
            layout="row-between"
            className={`w-full relative ${HEADER_HEIGHT_CLASS}`}
          >
            <Link href={ROUTES.home}>
              <SvgHolaglowDerma className="w-[92px] h-[32px] md:w-[144px] md:h-[50px]" />
            </Link>

            <Button
              type="tertiary"
              customStyles="bg-transparent border-derma-primary"
            >
              <Text className="font-semibold text-derma-primary mr-2">
                Reservar cita
              </Text>
              <SvgArrow className="h-5 w-5" />
            </Button>
          </Flex>
        </Container>
      </AnimateOnViewport>
    </header> */
}
