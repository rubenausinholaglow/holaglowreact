'use client';

import { useEffect, useState } from 'react';
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

  const { deviceSize, setSelectedTreatments } = useSessionStore(state => state);

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
        {/* <PromoTopBar /> */}
        <AnimateOnViewport origin="top">
          <Container isHeader>
            <Flex
              layout="row-between"
              className={`w-full relative py-4 lg:py-5 justify-between lg:justify-center ${HEADER_HEIGHT_CLASS}`}
            >
              <Link href={ROUTES.home} className="lg:absolute left-0 2xl:ml-20">
                <SvgHolaglow
                  fill={DERMA_COLORS['secondary']}
                  className="h-[24px] lg:h-[32px] w-[98px] lg:w-[130px]"
                />
              </Link>
            </Flex>
          </Container>
        </AnimateOnViewport>
      </header>
    </>
  );
}
