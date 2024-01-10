'use client';

import { useEffect, useState } from 'react';
import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgBy, SvgDerma } from 'app/icons/iconsDerma';
import { SvgArrow, SvgHolaglow, SvgMenu } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { DERMA_COLORS } from 'app/utils/colors.derma';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import Link from 'next/link';

import { AnimateOnViewport } from '../common/AnimateOnViewport';
import MobileNavigation from './MobileNavigation';
import PromoTopBar from './PromoTopBar';

let isTicking = false;
let scrollPos = 0;

function Navigation({ className }: { className: string }) {
  const ROUTES = useRoutes();

  const NAV_ITEMS = [
    { name: 'Tratamientos', link: ROUTES.treatments },
    { name: 'Clínicas', link: ROUTES.clinics },
    { name: 'Sobre nosotros', link: ROUTES.aboutUs },
    { name: 'Blog', link: ROUTES.blog },
  ];

  return (
    <nav className={className}>
      <ul className="flex flex-row gap-16">
        {NAV_ITEMS.map(navItem => (
          <li className="font-medium" key={navItem.name}>
            <Link href={navItem.link} id={'tmevent_nav_menu_click'}>
              {navItem.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function DermaHeader() {
  const ROUTES = useRoutes();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
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
    <>
      <MobileNavigation
        isVisible={isMobileNavVisible}
        headerHeight={HEADER_HEIGHT}
        setIsMobileNavVisible={setIsMobileNavVisible}
      />

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
                <Flex layout="row-left" className="gap-1">
                  <SvgDerma className="text-hg-black700" />
                  <SvgBy className="text-hg-black700" />
                  <SvgHolaglowHand className="w-5 text-hg-black700" />
                </Flex>
              </Link>
            </Flex>
          </Container>
        </AnimateOnViewport>
      </header>
    </>
  );
}
