'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import { SvgHolaglowDerma } from 'app/icons/iconsDerma';
import { SvgArrow } from 'app/icons/IconsDs';
import {
  DERMA_HEADER_HEIGHT_DESKTOP,
  DERMA_HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Link from 'next/link';

import AnimateOnViewport from '../common/AnimateOnViewport';

let isTicking = false;
let scrollPos = 0;

export default function DermaHeader({
  hideButton = false,
}: {
  hideButton: boolean;
}) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrollOnTop, setIsScrollOnTop] = useState(true);

  const HEADER_HEIGHT = isMobile
    ? DERMA_HEADER_HEIGHT_MOBILE
    : DERMA_HEADER_HEIGHT_DESKTOP;

  const HEADER_HEIGHT_CLASS = `${HEADER_HEIGHT}px`;

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
              className={`w-full relative py-4 lg:py-5 justify-between lg:justify-center`}
              style={{ height: HEADER_HEIGHT_CLASS }}
            >
              <Link href={ROUTES.home} className="lg:absolute left-0 2xl:ml-20">
                <SvgHolaglowDerma className="w-[92px] h-[32px] md:w-[144px] md:h-[50px]" />
              </Link>

              {!hideButton && (
                <Button
                  size={isMobile ? 'sm' : 'md'}
                  id="tmevent_derma_multistep_start_top"
                  className="lg:absolute right-0 2xl:mr-20"
                  type="tertiary"
                  href={ROUTES.derma.multistep.start}
                  customStyles="bg-transparent text-derma-tertiary border-derma-tertiary md:text-derma-tertiary md:border-derma-tertiary"
                >
                  <Text className="md:font-semibold">Analizar mi piel</Text>
                  <SvgArrow className="h-5 w-5 hidden ml-2 md:block" />
                </Button>
              )}
            </Flex>
          </Container>
        </AnimateOnViewport>
      </header>
    </CheckHydration>
  );
}
