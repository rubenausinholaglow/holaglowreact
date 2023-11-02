'use client';

import { ReactNode } from 'react';
import { AnimateOnViewport } from 'app/components/common/AnimateOnViewport';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
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
  disableAnimation?: boolean;
  children: ReactNode;
  onClick?: (...args: any[]) => void;
}) => {
  const HtmlComponent = as;

  const STYLES = {
    '3xl': 'text-4xl lg:text-6xl',
    '2xl': 'text-3xl lg:text-5xl',
    xl: 'text-xl lg:text-2xl',
  };

  const styles = twMerge(`${STYLES[size]} font-${weight} ${className}`);

  return (
    <AnimateOnViewport disableAnimation={disableAnimation}>
      <HtmlComponent className={styles} onClick={onClick}>
        {children}
      </HtmlComponent>
    </AnimateOnViewport>
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
  disableAnimation?: boolean;
  [key: string]: any;
}) => {
  const HtmlComponent = as;

  const styles = twMerge(
    `text-left ${size ? `text-${size}` : 'text-md'} ${className}`
  );

  return (
    <AnimateOnViewport disableAnimation={disableAnimation}>
      <HtmlComponent className={styles} onClick={onClick} {...rest}>
        {children}
      </HtmlComponent>
    </AnimateOnViewport>
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
