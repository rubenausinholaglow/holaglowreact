import { ReactNode } from 'react';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import dynamic from 'next/dynamic';
import { twMerge } from 'tailwind-merge';

const AnimateOnViewport = dynamic(
  () => import('app/(web)/components/common/AnimateOnViewport'),
  { ssr: false }
);

export const Title = ({
  size = 'xl',
  as = 'h3',
  className = '',
  wrapperClassName = '',
  isAnimated = false,
  origin = 'bottom',
  onClick = undefined,
  children,
}: {
  size?: '3xl' | '2xl' | 'xl' | 'xldr';
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
    xldr: 'text-[28px] leading-[36px]',
  };

  const styles = twMerge(
    `font-gtUltra font-bold text-hg-secondary text-balance ${STYLES[size]} ${className}`
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

export const Text = ({
  size = 'default',
  as = 'p',
  className = '',
  wrapperClassName = '',
  onClick = undefined,
  children,
  isAnimated = false,
  origin = 'bottom',
  rest,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xldr' | '2xl' | 'default';
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

  const styles = `text-left ${
    size !== 'default' ? `text-${size}` : ''
  } ${className}`;

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
