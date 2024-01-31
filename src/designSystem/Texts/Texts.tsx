'use client';

import { ReactNode } from 'react';
import { AnimateOnViewport } from 'app/(web)/components/common/AnimateOnViewport';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { twMerge } from 'tailwind-merge';

export const Title = ({
  size = 'xl',
  weight = 'semibold',
  as = 'h3',
  className = '',
  wrapperClassName = '',
  isAnimated = false,
  origin = 'bottom',
  onClick = undefined,
  children,
}: {
  size?: '3xl' | '2xl' | 'xl';
  weight?: string;
  as?: 'h3' | 'h2' | 'h1';
  className?: string;
  wrapperClassName?: string;
  isAnimated?: boolean;
  origin?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
  onClick?: (...args: any[]) => void;
}) => {
  const HtmlComponent = as;

  const STYLES = {
    '3xl': 'text-4xl lg:text-6xl',
    '2xl': 'text-3xl lg:text-5xl',
    xl: 'text-xl lg:text-2xl',
  };

  const styles = twMerge(
    `text-balance ${STYLES[size]} font-${weight} ${className}`
  );

  if (isAnimated) {
    return (
      <AnimateOnViewport className={wrapperClassName} origin={origin}>
        <HtmlComponent className={styles} onClick={onClick}>
          {children}
        </HtmlComponent>
      </AnimateOnViewport>
    );
  }

  return (
    <HtmlComponent className={styles} onClick={onClick}>
      {children}
    </HtmlComponent>
  );
};

export const TitleDerma = ({
  size = 'xl',
  as = 'h3',
  className = '',
  wrapperClassName = '',
  isAnimated = false,
  origin = 'bottom',
  onClick = undefined,
  children,
}: {
  size?: '3xl' | '2xl' | 'xl';
  as?: 'h3' | 'h2' | 'h1';
  className?: string;
  wrapperClassName?: string;
  isAnimated?: boolean;
  origin?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
  onClick?: (...args: any[]) => void;
}) => {
  const HtmlComponent = as;

  const STYLES = {
    '3xl': 'text-dr4xl lg:text-6xl',
    '2xl': 'text-3xl lg:text-5xl',
    xl: 'text-drxl lg:text-2xl',
  };

  const styles = `text-balance ${className} ${STYLES[size]} ${
    size === 'xl' ? 'font-gtUltraThin' : 'font-gtUltraBold'
  }`;

  if (isAnimated) {
    return (
      <AnimateOnViewport className={wrapperClassName} origin={origin}>
        <HtmlComponent className={styles} onClick={onClick}>
          {children}
        </HtmlComponent>
      </AnimateOnViewport>
    );
  }

  return (
    <HtmlComponent className={styles} onClick={onClick}>
      {children}
    </HtmlComponent>
  );
};

export const Text = ({
  size = 'inherit',
  as = 'p',
  className = '',
  wrapperClassName = '',
  onClick = undefined,
  children,
  isAnimated = false,
  origin = 'bottom',
  rest,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inherit';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  wrapperClassName?: string;
  onClick?: (...args: any[]) => void;
  children: ReactNode;
  isAnimated?: boolean;
  origin?: 'top' | 'right' | 'bottom' | 'left';
  [key: string]: any;
}) => {
  const HtmlComponent = as;

  const styles = twMerge(
    `text-pretty text-left ${size ? `text-${size}` : 'text-md'} ${className}`
  );

  if (isAnimated) {
    return (
      <AnimateOnViewport origin={origin} className={wrapperClassName}>
        <HtmlComponent className={styles} onClick={onClick}>
          {children}
        </HtmlComponent>
      </AnimateOnViewport>
    );
  }

  return (
    <HtmlComponent className={styles} onClick={onClick} {...rest}>
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
