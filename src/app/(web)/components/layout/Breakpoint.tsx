'use client';

import { useEffect, useState } from 'react';
import { isClient } from '@utils/utils';

export function DeviceSize() {
  const breakpoint = window.document.querySelector('#breakpoint');

  if (breakpoint) {
    const content = getComputedStyle(breakpoint, ':after').content.replace(
      /["']/g,
      ''
    );

    return {
      isMobile: content === 'sm',
      isTablet: content === 'md',
      isDesktop: content === 'lg',
      isWideScreen: content === 'xl',
    };
  }

  return {
    isMobile: true,
    isTablet: false,
    isDesktop: false,
    isWideScreen: false,
  };
}

export function useDeviceSizeSSR() {
  const [deviceSize, setDeviceSize] = useState<any>({});

  useEffect(() => {
    const breakpoint = window.document.querySelector('#breakpoint');

    if (breakpoint) {
      const content = getComputedStyle(breakpoint, ':after').content.replace(
        /["']/g,
        ''
      );

      setDeviceSize({
        isMobile: content === 'sm',
        isTablet: content === 'md',
        isDesktop: content === 'lg',
        isWideScreen: content === 'xl',
      });
    }
  }, []);

  return deviceSize;
}

export function Breakpoint() {
  return (
    <div
      id="breakpoint"
      className="after:content-['sm'] md:after:content-['md'] lg:after:content-['lg'] xl:after:content-['xl'] hidden"
    />
  );
}

export function isMobile() {
  if (isClient()) {
    const breakpoint = window.document.querySelector('#breakpoint');

    if (breakpoint) {
      const content = getComputedStyle(breakpoint, ':after').content.replace(
        /["']/g,
        ''
      );

      return content === 'sm';
    }
  }
}

export function isTablet() {
  if (isClient()) {
    const breakpoint = window.document.querySelector('#breakpoint');

    if (breakpoint) {
      const content = getComputedStyle(breakpoint, ':after').content.replace(
        /["']/g,
        ''
      );

      return content === 'md';
    }
  }
}
