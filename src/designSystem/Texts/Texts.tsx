import { ReactNode } from 'react';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
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
  const styles = twMerge(
    `text-hg-black ${STYLES[size]} font-${weight} ${className}`
  );

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
  const styles = twMerge(`text-hg-black text-left text-${size} ${className}`);

  return <HtmlComponent className={styles}>{children}</HtmlComponent>;
};

export const Underlined = ({
  color = HOLAGLOW_COLORS['black'],
  as = 'span',
  children,
}: {
  color?: string;
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
}) => {
  const HtmlComponent = as;

  return (
    <HtmlComponent className="relative inline-block">
      <span
        className={`bg-[${color}] absolute h-[20%] bottom-[10%] left-0 right-0`}
        style={{ background: color }}
      ></span>
      <span className="relative leading-none">{children}</span>
    </HtmlComponent>
  );
};
