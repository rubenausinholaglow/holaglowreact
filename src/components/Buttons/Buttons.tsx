import { ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  type?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  className?: string;
  onClick?: (...args: any[]) => void;
  children: ReactNode;
  [key: string]: any;
};

export const Button = ({
  type = 'primary',
  size = 'md',
  href = '',
  className = '',
  onClick = undefined,
  children,
  ...rest
}: ButtonProps) => {
  const StylesConfig: any = {
    common:
      'relative rounded-full px-4 py-2 text-white transition-all flex flex-row items-center justify-center',
    primary: 'bg-hg-black border-b-4 border-hg-lime',
    secondary: 'bg-hg-lightMalva border border-hg-lightMalva',
    tertiary: 'text-hg-black border border-hg-black bg-white',
    transparent: 'text-hg-black bg-white hover:bg-hg-malva300',
    sm: 'text-xs h-[32px] px-4',
    md: 'text-xs h-[40px] px-4',
    lg: 'text-md h-[48px] px-6',
    xl: 'text-md h-[64px] px-6',
  };

  const styles = twMerge(
    `${StylesConfig.common} ${StylesConfig[type]} ${StylesConfig[size]} ${className}`
  );
  if (href) {
    return (
      <Link href={href} className={styles} {...rest}>
        {children}
        {type === 'primary' && (
          <span className="absolute rounded-full top-0 bottom-0 left-[0.5px] right-[0.5px] bg-hg-black -z-10 translate-y-[5px]"></span>
        )}
      </Link>
    );
  }

  return (
    <button
      className={styles}
      onClick={onClick}
      type={rest?.isSubmit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};
