'use client';

import { useEffect, useState } from 'react';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import {
  SvgArrow,
  SvgCross,
  SvgHolaglow,
  SvgMenu,
  SvgUserOctagon,
} from 'icons/IconsDs';
import { HOLAGLOW_COLORS } from 'utils/colors';

import MobileNavigation from './MobileNavigation';

let scrollPos = 0;

const NAV_ITEMS = [
  { name: 'Tratamientos' },
  { name: 'Clínicas' },
  { name: 'Sobre nosotros' },
];

function Navigation() {
  return (
    <nav>
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
        className={`w-full fixed top-0 transition-transform ${
          !isHeaderVisible ? '-translate-y-full' : ''
        }`}
      >
        <Container>
          <Flex
            layout={isMobile ? 'row-between' : 'row-center'}
            className={`py-3 md:py-5 relative h-[48px] ${
              !isMobile ? `h-${HEADER_HEIGHT}` : ''
            }`}
          >
            <SvgHolaglow
              height={isMobile ? 24 : 32}
              width={isMobile ? 98 : 130}
              fill={HOLAGLOW_COLORS['lightMalva']}
              className="md:absolute left-0"
            />

            {!isMobile && <Navigation />}

            <Flex layout="row-center" className="md:absolute right-0">
              <Button
                href="https://holaglow.com"
                type="transparent"
                style={{
                  paddingLeft: isMobile ? '6px' : undefined,
                  paddingRight: isMobile ? '6px' : undefined,
                }}
              >
                <Flex layout="row-center">
                  <SvgUserOctagon
                    height={isMobile ? 28 : 16}
                    width={isMobile ? 28 : 16}
                    fill="transparent"
                  />
                  <span className="hidden md:block ml-2">Mi espacio glow</span>
                </Flex>
              </Button>
              {isMobile && !isMobileNavVisible && (
                <SvgMenu
                  height={24}
                  width={24}
                  className="ml-2"
                  onClick={() => {
                    setIsMobileNavVisible(true);
                    setIsMainScrollEnabled(false);
                  }}
                />
              )}

              {isMobile && isMobileNavVisible && (
                <SvgCross
                  height={24}
                  width={24}
                  className="ml-2"
                  onClick={() => {
                    setIsMobileNavVisible(false);
                    setIsMainScrollEnabled(true);
                  }}
                />
              )}

              {!isMobile && (
                <Button type="tertiary" size="md" className="ml-2">
                  <Flex layout="row-center">
                    <span className="font-semibold">Reservar Cita</span>
                    <SvgArrow height={18} width={18} className="ml-2" />
                  </Flex>
                </Button>
              )}
            </Flex>
          </Flex>
        </Container>
      </header>
    </>
  );
}
