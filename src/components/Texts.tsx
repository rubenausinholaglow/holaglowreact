import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { HOLAGLOW_COLORS } from 'utils/colors';

export const Title = ({
  size = 'xl',
  as = 'h3',
  className = '',
  children,
}: {
  size: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}) => {
  const HtmlComponent = as;
  const styles = twMerge(`font-semibold text-${size} ${className}`);

  return <HtmlComponent className={styles}>{children}</HtmlComponent>;
};

export const Text = ({
  size = 'md',
  as = 'p',
  className = '',
  children,
}: {
  size?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}) => {
  const HtmlComponent = as;
  const styles = twMerge(`text-${size} text-left ${className}`);

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
        className={`bg-[${color}] absolute h-[15%] bottom-[10%] left-0 right-0`}
        style={{ background: color }}
      ></span>
      <span className="relative leading-none">{children}</span>
    </HtmlComponent>
  );
};
