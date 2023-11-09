'use client';

import { ReactNode, RefObject, useEffect, useState } from 'react';
import { useElementOnScreen } from 'app/utils/common';

export const AnimateOnViewport = ({
  className = '',
  origin = 'bottom',
  children,
}: {
  className?: string;
  origin?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
}) => {
  const [animated, setAnimated] = useState(false);
  const [ref, isInViewport] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  let animationOrigin = '';

  switch (origin) {
    case 'top':
      animationOrigin = '-translate-y-full';
      break;
    case 'right':
      console.log('origin right!');
      animationOrigin = 'translate-x-full';
      break;
    case 'bottom':
      animationOrigin = 'translate-y-full';
      break;
    case 'left':
      animationOrigin = '-translate-x-full';
      break;
    default:
      break;
  }

  let styles = `transition-all duration-500 ${className}`;

  styles +=
    isInViewport || animated
      ? ' opacity-1 translate-0'
      : ` opacity-0 ${animationOrigin}`;

  useEffect(() => {
    if (isInViewport) {
      console.log('setAnimated');
      setAnimated(true);
    }
  }, [isInViewport]);

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={styles}>
      {children}
    </div>
  );
};
