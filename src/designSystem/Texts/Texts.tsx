'use client';

import { ReactNode, RefObject, useEffect, useState } from 'react';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { useElementOnScreen } from 'app/utils/common';
import { twMerge } from 'tailwind-merge';

export const Title = ({
  size = 'xl',
  weight = 'semibold',
  as = 'h3',
  className = '',
  disableAnimation = false,
  onClick = undefined,
  children,
}: {
  size?: '3xl' | '2xl' | 'xl';
  weight?: string;
  as?: 'h3' | 'h1';
  className?: string;
  disableAnimation: boolean;
  children: ReactNode;
  onClick?: (...args: any[]) => void;
}) => {
  const [animated, setAnimated] = useState(false);
  const [titleRef, isTitleInViewport] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  const HtmlComponent = as;
  const STYLES = {
    '3xl': 'text-4xl lg:text-6xl',
    '2xl': 'text-3xl lg:text-5xl',
    xl: 'text-xl lg:text-2xl',
  };

  const baseStyles = twMerge(
    `${STYLES[size]} font-${weight} ${className} transition-all duration-700`
  );

  let styles = baseStyles;

  if (!disableAnimation) {
    styles +=
      isTitleInViewport || animated
        ? ' opacity-1 translate-y-0'
        : ' opacity-0 translate-y-full';
  }

  useEffect(() => {
    if (isTitleInViewport) {
      setAnimated(true);
    }
  }, [isTitleInViewport]);

  return (
    <HtmlComponent
      ref={titleRef as RefObject<HTMLHeadingElement>}
      className={styles}
      onClick={onClick}
    >
      {children}
    </HtmlComponent>
  );
};

export const Text = ({
  size = 'md',
  as = 'p',
  className = '',
  onClick = undefined,
  children,
  disableAnimation = false,
  rest,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  as?: 'h3' | 'p' | 'span';
  className?: string;
  onClick?: (...args: any[]) => void;
  children: ReactNode;
  disableAnimation: boolean;
  [key: string]: any;
}) => {
  const [animated, setAnimated] = useState(false);
  const [textRef, isTitleInViewport] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  const HtmlComponent = as;

  const baseStyles = twMerge(
    `text-left ${
      size ? `text-${size}` : 'text-md'
    } ${className} transition-all duration-700`
  );

  let styles = baseStyles;

  if (!disableAnimation) {
    styles +=
      isTitleInViewport || animated
        ? ' opacity-1 translate-y-0'
        : ' opacity-0 translate-y-full';
  }

  useEffect(() => {
    if (isTitleInViewport) {
      setAnimated(true);
    }
  }, [isTitleInViewport]);

  return (
    <HtmlComponent
      className={styles}
      onClick={onClick}
      {...rest}
      ref={
        textRef as RefObject<
          HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement
        >
      }
    >
      {children}
    </HtmlComponent>
  );
};

export const Underlined = ({
  color = HOLAGLOW_COLORS['black'],
  as = 'span',
  className,
  children,
}: {
  color?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}) => {
  const HtmlComponent = as;

  return (
    <HtmlComponent
      className={`relative inline-block ${className ? className : ''}`}
    >
      <span
        className={`bg-[${color}] absolute h-[20%] bottom-[10%] left-0 right-0`}
        style={{ background: color }}
      ></span>
      <span className="relative leading-none">{children}</span>
    </HtmlComponent>
  );
};
