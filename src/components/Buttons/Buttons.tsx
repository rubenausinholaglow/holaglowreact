import { ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  style?: 'primary' | 'secondary' | 'tertiary' | 'hero';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: (...args: any[]) => void;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rest?: any;
};

export const Button = ({
  style = 'primary',
  size = 'md',
  href = '',
  className = '',
  onClick = undefined,
  children,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const StylesConfig: any = {
    common: 'relative rounded-full px-4 py-2 text-white transition-all',
    primary: 'bg-hg-darkMalva border border-hg-darkMalva',
    secondary: 'bg-hg-lightMalva border border-hg-lightMalva',
    tertiary: 'text-hg-darkMalva border border-hg-darkMalva bg-white',
    hero: 'bg-hg-black border-b-4 border-hg-lime',
    sm: 'text-sm px-3 py-1',
    md: 'text-base',
    lg: 'text-lg px-12 py-5 font-semibold',
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
      {style === 'hero' && (
        <span className="absolute rounded-full top-0 bottom-0 left-[0.5px] right-[0.5px] bg-hg-black -z-10 translate-y-[5px]"></span>
      )}
    </button>
  );
};
