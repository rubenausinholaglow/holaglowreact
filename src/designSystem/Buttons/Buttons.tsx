import { ReactNode } from 'react';
import AnimateOnViewport from 'app/(web)/components/common/AnimateOnViewport';
import { Flex } from 'designSystem/Layouts/Layouts';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'white'
  | 'derma'
  | 'dermaDark'
  | 'disabled';
type ButtonSizes = 'sm' | 'md' | 'lg' | 'xl';

type ButtonProps = {
  type?: ButtonTypes;
  size?: ButtonSizes;
  href?: string;
  className?: string;
  customStyles?: string;
  wrapperClassName?: string;
  onClick?: (...args: any[]) => void;
  children: ReactNode;
  disabled?: boolean;
  isAnimated?: boolean;
  origin?: 'top' | 'right' | 'bottom' | 'left';
  [key: string]: any;
};

export const Button = ({
  type = 'primary',
  size = 'md',
  href = '',
  className = '',
  customStyles = '',
  wrapperClassName = '',
  onClick = undefined,
  children,
  disabled = false,
  isAnimated = false,
  origin = 'bottom',
  id = '',
  ...rest
}: ButtonProps) => {
  if (href && isAnimated) {
    return (
      <AnimateOnViewport origin={origin} className={wrapperClassName}>
        <Link
          href={href}
          id={id}
          target={rest?.target}
          className={twMerge(
            `relative overflow-visible inline-block ${className}`
          )}
          onClick={onClick}
          type={rest?.isSubmit ? 'submit' : 'button'}
        >
          <ButtonBody
            type={type}
            size={size}
            customStyles={customStyles}
            disabled={disabled}
            {...rest}
          >
            {children}
          </ButtonBody>
        </Link>
      </AnimateOnViewport>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        id={id}
        target={rest?.target}
        className={twMerge(
          `relative overflow-visible inline-block ${className}`
        )}
        onClick={onClick}
        type={rest?.isSubmit ? 'submit' : 'button'}
      >
        <ButtonBody
          type={type}
          size={size}
          customStyles={customStyles}
          disabled={disabled}
          {...rest}
        >
          {children}
        </ButtonBody>
      </Link>
    );
  }

  if (isAnimated) {
    return (
      <AnimateOnViewport origin={origin}>
        <button
          className={twMerge(
            `transition-all relative overflow-visible ${
              ['primary', 'secondary'].includes(type) ? 'top-[3px]' : ''
            } ${className}`
          )}
          onClick={onClick}
          type={rest?.isSubmit ? 'submit' : 'button'}
        >
          <ButtonBody
            id={id}
            type={type}
            size={size}
            customStyles={customStyles}
            disabled={disabled}
            {...rest}
          >
            {children}
          </ButtonBody>
        </button>
      </AnimateOnViewport>
    );
  }

  return (
    <button
      className={twMerge(
        `transition-all relative group overflow-visible ${className}`
      )}
      onClick={onClick}
      type={rest?.isSubmit ? 'submit' : 'button'}
    >
      <ButtonBody
        id={id}
        type={type}
        size={size}
        customStyles={customStyles}
        disabled={disabled}
        {...rest}
      >
        {children}
      </ButtonBody>
    </button>
  );
};

const ButtonBody = ({
  type,
  size,
  customStyles,
  disabled = false,
  children,
  id,
  ...rest
}: {
  type: ButtonTypes;
  size: ButtonSizes;
  customStyles?: string;
  disabled?: boolean;
  children: ReactNode;
  id?: string;
}) => {
  const DISABLED_STYLES =
    'cursor-default pointer-events-none border-none bg-hg-black100 text-hg-black300 hover:bg-hg-black100 hover:text-hg-black300 active:bg-hg-black100 active:text-hg-black300';

  const STYLES: any = {
    common: 'transition-all relative text-center rounded-full',
    primary: 'bg-hg-secondary text-white hover:bg-hg-secondary700',
    secondary:
      'bg-hg-secondary100 text-hg-secondary border border-hg-secondary active:bg-hg-secondary300 hover:bg-hg-secondary300',
    tertiary:
      'bg-hg-primary text-hg-black border border-hg-black active:bg-hg-secondary100 hover:bg-hg-secondary100',
    derma: `bg-derma-primary text-white ${
      !disabled ? 'hover:bg-derma-primary500 hover:text-derma-primary' : ''
    }`,
    dermaDark: `bg-derma-tertiary text-white ${
      !disabled ? 'hover:bg-derma-tertiaryDark' : ''
    }`,
    white:
      'bg-white text-hg-black border border-hg-black hover:bg-hg-secondary100 active:bg-hg-secondary100',
    disabled:
      'bg-hg-black100 text-hg-black300 hover:bg-hg-black100 hover:text-hg-black300 cursor-default',
    sm: 'text-xs font-medium h-[32px] px-4',
    md: 'text-xs font-medium h-[40px] px-4',
    lg: 'text-md font-semibold h-[48px] px-6',
    xl: 'text-lg font-semibold h-[64px] px-6',
  };

  const styles = twMerge(
    `${STYLES.common} ${STYLES[type]} ${STYLES[size]} ${customStyles} ${
      disabled ? DISABLED_STYLES : ''
    }`
  );

  return (
    <Flex layout="row-center" className={styles} id={id} {...rest}>
      {children}
    </Flex>
  );
};
