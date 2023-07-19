import { ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export const Button = ({
  type = 'primary',
  size = 'md',
  route = '',
  className = '',
  onClick = undefined,
  children,
  ...rest
}: {
  type: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  route?: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  rest?: any;
}) => {
  const StylesConfig = {
    primary: 'bg-hg-darkMalva text-white rounded-full px-4 py-2',
    secondary: 'bg-hg-lightMalva text-white rounded-full px-4 py-2',
    tertiary:
      'text-hg-darkMalva border border-hg-darkMalva rounded-full px-4 py-2',
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-xl px-6',
  };

  const styles = twMerge(
    `${StylesConfig[type]} ${StylesConfig[size]} ${className}`
  );

  if (route) {
    return (
      <Link href={route} className={styles} {...rest}>
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
