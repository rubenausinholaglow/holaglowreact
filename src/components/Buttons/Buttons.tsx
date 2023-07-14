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
  type,
  ...rest
}: {
  style: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  rest?: any;
}) => {
  const StylesConfig = {
    common: 'text-white rounded-md px-6 py-2',
    primary: 'bg-[#7516E9]',
    secondary: 'bg-[#be9ee5]',
    tertiary: 'text-[#7516E9] border border-[#E2E7F0]',
    sm: 'text-xs',
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
