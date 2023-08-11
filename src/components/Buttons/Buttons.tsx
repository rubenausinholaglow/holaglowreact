import { ReactNode } from 'react';
import { Flex } from 'components/Layouts/Layouts';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonTypes = 'primary' | 'secondary' | 'tertiary' | 'transparent';
type ButtonSizes = 'sm' | 'md' | 'lg' | 'xl';

type ButtonProps = {
  type?: ButtonTypes;
  size?: ButtonSizes;
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
      'group relative rounded-full px-4 py-2 text-white transition-all flex flex-row items-center justify-center mb-[1px]',
    primary: 'bg-hg-black border-b-4 border-hg-lime active:translate-y-[5px]',
    secondary:
      'text-hg-darkMalva bg-white border-b-4 border-hg-malva group-active:border-b-0',
    tertiary: 'text-hg-black border border-hg-black bg-white',
    transparent: 'text-hg-black bg-white hover:bg-hg-malva300',
    sm: 'text-xs h-[32px] px-4',
    md: 'text-xs h-[40px] px-4',
    lg: 'text-md font-semibold h-[48px] px-6',
    xl: 'text-md font-semibold h-[64px] px-6',
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`relative group overflow-visible ${className}`}
        onClick={onClick}
        type={rest?.isSubmit ? 'submit' : 'button'}
      >
        <ButtonBase type={type} />
        <ButtonBody type={type}>{children}</ButtonBody>
      </Link>
    );
  }

  return (
    <button
      className={`relative group overflow-visible ${className}`}
      onClick={onClick}
      type={rest?.isSubmit ? 'submit' : 'button'}
    >
      <ButtonBase type={type} size={size} />
      <ButtonBody type={type} size={size}>
        {children}
      </ButtonBody>
    </button>
  );
};

/* const ButtonBody = ({
  type,
  size,
  children,
}: {
  type: ButtonTypes;
  size: ButtonSizes;
  children: ReactNode;
}) => {
  const STYLES_CONFIG: any = {
    common: 'transition-all relative bottom-[1px] text-center rounded-full ',
    isAnimated: '-translate-y-1 group-active:-translate-y-0',
    primary: 'bg-hg-black text-hg-lime',
    secondary:
      'text-hg-darkMalva bg-white',
    tertiary: 'text-hg-black border border-hg-black bg-white',
    transparent: 'text-hg-black bg-white hover:bg-hg-malva300',
    sm: 'text-xs h-[32px] px-4',
    md: 'text-xs h-[40px] px-4',
    lg: 'text-md font-semibold h-[48px] px-6',
    xl: 'text-md font-semibold h-[64px] px-6',
  };

  return (
    <Flex
      layout="row-center"
      className="transition-all relative bottom-[1px] h-[60px] px-12 text-hg-lime text-center bg-hg-black rounded-full -translate-y-1 group-active:-translate-y-0"
    >
      {children}
    </Flex>
  );
}; */

const ButtonBody = ({
  type,
  size,
  children,
}: {
  type: ButtonTypes;
  size: ButtonSizes;
  children: ReactNode;
}) => {
  const STYLES: any = {
    common: 'transition-all relative bottom-[1px] text-center rounded-full ',
    animations: '-translate-y-1 group-active:-translate-y-0',
    primary: 'bg-hg-black text-hg-lime',
    secondary: 'bg-white text-hg-darkMalva border border-hg-black',
    tertiary: 'bg-white text-hg-black border border-hg-black ',
    transparent:
      'bg-white text-hg-black hover:bg-hg-malva300 active:hover:bg-hg-malva300',
    sm: 'text-xs h-[32px] px-4',
    md: 'text-xs h-[40px] px-4',
    lg: 'text-md font-semibold h-[48px] px-6',
    xl: 'text-md font-semibold h-[64px] px-6',
  };

  const isAnimated = type === 'primary' || type === 'secondary';

  const styles = `${STYLES.common} ${STYLES[type]} ${STYLES[size]} ${
    isAnimated ? STYLES.animations : ''
  }`;

  return (
    <Flex layout="row-center" className={styles}>
      {children}
    </Flex>
  );
};

const ButtonBase = ({
  type,
  size,
}: {
  type: ButtonTypes;
  size: ButtonSizes;
}) => {
  const STYLES: any = {
    primary: 'bg-hg-lime border border-hg-black',
    secondary: 'bg-hg-malva border border-hg-black',
  };

  const styles = `${
    type === 'primary' || type === 'secondary' ? STYLES[type] : ''
  }`;

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-0 rounded-full ${styles} `}
    ></div>
  );
};
