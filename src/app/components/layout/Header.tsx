'use client';

import { useEffect, useState } from 'react';
import { useSessionStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrow, SvgCross, SvgHolaglow, SvgMenu } from 'icons/IconsDs';
import Link from 'next/link';

import { AnimateOnViewport } from '../common/AnimateOnViewport';
import MobileNavigation from './MobileNavigation';
import PromoTopBar from './PromoTopBar';

let isTicking = false;
let scrollPos = 0;

const NAV_ITEMS = [
  { name: 'Tratamientos', link: ROUTES.treatments },
  { name: 'Clínicas', link: ROUTES.clinics },
  { name: 'Sobre nosotros', link: ROUTES.aboutUs },
];

function Navigation({ className }: { className: string }) {
  return (
    <nav className={className}>
      <ul className="flex flex-row gap-16">
        {NAV_ITEMS.map(navItem => (
          <li className="font-medium" key={navItem.name}>
            <Link href={navItem.link}>{navItem.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

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
        className={`z-30 w-full bg-white top-0 sticky transition-transform ${
          !isHeaderVisible ? '-translate-y-full' : '-translate-y-0'
        }`}
      >
        <PromoTopBar />
        <AnimateOnViewport origin="top">
          <Container isHeader>
            <Flex
              layout="row-between"
              className={`w-full relative py-4 lg:py-5 justify-between lg:justify-center ${HEADER_HEIGHT_CLASS}`}
            >
              <Link href={ROUTES.home} className="lg:absolute left-0 2xl:ml-20">
                <SvgHolaglow
                  fill={HOLAGLOW_COLORS['secondary']}
                  className="h-[24px] lg:h-[32px] w-[98px] lg:w-[130px]"
                />
              </Link>

              <Navigation className="hidden lg:block 2xl:mr-20" />

              <Flex
                layout="row-center"
                className="lg:absolute right-0 2xl:mr-20"
              >
                <Button
                  type="tertiary"
                  href={ROUTES.checkout.clinics}
                  className="hidden md:block"
                  onClick={() => {
                    setSelectedTreatments([]);
                  }}
                >
                  Reservar cita
                  <SvgArrow height={16} width={16} className="ml-2" />
                </Button>

                <SvgMenu
                  height={24}
                  width={24}
                  className="ml-2 lg:hidden"
                  onClick={() => {
                    setIsMobileNavVisible(true);
                  }}
                />
              </Flex>
            </Flex>
          </Container>
        </AnimateOnViewport>
      </header>
    </>
  );
}
