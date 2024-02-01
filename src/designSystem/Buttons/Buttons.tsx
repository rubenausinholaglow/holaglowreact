import { ReactNode } from 'react';
import { AnimateOnViewport } from 'app/(web)/components/common/AnimateOnViewport';
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
            `relative group overflow-visible ${className} inline-block`
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

  if (href) {
    return (
      <Link
        href={href}
        id={id}
        target={rest?.target}
        className={twMerge(
          `relative group overflow-visible ${className} inline-block`
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
    );
  }

  if (isAnimated) {
    return (
      <AnimateOnViewport origin={origin}>
        <button
          className={twMerge(
            `transition-all relative group overflow-visible ${
              ['primary', 'secondary'].includes(type) ? 'top-[3px]' : ''
            } ${className}`
          )}
          onClick={onClick}
          type={rest?.isSubmit ? 'submit' : 'button'}
        >
          <ButtonBase type={type} disabled={disabled} />
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
        `transition-all relative group overflow-visible ${
          ['primary', 'secondary'].includes(type) ? 'top-[3px]' : ''
        } ${className}`
      )}
      onClick={onClick}
      type={rest?.isSubmit ? 'submit' : 'button'}
    >
      <ButtonBase type={type} disabled={disabled} />
      <ButtonBody
        id={id}
        type={type}
        size={size}
        customStyles={customStyles}
        disabled={disabled}
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
  color,
  bgColor,
  disabled = false,
  children,
  id,
  ...rest
}: {
  type: ButtonTypes;
  size: ButtonSizes;
  customStyles?: string;
  color?: string;
  bgColor?: string;
  disabled?: boolean;
  children: ReactNode;
  id?: string;
}) => {
  const DISABLED_STYLES: any = {
    primary:
      'border-none bg-hg-black100 group-active:bg-hg-black100 text-hg-black300 group-hover:text-hg-black300 group-active:text-hg-black300 cursor-default',
    secondary:
      'border-none bg-hg-black100 group-active:bg-hg-black100 text-hg-black300 group-hover:text-hg-black300 group-active:text-hg-black300 cursor-default',
    tertiary:
      'border-none bg-hg-black100 group-active:bg-hg-black100 text-hg-black300 group-hover:text-hg-black300 group-active:text-hg-black300 cursor-default',
  };

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

  const isAnimated = (type === 'primary' || type === 'secondary') && !disabled;

  const styles = twMerge(
    `${STYLES.common} ${STYLES[type]} ${STYLES[size]} ${customStyles} ${
      isAnimated ? STYLES.animations : ''
    }${disabled ? DISABLED_STYLES[type] : ''}`
  );

  return (
    <Flex layout="row-center" className={styles} id={id}>
      {children}
    </Flex>
  );
};

const ButtonBase = ({
  type,
  disabled = false,
}: {
  type: ButtonTypes;
  disabled?: boolean;
}) => {
  const BUTTON_TYPES = ['primary', 'secondary'];

  const STYLES: any = {
    primary:
      'bg-hg-primary border border-hg-black group-hover:bg-hg-secondary500',
    secondary: 'bg-hg-secondary border border-hg-black',
  };

  const styles = `${BUTTON_TYPES.includes(type) ? STYLES[type] : ''}`;

  if (disabled) {
    return <></>;
  }

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-0 rounded-full pointer-events-none ${styles}`}
    ></div>
  );
};
