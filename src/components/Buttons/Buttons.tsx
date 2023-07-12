import { ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export const Button = ({
  style = 'primary',
  size = 'md',
  route = '',
  className = '',
  onClick = undefined,
  children,
  ...rest
}: {
  style: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  route?: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  rest?: any;
}) => {
  const StylesConfig = {
    primary: 'bg-[#7516E9] text-white rounded-md px-6 py-2',
    secondary: 'bg-[#be9ee5] text-white rounded-md px-6 py-2',
    tertiary: 'text-[#7516E9] border border-[#E2E7F0] rounded-md px-6 py-2',
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-xl px-6',
  };

  const styles = twMerge(
    `${StylesConfig[style]} ${StylesConfig[size]} ${className}`
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
