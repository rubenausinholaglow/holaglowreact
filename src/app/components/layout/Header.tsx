'use client';

import { useEffect, useState } from 'react';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { ROUTES } from 'app/utils/routes';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgCross, SvgHolaglow, SvgMenu } from 'icons/IconsDs';
import Link from 'next/link';

import MobileNavigation from './MobileNavigation';

let scrollPos = 0;

const NAV_ITEMS = [
  { name: 'Tratamientos', link: ROUTES.treatments },
  { name: 'Clínicas', link: ROUTES.clinics },
  { name: 'Sobre nosotros', link: ROUTES.treatments },
];

function Navigation({ className }: { className: string }) {
  return (
    <nav className={className}>
      <ul className="flex flex-row gap-16">
        {NAV_ITEMS.map(navItem => (
          <li className="font-medium" key={navItem.name}>
            <Link className="text-inherit" href={navItem.link}>
              {navItem.name}
            </Link>
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
  const { analyticsMetrics, setAnalyticsMetrics } = useGlobalPersistedStore(
    state => state
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

    getAnalyticsMetrics();
  }, []);

  return (
    <>
      <MobileNavigation
        isVisible={isMobileNavVisible}
        headerHeight={HEADER_HEIGHT}
      />

      <header
        id="header"
        className={`z-30 w-full bg-white fixed top-0 transition-transform ${
          !isHeaderVisible ? '-translate-y-full' : ''
        }`}
      >
        <Container isHeader>
          <Flex
            layout="row-between"
            className={`relative py-3 lg:py-5 justify-between ${HEADER_HEIGHT_CLASS}`}
          >
            <Link href={ROUTES.home} className="2xl:ml-20">
              <SvgHolaglow
                fill={HOLAGLOW_COLORS['secondary']}
                className="h-[24px] lg:h-[32px] w-[98px] lg:w-[130px]"
              />
            </Link>
            <Navigation className="hidden lg:block 2xl:mr-20" />

            <Flex layout="row-center" className="lg:absolute right-0">
              {!isMobileNavVisible && (
                <SvgMenu
                  height={24}
                  width={24}
                  className="ml-2 lg:hidden"
                  onClick={() => {
                    setIsMobileNavVisible(true);
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
                  }}
                />
              )}
            </Flex>
          </Flex>
        </Container>
      </header>
    </>
  );

  function getAnalyticsMetrics() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const deviceStr = params.get('device');
    const loc_physical_ms = params.get('loc_physical_ms');
    const utm_adgroup = params.get('utm_adgroup');
    const utm_campaign = params.get('utm_campaign');
    const utm_medium = params.get('utm_medium');
    const utm_source = params.get('utm_source');
    const utm_term = params.get('utm_term');
    const utm_content = params.get('utm_content');
    if (deviceStr) {
      let device = 0;
      switch (deviceStr) {
        case 'm':
          device = 3;
          break;
        case 't':
          device = 2;
          break;
        case 'd':
          device = 1;
          break;
        default:
          device = 0;
          break;
      }
      analyticsMetrics.device = device;
    }
    if (loc_physical_ms) analyticsMetrics.locPhysicalMs = loc_physical_ms;
    if (utm_adgroup) analyticsMetrics.utmAdgroup = utm_adgroup;
    if (utm_campaign) analyticsMetrics.utmCampaign = utm_campaign;
    if (utm_medium) analyticsMetrics.utmMedium = utm_medium;
    if (utm_source) analyticsMetrics.utmSource = utm_source;
    if (utm_term) analyticsMetrics.utmTerm = utm_term;
    if (utm_content) analyticsMetrics.utmContent = utm_content;
    setAnalyticsMetrics(analyticsMetrics);
  }
}
