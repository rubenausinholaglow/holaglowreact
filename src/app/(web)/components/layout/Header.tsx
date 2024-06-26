'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import { SvgArrow, SvgHolaglow, SvgMenu } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { headerHeight } from 'app/utils/constants';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import Link from 'next/link';

import MobileNavigation from './MobileNavigation';

let isTicking = false;
let scrollPos = 0;

function Navigation({ className }: { className: string }) {
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

export default function Header({
  hideAppointmentButton = false,
}: {
  hideAppointmentButton?: boolean;
}) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [isScrollOnTop, setIsScrollOnTop] = useState(true);

  const {
    setSelectedTreatments,
    setSelectedPack,
    setPreviousSelectedTreatments,
  } = useSessionStore(state => state);

  const recalculateVisibility = () => {
    setIsHeaderVisible(
      window.scrollY < headerHeight() || scrollPos > window.scrollY
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
      <CheckHydration>
        <MobileNavigation
          isVisible={isMobileNavVisible}
          setIsMobileNavVisible={setIsMobileNavVisible}
        />
      </CheckHydration>

      <header
        id="header"
        className="z-30 w-full top-0 left-0 right-0 sticky transition-all h-[56px] md:h-[72px]"
        style={{
          top: !isHeaderVisible ? `-${headerHeight()}px` : '',
          background: isScrollOnTop ? 'transparent' : 'white',
        }}
      >
        {/* <PromoTopBar /> */}
        <Container isHeader>
          <Flex
            layout="row-between"
            className="w-full relative h-[56px] md:h-[72px] items-center justify-between lg:justify-center"
          >
            <Link href={ROUTES.home} className="lg:absolute left-0">
              <SvgHolaglow className="h-[24px] md:h-[32px] w-[98px] md:w-[130px] text-hg-secondary" />
            </Link>

            <Navigation className="hidden lg:block" />
            <Flex layout="row-center" className="lg:absolute right-0 gap-4">
              {!hideAppointmentButton && (
                <CheckHydration>
                  <Button
                    id="tmevents_nav_menu_appointment"
                    size={isMobile ? 'sm' : 'md'}
                    type="white"
                    customStyles="bg-transparent"
                    href={ROUTES.checkout.type}
                    onClick={() => {
                      setSelectedTreatments([]);
                      setSelectedPack(undefined);
                      setPreviousSelectedTreatments([]);
                    }}
                  >
                    Reservar cita
                    <SvgArrow
                      height={16}
                      width={16}
                      className="pointer-events-none hidden md:block ml-2 "
                    />
                  </Button>
                </CheckHydration>
              )}

              <SvgMenu
                height={24}
                width={24}
                className="lg:hidden"
                onClick={() => {
                  setIsMobileNavVisible(true);
                }}
                id="tmevent_nav_menu_open"
              />
            </Flex>
          </Flex>
        </Container>
      </header>
    </>
  );
}
