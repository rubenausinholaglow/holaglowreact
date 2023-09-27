import { ReactNode } from 'react';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { twMerge } from 'tailwind-merge';

export const Title = ({
  size = 'xl',
  weight = 'semibold',
  as = 'h3',
  className = '',
  onClick = undefined,
  children,
}: {
  size?: '3xl' | '2xl' | 'xl';
  weight?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
  onClick?: (...args: any[]) => void;
}) => {
  const STYLES = {
    '3xl': 'text-4xl lg:text-6xl',
    '2xl': 'text-2xl lg:text-5xl',
    xl: 'text-xl lg:text-2xl',
  };

  const HtmlComponent = as;
  const styles = twMerge(`${STYLES[size]} font-${weight} ${className}`);

  return (
    <HtmlComponent className={styles} onClick={onClick}>
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
  rest,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onClick?: (...args: any[]) => void;
  children: ReactNode;
  [key: string]: any;
}) => {
  const HtmlComponent = as;
  const styles = twMerge(
    `text-left ${size ? `text-${size}` : 'text-md'} ${className}`
  );

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
