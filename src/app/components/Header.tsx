'use client';

import { useEffect, useState } from 'react';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { SvgArrow, SvgCross, SvgHolaglow, SvgUserOctagon } from 'icons/IconsDs';
import IsMobile from 'utils/breakpoints';
import { HOLAGLOW_COLORS } from 'utils/colors';

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
  const headerHeight = 64;
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(null);

  const recalculateVisibility = () => {
    setIsVisible(window.scrollY < headerHeight || scrollPos > window.scrollY);
    scrollPos = window.scrollY;
  };

  const handleScroll = () => {
    requestAnimationFrame(() => recalculateVisibility());
  };

  useEffect(() => {
    scrollPos = 0;
    recalculateVisibility();

    window.addEventListener('scroll', handleScroll, { passive: true });

    setIsMobile(IsMobile());
  }, []);

  if (isMobile === null) {
    return <></>;
  }

  return (
    <header
      id="header"
      className={`w-full fixed top-0 transition-transform ${
        !isVisible && '-translate-y-full'
      }`}
    >
      <Container>
        <Flex
          layout={isMobile ? 'row-between' : 'row-center'}
          className="py-5 relative"
        >
          <SvgHolaglow
            height={32}
            width={130}
            fill={HOLAGLOW_COLORS['lightMalva']}
            className="md:absolute left-0"
          />

          {!isMobile && <Navigation className="hidden md:block" />}

          <Flex layout="row-center" className="md:absolute right-0">
            <Button href="https://holaglow.com" type="transparent" size="sm">
              <Flex layout="row-center">
                <SvgUserOctagon
                  height={isMobile ? 24 : 16}
                  width={isMobile ? 24 : 16}
                  fill="transparent"
                />
                <span className="hidden md:block ml-2">Mi espacio glow</span>
              </Flex>
            </Button>
            {isMobile ? (
              <SvgCross height={24} width={24} className="pl-1" />
            ) : (
              <Button type="tertiary" size="sm">
                <Flex layout="row-center">
                  <span className="font-semibold">Reserva Cita</span>
                  <SvgArrow
                    height={24}
                    width={24}
                    className="rotate-180 ml-2"
                  />
                </Flex>
              </Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}
