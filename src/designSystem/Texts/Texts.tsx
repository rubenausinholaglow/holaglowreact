import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const Title = ({
  size = 'xl',
  weight = 'semibold',
  as = 'h3',
  className = '',
  children,
}: {
  size?: '3xl' | '2xl' | 'xl';
  weight?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}) => {
  const STYLES = {
    '3xl': 'text-4xl md:text-6xl',
    '2xl': 'text-3xl md:text-5xl',
    xl: 'text-xl md:text-2xl',
  };

  const HtmlComponent = as;
  const styles = twMerge(`${STYLES[size]} font-${weight} ${className}`);

  return <HtmlComponent className={styles}>{children}</HtmlComponent>;
};

export const Text = ({
  size = 'md',
  as = 'p',
  className = '',
  children,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}) => {
  const HtmlComponent = as;
  const styles = twMerge(`text-left text-${size} ${className}`);

  return <HtmlComponent className={styles}>{children}</HtmlComponent>;
};
