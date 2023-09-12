'use client';

import { useEffect, useState } from 'react';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import {
  SvgArrow,
  SvgCross,
  SvgHolaglow,
  SvgMenu,
  SvgUserOctagon,
} from 'icons/IconsDs';

import MobileNavigation from './MobileNavigation';

let scrollPos = 0;

const NAV_ITEMS = [
  { name: 'Tratamientos' },
  { name: 'Clínicas' },
  { name: 'Sobre nosotros' },
];

function Navigation({ className }: { className: string }) {
  return (
    <nav className={className}>
      <ul className="flex flex-row gap-16">
        {NAV_ITEMS.map(navItem => (
          <li className="font-medium" key={navItem.name}>
            {navItem.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const deviceSize = useGlobalPersistedStore(state => state.deviceSize);

  const setIsMainScrollEnabled = useGlobalStore(
    state => state.setIsMainScrollEnabled
  );

  const HEADER_HEIGHT = deviceSize.isMobile
    ? HEADER_HEIGHT_MOBILE
    : HEADER_HEIGHT_DESKTOP;
  const HEADER_HEIGHT_CLASS = `h-[${HEADER_HEIGHT}px]`;

  const recalculateVisibility = () => {
    setIsHeaderVisible(
      window.scrollY < HEADER_HEIGHT || scrollPos > window.scrollY
    );
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
    <>
      <MobileNavigation
        isVisible={isMobileNavVisible}
        headerHeight={HEADER_HEIGHT}
      />

      <header
        id="header"
        className={`z-10 w-full bg-white fixed top-0 transition-transform ${
          !isHeaderVisible ? '-translate-y-full' : ''
        }`}
      >
        <Container>
          <Flex
            layout="row-between"
            className={`relative py-3 lg:py-5 lg:justify-center ${HEADER_HEIGHT_CLASS}`}
          >
            <SvgHolaglow
              fill={HOLAGLOW_COLORS['purple']}
              className="lg:absolute left-0 h-[24px] lg:h-[32px] w-[98px] lg:w-[130px]"
            />

            <Navigation className="hidden lg:block" />

            <Flex layout="row-center" className="lg:absolute right-0">
              <Button
                href="https://holaglow.com"
                type="transparent"
                customStyles="px-[6px] lg:px-0"
              >
                <Flex layout="row-center">
                  <SvgUserOctagon
                    fill="transparent"
                    className="h-[28px] w-[28px] lg:h-[16px] lg:w-[16px]"
                  />
                  <span className="hidden lg:block ml-2">Mi espacio glow</span>
                </Flex>
              </Button>

              {!isMobileNavVisible && (
                <SvgMenu
                  height={24}
                  width={24}
                  className="ml-2 lg:hidden"
                  onClick={() => {
                    setIsMobileNavVisible(true);
                    setIsMainScrollEnabled(false);
                  }}
                />
              )}

              {isMobileNavVisible && (
                <SvgCross
                  height={24}
                  width={24}
                  className="ml-2 lg:hidden"
                  onClick={() => {
                    setIsMobileNavVisible(false);
                    setIsMainScrollEnabled(true);
                  }}
                />
              )}

              <Button
                type="tertiary"
                size="md"
                className="ml-2 hidden lg:block"
              >
                <Flex layout="row-center">
                  <span className="font-semibold">Reservar Cita</span>
                  <SvgArrow height={18} width={18} className="ml-2" />
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </Container>
      </header>
    </>
  );
}
