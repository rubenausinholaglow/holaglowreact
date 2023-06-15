import { ReactNode, HTMLAttributes } from 'react';

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
  const styles = `font-semibold text-${size} ${className}`;

  return <HtmlComponent className={styles}>{children}</HtmlComponent>;
};

export const Text = ({
  size = 'lg',
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
  const styles = `text-${size} text-left ${className}`;

  return <HtmlComponent className={styles}>{children}</HtmlComponent>;
};
