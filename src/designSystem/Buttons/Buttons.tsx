import { ReactNode } from 'react';
import { Flex } from 'designSystem/Layouts/Layouts';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonTypes = 'primary' | 'secondary' | 'tertiary' | 'transparent';
type ButtonSizes = 'sm' | 'md' | 'lg' | 'xl';

type ButtonProps = {
  type?: ButtonTypes;
  size?: ButtonSizes;
  href?: string;
  className?: string;
  customStyles?: string;
  onClick?: (...args: any[]) => void;
  children: ReactNode;
  [key: string]: any;
};

export const Button = ({
  type = 'primary',
  size = 'md',
  href = '',
  className = '',
  customStyles = '',
  onClick = undefined,
  children,
  ...rest
}: ButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`relative group overflow-visible ${className}`}
        onClick={onClick}
        type={rest?.isSubmit ? 'submit' : 'button'}
      >
        <ButtonBase type={type} />
        <ButtonBody type={type} size={size} customStyles={customStyles}>
          {children}
        </ButtonBody>
      </Link>
    );
  }

  return (
    <button
      className={`relative group overflow-visible ${className}`}
      onClick={onClick}
      type={rest?.isSubmit ? 'submit' : 'button'}
    >
      <ButtonBase type={type} />
      <ButtonBody type={type} size={size} customStyles={customStyles}>
        {children}
      </ButtonBody>
    </button>
  );
};

const ButtonBody = ({
  type,
  size,
  customStyles,
  children,
}: {
  type: ButtonTypes;
  size: ButtonSizes;
  customStyles?: string;
  children: ReactNode;
}) => {
  const STYLES: any = {
    common: 'transition-all relative bottom-[1px] text-center rounded-full ',
    animations: '-translate-y-1 group-active:-translate-y-0',
    primary: 'bg-hg-black text-hg-lime',
    secondary: 'bg-white text-hg-darkMalva border border-hg-black',
    tertiary:
      'bg-white text-hg-black border border-hg-black hover:bg-hg-malva300 active:bg-hg-malva300',
    transparent:
      'bg-white text-hg-black border border-transparent hover:bg-hg-malva300 hover:border-hg-malva300 active:bg-hg-malva300 active:border-hg-malva300',
    sm: 'text-xs h-[32px] px-4',
    md: 'text-xs h-[40px] px-4',
    lg: 'text-md font-semibold h-[48px] px-6',
    xl: 'text-md font-semibold h-[64px] px-6',
  };

  const isAnimated = type === 'primary' || type === 'secondary';

  const styles = twMerge(
    `${STYLES.common} ${STYLES[type]} ${STYLES[size]} ${customStyles} ${
      isAnimated ? STYLES.animations : ''
    }`
  );

  return (
    <Flex layout="row-center" className={styles}>
      {children}
    </Flex>
  );
};

const ButtonBase = ({ type }: { type: ButtonTypes }) => {
  const BUTTON_TYPES = ['primary', 'secondary'];

  const STYLES: any = {
    primary: 'bg-hg-lime border border-hg-black',
    secondary: 'bg-hg-malva border border-hg-black',
  };

  const styles = `${BUTTON_TYPES.includes(type) ? STYLES[type] : ''}`;

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-0 rounded-full ${styles} `}
    ></div>
  );
};
