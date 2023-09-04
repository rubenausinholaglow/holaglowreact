'use client';

import { useEffect, useState } from 'react';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
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

  const isMobile = useGlobalPersistedStore(state => state.isMobile);
  const setIsMainScrollEnabled = useGlobalStore(
    state => state.setIsMainScrollEnabled
  );

  const HEADER_HEIGHT = isMobile ? 48 : 72;
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
            className={`relative py-3 md:py-5 md:justify-center ${HEADER_HEIGHT_CLASS}`}
          >
            <SvgHolaglow
              fill={HOLAGLOW_COLORS['purple']}
              className="md:absolute left-0 h-[24px] md:h-[32px] w-[98px] md:w-[130px]"
            />

            <Navigation className="hidden md:block" />

            <Flex layout="row-center" className="md:absolute right-0">
              <Button
                href="https://holaglow.com"
                type="transparent"
                customStyles="px-[6px] md:px-0"
              >
                <Flex layout="row-center">
                  <SvgUserOctagon
                    fill="transparent"
                    className="h-[28px] w-[28px] md:h-[16px] md:w-[16px]"
                  />
                  <span className="hidden md:block ml-2">Mi espacio glow</span>
                </Flex>
              </Button>

              {!isMobileNavVisible && (
                <SvgMenu
                  height={24}
                  width={24}
                  className="ml-2 md:hidden"
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
                  className="ml-2 md:hidden"
                  onClick={() => {
                    setIsMobileNavVisible(false);
                    setIsMainScrollEnabled(true);
                  }}
                />
              )}

              <Button
                type="tertiary"
                size="md"
                className="ml-2 hidden md:block"
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
