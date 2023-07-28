import { ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export const Button = ({
  style = 'primary',
  size = 'md',
  href = '',
  className = '',
  onClick = undefined,
  children,
  type = 'button',
  ...rest
}: {
  style?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  rest?: any;
}) => {
  const StylesConfig: any = {
    common: 'rounded-full px-8 py-2 text-white transition-all',
    primary: 'bg-hg-darkMalva border border-hg-darkMalva',
    secondary: 'bg-hg-lightMalva border border-hg-lightMalva',
    tertiary: 'text-hg-darkMalva border border-hg-darkMalva bg-white',
    sm: 'text-sm px-3 py-1',
    md: 'text-base',
    lg: 'text-lg px-12 py-4 font-semibold',
  };

  const styles = twMerge(
    `${StylesConfig.common} ${StylesConfig[style]} ${StylesConfig[size]} ${className}`
  );
  if (href) {
    return (
      <Link href={href} className={styles} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
