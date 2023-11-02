import { ReactNode } from 'react';
import { AnimateOnViewport } from 'app/components/common/AnimateOnViewport';
import { Flex } from 'designSystem/Layouts/Layouts';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'transparent'
  | 'disabled';
type ButtonSizes = 'sm' | 'md' | 'lg' | 'xl';

type ButtonProps = {
  type?: ButtonTypes;
  size?: ButtonSizes;
  href?: string;
  className?: string;
  customStyles?: string;
  onClick?: (...args: any[]) => void;
  children: ReactNode;
  disabled?: boolean;
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
  disabled = false,
  ...rest
}: ButtonProps) => {
  if (href) {
    return (
      <AnimateOnViewport origin="left">
        <Link
          href={href}
          target={rest?.target}
          className={twMerge(
            `relative group overflow-visible ${className} ${
              disabled && 'opacity-25 pointer-events-none'
            }`
          )}
          onClick={onClick}
          type={rest?.isSubmit ? 'submit' : 'button'}
        >
          <ButtonBase type={type} />
          <ButtonBody
            type={type}
            size={size}
            customStyles={customStyles}
            {...rest}
          >
            {children}
          </ButtonBody>
        </Link>
      </AnimateOnViewport>
    );
  }

  return (
    <AnimateOnViewport origin="left">
      <button
        className={twMerge(
          `transition-all relative group overflow-visible ${
            ['primary', 'secondary'].includes(type) ? 'top-[3px]' : ''
          } ${className} ${disabled && 'opacity-25 pointer-events-none'}`
        )}
        onClick={onClick}
        type={rest?.isSubmit ? 'submit' : 'button'}
      >
        <ButtonBase type={type} />
        <ButtonBody
          type={type}
          size={size}
          customStyles={customStyles}
          {...rest}
        >
          {children}
        </ButtonBody>
      </button>
    </AnimateOnViewport>
  );
};

const ButtonBody = ({
  type,
  size,
  customStyles,
  color,
  bgColor,
  children,
}: {
  type: ButtonTypes;
  size: ButtonSizes;
  customStyles?: string;
  color?: string;
  bgColor?: string;
  children: ReactNode;
}) => {
  const STYLES: any = {
    common: 'transition-all relative bottom-[1px] text-center rounded-full',
    animations: '-translate-y-1 group-active:-translate-y-0',
    primary:
      'bg-hg-black text-hg-primary group-active:text-hg-secondary500 group-hover:text-hg-secondary500',
    secondary:
      'bg-white text-hg-secondary border border-hg-black group-active:bg-hg-secondary300 group-hover:bg-hg-secondary300',
    tertiary: `${bgColor ? bgColor : 'bg-white'} ${
      color ? color : 'text-hg-black border border-hg-black'
    }`,
    transparent:
      'bg-white text-hg-black border border-transparent group-hover:bg-hg-secondary100 group-active:bg-hg-secondary100',
    disabled: 'bg-hg-black100 text-hg-black300 cursor-default',
    sm: 'text-xs font-medium h-[32px] px-4',
    md: 'text-xs font-medium h-[40px] px-4',
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
    primary:
      'bg-hg-primary border border-hg-black group-hover:bg-hg-secondary500',
    secondary: 'bg-hg-secondary border border-hg-black',
  };

  const styles = `${BUTTON_TYPES.includes(type) ? STYLES[type] : ''}`;

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-0 rounded-full ${styles} `}
    ></div>
  );
};
